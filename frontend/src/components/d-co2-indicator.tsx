import React from 'react';

interface DCo2IndicatorProps {
    value: number;
    maxValue: number;
}

export const DCo2Indicator: React.FC<DCo2IndicatorProps> = ({ value, maxValue }) => {
    const percentage = (value / maxValue) * 100;
    const circumference = 2 * Math.PI * 40; // r = 40, circumference = 2πr
    const dashOffset = circumference - (percentage / 100) * circumference;

    return (
        <div className="flex items-center justify-center">
            <div className="relative w-32 h-32">
                {/* Background circle */}
                <svg className="w-full h-full" viewBox="0 0 100 100">
                    <circle
                        cx="50"
                        cy="50"
                        r="40"
                        fill="transparent"
                        stroke="#E6E6E6"
                        strokeWidth="10"
                    />

                    {/* Progress circle */}
                    <circle
                        cx="50"
                        cy="50"
                        r="40"
                        fill="transparent"
                        stroke="currentColor"
                        strokeWidth="10"
                        strokeDasharray={circumference}
                        strokeDashoffset={dashOffset}
                        strokeLinecap="round"
                        className="text-green"
                        transform="rotate(-90 50 50)"
                    />
                </svg>

                {/* Text in the middle */}
                <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
                    <span className="text-xl font-bold">{value}/{maxValue} kg</span>
                    <span className="text-xs mt-1">saved CO<sub>2</sub></span>
                </div>
            </div>
        </div>
    );
}; 