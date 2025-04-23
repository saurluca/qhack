import React from 'react';

export const DLoading: React.FC = () => {
    return (
        <div className="flex flex-col items-center justify-center p-8">
            <div className="w-12 h-12 border-4 border-t-second border-gray-200 rounded-full animate-spin mb-4"></div>
            <p className="text-lg font-medium text-gray-700">preparing your recipy</p>
        </div>
    );
};
