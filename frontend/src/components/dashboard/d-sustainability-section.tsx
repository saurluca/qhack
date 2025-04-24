import React from "react";
import DButton from "./d-button";

interface CarbonData {
    weeklyTotal: number;
    weeklyAverage: number;
    sustainableTarget: number;
    topContributors: {
        name: string;
        amount: string;
        impact: number;
    }[];
    savings: number;
}

interface DSustainabilitySectionProps {
    carbonData: CarbonData;
}

const DSustainabilitySection: React.FC<DSustainabilitySectionProps> = ({
    carbonData,
}) => {
    return (
        <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-white p-4 rounded-lg shadow">
                    <h3 className="text-lg font-semibold mb-3">Carbon Savings</h3>
                    <div className="flex items-center justify-center h-32">
                        <div className="text-center">
                            <div className="text-4xl font-bold text-green-500">
                                {carbonData.savings}
                            </div>
                            <div className="text-gray-500 mt-1">
                                kg CO₂ saved this month
                            </div>
                        </div>
                    </div>
                    <div className="mt-4 text-sm">
                        <div className="flex items-center mb-1">
                            <svg
                                className="w-4 h-4 mr-1 text-green-500"
                                fill="currentColor"
                                viewBox="0 0 20 20"
                            >
                                <path
                                    fillRule="evenodd"
                                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                    clipRule="evenodd"
                                />
                            </svg>
                            <span>Equivalent to planting 2 trees</span>
                        </div>
                        <div className="flex items-center">
                            <svg
                                className="w-4 h-4 mr-1 text-green-500"
                                fill="currentColor"
                                viewBox="0 0 20 20"
                            >
                                <path
                                    fillRule="evenodd"
                                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                    clipRule="evenodd"
                                />
                            </svg>
                            <span>Driving 50 km less in a car</span>
                        </div>
                    </div>
                    <DButton
                        label="Tips to reduce your footprint"
                        color="green"
                        fullWidth
                    />
                </div>

                <div className="bg-white p-4 rounded-lg shadow">
                    <h3 className="text-lg font-semibold mb-3">
                        Top Carbon Contributors
                    </h3>
                    <div className="space-y-3">
                        {carbonData.topContributors.map((item, index) => (
                            <div key={index} className="flex items-center">
                                <div
                                    className="w-1 h-12 mr-2"
                                    style={{
                                        backgroundColor:
                                            index === 0
                                                ? "#ef4444"
                                                : index === 1
                                                    ? "#f97316"
                                                    : "#eab308",
                                        width: `${3 + index}px`,
                                    }}
                                ></div>
                                <div className="flex-1">
                                    <div className="font-medium">{item.name}</div>
                                    <div className="text-xs text-gray-500">
                                        {item.amount}
                                    </div>
                                </div>
                                <div className="text-right">
                                    <div className="font-medium">{item.impact} kg CO₂</div>
                                    <div className="text-xs text-gray-500">
                                        {(
                                            (item.impact / carbonData.weeklyTotal) *
                                            100
                                        ).toFixed(0)}
                                        % of total
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Alternatives Button */}
                    <div className="mt-1">
                        <DButton
                            label="View Lower-Impact Alternatives"
                            color="green"
                            fullWidth
                            size="sm"
                        />
                    </div>
                </div>
                <div className="bg-white p-4 rounded-lg shadow">
                    <h3 className="text-lg font-semibold mb-3">
                        Carbon Footprint Breakdown
                    </h3>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        <div className="bg-gray-50 p-3 rounded-md">
                            <div className="text-sm font-medium">Meat & Dairy</div>
                            <div className="text-xl font-bold mt-1">52%</div>
                            <div className="text-sm text-gray-500">17.7 kg CO₂</div>
                            <div className="h-1 w-full bg-red-200 mt-2">
                                <div
                                    className="h-full bg-red-500"
                                    style={{ width: "52%" }}
                                ></div>
                            </div>
                        </div>
                        <div className="bg-gray-50 p-3 rounded-md">
                            <div className="text-sm font-medium">Processed Foods</div>
                            <div className="text-xl font-bold mt-1">24%</div>
                            <div className="text-sm text-gray-500">8.2 kg CO₂</div>
                            <div className="h-1 w-full bg-orange-200 mt-2">
                                <div
                                    className="h-full bg-orange-500"
                                    style={{ width: "24%" }}
                                ></div>
                            </div>
                        </div>
                        <div className="bg-gray-50 p-3 rounded-md">
                            <div className="text-sm font-medium">Produce</div>
                            <div className="text-xl font-bold mt-1">15%</div>
                            <div className="text-sm text-gray-500">5.1 kg CO₂</div>
                            <div className="h-1 w-full bg-green-200 mt-2">
                                <div
                                    className="h-full bg-green-500"
                                    style={{ width: "15%" }}
                                ></div>
                            </div>
                        </div>
                        <div className="bg-gray-50 p-3 rounded-md">
                            <div className="text-sm font-medium">Other</div>
                            <div className="text-xl font-bold mt-1">9%</div>
                            <div className="text-sm text-gray-500">3.1 kg CO₂</div>
                            <div className="h-1 w-full bg-blue-200 mt-2">
                                <div
                                    className="h-full bg-blue-500"
                                    style={{ width: "9%" }}
                                ></div>
                            </div>
                        </div>
                    </div>
                    <div className="mt-4">
                        <h4 className="font-medium mb-2">Eco Tips</h4>
                        <ul className="space-y-2 text-sm">
                            <li className="flex items-start">
                                <svg
                                    className="w-4 h-4 mt-0.5 mr-2 text-green-500"
                                    fill="currentColor"
                                    viewBox="0 0 20 20"
                                >
                                    <path
                                        fillRule="evenodd"
                                        d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                                        clipRule="evenodd"
                                    />
                                </svg>
                                <span>
                                    Try having 1-2 meat-free days each week to reduce your
                                    carbon impact by up to 30%
                                </span>
                            </li>
                            <li className="flex items-start">
                                <svg
                                    className="w-4 h-4 mt-0.5 mr-2 text-green-500"
                                    fill="currentColor"
                                    viewBox="0 0 20 20"
                                >
                                    <path
                                        fillRule="evenodd"
                                        d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                                        clipRule="evenodd"
                                    />
                                </svg>
                                <span>
                                    Choose local, seasonal produce to reduce transportation
                                    emissions
                                </span>
                            </li>
                            <li className="flex items-start">
                                <svg
                                    className="w-4 h-4 mt-0.5 mr-2 text-green-500"
                                    fill="currentColor"
                                    viewBox="0 0 20 20"
                                >
                                    <path
                                        fillRule="evenodd"
                                        d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                                        clipRule="evenodd"
                                    />
                                </svg>
                                <span>
                                    Reduce food waste by planning meals and using leftovers
                                    creatively
                                </span>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DSustainabilitySection; 