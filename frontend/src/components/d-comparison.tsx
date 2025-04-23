import React from 'react';

interface DComparisonProps {
    value: number;
}

export const DComparison: React.FC<DComparisonProps> = ({ value }) => {
    const isPositive = value > 0;

    return (
        <div>
            <div className={`text-lg font-medium ${isPositive ? 'text-green' : 'text-red-500'}`}>
                {isPositive ? '+' : ''}{value}kg
            </div>
            <p className="text-sm text-gray-600">compared to last week</p>
        </div>
    );
}; 