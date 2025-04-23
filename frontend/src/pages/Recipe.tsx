// Picture of recipe at the top
// Name of recipe
// sub title - descirption
// time total, time preparing, price per poriton


// Main content:
// List of ingredients, this is a seperate compoentn
// Picutee of ingredient on left, title, amount and price, swap button on right (faked)
// some items have a green leave icon on the top right, as they are parituclarly good for you

// the whole list i scrollable

import RecipeHeader from '../components/RecipeHeader';
import IngredientsList from '../components/IngredientsList';
import Footer from '../components/Footer';

const Recipe = () => {
    // Hardcoded lasagna recipe data
    const recipeData = {
        title: "Classic Beef Lasagna",
        description: "A rich and hearty Italian favorite with layers of pasta, meat sauce, and cheeses.",
        imageUrl: "https://images.unsplash.com/photo-1574894709920-11b28e7367e3?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1935&q=80",
        totalTime: "1 hour 45 minutes",
        prepTime: "30 minutes",
        pricePerPortion: "$3.50",
    };

    // Hardcoded ingredients for lasagna
    const ingredients = [
        {
            id: 1,
            name: "Ground Beef",
            amount: "1 lb (450g)",
            price: "$4.99",
            imageUrl: "https://images.unsplash.com/photo-1588168333986-5078d3ae3976?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80",
            isHealthy: false,
        },
        {
            id: 2,
            name: "Lasagna Noodles",
            amount: "12 sheets",
            price: "$2.49",
            imageUrl: "https://images.unsplash.com/photo-1625944525533-473f1a3d54e7?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80",
            isHealthy: false,
        },
        {
            id: 3,
            name: "Ricotta Cheese",
            amount: "15 oz (425g)",
            price: "$3.99",
            imageUrl: "https://images.unsplash.com/photo-1634487359989-3e90c9432133?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80",
            isHealthy: false,
        },
        {
            id: 4,
            name: "Mozzarella Cheese",
            amount: "16 oz (450g), shredded",
            price: "$4.29",
            imageUrl: "https://images.unsplash.com/photo-1589881133825-bbb3b9471b1b?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80",
            isHealthy: false,
        },
        {
            id: 5,
            name: "Parmesan Cheese",
            amount: "1/2 cup, grated",
            price: "$3.79",
            imageUrl: "https://images.unsplash.com/photo-1528747045269-390fe33c19f2?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80",
            isHealthy: false,
        },
        {
            id: 6,
            name: "Tomato Sauce",
            amount: "24 oz (680g)",
            price: "$2.99",
            imageUrl: "https://images.unsplash.com/photo-1472476443507-c7a5948772fc?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80",
            isHealthy: true,
        },
        {
            id: 7,
            name: "Onion",
            amount: "1 medium",
            price: "$0.79",
            imageUrl: "https://images.unsplash.com/photo-1518977676601-b53f82aba655?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80",
            isHealthy: true,
        },
        {
            id: 8,
            name: "Garlic",
            amount: "3 cloves",
            price: "$0.50",
            imageUrl: "https://images.unsplash.com/photo-1540148426945-6cf22a6b2383?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80",
            isHealthy: true,
        },
        {
            id: 9,
            name: "Italian Seasoning",
            amount: "2 tbsp",
            price: "$1.99",
            imageUrl: "https://images.unsplash.com/photo-1532336414038-cf19250c5757?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80",
            isHealthy: false,
        },
        {
            id: 10,
            name: "Fresh Basil",
            amount: "1/4 cup",
            price: "$1.49",
            imageUrl: "https://images.unsplash.com/photo-1600692085449-9fa576a0b2bc?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80",
            isHealthy: true,
        }
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
