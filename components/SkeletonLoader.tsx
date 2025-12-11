import React from 'react';

interface SkeletonProps {
    className?: string;
}

const Skeleton: React.FC<SkeletonProps> = ({ className }) => (
    <div className={`animate-pulse bg-gray-200 dark:bg-gray-700/50 rounded ${className}`} />
);

export const ToolSkeleton = () => (
    <div className="w-full max-w-[1920px] mx-auto px-4 sm:px-6 lg:px-8 py-8 animate-fade-in">
        {/* Breadcrumbs Skeleton */}
        <div className="flex items-center gap-2 mb-6">
            <Skeleton className="h-4 w-16" />
            <Skeleton className="h-4 w-4" />
            <Skeleton className="h-4 w-24" />
            <Skeleton className="h-4 w-4" />
            <Skeleton className="h-4 w-32" />
        </div>

        <div className="flex flex-col xl:flex-row gap-8">
            {/* Main Tool Area */}
            <div className="flex-1 space-y-8">
                {/* Tool Header */}
                <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 border border-gray-200 dark:border-gray-700 shadow-sm">
                    <div className="flex items-start gap-6">
                        <Skeleton className="w-16 h-16 rounded-2xl" />
                        <div className="flex-1 space-y-3">
                            <Skeleton className="h-8 w-3/4 max-w-lg" />
                            <Skeleton className="h-4 w-full max-w-2xl" />
                            <Skeleton className="h-4 w-2/3 max-w-xl" />
                        </div>
                    </div>
                </div>

                {/* Tool Interaction Area */}
                <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 border border-gray-200 dark:border-gray-700 shadow-sm space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                            <Skeleton className="h-5 w-32" />
                            <Skeleton className="h-64 w-full rounded-xl" />
                        </div>
                        <div className="space-y-2">
                            <Skeleton className="h-5 w-32" />
                            <Skeleton className="h-64 w-full rounded-xl" />
                        </div>
                    </div>
                    <div className="flex justify-center pt-4">
                        <Skeleton className="h-12 w-48 rounded-xl" />
                    </div>
                </div>
            </div>

            {/* Sidebar Skeleton */}
            <div className="xl:w-80 flex-shrink-0 space-y-6">
                <Skeleton className="h-[400px] w-full rounded-2xl" />
                <Skeleton className="h-64 w-full rounded-2xl" />
            </div>
        </div>
    </div>
);

export const HomeSkeleton = () => (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 animate-fade-in">
        {/* Hero Section */}
        <div className="text-center mb-24 pt-8 max-w-3xl mx-auto space-y-6">
            <Skeleton className="h-16 w-3/4 mx-auto rounded-full" />
            <Skeleton className="h-6 w-2/3 mx-auto" />
            <div className="flex justify-center gap-4 pt-4">
                <Skeleton className="h-12 w-40 rounded-xl" />
                <Skeleton className="h-12 w-40 rounded-xl" />
            </div>
        </div>

        {/* Most Viewed Section */}
        <div className="mb-24 space-y-8">
            <div className="text-center space-y-4 mb-12">
                <Skeleton className="h-10 w-64 mx-auto" />
                <Skeleton className="h-5 w-96 mx-auto" />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {[1, 2, 3, 4, 5, 6].map((i) => (
                    <div key={i} className="bg-white dark:bg-gray-800 rounded-2xl p-6 border border-gray-200 dark:border-gray-700 h-64">
                        <div className="flex items-center gap-4 mb-6">
                            <Skeleton className="w-12 h-12 rounded-xl" />
                            <div className="flex-1 space-y-2">
                                <Skeleton className="h-5 w-3/4" />
                            </div>
                        </div>
                        <div className="space-y-3">
                            <Skeleton className="h-4 w-full" />
                            <Skeleton className="h-4 w-full" />
                            <Skeleton className="h-4 w-2/3" />
                        </div>
                    </div>
                ))}
            </div>
        </div>
    </div>
);

export default Skeleton;
