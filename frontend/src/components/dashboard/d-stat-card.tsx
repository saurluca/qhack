import React from "react";

interface DStatCardProps {
    title: string;
    value: number;
    unit?: string;
    target?: number;
    isLowerBetter?: boolean;
    tip?: string;
}

const DStatCard: React.FC<DStatCardProps> = ({
    title,
    value,
    unit = "",
    target,
    isLowerBetter = false,
    tip,
}) => {
    const calculatePercentage = (actual: number, recommended: number): number => {
        return Math.round((actual / recommended) * 100);
    };

    const getStatusColor = (percentage: number, lowerIsBetter = false): string => {
        if (lowerIsBetter) {
            if (percentage <= 90) return "bg-green-500";
            if (percentage <= 110) return "bg-yellow-500";
            return "bg-red-500";
        } else {
            if (percentage >= 90 && percentage <= 110) return "bg-green-500";
            if (percentage >= 70 && percentage <= 130) return "bg-yellow-500";
            return "bg-red-500";
        }
    };

    const percentage = target ? calculatePercentage(value, target) : null;
    const statusColor = percentage ? getStatusColor(percentage, isLowerBetter) : "";

    return (
        <div className="bg-white p-4 rounded-lg shadow">
            <div className="flex items-end space-x-2">
                <h3 className="text-lg font-semibold capitalize">{title}</h3>
                <span className="text-lg font-bold">{value}</span>
                {unit && <span className="text-lg text-gray-500">{unit}</span>}
            </div>
            {percentage && target && (
                <>
                    <div className="mt-2 h-2 w-full bg-gray-200 rounded-full overflow-hidden">
                        <div
                            className={`h-full ${statusColor}`}
                            style={{ width: `${Math.min(percentage, 150)}%` }}
                        ></div>
                    </div>
                    <div className="flex justify-between mt-1 text-sm">
                        <span className={percentage > 100 && !isLowerBetter ? "text-red-500" : (percentage < 90 && !isLowerBetter ? "text-red-500" : "text-green-500")}>
                            {percentage}%
                        </span>
                        <span className="text-gray-500">
                            Goal: {target}{unit}
                        </span>
                    </div>
                </>
            )}

            {tip && (
                <div className="mt-2 text-xs text-gray-600 bg-gray-50 p-1 rounded">
                    <span className="font-medium">Tip:</span> {tip}
                </div>
            )}
        </div>
    );
};

export default DStatCard; 