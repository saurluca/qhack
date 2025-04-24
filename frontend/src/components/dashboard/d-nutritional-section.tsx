import React, { useState } from "react";
import DButton from "./d-button";
import DStatCard from "./d-stat-card";
import DRecipeItem from "./d-recipe-item";
import { Calendar, Grid2X2 } from 'lucide-react';
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
                        label="Plan Next Week"
                        color="yellow"
                        fullWidth
                        icon={
                            <Calendar className="h-4 w-4" />
                        }
                    />      
                </div>
            </div>
        </div>
    );
};

export default DNutritionalSection; 