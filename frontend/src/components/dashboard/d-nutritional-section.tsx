import React from "react";
import DButton from "./d-button";
import DRecipeItem from "./d-recipe-item";
import DStatsSummaryCard from "./d-stats-summary-card";
import { Calendar } from 'lucide-react';

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
    const calculatePercentage = (actual: number, recommended: number): number => {
        return Math.round((actual / recommended) * 100);
    };

    const determineStatus = (percentage: number): "good" | "warning" | "attention" => {
        if (percentage >= 85 && percentage <= 115) return "good";
        if ((percentage >= 70 && percentage < 85) || (percentage > 115 && percentage <= 130)) return "warning";
        return "attention";
    };

    // Prepare stats for the summary card
    const nutritionStats = Object.entries(nutritionData.weeklyAverage).map(([nutrient, value]) => {
        const recommended = nutritionData.recommended[nutrient];
        const percentage = calculatePercentage(value, recommended);
        return {
            title: nutrient,
            value: value,
            unit: nutrient === "calories" ? "kcal" : "g",
            target: recommended,
            percentage: percentage,
            status: determineStatus(percentage)
        };
    });

    return (
        <div className="space-y-6">
            <DStatsSummaryCard
                title="Nutritional Balance"
                stats={nutritionStats}
            />

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