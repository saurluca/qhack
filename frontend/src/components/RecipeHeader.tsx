import { Clock, DollarSign } from "lucide-react";

interface RecipeHeaderProps {
  title: string;
  description: string;
  imageUrl: string;
  totalTime: string;
  prepTime: string;
  pricePerPortion: string;
}

const RecipeHeader = ({
  title,
  description,
  imageUrl,
  totalTime,
  prepTime,
  pricePerPortion,
}: RecipeHeaderProps) => {
  return (
    <div className="bg-white rounded-lg shadow-sm overflow-hidden">
      <div className="relative w-full h-64">
        <img
          src={imageUrl}
          alt={title}
          className="w-full h-full object-cover"
        />
      </div>
      <div className="p-4">
        <h1 className="text-2xl font-bold">{title}</h1>
        <p className="mt-1 text-gray-600">{description}</p>

        <div className="flex flex-wrap gap-4 mt-4">
          <div className="flex items-center gap-1">
            <Clock className="w-4 h-4 text-gray-500" />
            <span className="text-sm">
              <span className="font-medium">Total time:</span> {totalTime}
            </span>
          </div>
          <div className="flex items-center gap-1">
            <Clock className="w-4 h-4 text-gray-500" />
            <span className="text-sm">
              <span className="font-medium">Prep time:</span> {prepTime}
            </span>
          </div>
          <div className="flex items-center gap-1">
            <DollarSign className="w-4 h-4 text-gray-500" />
            <span className="text-sm">
              <span className="font-medium">Price per portion:</span>{" "}
              {pricePerPortion}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RecipeHeader;
