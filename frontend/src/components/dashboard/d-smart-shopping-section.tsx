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
    return (
        <div className="space-y-6">
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
        </div>
    );
};

export default DSmartShoppingSection; 