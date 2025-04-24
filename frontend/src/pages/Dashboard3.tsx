import React, { useState } from "react";
import Footer from "../components/Footer";
import DTabNavigation from "../components/dashboard/d-tab-navigation";
import DNutritionalSection from "../components/dashboard/d-nutritional-section";
import DSustainabilitySection from "../components/dashboard/d-sustainability-section";
import DSmartShoppingSection from "../components/dashboard/d-smart-shopping-section";

// Mock data - in a real implementation, this would come from your backend API
const mockNutritionData = {
  weeklyAverage: {
    calories: 2100,
    protein: 75,
    carbs: 240,
    fat: 60,
    fiber: 28,
  },
  recommended: {
    calories: 2000,
    protein: 50,
    carbs: 275,
    fat: 70,
    fiber: 25,
  },
  monthlyStats: {
    protein: {
      current: 150,
      goal: 200,
      topSources: ["lentils", "eggs", "tofu"],
      comparison: "+20g",
      achievement: "Protein Explorer",
      achievementWeeks: 2,
    },
  },
  dailyTrack: [
    { day: "Mon", calories: 1950, carbonFootprint: 4.2 },
    { day: "Tue", calories: 2200, carbonFootprint: 5.1 },
    { day: "Wed", calories: 1850, carbonFootprint: 3.5 },
    { day: "Thu", calories: 2300, carbonFootprint: 6.2 },
    { day: "Fri", calories: 2100, carbonFootprint: 4.8 },
    { day: "Sat", calories: 2500, carbonFootprint: 7.1 },
    { day: "Sun", calories: 1800, carbonFootprint: 3.2 },
  ],
};

const mockCarbonData = {
  weeklyTotal: 34.1, // kg CO2
  weeklyAverage: 4.9, // kg CO2 per day
  sustainableTarget: 3.0, // kg CO2 per day
  topContributors: [
    { name: "Beef", amount: "500g", impact: 7.2 },
    { name: "Dairy", amount: "1.5L milk, 200g cheese", impact: 4.8 },
    { name: "Imported Produce", amount: "1kg", impact: 3.5 },
  ],
  savings: 12.5, // kg CO2 saved this month
};

const mockRecentRecipes = [
  {
    name: "Vegetarian Falafel Bowl",
    calories: 550,
    carbon: 1.2,
    type: "vegetarian",
  },
  { name: "Chicken Curry", calories: 620, carbon: 3.8, type: "non-vegetarian" },
  {
    name: "Mediterranean Salad",
    calories: 320,
    carbon: 0.9,
    type: "vegetarian",
  },
];

// New mock data for budget tracking
const mockBudgetData = {
  monthlyBudget: 450,
  currentSpent: 325,
  previousMonthSpent: 410,
  savingsThisMonth: 85,
  categoryBreakdown: [
    {
      category: "Meat & Fish",
      amount: 120,
      percentage: 37,
      previousMonth: 145,
    },
    {
      category: "Fruits & Vegetables",
      amount: 95,
      percentage: 29,
      previousMonth: 85,
    },
    { category: "Dairy & Eggs", amount: 65, percentage: 20, previousMonth: 70 },
    { category: "Pantry Items", amount: 45, percentage: 14, previousMonth: 60 },
  ],
  expensiveItems: [
    {
      name: "Premium Beef Steak",
      price: 22.95,
      sustainable: false,
      alternatives: ["Chicken Breast", "Plant-based Meat"],
    },
    {
      name: "Imported Cheese Selection",
      price: 18.5,
      sustainable: false,
      alternatives: ["Local Cheeses", "Plant-based Cheese"],
    },
    {
      name: "Wild-caught Salmon",
      price: 16.75,
      sustainable: true,
      alternatives: [],
    },
  ],
  smartSavings: [
    { tip: "Switch to seasonal produce", potentialSavings: 25 },
    { tip: "Buy pantry staples in bulk", potentialSavings: 15 },
    { tip: "Replace one meat meal with plant-based", potentialSavings: 20 },
  ],
};

const Dashboard: React.FC = () => {
  const [mainTab, setMainTab] = useState<
    "sustainability" | "nutrition" | "budget"
  >("nutrition");

  const mainTabOptions = [
    { id: "sustainability", label: "Sustainability", color: "green" as const },
    { id: "nutrition", label: "Nutrition", color: "yellow" as const },
    { id: "budget", label: "Budget", color: "pink" as const },
  ];

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col pb-16 md:pb-0">
      <main className="container mx-auto px-4 py-6 flex-grow">
        {/* Delivery Time Banner */}
        <div className="flex justify-between items-center mb-5 text-green-600">
          <span className="font-medium">Choose your delivery time &gt;</span>
          <div className="w-8 h-8 bg-gray-200 rounded-full overflow-hidden flex items-center justify-center">
            <img
              src="/dashboard.png"
              alt="Dashboard Icon"
              className="h-5 w-5 text-gray-500"
            />
          </div>
        </div>

        {/* Monthly Stats Title with Trophy Icon */}
        <h1 className="text-2xl font-bold text-gray-800 mb-4 flex items-center">
          Your stats
          <span className="ml-2 text-amber-500">🏆</span>
        </h1>

        {/* Illustration */}
        <div className="flex justify-center mb-6">
          <img
            src="/dashboard.png"
            alt="Happy shopper with groceries"
            className="h-60 w-auto"
          />
        </div>

        {/* Main Tab Navigation */}
        <DTabNavigation
          options={mainTabOptions}
          activeTab={mainTab}
          onTabChange={(tabId) => setMainTab(tabId as typeof mainTab)}
          centered={true}
        />

        {/* Content based on selected main tab */}
        {mainTab === "nutrition" && (
          <DNutritionalSection
            nutritionData={mockNutritionData}
            recentRecipes={mockRecentRecipes}
          />
        )}

        {mainTab === "sustainability" && (
          <DSustainabilitySection carbonData={mockCarbonData} />
        )}

        {mainTab === "budget" && (
          <DSmartShoppingSection budgetData={mockBudgetData} />
        )}
      </main>
      <Footer />
    </div>
  );
};

export default Dashboard;

