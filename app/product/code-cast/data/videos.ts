// YouTube videos created with CodeCast
export interface CodeCastVideo {
    id: string;
    title: string;
    description: string;
    youtubeId: string;
    thumbnail?: string;
    author?: string;
    date?: string;
    tags?: string[];
}

export const CODECAST_VIDEOS: CodeCastVideo[] = [
    // User will provide YouTube links
    // Format: https://www.youtube.com/watch?v=VIDEO_ID
    // Example entries (to be replaced with actual links):
    {
        id: 'example-1',
        title: 'Example Video 1',
        description: 'Description of video made with CodeCast',
        youtubeId: 'K9YcnO_bzJE', // This is a placeholder - will be replaced
        author: 'Creator Name',
        date: '2024-01-01',
        tags: ['HTML', 'CSS', 'Tutorial'],
    },
    {
        id: 'example-2',
        title: 'Example Video 2',
        description: 'Another amazing CodeCast video',
        youtubeId: 'YSkge1FwxE8', // Placeholder
        author: 'Creator Name',
        date: '2024-01-02',
        tags: ['JavaScript', 'Animation'],
    },
    {
        id: 'example-3',
        title: 'Example Video 3',
        description: 'CSS animations made easy',
        youtubeId: 'TXk6QVldDAc', // Placeholder
        author: 'Creator Name',
        date: '2024-01-03',
        tags: ['CSS', 'Animation'],
    },
    {
        id: 'example-4',
        title: 'Example Video 4',
        description: 'React components tutorial',
        youtubeId: 'G4fBq2OYhkY', // Placeholder
        author: 'Creator Name',
        date: '2024-01-04',
        tags: ['React', 'Components'],
    },
    {
        id: 'example-5',
        title: 'Example Video 5',
        description: 'UI design with HTML/CSS',
        youtubeId: 'FxqajX2WHYk', // Placeholder
        author: 'Creator Name',
        date: '2024-01-05',
        tags: ['HTML', 'CSS', 'Design'],
    },
    {
        id: 'example-6',
        title: 'Example Video 6',
        description: 'JavaScript tricks and tips',
        youtubeId: 'G0cpUMc9Wu8', // Placeholder
        author: 'Creator Name',
        date: '2024-01-06',
        tags: ['JavaScript', 'Tips'],
    },
    {
        id: 'example-7',
        title: 'Example Video 7',
        description: 'JavaScript tricks and tips',
        youtubeId: 'YxptFVwv6ew', // Placeholder
        author: 'Creator Name',
        date: '2024-01-07',
        tags: ['JavaScript', 'Tips'],
    },
    {
        id: 'short-1',
        title: 'CodeCast Short 1',
        description: 'Short video created with CodeCast',
        youtubeId: '7zBh4LH9W0c',
        author: 'Creator Name',
        date: '2024-01-08',
        tags: ['Short', 'Tutorial'],
    },
    {
        id: 'short-2',
        title: 'CodeCast Short 2',
        description: 'Short video created with CodeCast',
        youtubeId: 'naEojONlyx0',
        author: 'Creator Name',
        date: '2024-01-09',
        tags: ['Short', 'Tutorial'],
    },
    {
        id: 'short-3',
        title: 'CodeCast Short 3',
        description: 'Short video created with CodeCast',
        youtubeId: 'zCvV963PBjo',
        author: 'Creator Name',
        date: '2024-01-10',
        tags: ['Short', 'Tutorial'],
    },
    {
        id: 'short-4',
        title: 'CodeCast Short 4',
        description: 'Short video created with CodeCast',
        youtubeId: 'MYkufProKW4',
        author: 'Creator Name',
        date: '2024-01-11',
        tags: ['Short', 'Tutorial'],
    },
    {
        id: 'short-5',
        title: 'CodeCast Short 5',
        description: 'Short video created with CodeCast',
        youtubeId: 'YJL1YM3Fi6E',
        author: 'Creator Name',
        date: '2024-01-12',
        tags: ['Short', 'Tutorial'],
    },

];