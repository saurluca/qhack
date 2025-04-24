import React, { useState, useEffect } from "react";
import Footer from "../components/Footer";

// TypeScript interfaces for component props
interface TabNavigationProps {
  activeTab: string;
  onChange: (tabId: string) => void;
}

interface StatCardProps {
  title: string;
  value: string;
  icon: React.ReactNode;
  bgColor: string;
  change?: string;
  period?: string;
  action?: string;
}

interface ProgressBarProps {
  value: number;
  max: number;
  label?: string;
  color: string;
  size?: 'sm' | 'md' | 'lg';
}

interface EcoScoreGaugeProps {
  score: number;
  target: number;
}

interface Recipe {
  name: string;
  calories: number;
  carbon: number;
  type: 'vegetarian' | 'non-vegetarian';
}

interface RecipeCardProps {
  recipe: Recipe;
  onSave: () => void;
  onOpen: () => void;
}

interface Recommendation {
  id: number;
  title: string;
  description: string;
  impact: string;
  type: 'sustainability' | 'budget' | 'nutrition';
  action: string;
}

interface RecommendationCardProps {
  recommendation: Recommendation;
}

interface Notification {
  id: number;
  message: string;
  isRead: boolean;
  time: string;
}

// Add interface for category breakdown
interface CategoryBreakdown {
  category: string;
  amount: number;
  percentage: number;
  previousMonth: number;
}

// Add interface for expensive items
interface ExpensiveItem {
  name: string;
  price: number;
  sustainable: boolean;
  alternatives: string[];
}

// Add interface for smart savings
interface SmartSaving {
  tip: string;
  potentialSavings: number;
}

// Add interface for carbon contributors
interface CarbonContributor {
  name: string;
  amount: string;
  impact: number;
}

// Add interface for environmental impact equivalents
interface EnvironmentalEquivalent {
  icon: string;
  value: string;
  label: string;
  description: string;
}

// Make sure these objects exist before they're referenced
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
  ] as CarbonContributor[],
  savings: 12.5, // kg CO2 saved this month
  equivalents: {
    consumption: [
      { 
        icon: "🌲", 
        value: "4.2", 
        label: "Trees needed", 
        description: "Number of trees needed to absorb your monthly carbon emissions" 
      },
      { 
        icon: "🚗", 
        value: "216", 
        label: "km driven", 
        description: "Equivalent to kilometers driven in an average car" 
      },
      { 
        icon: "💡", 
        value: "142", 
        label: "hours of electricity", 
        description: "Hours of powering an average household" 
      }
    ],
    savings: [
      { 
        icon: "🌱", 
        value: "1.5", 
        label: "Trees planted", 
        description: "Equivalent to planting this many trees" 
      },
      { 
        icon: "🚫", 
        value: "78", 
        label: "km not driven", 
        description: "Equivalent to avoiding these kilometers in a car" 
      },
      { 
        icon: "⚡", 
        value: "51", 
        label: "kWh saved", 
        description: "Equivalent energy savings" 
      }
    ]
  }
};

const mockRecentRecipes: Recipe[] = [
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
  ] as CategoryBreakdown[],
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
  ] as ExpensiveItem[],
  smartSavings: [
    { tip: "Switch to seasonal produce", potentialSavings: 25 },
    { tip: "Buy pantry staples in bulk", potentialSavings: 15 },
    { tip: "Replace one meat meal with plant-based", potentialSavings: 20 },
  ] as SmartSaving[],
};

// Add intelligence data for smart recommendations
const smartRecommendations: Recommendation[] = [
  {
    id: 1,
    title: "Eco-Smart Choice",
    description: "Switch from beef to turkey this week to reduce carbon footprint by 30%",
    impact: "4.2kg CO₂ saved",
    type: "sustainability",
    action: "Try in meal plan",
  },
  {
    id: 2,
    title: "Budget-Smart Choice",
    description: "Buy in-season vegetables to reduce grocery cost by 15%",
    impact: "€12.75 saved",
    type: "budget",
    action: "Show items",
  },
  {
    id: 3,
    title: "Nutrition-Smart Choice",
    description: "Increase fiber by adding these whole grains to your order",
    impact: "+8g fiber daily",
    type: "nutrition",
    action: "Add to cart",
  },
];

// Mobile Tab Navigation Component
const TabNavigation: React.FC<TabNavigationProps> = ({ activeTab, onChange }) => {
  const tabs = [
    { id: "insights", icon: "🔍", label: "Insights" },
    { id: "nutrition", icon: "🥗", label: "Nutrition" },
    { id: "sustainability", icon: "🌱", label: "Eco" },
    { id: "budget", icon: "💰", label: "Budget" }
  ];

  return (
    <div className="flex justify-between items-center bg-white dark:bg-gray-800 rounded-lg shadow-sm p-1 mb-4">
      {tabs.map((tab) => (
        <button
          key={tab.id}
          onClick={() => onChange(tab.id)}
          className={`flex-1 p-2 rounded-lg flex flex-col items-center transition-all duration-200 ${
            activeTab === tab.id
              ? "bg-primary text-white scale-105"
              : "text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700"
          }`}
        >
          <span className="text-lg mb-1">{tab.icon}</span>
          <span className="text-xs font-medium">{tab.label}</span>
        </button>
      ))}
    </div>
  );
};

// Stat Card Component
const StatCard: React.FC<StatCardProps> = ({ title, value, icon, bgColor, change, period, action }) => {
  return (
    <div className={`${bgColor} p-4 rounded-xl shadow-sm transition-transform hover:scale-[1.02] cursor-pointer`}>
      <div className="flex justify-between">
        <div>
          <h3 className="text-sm text-gray-700 dark:text-gray-300 font-medium">{title}</h3>
          <p className="text-2xl font-bold mt-1">{value}</p>
          {change && period && (
            <div className={`flex items-center text-xs mt-1 ${
              change.startsWith('+') ? 'text-red-600 dark:text-red-400' : 'text-emerald-600 dark:text-emerald-400'
            }`}>
              <span>{change}</span>
              <span className="ml-1 text-gray-600 dark:text-gray-400">vs {period}</span>
            </div>
          )}
        </div>
        <div className="w-12 h-12 rounded-full bg-white dark:bg-gray-700 flex items-center justify-center shadow-sm">
          {icon}
        </div>
      </div>
      {action && (
        <button className="mt-3 w-full text-center text-xs bg-white dark:bg-gray-700 py-1.5 rounded text-primary font-medium">
          {action}
        </button>
      )}
    </div>
  );
};

// Progress Bar Component
const ProgressBar: React.FC<ProgressBarProps> = ({ value, max, label, color, size = "md" }) => {
  const percentage = (value / max) * 100;
  const heights = {
    sm: "h-1.5",
    md: "h-2",
    lg: "h-3"
  };
  
  return (
    <div className="w-full">
      {label && (
        <div className="flex justify-between text-xs mb-1">
          <span className="font-medium text-gray-700 dark:text-gray-300">{label}</span>
          <span className="text-gray-500 dark:text-gray-400">{value}/{max}</span>
        </div>
      )}
      <div className={`w-full ${heights[size]} bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden`}>
        <div
          className={`${heights[size]} ${color} rounded-full transition-all duration-500 ease-out`}
          style={{ width: `${percentage}%` }}
        ></div>
      </div>
    </div>
  );
};

// Eco Score Component with Animation
const EcoScoreGauge: React.FC<EcoScoreGaugeProps> = ({ score, target }) => {
  const percentage = (score / target) * 100;
  const circumference = 2 * Math.PI * 45;
  const strokeDashoffset = circumference - (percentage / 100) * circumference;
  const scoreColor = 
    percentage <= 40 ? "text-green-500" :
    percentage <= 70 ? "text-yellow-500" : "text-red-500";
  
  return (
    <div className="relative w-full max-w-xs mx-auto">
      <svg className="w-full" viewBox="0 0 120 120">
        {/* Background track */}
        <circle
          cx="60"
          cy="60"
          r="45"
          fill="transparent"
          stroke="currentColor"
          strokeWidth="8"
          className="text-gray-200 dark:text-gray-700"
        />
        
        {/* Colored progress */}
        <circle
          cx="60"
          cy="60"
          r="45"
          fill="transparent"
          stroke="currentColor"
          strokeWidth="8"
          strokeDasharray={circumference}
          strokeDashoffset={strokeDashoffset}
          strokeLinecap="round"
          className={scoreColor}
          transform="rotate(-90 60 60)"
          style={{ transition: "stroke-dashoffset 1s ease-in-out" }}
        />
        
        {/* Center text */}
        <text x="60" y="55" textAnchor="middle" className="text-2xl font-bold fill-current dark:fill-white">
          {score}
        </text>
        <text x="60" y="70" textAnchor="middle" className="text-xs fill-current text-gray-500 dark:fill-gray-400">
          kg CO₂/day
        </text>
      </svg>
      
      {/* Bottom label */}
      <div className="text-center mt-2">
        <p className="text-sm font-medium">
          Target: <span className="font-bold">{target} kg CO₂/day</span>
        </p>
        <p className={`text-sm font-medium ${scoreColor}`}>
          {percentage <= 40 ? "Great!" : percentage <= 70 ? "Good" : "Needs improvement"}
        </p>
      </div>
    </div>
  );
};

// Recipe Card Component
const RecipeCard: React.FC<RecipeCardProps> = ({ recipe, onSave, onOpen }) => {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg overflow-hidden shadow-sm group transition-all hover:shadow-md">
      <div className="h-32 bg-gray-200 dark:bg-gray-700 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity">
          <div className="absolute bottom-2 right-2 flex space-x-1">
            <button 
              onClick={onSave} 
              className="p-1.5 bg-white/90 rounded-full"
              aria-label="Save recipe"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
              </svg>
            </button>
          </div>
        </div>
        <div className="absolute top-2 left-2">
          <span className={`
            inline-block px-2 py-1 text-xs rounded-full text-white
            ${recipe.type === "vegetarian" ? "bg-green-500" : "bg-amber-500"}
          `}>
            {recipe.type}
          </span>
        </div>
        <div className="w-full h-full flex items-center justify-center">
          <span className="text-3xl">🍽️</span>
        </div>
      </div>
      
      <div className="p-3">
        <h3 className="font-medium text-sm line-clamp-1">{recipe.name}</h3>
        <div className="flex justify-between mt-2 text-xs text-gray-600 dark:text-gray-400">
          <span>{recipe.calories} kcal</span>
          <span>{recipe.carbon} kg CO₂</span>
        </div>
        <button 
          onClick={onOpen}
          className="mt-2 w-full py-1.5 rounded-md bg-primary/10 text-primary text-xs font-medium hover:bg-primary/20 transition-colors"
        >
          View Recipe
        </button>
      </div>
    </div>
  );
};

// Recommendation Card Component
const RecommendationCard: React.FC<RecommendationCardProps> = ({ recommendation }) => {
  const getTypeStyles = (type: string) => {
    switch(type) {
      case 'sustainability':
        return {
          bg: "bg-green-50 dark:bg-green-900/20",
          border: "border-green-200 dark:border-green-800",
          text: "text-green-800 dark:text-green-400",
          button: "bg-green-100 dark:bg-green-800/50 text-green-800 dark:text-green-300 hover:bg-green-200 dark:hover:bg-green-800/80"
        };
      case 'budget':
        return {
          bg: "bg-blue-50 dark:bg-blue-900/20",
          border: "border-blue-200 dark:border-blue-800",
          text: "text-blue-800 dark:text-blue-400",
          button: "bg-blue-100 dark:bg-blue-800/50 text-blue-800 dark:text-blue-300 hover:bg-blue-200 dark:hover:bg-blue-800/80"
        };
      case 'nutrition':
        return {
          bg: "bg-amber-50 dark:bg-amber-900/20",
          border: "border-amber-200 dark:border-amber-800",
          text: "text-amber-800 dark:text-amber-400",
          button: "bg-amber-100 dark:bg-amber-800/50 text-amber-800 dark:text-amber-300 hover:bg-amber-200 dark:hover:bg-amber-800/80"
        };
      default:
        return {
          bg: "bg-gray-50 dark:bg-gray-800",
          border: "border-gray-200 dark:border-gray-700",
          text: "text-gray-800 dark:text-gray-300",
          button: "bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600"
        };
    }
  };

  const styles = getTypeStyles(recommendation.type);
  
  return (
    <div className={`p-3.5 rounded-lg border ${styles.border} ${styles.bg} hover:shadow-sm transition-all`}>
      <div className="flex items-start">
        {recommendation.type === 'sustainability' && (
          <span className="mr-2 text-lg">🌱</span>
        )}
        {recommendation.type === 'budget' && (
          <span className="mr-2 text-lg">💰</span>
        )}
        {recommendation.type === 'nutrition' && (
          <span className="mr-2 text-lg">🥗</span>
        )}
        <div>
          <h3 className={`font-medium ${styles.text}`}>{recommendation.title}</h3>
          <p className="text-sm my-1.5 text-gray-700 dark:text-gray-300">{recommendation.description}</p>
          <div className="flex justify-between items-center mt-2">
            <span className={`text-xs font-medium ${styles.text}`}>{recommendation.impact}</span>
            <button className={`text-xs py-1 px-2.5 rounded transition-colors ${styles.button}`}>
              {recommendation.action}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

// Main Dashboard Component
const Dashboard: React.FC = () => {
  // State management
  const [activeTab, setActiveTab] = useState("insights");
  const [darkMode, setDarkMode] = useState(false);
  const [showRecommendations, setShowRecommendations] = useState(true);
  const [showNotifications, setShowNotifications] = useState(false);
  const [notifications, setNotifications] = useState<Notification[]>([
    { id: 1, message: "Your order is out for delivery", isRead: false, time: "2 hours ago" },
    { id: 2, message: "New seasonal products available!", isRead: true, time: "Yesterday" },
    { id: 3, message: "You've achieved your weekly eco goal!", isRead: false, time: "3 days ago" },
  ]);

  // Toggle between light and dark mode
  const toggleDarkMode = () => {
    const newMode = !darkMode;
    setDarkMode(newMode);
    localStorage.setItem('theme', newMode ? 'dark' : 'light');
  };

  // Apply dark mode
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  // Load preferred theme on initial render
  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
      setDarkMode(true);
    } else if (savedTheme === 'light') {
      setDarkMode(false);
    } else {
      // If no saved preference, check system preference
      const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
      setDarkMode(prefersDark);
    }
  }, []);

  // Handle notification actions
  const markNotificationAsRead = (id: number) => {
    setNotifications(
      notifications.map(notification =>
        notification.id === id
          ? { ...notification, isRead: true }
          : notification
      )
    );
  };

  const getUnreadCount = () => {
    return notifications.filter(n => !n.isRead).length;
  };

  // Get time of day greeting
  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return "Good Morning";
    if (hour < 18) return "Good Afternoon";
    return "Good Evening";
  };

  return (
    <div className={`min-h-screen flex flex-col pb-16 md:pb-0 ${darkMode ? 'dark bg-gray-900 text-gray-100' : 'bg-gray-50 text-gray-800'}`}>
      {/* Header */}
      <header className={`sticky top-0 z-30 ${darkMode ? 'bg-gray-800 shadow-md' : 'bg-white shadow-sm border-b border-gray-100'}`}>
        <div className="container mx-auto px-4 py-3">
          <div className="flex justify-between items-center">
            <div className="flex items-center">
              <button
                onClick={() => {}} // Toggle sidebar in the future
                className={`p-1 rounded-full mr-2 ${darkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-100 text-gray-700'}`}
                aria-label="Menu"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              </button>
              <img
                src="/Icons/Logo.svg"
                alt="App Logo"
                className="h-8 w-auto mr-2"
              />
              <h1 className="text-xl font-bold hidden md:block">Dashboard</h1>
            </div>

            <div className="flex items-center space-x-2">
              {/* Theme toggle */}
              <button
                onClick={toggleDarkMode}
                className={`p-2 rounded-full ${darkMode ? 'text-yellow-400 hover:bg-gray-700' : 'text-gray-600 bg-gray-100 hover:bg-gray-200'}`}
                aria-label="Toggle dark mode"
              >
                {darkMode ? (
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                  </svg>
                ) : (
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                  </svg>
                )}
              </button>

              {/* Notification bell */}
              <div className="relative">
                <button
                  onClick={() => setShowNotifications(!showNotifications)}
                  className={`p-2 rounded-full relative ${darkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-100 bg-gray-50 text-gray-700'}`}
                  aria-label="Notifications"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                  </svg>
                  {getUnreadCount() > 0 && (
                    <span className="absolute top-1 right-1 bg-primary text-white rounded-full w-4 h-4 flex items-center justify-center text-xs">
                      {getUnreadCount()}
                    </span>
                  )}
                </button>

                {/* Notifications dropdown */}
                {showNotifications && (
                  <div className="absolute top-full right-0 mt-1 w-80 max-w-sm z-50">
                    <div className={`rounded-lg shadow-lg overflow-hidden ${darkMode ? 'bg-gray-800 border border-gray-700' : 'bg-white border border-gray-200'}`}>
                      <div className="p-3 border-b border-gray-200 dark:border-gray-700 flex justify-between items-center">
                        <h3 className="font-medium">Notifications</h3>
                        <button 
                          className="text-xs text-primary hover:text-primary-dark transition-colors"
                          onClick={() => setNotifications(notifications.map(n => ({ ...n, isRead: true })))}>
                          Mark all as read
                        </button>
                      </div>
                      <div className="max-h-96 overflow-y-auto">
                        {notifications.length > 0 ? (
                          <div className="divide-y divide-gray-200 dark:divide-gray-700">
                            {notifications.map(notification => (
                              <div
                                key={notification.id}
                                className={`p-3 ${notification.isRead ? '' : 'bg-blue-50 dark:bg-blue-900 dark:bg-opacity-20'} cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-750 transition-colors`}
                                onClick={() => markNotificationAsRead(notification.id)}
                              >
                                <div className="flex">
                                  <div className={`w-2 h-2 rounded-full mt-1.5 mr-2 flex-shrink-0 ${notification.isRead ? 'bg-gray-300 dark:bg-gray-600' : 'bg-primary'}`}></div>
                                  <div>
                                    <p className="text-sm">{notification.message}</p>
                                    <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">{notification.time}</p>
                                  </div>
                                </div>
                              </div>
                            ))}
                          </div>
                        ) : (
                          <div className="p-4 text-center text-gray-500 dark:text-gray-400">
                            <p>No notifications</p>
                          </div>
                        )}
                      </div>
                      <div className="p-2 border-t border-gray-200 dark:border-gray-700 text-center">
                        <button className="text-sm text-primary hover:text-primary-dark transition-colors">View all notifications</button>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              <button className={`text-primary font-medium text-sm ${darkMode ? 'bg-primary-dark/20 text-primary-light' : 'bg-primary-light/90 hover:bg-primary-light'} px-3 py-1.5 rounded-full flex items-center transition-colors shadow-sm`}>
                <span className="hidden md:inline">Choose delivery</span>
                <span className="md:hidden">Delivery</span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4 ml-1"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M7.293 14.707a1 1 0 010-1.414L10 10l-2.707-2.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                    clipRule="evenodd"
                  />
                </svg>
              </button>

              <div className={`w-8 h-8 ${darkMode ? 'bg-gray-700' : 'bg-gray-200'} rounded-full overflow-hidden flex items-center justify-center cursor-pointer hover:opacity-90 transition-opacity border border-gray-200 shadow-sm`}>
                <img
                  src="/dashboard.png"
                  alt="User"
                  className="h-5 w-5"
                />
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-4 flex-grow">
        {/* Personalized greeting */}
        <div className={`${darkMode ? 'bg-gradient-to-r from-primary-dark/20 to-primary-darker/20' : 'bg-gradient-to-r from-primary-light/90 to-primary-lighter/90'} p-4 rounded-xl mb-5 shadow-sm border ${darkMode ? 'border-transparent' : 'border-primary-light/40'}`}>
          <div className="flex items-center">
            <div className={`mr-3 ${darkMode ? 'bg-gray-800' : 'bg-white'} p-2 rounded-full shadow-sm`}>
              <span className="text-2xl">{new Date().getHours() < 12 ? '🌅' : new Date().getHours() < 18 ? '☀️' : '🌙'}</span>
            </div>
            <div>
              <h1 className="text-xl font-bold">
                {getGreeting()}, Sarah!
              </h1>
              <p className={`text-sm ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                Your eco rank: <span className="font-medium text-primary">Top 15%</span> of shoppers
              </p>
            </div>
            <div className="ml-auto">
              <span className="text-xs bg-white dark:bg-gray-800 px-2 py-1 rounded-full shadow-sm">April 24, 2025</span>
            </div>
          </div>
        </div>

        {/* Tab Navigation */}
        <TabNavigation activeTab={activeTab} onChange={setActiveTab} />

        {/* Tab Content */}
        <div className="space-y-5">
          {/* Insights Tab */}
          {activeTab === "insights" && (
            <>
              {/* Stats Overview */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                <StatCard
                  title="Weekly Spending"
                  value="€94.50"
                  icon="💶"
                  bgColor={darkMode ? "bg-blue-900/20" : "bg-blue-50"}
                  change="-12.5%"
                  period="last week"
                />
                <StatCard
                  title="Carbon Footprint"
                  value="4.2 kg"
                  icon="🌱"
                  bgColor={darkMode ? "bg-green-900/20" : "bg-green-50"}
                  change="-8%"
                  period="last week"
                />
                <StatCard
                  title="Protein Intake"
                  value="68g"
                  icon="🥩"
                  bgColor={darkMode ? "bg-yellow-900/20" : "bg-yellow-50"}
                  change="+5%"
                  period="target"
                />
                <StatCard
                  title="Calories"
                  value="1,950"
                  icon="🔥"
                  bgColor={darkMode ? "bg-orange-900/20" : "bg-orange-50"}
                  change="-3%"
                  period="target"
                />
              </div>

              {/* Smart Recommendations Section */}
              {showRecommendations && (
                <div className={`mb-4 ${darkMode ? 'bg-gray-800' : 'bg-white'} rounded-xl p-4 shadow-sm transition-all transform hover:shadow-md border ${darkMode ? 'border-gray-700' : 'border-gray-100'}`}>
                  <div className="flex justify-between items-center mb-3">
                    <h2 className="text-lg font-semibold flex items-center">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-primary" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M11.3 1.046A1 1 0 0112 2v5h4a1 1 0 01.82 1.573l-7 10A1 1 0 018 18v-5H4a1 1 0 01-.82-1.573l7-10a1 1 0 011.12-.38z" clipRule="evenodd" />
                      </svg>
                      Smart Recommendations
                    </h2>
                    <button
                      onClick={() => setShowRecommendations(false)}
                      className="text-gray-400 hover:text-gray-500 dark:text-gray-500 dark:hover:text-gray-400 p-1 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                      </svg>
                    </button>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                    {smartRecommendations.map(recommendation => (
                      <RecommendationCard key={recommendation.id} recommendation={recommendation} />
                    ))}
                  </div>
                </div>
              )}

              {/* Recent Activity Timeline */}
              <div className={`${darkMode ? 'bg-gray-800' : 'bg-white'} rounded-xl p-4 shadow-sm transition-all transform hover:shadow-md border ${darkMode ? 'border-gray-700' : 'border-gray-100'}`}>
                <h2 className="text-lg font-semibold mb-4">Recent Activity</h2>
                <div className="space-y-4">
                  <div className="flex">
                    <div className="flex flex-col items-center mr-4">
                      <div className="w-10 h-10 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center text-green-500 shadow-sm">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                        </svg>
                      </div>
                      <div className="h-full w-0.5 bg-gray-200 dark:bg-gray-700 mt-2"></div>
                    </div>
                    <div className="flex-grow pb-5">
                      <div className="flex justify-between items-start">
                        <h3 className="font-medium">Order Delivered</h3>
                        <span className="text-xs text-gray-500 dark:text-gray-400">Today, 10:23 AM</span>
                      </div>
                      <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">Your order #2258 was delivered successfully</p>
                      <button className="mt-2 text-primary text-xs font-medium bg-primary-light dark:bg-primary-dark px-3 py-1 rounded-full hover:bg-primary/20 dark:hover:bg-primary-dark/50 transition-colors shadow-sm">
                        Rate Products
                      </button>
                    </div>
                  </div>
                  
                  <div className="flex">
                    <div className="flex flex-col items-center mr-4">
                      <div className="w-10 h-10 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center text-blue-600 dark:text-blue-400 shadow-sm">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                        </svg>
                      </div>
                      <div className="h-full w-0.5 bg-gray-200 dark:bg-gray-700 mt-2"></div>
                    </div>
                    <div className="flex-grow pb-5">
                      <div className="flex justify-between items-start">
                        <h3 className="font-medium">Weekly Report</h3>
                        <span className="text-xs text-gray-500 dark:text-gray-400">Yesterday</span>
                      </div>
                      <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">Your weekly sustainability report is ready</p>
                      <button className="mt-2 text-primary text-xs font-medium bg-primary-light dark:bg-primary-dark px-3 py-1 rounded-full hover:bg-primary/20 dark:hover:bg-primary-dark/50 transition-colors shadow-sm">
                        View Report
                      </button>
                    </div>
                  </div>
                  
                  <div className="flex">
                    <div className="flex flex-col items-center mr-4">
                      <div className="w-10 h-10 rounded-full bg-yellow-100 dark:bg-yellow-900/30 flex items-center justify-center text-yellow-500 shadow-sm">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                      </div>
                      <div className="h-full w-0.5 bg-gray-200 dark:bg-gray-700 mt-2"></div>
                    </div>
                    <div className="flex-grow">
                      <div className="flex justify-between items-start">
                        <h3 className="font-medium">Reminder</h3>
                        <span className="text-xs text-gray-500 dark:text-gray-400">2 days ago</span>
                      </div>
                      <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">Your subscription needs renewal in 3 days</p>
                      <button className="mt-2 text-primary text-xs font-medium bg-primary-light dark:bg-primary-dark px-3 py-1 rounded-full hover:bg-primary/20 dark:hover:bg-primary-dark/50 transition-colors shadow-sm">
                        Renew Now
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </>
          )}
          
          {/* Nutrition Tab */}
          {activeTab === "nutrition" && (
            <>
              {/* Nutrition Summary */}
              <div className={`${darkMode ? 'bg-gray-800' : 'bg-white'} rounded-xl p-4 shadow-sm mb-4 transition-all transform hover:shadow-md`}>
                <h2 className="text-lg font-semibold mb-3">Nutrition Summary</h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <h3 className="text-sm font-medium mb-2">Daily Intake</h3>
                    <div className="space-y-3">
                      <div>
                        <ProgressBar
                          value={mockNutritionData.weeklyAverage.calories}
                          max={mockNutritionData.recommended.calories}
                          color="bg-orange-500"
                          label="Calories"
                        />
                      </div>
                      
                      <div>
                        <ProgressBar
                          value={mockNutritionData.weeklyAverage.protein}
                          max={mockNutritionData.recommended.protein}
                          color="bg-red-500"
                          label="Protein"
                        />
                      </div>
                      
                      <div>
                        <ProgressBar
                          value={mockNutritionData.weeklyAverage.carbs}
                          max={mockNutritionData.recommended.carbs}
                          color="bg-yellow-500"
                          label="Carbs"
                        />
                      </div>
                      
                      <div>
                        <ProgressBar
                          value={mockNutritionData.weeklyAverage.fat}
                          max={mockNutritionData.recommended.fat}
                          color="bg-blue-500"
                          label="Fat"
                        />
                      </div>
                      
                      <div>
                        <ProgressBar
                          value={mockNutritionData.weeklyAverage.fiber}
                          max={mockNutritionData.recommended.fiber}
                          color="bg-green-500"
                          label="Fiber"
                        />
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="text-sm font-medium mb-2">Weekly Trends</h3>
                    <div className={`h-52 ${darkMode ? 'bg-gray-700' : 'bg-gray-100'} rounded-lg flex items-center justify-center`}>
                      <span className="text-gray-500 dark:text-gray-400">Nutrition chart will appear here</span>
                    </div>
                  </div>
                </div>
                
                <div className="mt-4 pt-3 border-t border-gray-200 dark:border-gray-700">
                  <h3 className="text-sm font-medium mb-2">Nutritional Insights</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    <div className={`p-3 rounded-lg ${darkMode ? 'bg-blue-900/20 border border-blue-800' : 'bg-blue-50 border border-blue-100'}`}>
                      <div className="flex">
                        <div className="mr-3 text-xl">💧</div>
                        <div>
                          <h4 className="font-medium text-blue-700 dark:text-blue-400">Hydration</h4>
                          <p className="text-sm mt-1">You're 2 cups below your daily water goal</p>
                        </div>
                      </div>
                    </div>
                    
                    <div className={`p-3 rounded-lg ${darkMode ? 'bg-amber-900/20 border border-amber-800' : 'bg-amber-50 border border-amber-100'}`}>
                      <div className="flex">
                        <div className="mr-3 text-xl">🍎</div>
                        <div>
                          <h4 className="font-medium text-amber-700 dark:text-amber-400">Vitamin Intake</h4>
                          <p className="text-sm mt-1">Low on Vitamin C. Add citrus to your next order</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Recent Recipes */}
              <div className={`${darkMode ? 'bg-gray-800' : 'bg-white'} rounded-xl p-4 shadow-sm transition-all transform hover:shadow-md`}>
                <div className="flex justify-between items-center mb-3">
                  <h2 className="text-lg font-semibold">Recent Recipes</h2>
                  <button className="text-primary text-sm font-medium hover:underline">View All</button>
                </div>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                  {mockRecentRecipes.map((recipe, index) => (
                    <RecipeCard 
                      key={index} 
                      recipe={recipe} 
                      onSave={() => {}}
                      onOpen={() => {}}
                    />
                  ))}
                </div>
              </div>
            </>
          )}
          
          {/* Sustainability Tab */}
          {activeTab === "sustainability" && (
            <>
              {/* Carbon Footprint Overview */}
              <div className={`${darkMode ? 'bg-gray-800' : 'bg-white'} rounded-xl p-4 shadow-sm mb-4 transition-all transform hover:shadow-md border ${darkMode ? 'border-gray-700' : 'border-gray-100'}`}>
                <h2 className="text-lg font-semibold mb-3">Carbon Footprint</h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <EcoScoreGauge score={mockCarbonData.weeklyAverage} target={mockCarbonData.sustainableTarget} />
                  </div>
                  
                  <div className="space-y-4">
                    <div>
                      <h3 className="text-sm font-medium mb-2">This Week's Impact</h3>
                      <div className={`p-3 rounded-lg ${darkMode ? 'bg-gray-700' : 'bg-gray-100'}`}>
                        <div className="grid grid-cols-2 gap-3">
                          <div>
                            <div className="text-xs text-gray-500 dark:text-gray-400">Weekly Total</div>
                            <div className="text-xl font-bold mt-1">{mockCarbonData.weeklyTotal} kg</div>
                            <div className="text-xs mt-1">CO₂ equivalent</div>
                          </div>
                          <div>
                            <div className="text-xs text-gray-500 dark:text-gray-400">Savings</div>
                            <div className="text-xl font-bold mt-1 text-green-600">{mockCarbonData.savings} kg</div>
                            <div className="text-xs mt-1">CO₂ saved this month</div>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <div>
                      <h3 className="text-sm font-medium mb-2">Top Carbon Sources</h3>
                      <div className="space-y-2">
                        {mockCarbonData.topContributors.map((item, index) => (
                          <div key={index} className={`flex items-center ${darkMode ? 'bg-gray-700' : 'bg-gray-100'} p-2 rounded-lg`}>
                            <div className={`w-8 h-8 mr-3 rounded-full flex items-center justify-center text-white ${
                              index === 0 ? "bg-red-500" : 
                              index === 1 ? "bg-orange-500" : 
                              "bg-yellow-500"
                            }`}>
                              <span className="font-bold text-sm">{index + 1}</span>
                            </div>
                            <div className="flex-1">
                              <div className="font-medium text-sm">{item.name}</div>
                              <div className="text-xs text-gray-500 dark:text-gray-400">{item.amount}</div>
                            </div>
                            <div className="text-right">
                              <div className="font-medium text-sm">{item.impact} kg</div>
                              <div className="text-xs text-gray-500 dark:text-gray-400">
                                {((item.impact / mockCarbonData.weeklyTotal) * 100).toFixed(0)}% of total
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Environmental Equivalents Section */}
                <div className="mt-5 pt-4 border-t border-gray-200 dark:border-gray-700">
                  <h3 className="text-md font-medium mb-3">Environmental Equivalents</h3>
                  
                  {/* Current Consumption Impact */}
                  <div className="mb-4">
                    <h4 className="text-sm font-medium mb-2 text-gray-600 dark:text-gray-300">Your Monthly Consumption Equals</h4>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                      {mockCarbonData.equivalents.consumption.map((item, index) => (
                        <div 
                          key={index}
                          className={`rounded-lg p-3 ${darkMode ? 'bg-gray-700 hover:bg-gray-650' : 'bg-gray-50 hover:bg-gray-100'} border ${darkMode ? 'border-gray-600' : 'border-gray-200'} transition-all hover:shadow-sm group cursor-pointer`}
                        >
                          <div className="flex items-center">
                            <div className={`w-10 h-10 rounded-full flex items-center justify-center text-xl ${darkMode ? 'bg-gray-600' : 'bg-white border border-gray-200'} mr-3 shadow-sm group-hover:scale-110 transition-transform`}>
                              {item.icon}
                            </div>
                            <div>
                              <div className="text-lg font-bold">{item.value}</div>
                              <div className="text-xs text-gray-500 dark:text-gray-400">{item.label}</div>
                            </div>
                          </div>
                          <div className="mt-2 text-xs text-gray-500 dark:text-gray-400 opacity-0 group-hover:opacity-100 transition-opacity">
                            {item.description}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  {/* Savings Impact */}
                  <div>
                    <h4 className="text-sm font-medium mb-2 text-green-600 dark:text-green-400">Your Positive Impact This Month</h4>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                      {mockCarbonData.equivalents.savings.map((item, index) => (
                        <div 
                          key={index}
                          className={`rounded-lg p-3 ${darkMode ? 'bg-green-900/20 hover:bg-green-900/30' : 'bg-green-50 hover:bg-green-100'} border ${darkMode ? 'border-green-800' : 'border-green-200'} transition-all hover:shadow-sm group cursor-pointer`}
                        >
                          <div className="flex items-center">
                            <div className={`w-10 h-10 rounded-full flex items-center justify-center text-xl ${darkMode ? 'bg-green-800/50' : 'bg-white border border-green-200'} mr-3 shadow-sm group-hover:scale-110 transition-transform`}>
                              {item.icon}
                            </div>
                            <div>
                              <div className="text-lg font-bold text-green-600 dark:text-green-400">{item.value}</div>
                              <div className="text-xs text-gray-600 dark:text-gray-300">{item.label}</div>
                            </div>
                          </div>
                          <div className="mt-2 text-xs text-gray-600 dark:text-gray-300 opacity-0 group-hover:opacity-100 transition-opacity">
                            {item.description}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
                
                <div className="mt-4">
                  <button className="w-full bg-green-600 hover:bg-green-700 text-white py-2.5 rounded-lg text-sm font-medium transition flex items-center justify-center shadow-sm">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                    </svg>
                    See Eco-Friendly Alternatives
                  </button>
                </div>
              </div>
              
              {/* Sustainability Tips */}
              <div className={`${darkMode ? 'bg-gray-800' : 'bg-white'} rounded-xl p-4 shadow-sm transition-all transform hover:shadow-md`}>
                <h2 className="text-lg font-semibold mb-3">Eco Tips</h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className={`p-4 rounded-lg ${darkMode ? 'bg-green-900/20 border border-green-800' : 'bg-green-50 border border-green-100'}`}>
                    <div className="flex">
                      <span className="text-3xl mr-3">🥦</span>
                      <div>
                        <h3 className="font-medium text-green-700 dark:text-green-400">Plant-Based Challenge</h3>
                        <p className="text-sm mt-1">Try having 1-2 meat-free days each week to reduce your carbon impact by up to 30%</p>
                        <button className="mt-2 text-white text-xs font-medium bg-green-600 hover:bg-green-700 px-3 py-1.5 rounded-lg transition-colors">
                          Accept Challenge
                        </button>
                      </div>
                    </div>
                  </div>
                  
                  <div className={`p-4 rounded-lg ${darkMode ? 'bg-green-900/20 border border-green-800' : 'bg-green-50 border border-green-100'}`}>
                    <div className="flex">
                      <span className="text-3xl mr-3">🍎</span>
                      <div>
                        <h3 className="font-medium text-green-700 dark:text-green-400">Seasonal Produce</h3>
                        <p className="text-sm mt-1">Choose local, seasonal produce to reduce transportation emissions and support local farmers</p>
                        <button className="mt-2 text-white text-xs font-medium bg-green-600 hover:bg-green-700 px-3 py-1.5 rounded-lg transition-colors">
                          Show Seasonal Items
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="mt-4 pt-3 border-t border-gray-200 dark:border-gray-700">
                  <h3 className="text-sm font-medium mb-2">Your Sustainability Badges</h3>
                  <div className="flex flex-wrap gap-2">
                    <div className="p-2 rounded-lg bg-green-100 dark:bg-green-900/30 flex flex-col items-center hover:shadow-sm transition-shadow">
                      <span className="text-xl">🌿</span>
                      <span className="text-xs font-medium mt-1">Plant Hero</span>
                    </div>
                    <div className="p-2 rounded-lg bg-blue-100 dark:bg-blue-900/30 flex flex-col items-center hover:shadow-sm transition-shadow">
                      <span className="text-xl">💧</span>
                      <span className="text-xs font-medium mt-1">Water Saver</span>
                    </div>
                    <div className="p-2 rounded-lg bg-yellow-100 dark:bg-yellow-900/30 flex flex-col items-center hover:shadow-sm transition-shadow">
                      <span className="text-xl">🚲</span>
                      <span className="text-xs font-medium mt-1">Low Emissions</span>
                    </div>
                    <div className="p-2 rounded-lg bg-gray-100 dark:bg-gray-700 flex flex-col items-center hover:shadow-sm transition-shadow">
                      <span className="text-xl">➕</span>
                      <span className="text-xs font-medium mt-1">Earn More</span>
                    </div>
                  </div>
                </div>
              </div>
            </>
          )}
          
          {/* Budget Tab */}
          {activeTab === "budget" && (
            <>
              {/* Budget Overview */}
              <div className={`${darkMode ? 'bg-gray-800' : 'bg-white'} rounded-xl p-4 shadow-sm mb-4 transition-all transform hover:shadow-md`}>
                <div className="flex justify-between items-center mb-3">
                  <h2 className="text-lg font-semibold">Budget Overview</h2>
                  <span className="text-xs px-2 py-0.5 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 rounded-full">
                    €{mockBudgetData.savingsThisMonth} saved this month
                  </span>
                </div>
                
                <div className="bg-gray-100 dark:bg-gray-700 rounded-lg p-3 mb-4">
                  <div className="flex items-center mb-2">
                    <div className="w-12 h-12 rounded-full bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 flex items-center justify-center text-base font-bold mr-3">
                      {Math.round((mockBudgetData.currentSpent / mockBudgetData.monthlyBudget) * 100)}%
                    </div>
                    <div className="flex-1">
                      <div className="flex justify-between text-xs mb-1">
                        <span className="text-gray-500 dark:text-gray-400">Spent so far</span>
                        <span className="font-medium">€{mockBudgetData.currentSpent}</span>
                      </div>
                      <div className="w-full h-2 bg-gray-200 dark:bg-gray-600 rounded-full">
                        <div
                          className="h-full bg-blue-500 rounded-full transition-all duration-500 ease-out"
                          style={{
                            width: `${(mockBudgetData.currentSpent / mockBudgetData.monthlyBudget) * 100}%`,
                          }}
                        ></div>
                      </div>
                      <div className="flex justify-between text-xs mt-1">
                        <span className="font-medium text-green-600 dark:text-green-400">
                          €{mockBudgetData.monthlyBudget - mockBudgetData.currentSpent} left
                        </span>
                        <span className="text-gray-500 dark:text-gray-400">
                          Budget: €{mockBudgetData.monthlyBudget}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
                
                <h3 className="text-sm font-medium mb-2">Spending by Category</h3>
                <div className="space-y-3">
                  {mockBudgetData.categoryBreakdown.map((category, index) => (
                    <div key={index}>
                      <div className="flex justify-between text-sm mb-1">
                        <span>{category.category}</span>
                        <div>
                          <span className="font-medium">€{category.amount}</span>
                          <span className="text-xs text-gray-500 dark:text-gray-400 ml-1">
                            ({category.percentage}%)
                          </span>
                        </div>
                      </div>
                      <div className="flex items-center">
                        <div className="flex-1">
                          <div className="w-full h-2 bg-gray-200 dark:bg-gray-600 rounded-full">
                            <div
                              className={`h-full rounded-full transition-all duration-500 ease-out ${
                                index === 0 ? "bg-red-500" :
                                index === 1 ? "bg-green-500" :
                                index === 2 ? "bg-yellow-500" :
                                "bg-blue-500"
                              }`}
                              style={{ width: `${category.percentage}%` }}
                            ></div>
                          </div>
                        </div>
                        <div className="ml-2 w-16 text-xs">
                          {category.amount > category.previousMonth ? (
                            <span className="text-red-500">↑ {((category.amount - category.previousMonth) / category.previousMonth * 100).toFixed(0)}%</span>
                          ) : (
                            <span className="text-green-500">↓ {((category.previousMonth - category.amount) / category.previousMonth * 100).toFixed(0)}%</span>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              
              {/* Money Saving Opportunities */}
              <div className={`${darkMode ? 'bg-gray-800' : 'bg-white'} rounded-xl p-4 shadow-sm transition-all transform hover:shadow-md`}>
                <h2 className="text-lg font-semibold mb-3">Money Saving Opportunities</h2>
                
                <div className="space-y-3">
                  {mockBudgetData.smartSavings.map((saving, index) => (
                    <div key={index} className={`p-3 rounded-lg ${darkMode ? 'bg-blue-900/20 border border-blue-800' : 'bg-blue-50 border border-blue-100'}`}>
                      <div className="flex justify-between">
                        <div className="flex items-start">
                          <span className="text-xl mr-2">💰</span>
                          <div>
                            <p className="font-medium">{saving.tip}</p>
                            <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">Potential monthly savings</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <span className="font-bold text-green-600 dark:text-green-400">€{saving.potentialSavings}</span>
                        </div>
                      </div>
                      <button className="mt-2 w-full text-center text-xs bg-blue-600 hover:bg-blue-700 text-white py-1.5 rounded-lg transition-colors">
                        Apply This Tip
                      </button>
                    </div>
                  ))}
                </div>
                
                <div className="mt-4">
                  <h3 className="text-sm font-medium mb-2">Highest Expense Items</h3>
                  <div className="space-y-2">
                    {mockBudgetData.expensiveItems.map((item, index) => (
                      <div key={index} className="p-3 border border-gray-200 dark:border-gray-700 rounded-lg hover:shadow-sm transition-shadow">
                        <div className="flex justify-between items-start">
                          <div>
                            <h4 className="font-medium text-sm">{item.name}</h4>
                            <div className="mt-0.5 flex items-center">
                              <span className="text-gray-500 dark:text-gray-400 text-xs">€{item.price}</span>
                              {item.sustainable && (
                                <span className="ml-2 px-1.5 py-0.5 bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300 text-xs rounded-full">Eco-friendly</span>
                              )}
                            </div>
                          </div>
                          {item.alternatives.length > 0 && (
                            <button className="text-blue-600 dark:text-blue-400 text-xs hover:text-blue-700 dark:hover:text-blue-300 bg-blue-50 dark:bg-blue-900/20 px-2 py-1 rounded hover:bg-blue-100 dark:hover:bg-blue-900/30 transition-colors">
                              Alternatives
                            </button>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </>
          )}
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Dashboard;

