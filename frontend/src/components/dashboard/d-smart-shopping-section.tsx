import React, { useState } from "react";
import DButton from "./d-button";

interface BudgetData {
    monthlyBudget: number;
    currentSpent: number;
    previousMonthSpent: number;
    savingsThisMonth: number;
    categoryBreakdown: {
        category: string;
        amount: number;
        percentage: number;
        previousMonth: number;
    }[];
    expensiveItems: {
        name: string;
        price: number;
        sustainable: boolean;
        alternatives: string[];
    }[];
    smartSavings: {
        tip: string;
        potentialSavings: number;
    }[];
}

interface DSmartShoppingSectionProps {
    budgetData: BudgetData;
}

const DSmartShoppingSection: React.FC<DSmartShoppingSectionProps> = ({
    budgetData,
}) => {
    const [view, setView] = useState<"spending" | "savings" | "recommendations">("spending");

    return (
        <div className="space-y-6">
            {/* Smart Shopping Navigation */}
            <div className="flex justify-center mb-4">
                <div className="bg-white rounded-lg shadow-sm p-1 inline-flex">
                    <DButton
                        label="Spending Breakdown"
                        color="pink"
                        active={view === "spending"}
                        onClick={() => setView("spending")}
                        size="sm"
                    />
                    <DButton
                        label="Saving Opportunities"
                        color="pink"
                        active={view === "savings"}
                        onClick={() => setView("savings")}
                        size="sm"
                    />
                    <DButton
                        label="Recommendations"
                        color="pink"
                        active={view === "recommendations"}
                        onClick={() => setView("recommendations")}
                        size="sm"
                    />
                </div>
            </div>

            {view === "spending" && (
                <>
                    {/* Budget Overview */}
                    <div className="bg-white p-4 rounded-lg shadow">
                        <div className="flex justify-between items-center mb-4">
                            <h3 className="text-lg font-semibold">
                                Monthly Grocery Budget
                            </h3>
                            <span className="text-xs px-2 py-1 bg-green-100 text-green-800 rounded-full">
                                ↓ -20% from last month
                            </span>
                        </div>

                        <div className="flex items-center mb-3">
                            <div className="w-16 h-16 rounded-full bg-pink-100 text-pink-600 flex items-center justify-center text-xl font-bold mr-4">
                                {Math.round(
                                    (budgetData.currentSpent /
                                        budgetData.monthlyBudget) *
                                    100,
                                )}
                                %
                            </div>
                            <div className="flex-1">
                                <div className="flex justify-between text-sm mb-1">
                                    <span className="text-gray-500">Spent so far</span>
                                    <span className="font-medium">
                                        €{budgetData.currentSpent}
                                    </span>
                                </div>
                                <div className="w-full h-3 bg-gray-200 rounded-full">
                                    <div
                                        className="h-full bg-pink-500 rounded-full"
                                        style={{
                                            width: `${(budgetData.currentSpent / budgetData.monthlyBudget) * 100}%`,
                                        }}
                                    ></div>
                                </div>
                                <div className="flex justify-between text-sm mt-1">
                                    <span className="font-medium text-green-600">
                                        €
                                        {budgetData.monthlyBudget -
                                            budgetData.currentSpent}{" "}
                                        remaining
                                    </span>
                                    <span className="text-gray-500">
                                        Budget: €{budgetData.monthlyBudget}
                                    </span>
                                </div>
                            </div>
                        </div>

                        <div className="pt-4 border-t border-gray-100">
                            <h4 className="text-sm font-medium mb-3">
                                Spending by Category
                            </h4>

                            <div className="space-y-3">
                                {budgetData.categoryBreakdown.map(
                                    (category, index) => (
                                        <div key={index}>
                                            <div className="flex justify-between text-sm mb-1">
                                                <span>{category.category}</span>
                                                <div>
                                                    <span className="font-medium">
                                                        €{category.amount}
                                                    </span>
                                                    <span className="text-xs text-gray-500 ml-1">
                                                        ({category.percentage}%)
                                                    </span>
                                                </div>
                                            </div>
                                            <div className="flex items-center">
                                                <div className="flex-1">
                                                    <div className="w-full h-2 bg-gray-200 rounded-full">
                                                        <div
                                                            className={`h-full rounded-full ${index === 0
                                                                ? "bg-red-500"
                                                                : index === 1
                                                                    ? "bg-green-500"
                                                                    : index === 2
                                                                        ? "bg-yellow-500"
                                                                        : "bg-blue-500"
                                                                }`}
                                                            style={{ width: `${category.percentage}%` }}
                                                        ></div>
                                                    </div>
                                                </div>
                                                <div className="ml-3 w-16 text-xs">
                                                    {category.amount > category.previousMonth ? (
                                                        <span className="text-red-500">
                                                            ↑ +€
                                                            {(
                                                                category.amount - category.previousMonth
                                                            ).toFixed(0)}
                                                        </span>
                                                    ) : (
                                                        <span className="text-green-500">
                                                            ↓ -€
                                                            {(
                                                                category.previousMonth - category.amount
                                                            ).toFixed(0)}
                                                        </span>
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                    ),
                                )}
                            </div>
                        </div>
                    </div>

                    {/* Highest Expense Items */}
                    <div className="bg-white p-4 rounded-lg shadow">
                        <h3 className="text-lg font-semibold mb-3">
                            Highest Expense Items
                        </h3>
                        <div className="space-y-3">
                            {budgetData.expensiveItems.map((item, index) => (
                                <div
                                    key={index}
                                    className="p-3 border border-gray-200 rounded-lg"
                                >
                                    <div className="flex justify-between items-start">
                                        <div>
                                            <h4 className="font-medium">{item.name}</h4>
                                            <div className="mt-1 flex items-center">
                                                <span className="text-gray-500 text-sm mr-2">
                                                    €{item.price}
                                                </span>
                                                {item.sustainable ? (
                                                    <span className="px-1 py-0.5 text-xs bg-green-100 text-green-800 rounded-full">
                                                        Sustainable
                                                    </span>
                                                ) : (
                                                    <span className="px-2 py-0.5 text-xs bg-amber-100 text-amber-800 rounded-full">
                                                        High Impact
                                                    </span>
                                                )}
                                            </div>
                                        </div>
                                        {item.alternatives.length > 0 && (
                                            <button className="text-pink-600 text-xs hover:text-pink-700">
                                                View Alternatives
                                            </button>
                                        )}
                                    </div>
                                    {item.alternatives.length > 0 && (
                                        <div className="mt-2 pt-2 border-t border-gray-100">
                                            <div className="text-xs text-gray-500">
                                                Try instead:
                                            </div>
                                            <div className="flex flex-wrap gap-1 mt-1">
                                                {item.alternatives.map((alt, i) => (
                                                    <span
                                                        key={i}
                                                        className="px-2 py-0.5 text-xs bg-gray-100 text-gray-800 rounded-full"
                                                    >
                                                        {alt}
                                                    </span>
                                                ))}
                                            </div>
                                        </div>
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>
                </>
            )}

            {view === "savings" && (
                <div className="bg-white p-4 rounded-lg shadow">
                    <div className="text-center mb-6">
                        <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-pink-100 text-pink-600 mb-2">
                            <span className="text-2xl font-bold">
                                €{budgetData.savingsThisMonth}
                            </span>
                        </div>
                        <h3 className="text-lg font-semibold">
                            You've saved this month!
                        </h3>
                        <p className="text-sm text-gray-500 mt-1">
                            Compared to your previous monthly average
                        </p>
                    </div>

                    <div className="space-y-4">
                        <h4 className="font-medium border-b pb-2">
                            Smart Saving Opportunities
                        </h4>

                        {budgetData.smartSavings.map((saving, index) => (
                            <div
                                key={index}
                                className="flex justify-between items-center p-3 hover:bg-gray-50 transition rounded-lg"
                            >
                                <div className="flex items-center">
                                    <div className="w-8 h-8 rounded-full bg-green-100 text-green-600 flex items-center justify-center mr-3">
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            className="h-4 w-4"
                                            viewBox="0 0 20 20"
                                            fill="currentColor"
                                        >
                                            <path
                                                fillRule="evenodd"
                                                d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                                                clipRule="evenodd"
                                            />
                                        </svg>
                                    </div>
                                    <span>{saving.tip}</span>
                                </div>
                                <div className="text-right">
                                    <div className="font-medium text-green-600">
                                        €{saving.potentialSavings}
                                    </div>
                                    <div className="text-xs text-gray-500">
                                        potential monthly savings
                                    </div>
                                </div>
                            </div>
                        ))}

                        <div className="border-t pt-4 mt-4">
                            <h4 className="font-medium mb-3">Seasonal Price Drops</h4>
                            <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                                <div className="p-2 bg-green-50 border border-green-100 rounded-md text-center">
                                    <div className="text-sm font-medium">Strawberries</div>
                                    <div className="text-xs text-green-600">
                                        ↓ 30% cheaper now
                                    </div>
                                </div>
                                <div className="p-2 bg-green-50 border border-green-100 rounded-md text-center">
                                    <div className="text-sm font-medium">Asparagus</div>
                                    <div className="text-xs text-green-600">
                                        ↓ 25% cheaper now
                                    </div>
                                </div>
                                <div className="p-2 bg-green-50 border border-green-100 rounded-md text-center">
                                    <div className="text-sm font-medium">Spring Greens</div>
                                    <div className="text-xs text-green-600">
                                        ↓ 20% cheaper now
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {view === "recommendations" && (
                <div className="bg-white p-4 rounded-lg shadow">
                    <h3 className="text-lg font-semibold mb-4">
                        Smart Shopping Recommendations
                    </h3>

                    <div className="space-y-4">
                        <div className="p-3 border border-gray-200 rounded-lg">
                            <div className="flex items-start">
                                <div className="p-2 bg-pink-100 text-pink-600 rounded-md mr-3">
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        className="h-5 w-5"
                                        viewBox="0 0 20 20"
                                        fill="currentColor"
                                    >
                                        <path d="M2 10a8 8 0 018-8v8h8a8 8 0 11-16 0z" />
                                        <path d="M12 2.252A8.014 8.014 0 0117.748 8H12V2.252z" />
                                    </svg>
                                </div>
                                <div>
                                    <h4 className="font-medium">Weekly Meal Planning</h4>
                                    <p className="text-sm text-gray-600 mt-1">
                                        Plan your meals in advance to avoid impulse purchases
                                        and reduce food waste.
                                    </p>
                                </div>
                            </div>
                            <div className="mt-3 text-right">
                                <DButton
                                    label="Create Meal Plan"
                                    color="pink"
                                    size="sm"
                                />
                            </div>
                        </div>

                        <div className="p-3 border border-gray-200 rounded-lg">
                            <div className="flex items-start">
                                <div className="p-2 bg-green-100 text-green-600 rounded-md mr-3">
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        className="h-5 w-5"
                                        viewBox="0 0 20 20"
                                        fill="currentColor"
                                    >
                                        <path
                                            fillRule="evenodd"
                                            d="M5 2a1 1 0 011 1v1h1a1 1 0 010 2H6v1a1 1 0 01-2 0V6H3a1 1 0 010-2h1V3a1 1 0 011-1zm0 10a1 1 0 011 1v1h1a1 1 0 110 2H6v1a1 1 0 11-2 0v-1H3a1 1 0 110-2h1v-1a1 1 0 011-1zm7-10a1 1 0 01.707.293l.707.707L15 3.414 16.586 5l-.708.707-1.586 1.586-.707.707a1 1 0 01-1.414-1.414l.707-.707L14.586 4l-.707-.707-.707-.707A1 1 0 0112 2zm.707 10.293a1 1 0 010 1.414l-.707.707 1.586 1.586.708.707a1 1 0 01-1.414 1.414l-.707-.707-1.586-1.586-.707-.707a1 1 0 111.414-1.414l.707.707 1.586-1.586.707-.707z"
                                            clipRule="evenodd"
                                        />
                                    </svg>
                                </div>
                                <div>
                                    <h4 className="font-medium">Seasonal Produce Guide</h4>
                                    <p className="text-sm text-gray-600 mt-1">
                                        Currently in season: asparagus, strawberries, and
                                        spring greens.
                                    </p>
                                </div>
                            </div>
                            <div className="mt-3 grid grid-cols-3 gap-2">
                                <div className="bg-green-50 p-2 rounded-md text-center">
                                    <div className="text-sm font-medium">Asparagus</div>
                                    <div className="text-xs text-green-600">
                                        €2.50/bunch
                                    </div>
                                </div>
                                <div className="bg-green-50 p-2 rounded-md text-center">
                                    <div className="text-sm font-medium">Strawberries</div>
                                    <div className="text-xs text-green-600">€3.20/kg</div>
                                </div>
                                <div className="bg-green-50 p-2 rounded-md text-center">
                                    <div className="text-sm font-medium">Spring Greens</div>
                                    <div className="text-xs text-green-600">
                                        €1.80/bunch
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="p-3 border border-gray-200 rounded-lg">
                            <div className="flex items-start">
                                <div className="p-2 bg-blue-100 text-blue-600 rounded-md mr-3">
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        className="h-5 w-5"
                                        viewBox="0 0 20 20"
                                        fill="currentColor"
                                    >
                                        <path d="M8.433 7.418c.155-.103.346-.196.567-.267v1.698a2.305 2.305 0 01-.567-.267C8.07 8.34 8 8.114 8 8c0-.114.07-.34.433-.582zM11 12.849v-1.698c.22.071.412.164.567.267.364.243.433.468.433.582 0 .114-.07.34-.433.582a2.305 2.305 0 01-.567.267z" />
                                        <path
                                            fillRule="evenodd"
                                            d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-13a1 1 0 10-2 0v.092a4.535 4.535 0 00-1.676.662C6.602 6.234 6 7.009 6 8c0 .99.602 1.765 1.324 2.246.48.32 1.054.545 1.676.662v1.941c-.391-.127-.68-.317-.843-.504a1 1 0 10-1.51 1.31c.562.649 1.413 1.076 2.353 1.253V15a1 1 0 102 0v-.092a4.535 4.535 0 001.676-.662C13.398 13.766 14 12.991 14 12c0-.99-.602-1.765-1.324-2.246A4.535 4.535 0 0011 9.092V7.151c.391.127.68.317.843.504a1 1 0 101.511-1.31c-.563-.649-1.413-1.076-2.354-1.253V5z"
                                            clipRule="evenodd"
                                        />
                                    </svg>
                                </div>
                                <div>
                                    <h4 className="font-medium">
                                        Budget-Friendly Protein Sources
                                    </h4>
                                    <p className="text-sm text-gray-600 mt-1">
                                        Try these cost-effective and nutritious options:
                                    </p>
                                </div>
                            </div>
                            <div className="mt-3 space-y-2">
                                <div className="flex justify-between items-center p-2 bg-gray-50 rounded-md">
                                    <div className="flex items-center">
                                        <span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span>
                                        <span>Lentils (dried)</span>
                                    </div>
                                    <div className="text-sm">
                                        <span className="font-medium">€1.95/kg</span>
                                        <span className="text-xs text-green-600 ml-1">
                                            -30%
                                        </span>
                                    </div>
                                </div>
                                <div className="flex justify-between items-center p-2 bg-gray-50 rounded-md">
                                    <div className="flex items-center">
                                        <span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span>
                                        <span>Chickpeas (canned)</span>
                                    </div>
                                    <div className="text-sm">
                                        <span className="font-medium">€0.85/can</span>
                                    </div>
                                </div>
                                <div className="flex justify-between items-center p-2 bg-gray-50 rounded-md">
                                    <div className="flex items-center">
                                        <span className="w-2 h-2 bg-yellow-500 rounded-full mr-2"></span>
                                        <span>Eggs (free-range)</span>
                                    </div>
                                    <div className="text-sm">
                                        <span className="font-medium">€2.50/dozen</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <DButton
                        label="Generate Smart Shopping List"
                        color="pink"
                        fullWidth
                        icon={
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-4 w-4"
                                viewBox="0 0 20 20"
                                fill="currentColor"
                            >
                                <path d="M3 1a1 1 0 000 2h1.22l.305 1.222a.997.997 0 00.01.042l1.358 5.43-.893.892C3.74 11.846 4.632 14 6.414 14H15a1 1 0 000-2H6.414l1-1H14a1 1 0 00.894-.553l3-6A1 1 0 0017 3H6.28l-.31-1.243A1 1 0 005 1H3zM16 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM6.5 18a1.5 1.5 0 100-3 1.5 1.5 0 000 3z" />
                            </svg>
                        }
                    />
                </div>
            )}
        </div>
    );
};

export default DSmartShoppingSection; 