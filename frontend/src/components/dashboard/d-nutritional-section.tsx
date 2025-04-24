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