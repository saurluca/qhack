import React from "react";

interface StatItem {
    title: string;
    value: number;
    unit: string;
    target: number;
    percentage: number;
    status: "good" | "warning" | "attention";
}

interface DStatsSummaryCardProps {
    stats: StatItem[];
    title?: string;
}

const DStatsSummaryCard: React.FC<DStatsSummaryCardProps> = ({ stats, title }) => {
    // Get status color based on the status
    const getStatusColor = (status: string): string => {
        switch (status) {
            case "good":
                return "bg-green-500";
            case "warning":
                return "bg-yellow-400";
            case "attention":
                return "bg-amber-500";
            default:
                return "bg-green-500";
        }
    };

    return (
        <div className="bg-white p-4 rounded-lg shadow">
            {title && <h3 className="text-lg font-semibold mb-3">{title}</h3>}
            <div className="space-y-3">
                {stats.map((stat, index) => (
                    <div key={index} className="space-y-1">
                        <div className="flex justify-between items-center">
                            <div className="flex items-center space-x-2">
                                <span className="text-gray-800 font-medium capitalize">{stat.title}</span>
                                <span className="text-gray-500">•</span>
                                <span className="font-semibold">{stat.value}</span>
                                <span className="text-gray-500 text-sm">{stat.unit}</span>
                            </div>
                            <div className="flex items-center space-x-2">
                                <span className="text-sm text-gray-500">{stat.target}{stat.unit}</span>
                                <span className={`px-2 py-0.5 text-xs rounded-full ${stat.status === "good" ? "bg-green-100 text-green-800" :
                                    stat.status === "warning" ? "bg-yellow-100 text-yellow-800" :
                                        "bg-amber-100 text-amber-800"
                                    }`}>
                                    {stat.percentage}%
                                </span>
                            </div>
                        </div>
                        <div className="h-2 w-full bg-gray-100 rounded-full overflow-hidden">
                            <div
                                className={`h-full ${getStatusColor(stat.status)}`}
                                style={{ width: `${Math.min(stat.percentage, 100)}%` }}
                            ></div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default DStatsSummaryCard; 