import { useState } from "react";
import RecipeHeader from "../components/RecipeHeader";
import IngredientsList from "../components/IngredientsList";
import Footer from "../components/Footer";
import DButton from "../components/dashboard/d-button";

const Recipe = () => {
  const [showHealthyOnly, setShowHealthyOnly] = useState(false);

  const recipeData = {
    title: "Banana Bread",
    description: "Quick to whip up with only a handful of pantry ingredients",
    imageUrl:
      "https://preppykitchen.com/wp-content/uploads/2019/10/Chocolate-Chip-Banana-Bread-Recipe.jpg",
    totalTime: "45 minutes",
    prepTime: "15 minutes",
    pricePerPortion: "$3.50",
  };

  const ingredients = [
    {
      id: 1,
      name: "Bananas",
      amount: "3 Bananas",
      price: "$4.99",
      imageUrl:
        "https://cdn11.bigcommerce.com/s-kc25pb94dz/images/stencil/1280x1280/products/188/602/1-Bunch-Bananas__30199.1650549450.jpg?c=2",
      isHealthy: true,
    },
    {
      id: 2,
      name: "Flour",
      amount: "400g",
      price: "$6.49",
      imageUrl:
        "https://www.genesis-kitchen.com/wp-content/uploads/2020/10/soft-wheat-flour.jpg",
      isHealthy: true,
    },
    {
      id: 3,
      name: "Eggs",
      amount: "10",
      price: "$3.99",
      imageUrl:
        "https://i0.wp.com/poultrycartons.com/wp-content/uploads/2023/10/230901-Poultry-Cartons-055-2-scaled.jpg?fit=1350%2C1080&ssl=1",
      isHealthy: true,
    },
    {
      id: 4,
      name: "Sugar",
      amount: "450g",
      price: "$4.29",
      imageUrl:
        "https://images-na.ssl-images-amazon.com/images/I/41umHWPV+vL._UL500_.jpg",
      isHealthy: false,
      healthyAlternative: {
        name: "Organic Coconut Sugar",
        amount: "400g",
        price: "$7.99",
        imageUrl:
          "https://encrypted-tbn2.gstatic.com/shopping?q=tbn:ANd9GcQs6d8BHtKiPLtY285Rzhp3o7oZJ1LVJZ5MMj8dxG7N9YtSYsBs2cRoOpMvQmCO6Xrj8BEDGWq05bt-HdAaMhAdlC0ZE9VGA8oEimXPdf7jfmgEUlHLQel_",
        isHealthy: true,
      },
    },
    {
      id: 5,
      name: "Butter",
      amount: "1/2 cup",
      price: "$13.79",
      imageUrl:
        "https://m.media-amazon.com/images/I/71Lp7c4wXcL.jpg",
      isHealthy: false,
      healthyAlternative: {
        name: "Organic Coconut Oil",
        amount: "1/2 cup",
        price: "$9.49",
        imageUrl:
          "https://encrypted-tbn0.gstatic.com/shopping?q=tbn:ANd9GcQc3izfdKdPUSrUnX6cxVcUQlhHdccm0nFiAKe74fIzRoVPly0yi0Wbqre4-5K4WnG-tHoemBNtMkM2NUDXN59ZYlBeCC2M76LgjgFh9gJdR6enwKK5mii7gFs",
        isHealthy: true,
      },
    },
  ];

  const displayedIngredients = ingredients.map((ingredient) => {
    if (showHealthyOnly && !ingredient.isHealthy && ingredient.healthyAlternative) {
      return { ...ingredient.healthyAlternative, id: ingredient.id };
    }
    return ingredient;
  });

  return (
    <div className="max-w-2xl mx-auto p-4 space-y-6">
      <RecipeHeader
        title={recipeData.title}
        description={recipeData.description}
        imageUrl={recipeData.imageUrl}
        totalTime={recipeData.totalTime}
        prepTime={recipeData.prepTime}
        pricePerPortion={recipeData.pricePerPortion}
      />
      
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">Ingredients</h2>
        <label className="relative inline-flex items-center cursor-pointer">
          <input
            className="sr-only peer"
            type="checkbox"
            checked={showHealthyOnly}
            onChange={() => setShowHealthyOnly(!showHealthyOnly)}
          />
          <div
            className="w-20 h-10 rounded-full bg-gradient-to-r from-gray-300 to-green-300 peer-checked:from-green-400 peer-checked:to-green-600 transition-all duration-500 after:content-['🙐'] after:absolute after:top-1 after:left-1 after:bg-white after:rounded-full after:h-8 after:w-8 after:flex after:items-center after:justify-center after:transition-all after:duration-500 peer-checked:after:translate-x-10 peer-checked:after:content-['🌱'] after:shadow-md after:text-lg"
          ></div>
        </label>
      </div>

      <IngredientsList ingredients={displayedIngredients} />

      <DButton label="Go To Checkout" color="green" className="w-full" size="lg" />
      <Footer />
    </div>
  );
};

export default Recipe;