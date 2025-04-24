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
    title: "Arabian Hummus",
    description:
      "A rich and hearty Italian favorite with layers of pasta, meat sauce, and cheeses.",
    imageUrl:
      "https://feelgoodfoodie.net/wp-content/uploads/2018/06/Authentic-Lebanese-Hummus-08.jpg",
    totalTime: "1 hour 45 minutes",
    prepTime: "30 minutes",
    pricePerPortion: "$3.50",
  };

  // Hardcoded ingredients for lasagna
  const ingredients = [
    {
      id: 1,
      name: "Chickpeas",
      amount: "1 lb (450g)",
      price: "$4.99",
      imageUrl:
        "https://shop.natcofoods.com/cdn/shop/products/L3158_CHICK_PEAS_1KG_M_-_Copy_075a5fc9-33ef-4506-9f17-978d7212ea65.jpg?v=1590426501",
      isHealthy: true,
    },
    {
      id: 2,
      name: "Tahini",
      amount: "400ml",
      price: "$6.49",
      imageUrl: "https://m.media-amazon.com/images/I/61LyaRAmbyL.jpg",
      isHealthy: false,
    },
    {
      id: 3,
      name: "Lemon Juice",
      amount: "200ml",
      price: "$3.99",
      imageUrl:
        "https://i5.walmartimages.com/seo/ReaLemon-100-Juice-Lemon-15-fl-oz-1-Count_24640bb3-98de-4107-9543-5147e26ae1ff.58b5e44b6cd223ecdc49f7a6e865cb99.jpeg",
      isHealthy: true,
    },
    {
      id: 4,
      name: "Garlic",
      amount: "450g",
      price: "$4.29",
      imageUrl:
        "https://www.purveyd.com/cdn/shop/products/PEELED-GARLIC-5LB-JAR_600x.jpg?v=1651944718",
      isHealthy: true,
    },
    {
      id: 5,
      name: "Extra Virgin Olive Oil",
      amount: "1/2 cup",
      price: "$13.79",
      imageUrl: "https://i.ebayimg.com/images/g/1YsAAOSw0I9faNPa/s-l1200.jpg",
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
      <Footer />
    </div>
  );
};

export default Recipe;
