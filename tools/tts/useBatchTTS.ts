import { useState, useEffect, useRef } from 'react';
import { BatchJob, BatchItem, getCurrentJob, saveJob, createNewJob, updateJobItem, clearCurrentJob } from './utils/tts-db';
import { v4 as uuidv4 } from 'uuid';

export type JobItem = BatchItem;

export const useBatchTTS = (
    onSynthesizeFile: (text: string) => Promise<Blob | null>
) => {
    const [job, setJob] = useState<BatchJob | null>(null);
    const [isProcessing, setIsProcessing] = useState(false);

    const isProcessingRef = useRef(false);
    isProcessingRef.current = isProcessing;

    useEffect(() => {
        getCurrentJob().then((savedJob: BatchJob | null) => {
            if (savedJob && savedJob.items.length > 0) {
                setJob(savedJob);
            }
        });
    }, []);

    const addFiles = async (files: File[]) => {
        let currentJob = job || await createNewJob();

        const newItems: BatchItem[] = await Promise.all(
            files.map(async (file) => {
                const text = await file.text();
                return {
                    id: uuidv4(),
                    fileName: file.name,
                    text: text.trim(),
                    status: 'pending'
                };
            })
        );

        currentJob = { ...currentJob, items: [...currentJob.items, ...newItems] };
        await saveJob(currentJob);
        setJob(currentJob);
    };

    const addTextSnippet = async (text: string, title?: string) => {
        let currentJob = job || await createNewJob();

        const newItem: BatchItem = {
            id: uuidv4(),
            fileName: title || `snippet_${currentJob.items.length + 1}.txt`,
            text: text.trim(),
            status: 'pending'
        };

        currentJob = { ...currentJob, items: [...currentJob.items, newItem] };
        await saveJob(currentJob);
        setJob(currentJob);
    };

    const processQueue = async () => {
        if (!job || isProcessingRef.current) return;
        setIsProcessing(true);

        let currentJob = await getCurrentJob();
        if (!currentJob) {
            setIsProcessing(false);
            return;
        }

        // Keep loop alive as long as we are processing and have pending items
        while (isProcessingRef.current) {
            currentJob = await getCurrentJob();
            if (!currentJob) break;

            const nextItem = currentJob.items.find((i: BatchItem) => i.status === 'pending');
            if (!nextItem) break; // Finished all

            // Mark as generating
            await updateJobItem(currentJob.id, nextItem.id, { status: 'generating' });
            setJob(await getCurrentJob());

            try {
                const blob = await onSynthesizeFile(nextItem.text);
                if (blob) {
                    await updateJobItem(currentJob.id, nextItem.id, {
                        status: 'done',
                        audioBlob: blob
                    });
                } else {
                    await updateJobItem(currentJob.id, nextItem.id, {
                        status: 'error',
                        error: 'Failed to generate audio blob'
                    });
                }
            } catch (err: any) {
                await updateJobItem(currentJob.id, nextItem.id, {
                    status: 'error',
                    error: err.message || 'Unknown error'
                });
            }

            setJob(await getCurrentJob());
        }

        setIsProcessing(false);
    };

    const toggleProcessing = () => {
        if (isProcessing) {
            setIsProcessing(false);
        } else {
            processQueue();
        }
    };

    const removeItem = async (itemId: string) => {
        if (!job) return;
        const newItems = job.items.filter((i: BatchItem) => i.id !== itemId);
        const updatedJob = { ...job, items: newItems };
        await saveJob(updatedJob);
        setJob(updatedJob);
    };

    const clearBatch = async () => {
        setIsProcessing(false);
        await clearCurrentJob();
        setJob(null);
    };

    return {
        job,
        isProcessing,
        addFiles,
        addTextSnippet,
        toggleProcessing,
        removeItem,
        clearBatch
    };
};
