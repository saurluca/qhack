import { Leaf } from 'lucide-react';

interface IngredientCardProps {
    name: string;
    amount: string;
    price: string;
    imageUrl: string;
    isHealthy?: boolean;
}

const IngredientCard = ({ name, amount, price, imageUrl, isHealthy = false }: IngredientCardProps) => {
    return (
        <div className="flex items-center justify-between p-3 border-b border-gray-200">
            <div className="flex items-center gap-3">
                <div className="relative w-16 h-16 overflow-hidden rounded-md">
                    <img src={imageUrl} alt={name} className="object-cover w-full h-full" />
                    {isHealthy && (
                        <div className="absolute top-0 right-0 p-0.5 bg-green-500 rounded-bl-md">
                            <Leaf className="w-4 h-4 text-green-100" />
                        </div>
                    )}
                </div>
                <div>
                    <h3 className="font-medium">{name}</h3>
                    <p className="text-sm text-gray-600">{amount}</p>
                    <p className="text-sm font-medium">{price}</p>
                </div>
            </div>
            <button className="px-3 py-1 text-sm bg-blue-100 rounded-md text-blue-600">
                <img src="/Icons/Replace.svg" alt="Replace" className="w-4 h-4" />
            </button>
        </div>
    );
};

export default IngredientCard; 