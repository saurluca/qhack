import IngredientCard from './IngredientCard';

interface Ingredient {
    id: number;
    name: string;
    amount: string;
    price: string;
    imageUrl: string;
    isHealthy?: boolean;
}

interface IngredientsListProps {
    ingredients: Ingredient[];
}

const IngredientsList = ({ ingredients }: IngredientsListProps) => {
    return (
        <div className="overflow-y-auto max-h-[60vh] bg-white rounded-lg shadow-sm">
            <h2 className="p-4 text-lg font-semibold border-b border-gray-200">Ingredients</h2>
            <div className="divide-y divide-gray-100">
                {ingredients.map((ingredient) => (
                    <IngredientCard
                        key={ingredient.id}
                        name={ingredient.name}
                        amount={ingredient.amount}
                        price={ingredient.price}
                        imageUrl={ingredient.imageUrl}
                        isHealthy={ingredient.isHealthy}
                    />
                ))}
            </div>
        </div>
    );
};

export default IngredientsList; 