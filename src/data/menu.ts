// Menu Data Types
export interface Category {
    id: string;
    name: string;
    icon: string;
    backgroundImage: string;
    accentColor: string;
    order: number;
}

export interface MenuItem {
    id: string;
    name: string;
    description: string;
    price: number;
    image: string;
    categoryId: string;
    isVeg: boolean;
    isBestSeller?: boolean;
    isSpicy?: boolean;
    isChefsPick?: boolean;
}

// Categories with premium background images
export const categories: Category[] = [
    {
        id: "starters",
        name: "Starters",
        icon: "🥗",
        backgroundImage: "https://images.unsplash.com/photo-1544025162-d76694265947?w=1200&q=80",
        accentColor: "#f59e0b",
        order: 1,
    },
    {
        id: "veg",
        name: "Vegetarian",
        icon: "🥬",
        backgroundImage: "https://images.unsplash.com/photo-1540914124281-342587941389?w=1200&q=80",
        accentColor: "#22c55e",
        order: 2,
    },
    {
        id: "nonveg",
        name: "Non-Vegetarian",
        icon: "🍖",
        backgroundImage: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=1200&q=80",
        accentColor: "#dc2626",
        order: 3,
    },
    {
        id: "desserts",
        name: "Desserts",
        icon: "🍰",
        backgroundImage: "https://images.unsplash.com/photo-1551024601-bec78aea704b?w=1200&q=80",
        accentColor: "#ec4899",
        order: 4,
    },
    {
        id: "drinks",
        name: "Beverages",
        icon: "🍹",
        backgroundImage: "https://images.unsplash.com/photo-1544145945-f90425340c7e?w=1200&q=80",
        accentColor: "#3b82f6",
        order: 5,
    },
    {
        id: "special",
        name: "Chef's Special",
        icon: "⭐",
        backgroundImage: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=1200&q=80",
        accentColor: "#a855f7",
        order: 6,
    },
];

// Premium Menu Items
export const menuItems: MenuItem[] = [
    // Starters
    {
        id: "s1",
        name: "Truffle Infused Mushroom Soup",
        description: "Velvety wild mushroom bisque with truffle oil drizzle and herb croutons",
        price: 395,
        image: "https://images.unsplash.com/photo-1547592166-23ac45744acd?w=600&q=80",
        categoryId: "starters",
        isVeg: true,
        isBestSeller: true,
    },
    {
        id: "s2",
        name: "Crispy Lotus Root Chips",
        description: "Paper-thin lotus root crisps with sriracha aioli and microgreens",
        price: 345,
        image: "https://images.unsplash.com/photo-1626200419199-391ae4be7a41?w=600&q=80",
        categoryId: "starters",
        isVeg: true,
    },
    {
        id: "s3",
        name: "Seared Scallops",
        description: "Pan-seared Hokkaido scallops with citrus beurre blanc and caviar",
        price: 895,
        image: "https://images.unsplash.com/photo-1625943553852-781c6dd46faa?w=600&q=80",
        categoryId: "starters",
        isVeg: false,
        isChefsPick: true,
    },
    {
        id: "s4",
        name: "Dynamite Prawns",
        description: "Crispy tiger prawns tossed in spicy mayo with tobiko and scallions",
        price: 595,
        image: "https://images.unsplash.com/photo-1599487488170-d11ec9c172f0?w=600&q=80",
        categoryId: "starters",
        isVeg: false,
        isSpicy: true,
        isBestSeller: true,
    },

    // Vegetarian
    {
        id: "v1",
        name: "Paneer Tikka Masala",
        description: "Charred cottage cheese in aromatic tomato gravy with kasuri methi",
        price: 445,
        image: "https://images.unsplash.com/photo-1631452180519-c014fe946bc7?w=600&q=80",
        categoryId: "veg",
        isVeg: true,
        isBestSeller: true,
    },
    {
        id: "v2",
        name: "Dal Makhani",
        description: "Slow-cooked black lentils simmered overnight with cream and butter",
        price: 395,
        image: "https://images.unsplash.com/photo-1546833999-b9f581a1996d?w=600&q=80",
        categoryId: "veg",
        isVeg: true,
    },
    {
        id: "v3",
        name: "Truffle Risotto",
        description: "Creamy Arborio rice with black truffle, parmesan, and wild mushrooms",
        price: 695,
        image: "https://images.unsplash.com/photo-1476124369491-e7addf5db371?w=600&q=80",
        categoryId: "veg",
        isVeg: true,
        isChefsPick: true,
    },
    {
        id: "v4",
        name: "Thai Green Curry",
        description: "Fragrant coconut curry with seasonal vegetables and jasmine rice",
        price: 495,
        image: "https://images.unsplash.com/photo-1455619452474-d2be8b1e70cd?w=600&q=80",
        categoryId: "veg",
        isVeg: true,
        isSpicy: true,
    },

    // Non-Vegetarian
    {
        id: "n1",
        name: "Butter Chicken",
        description: "Tender tandoori chicken in creamy tomato makhani sauce",
        price: 545,
        image: "https://images.unsplash.com/photo-1603894584373-5ac82b2ae398?w=600&q=80",
        categoryId: "nonveg",
        isVeg: false,
        isBestSeller: true,
    },
    {
        id: "n2",
        name: "Lamb Rogan Josh",
        description: "Kashmiri slow-cooked lamb in rich aromatic red curry",
        price: 695,
        image: "https://images.unsplash.com/photo-1545247181-516773cae754?w=600&q=80",
        categoryId: "nonveg",
        isVeg: false,
        isSpicy: true,
    },
    {
        id: "n3",
        name: "Grilled Salmon",
        description: "Norwegian salmon with lemon dill sauce and asparagus",
        price: 895,
        image: "https://images.unsplash.com/photo-1467003909585-2f8a72700288?w=600&q=80",
        categoryId: "nonveg",
        isVeg: false,
        isChefsPick: true,
    },
    {
        id: "n4",
        name: "Chicken Biryani",
        description: "Hyderabadi dum biryani with saffron, spices, and raita",
        price: 545,
        image: "https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?w=600&q=80",
        categoryId: "nonveg",
        isVeg: false,
        isBestSeller: true,
    },

    // Desserts
    {
        id: "d1",
        name: "Molten Chocolate Lava Cake",
        description: "Warm dark chocolate cake with flowing center and vanilla gelato",
        price: 395,
        image: "https://images.unsplash.com/photo-1624353365286-3f8d62daad51?w=600&q=80",
        categoryId: "desserts",
        isVeg: true,
        isBestSeller: true,
    },
    {
        id: "d2",
        name: "Saffron Rasmalai",
        description: "Soft cottage cheese dumplings in cardamom-saffron milk",
        price: 295,
        image: "https://images.unsplash.com/photo-1567337710282-00832b415979?w=600&q=80",
        categoryId: "desserts",
        isVeg: true,
    },
    {
        id: "d3",
        name: "Tiramisu",
        description: "Classic Italian mascarpone layers with espresso and cocoa",
        price: 445,
        image: "https://images.unsplash.com/photo-1571877227200-a0d98ea607e9?w=600&q=80",
        categoryId: "desserts",
        isVeg: true,
        isChefsPick: true,
    },

    // Drinks
    {
        id: "b1",
        name: "Mango Lassi",
        description: "Creamy yogurt smoothie with Alphonso mango and cardamom",
        price: 195,
        image: "https://images.unsplash.com/photo-1527661591475-527312dd65f5?w=600&q=80",
        categoryId: "drinks",
        isVeg: true,
        isBestSeller: true,
    },
    {
        id: "b2",
        name: "Rose Petal Mojito",
        description: "Refreshing mint and rose mocktail with lime and soda",
        price: 245,
        image: "https://images.unsplash.com/photo-1551538827-9c037cb4f32a?w=600&q=80",
        categoryId: "drinks",
        isVeg: true,
    },
    {
        id: "b3",
        name: "Masala Chai",
        description: "Spiced Indian tea brewed with ginger, cardamom, and cinnamon",
        price: 145,
        image: "https://images.unsplash.com/photo-1564890369478-c89ca6d9cde9?w=600&q=80",
        categoryId: "drinks",
        isVeg: true,
    },

    // Chef's Special
    {
        id: "sp1",
        name: "Wagyu Beef Tenderloin",
        description: "A5 Japanese Wagyu with black garlic purée and truffle jus",
        price: 2495,
        image: "https://images.unsplash.com/photo-1558030006-450675393462?w=600&q=80",
        categoryId: "special",
        isVeg: false,
        isChefsPick: true,
    },
    {
        id: "sp2",
        name: "Lobster Thermidor",
        description: "Whole Maine lobster with cognac cream sauce and gruyère",
        price: 1895,
        image: "https://images.unsplash.com/photo-1559737558-2f5a35f4523b?w=600&q=80",
        categoryId: "special",
        isVeg: false,
        isChefsPick: true,
    },
    {
        id: "sp3",
        name: "Tasting Menu Experience",
        description: "7-course culinary journey curated by our executive chef",
        price: 3995,
        image: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=600&q=80",
        categoryId: "special",
        isVeg: false,
        isChefsPick: true,
        isBestSeller: true,
    },
];

// Helper function to get items by category
export const getMenuItemsByCategory = (categoryId: string): MenuItem[] => {
    return menuItems.filter((item) => item.categoryId === categoryId);
};

// Restaurant Info
export const restaurantInfo = {
    name: "Saffron & Spice",
    tagline: "Where Every Dish Tells a Story",
    heroImage: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=1600&q=80",
};
