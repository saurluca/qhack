import React, { useState } from "react";
import DButton from "./d-button";
import DStatCard from "./d-stat-card";
import DRecipeItem from "./d-recipe-item";

interface NutritionData {
    weeklyAverage: {
        [key: string]: number;
    };
    recommended: {
        [key: string]: number;
    };
    monthlyStats: {
        protein: {
            current: number;
            goal: number;
            topSources: string[];
            comparison: string;
            achievement: string;
            achievementWeeks: number;
        };
    };
}

interface RecipeData {
    name: string;
    calories: number;
    carbon: number;
    type: string;
}

interface DNutritionalSectionProps {
    nutritionData: NutritionData;
    recentRecipes: RecipeData[];
}

const DNutritionalSection: React.FC<DNutritionalSectionProps> = ({
    nutritionData,
    recentRecipes,
}) => {
    const [view, setView] = useState<"weekly" | "monthly">("weekly");

    const getNutrientTip = (nutrient: string, percentage: number): string => {
        if (percentage < 80) {
            return `Increase ${nutrient} intake by adding more ${nutrient === "protein"
                ? "lean meats, beans, and nuts"
                : nutrient === "carbs"
                    ? "whole grains and fruits"
                    : nutrient === "fat"
                        ? "healthy oils and nuts"
                        : nutrient === "fiber"
                            ? "vegetables and whole grains"
                            : "nutritious foods"
                }.`;
        } else if (percentage > 120) {
            return `Reduce ${nutrient} consumption by limiting ${nutrient === "protein"
                ? "processed meats"
                : nutrient === "carbs"
                    ? "refined sugars"
                    : nutrient === "fat"
                        ? "fried foods"
                        : nutrient === "calories"
                            ? "portion sizes"
                            : "processed foods"
                }.`;
        }
        return "";
    };

    const calculatePercentage = (actual: number, recommended: number): number => {
        return Math.round((actual / recommended) * 100);
    };

    return (
        <div className="space-y-6">
            {/* Toggle between weekly and monthly view */}
            <div className="flex justify-end">
                <div className="bg-white rounded-lg shadow-sm p-1">
                    <DButton
                        label="Weekly"
                        color="yellow"
                        active={view === "weekly"}
                        onClick={() => setView("weekly")}
                        size="sm"
                    />
                    <DButton
                        label="Monthly"
                        color="yellow"
                        active={view === "monthly"}
                        onClick={() => setView("monthly")}
                        size="sm"
                    />
                </div>
            </div>

            {view === "weekly" ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
                    {Object.entries(nutritionData.weeklyAverage).map(([nutrient, value]) => {
                        const recommended = nutritionData.recommended[nutrient];
                        const percentage = calculatePercentage(value, recommended);
                        const tip = getNutrientTip(nutrient, percentage);

                        return (
                            <DStatCard
                                key={nutrient}
                                title={nutrient}
                                value={value}
                                unit={nutrient === "calories" ? "kcal" : "g"}
                                target={recommended}
                                tip={tip}
                            />
                        );
                    })}
                </div>
            ) : (
                <div className="flex flex-col md:flex-row gap-4">
                    {/* Left side: Protein circle chart */}
                    <div className="bg-white p-4 rounded-lg shadow flex-1">
                        <h3 className="text-gray-600 font-medium mb-2">
                            You're fueling like a pro!
                        </h3>
                        <div className="flex justify-center items-center h-40 relative">
                            {/* Circle chart */}
                            <div className="relative w-32 h-32">
                                {/* Background circle */}
                                <div className="absolute inset-0 rounded-full border-8 border-gray-100"></div>
                                {/* Progress circle */}
                                <div
                                    className="absolute inset-0 rounded-full border-8 border-yellow-300"
                                    style={{
                                        clipPath: `polygon(50% 50%, 50% 0%, ${50 + 50 * Math.cos(Math.PI * 0.75)
                                            }% ${50 - 50 * Math.sin(Math.PI * 0.75)}%, 50% 50%)`,
                                        transform: "rotate(0deg)",
                                    }}
                                ></div>
                                {/* Center text */}
                                <div className="absolute inset-0 flex items-center justify-center">
                                    <div className="text-center">
                                        <div className="text-lg font-semibold">
                                            {nutritionData.monthlyStats.protein.current}/{nutritionData.monthlyStats.protein.goal}g
                                        </div>
                                        <div className="text-sm text-gray-500">protein</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="mt-2 flex justify-center">
                            <DButton label="Nutrition Goal" color="yellow" />
                        </div>
                    </div>

                    {/* Right side: Top sources and details */}
                    <div className="bg-white p-4 rounded-lg shadow flex-1">
                        <div className="mb-4">
                            <h3 className="flex items-center text-gray-700 font-medium">
                                <span className="text-red-600 mr-1">🍂</span>
                                Top sources
                            </h3>
                            <ul className="mt-2 space-y-1 text-sm ml-4">
                                {nutritionData.monthlyStats.protein.topSources.map((source, index) => (
                                    <li key={index} className="flex items-baseline">
                                        <span className="mr-2">•</span>
                                        <span>{source}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        <div className="mb-4">
                            <h3 className="flex items-center text-gray-700 font-medium">
                                <span className="text-yellow-400 mr-1">⭐</span>
                                {nutritionData.monthlyStats.protein.achievement}
                            </h3>
                            <p className="mt-1 text-sm text-gray-600">
                                {nutritionData.monthlyStats.protein.achievementWeeks} weeks in a row
                            </p>
                        </div>

                        <div>
                            <h3 className="text-xl font-semibold text-green-500">
                                {nutritionData.monthlyStats.protein.comparison}
                            </h3>
                            <p className="text-sm text-gray-500">
                                compared to last week
                            </p>
                        </div>
                    </div>
                </div>
            )}

            <div className="bg-white p-4 rounded-lg shadow">
                <h3 className="text-lg font-semibold mb-3">Recent Meals</h3>
                <div className="space-y-3">
                    {recentRecipes.map((recipe, index) => (
                        <DRecipeItem key={index} recipe={recipe} />
                    ))}
                    <button className="text-yellow-600 hover:text-yellow-700 text-sm font-medium mt-2">
                        View all meals
                    </button>
                </div>

                {/* Meal Planning Button */}
                <div className="mt-4 flex">
                    <DButton
                        label="Plan Next Week's Meals"
                        color="yellow"
                        fullWidth
                        icon={
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-4 w-4"
                                viewBox="0 0 20 20"
                                fill="currentColor"
                            >
                                <path
                                    fillRule="evenodd"
                                    d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z"
                                    clipRule="evenodd"
                                />
                            </svg>
                        }
                    />
                    <div className="w-4"></div>
                    <DButton
                        label="View Recipe Collection"
                        color="green"
                        fullWidth
                        icon={
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-4 w-4"
                                viewBox="0 0 20 20"
                                fill="currentColor"
                            >
                                <path d="M5 3a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2V5a2 2 0 00-2-2H5zM5 11a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2v-2a2 2 0 00-2-2H5zM11 5a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V5zM11 13a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
                            </svg>
                        }
                    />
                </div>
            </div>
        </div>
    );
};

export default DNutritionalSection; 