import React from 'react';

export const DStatsHeader: React.FC = () => {
    return (
        <div className="mt-4 mb-2">
            <h1 className="text-xl font-semibold flex items-center">
                Your stats this month{' '}
                <span className="ml-1 text-yellow">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                        className="w-6 h-6"
                    >
                        <path
                            fillRule="evenodd"
                            d="M5 2.25a.75.75 0 01.75.75v1.5h1.5v-.75a.75.75 0 011.5 0v1.5h1.5v-.75a.75.75 0 011.5 0v1.5h1.5v-.75a.75.75 0 011.5 0v1.5h1.5v-.75a.75.75 0 011.5 0v1.5a.75.75 0 01-.75.75h-.75v1.5h.75a.75.75 0 01.75.75v1.5a.75.75 0 01-.75.75h-1.5v1.5h.75a.75.75 0 01.75.75v1.5a.75.75 0 01-.75.75h-1.5v1.5h.75a.75.75 0 01.75.75v1.5a.75.75 0 01-.75.75H5.25a.75.75 0 01-.75-.75v-1.5a.75.75 0 01.75-.75h.75v-1.5H5.25a.75.75 0 01-.75-.75v-1.5a.75.75 0 01.75-.75h.75v-1.5H5.25a.75.75 0 01-.75-.75v-1.5a.75.75 0 01.75-.75h.75v-1.5H5.25a.75.75 0 01-.75-.75v-1.5A.75.75 0 015 2.25zm1.5 15a.75.75 0 01.75-.75h3a.75.75 0 01.75.75v3a.75.75 0 01-.75.75h-3a.75.75 0 01-.75-.75v-3zm8.25-.75a.75.75 0 00-.75.75v3c0 .414.336.75.75.75h3a.75.75 0 00.75-.75v-3a.75.75 0 00-.75-.75h-3z"
                            clipRule="evenodd"
                        />
                    </svg>
                </span>
            </h1>
        </div>
    );
}; 