import React from 'react';

interface DTabProps {
    label: string;
    isActive: boolean;
    onClick: () => void;
}

export const DTab: React.FC<DTabProps> = ({ label, isActive, onClick }) => {
    return (
        <button
            onClick={onClick}
            className={`py-1 px-2 rounded-full text-sm font-medium transition-colors ${isActive
                ? 'bg-second text-white'
                : 'bg-grey text-gray-700 hover:bg-gray-300'
                }`}
        >
            {label}
        </button>
    );
};
