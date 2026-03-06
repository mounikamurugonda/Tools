import { get, set, del, update } from 'idb-keyval';
import { v4 as uuidv4 } from 'uuid';

export type BatchItemStatus = 'pending' | 'generating' | 'done' | 'error';

export interface BatchItem {
    id: string;
    fileName: string;
    text: string;
    status: BatchItemStatus;
    audioBlob?: Blob;
    error?: string;
}

export interface BatchJob {
    id: string;
    items: BatchItem[];
    activeEngine: string | null;
    voiceId: string | null;
    speed: number;
    createdAt: number;
    updatedAt: number;
}

const CURRENT_JOB_ID_KEY = 'tts_current_batch_job_id';

export const getJob = async (id: string): Promise<BatchJob | undefined> => {
    return get(`tts_job_${id}`);
};

export const saveJob = async (job: BatchJob): Promise<void> => {
    job.updatedAt = Date.now();
    await set(`tts_job_${job.id}`, job);
    await set(CURRENT_JOB_ID_KEY, job.id);
};

export const createNewJob = async (): Promise<BatchJob> => {
    const job: BatchJob = {
        id: uuidv4(),
        items: [],
        activeEngine: null,
        voiceId: null,
        speed: 1.0,
        createdAt: Date.now(),
        updatedAt: Date.now(),
    };
    await saveJob(job);
    return job;
};

export const getCurrentJob = async (): Promise<BatchJob | null> => {
    const currentId = await get(CURRENT_JOB_ID_KEY);
    if (!currentId) return null;
    const job = await getJob(currentId as string);
    return job || null;
};

export const updateJobItem = async (jobId: string, itemId: string, itemUpdate: Partial<BatchItem>): Promise<BatchJob> => {
    let updatedJob: BatchJob | undefined;

    await update(`tts_job_${jobId}`, (val: any) => {
        if (!val) return val;
        const job = val as BatchJob;
        job.items = job.items.map(item => item.id === itemId ? { ...item, ...itemUpdate } : item);
        job.updatedAt = Date.now();
        updatedJob = job;
        return job;
    });

    if (!updatedJob) throw new Error("Job not found");
    return updatedJob;
};

export const clearCurrentJob = async (): Promise<void> => {
    const currentId = await get(CURRENT_JOB_ID_KEY);
    if (currentId) {
        await del(`tts_job_${currentId}`);
        await del(CURRENT_JOB_ID_KEY);
    }
};
