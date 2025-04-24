// Picture of recipe at the top
// Name of recipe
// sub title - descirption
// time total, time preparing, price per poriton

// Main content:
// List of ingredients, this is a seperate compoentn
// Picutee of ingredient on left, title, amount and price, swap button on right (faked)
// some items have a green leave icon on the top right, as they are parituclarly good for you

// the whole list i scrollable

import RecipeHeader from "../components/RecipeHeader";
import IngredientsList from "../components/IngredientsList";
import Footer from "../components/Footer";

const Recipe = () => {
  // Hardcoded lasagna recipe data
  const recipeData = {
    title: "Banana Bread",
    description: "Quick to whip up with only a handful of pantry ingredients",
    imageUrl:
      "https://preppykitchen.com/wp-content/uploads/2019/10/Chocolate-Chip-Banana-Bread-Recipe.jpg",
    totalTime: "45 minutes",
    prepTime: "15 minutes",
    pricePerPortion: "$3.50",
  };

  // Hardcoded ingredients for lasagna
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
    },
    {
      id: 5,
      name: "Butter",
      amount: "1/2 cup",
      price: "$13.79",
      imageUrl:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR29a-eT_oIapG1WfVyn3aK_CEe_Y265uyfpw&s",
      isHealthy: false,
    },
  ];

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

      <IngredientsList ingredients={ingredients} />
      <button className="bg-second flex">Go to checkout</button>
      <Footer />
    </div>
  );
};

export default Recipe;
