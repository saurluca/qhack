import React from "react";

interface RecipeData {
    name: string;
    calories: number;
    carbon: number;
    type: string;
}

interface DRecipeItemProps {
    recipe: RecipeData;
}

const DRecipeItem: React.FC<DRecipeItemProps> = ({ recipe }) => {
    return (
        <div className="p-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition cursor-pointer">
            <div className="flex justify-between">
                <div>
                    <h4 className="font-medium">{recipe.name}</h4>
                    <span
                        className={`inline-block px-2 py-0.5 text-xs rounded-full mt-1 ${recipe.type === "vegetarian"
                            ? "bg-green-100 text-green-800"
                            : "bg-orange-100 text-orange-800"
                            }`}
                    >
                        {recipe.type}
                    </span>
                </div>
                <div className="text-right">
                    <div className="text-sm text-gray-500">{recipe.calories} kcal</div>
                    <div className="text-sm text-gray-500">{recipe.carbon} kg CO₂</div>
                </div>
            </div>
        </div>
    );
};

export default DRecipeItem; 