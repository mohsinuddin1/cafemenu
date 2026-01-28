"use client";

import { useState, useCallback, useMemo } from "react";
import Hero from "@/components/Hero";
import CategoryNav from "@/components/CategoryNav";
import MenuSection from "@/components/MenuSection";
import SearchFilter from "@/components/SearchFilter";
import DynamicBackground from "@/components/DynamicBackground";
import ScrollProgress from "@/components/ScrollProgress";
import SpinWheel from "@/components/SpinWheel";
import { useScrollSpy } from "@/hooks/useScrollSpy";
import { categories, menuItems, getMenuItemsByCategory, MenuItem, Category } from "@/data/menu";

export default function MenuPage() {
    const categoryIds = useMemo(() => categories.map((c) => c.id), []);
    const { activeSection, scrollToSection } = useScrollSpy(categoryIds, {
        offset: 180,
    });

    const [filteredItems, setFilteredItems] = useState<MenuItem[]>(menuItems);
    const [isFiltering, setIsFiltering] = useState(false);

    // Get active category object
    const activeCategory: Category | undefined = useMemo(
        () => categories.find((c) => c.id === activeSection),
        [activeSection]
    );

    // Handle category change from nav
    const handleCategoryChange = useCallback(
        (categoryId: string) => {
            scrollToSection(categoryId);
        },
        [scrollToSection]
    );

    // Handle filtered items from search
    const handleFilteredItems = useCallback((items: MenuItem[]) => {
        setFilteredItems(items);
        setIsFiltering(items.length !== menuItems.length);
    }, []);

    // Get items to display per category
    const getItemsForSection = useCallback(
        (categoryId: string) => {
            if (isFiltering) {
                return filteredItems.filter((item) => item.categoryId === categoryId);
            }
            return getMenuItemsByCategory(categoryId);
        },
        [filteredItems, isFiltering]
    );

    // Check if any results exist when filtering
    const hasResults = useMemo(() => {
        if (!isFiltering) return true;
        return categories.some(
            (cat) => filteredItems.filter((item) => item.categoryId === cat.id).length > 0
        );
    }, [isFiltering, filteredItems]);

    return (
        <main className="relative min-h-screen bg-dark-900">
            {/* Scroll Progress */}
            <ScrollProgress />

            {/* Spin Wheel Game */}
            <SpinWheel />

            {/* Dynamic Background */}
            <DynamicBackground activeCategory={activeCategory} />

            {/* Hero Section */}
            <Hero />

            {/* Content Container */}
            <div className="relative z-10">
                {/* Sticky Category Navigation */}
                <CategoryNav
                    activeCategory={activeSection}
                    onCategoryChange={handleCategoryChange}
                />

                {/* Search & Filters */}
                <SearchFilter
                    items={menuItems}
                    onFilteredItems={handleFilteredItems}
                />

                {/* Menu Content */}
                <div className="px-4 md:px-6 lg:px-8 max-w-7xl mx-auto pb-20">
                    {/* No Results State */}
                    {!hasResults && (
                        <div className="py-20 text-center">
                            <div className="text-6xl mb-4">🍽️</div>
                            <h3 className="text-xl font-semibold text-white mb-2">
                                No dishes found
                            </h3>
                            <p className="text-white/60">
                                Try adjusting your search or filters
                            </p>
                        </div>
                    )}

                    {/* Menu Sections */}
                    {categories.map((category) => {
                        const sectionItems = getItemsForSection(category.id);
                        if (sectionItems.length === 0 && isFiltering) return null;

                        return (
                            <MenuSection
                                key={category.id}
                                category={category}
                                items={sectionItems}
                            />
                        );
                    })}

                    {/* Footer with Contact Info */}
                    <footer className="mt-12 sm:mt-16 pt-8 border-t border-white/10">
                        {/* Restaurant Info */}
                        <div className="text-center mb-8">
                            <h3 className="font-display text-2xl font-bold text-accent-gold mb-2">
                                Saffron & Spice
                            </h3>
                            <p className="text-white/60 text-sm">
                                Where Every Dish Tells a Story
                            </p>
                        </div>

                        {/* Contact Cards */}
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
                            {/* Address */}
                            <div className="bg-dark-700 rounded-xl p-4 text-center border border-white/5">
                                <div className="text-2xl mb-2">📍</div>
                                <h4 className="text-white font-medium text-sm mb-1">Visit Us</h4>
                                <p className="text-white/50 text-xs leading-relaxed">
                                    123, MG Road, Connaught Place<br />
                                    New Delhi - 110001
                                </p>
                            </div>

                            {/* Phone */}
                            <a
                                href="tel:+919876543210"
                                className="bg-dark-700 rounded-xl p-4 text-center border border-white/5 hover:border-accent-gold/30 transition-colors"
                            >
                                <div className="text-2xl mb-2">📞</div>
                                <h4 className="text-white font-medium text-sm mb-1">Call Us</h4>
                                <p className="text-accent-gold text-sm font-medium">
                                    +91 98765 43210
                                </p>
                            </a>

                            {/* WhatsApp */}
                            <a
                                href="https://wa.me/919876543210?text=Hi! I'd like to make a reservation."
                                target="_blank"
                                rel="noopener noreferrer"
                                className="bg-dark-700 rounded-xl p-4 text-center border border-white/5 hover:border-green-500/30 transition-colors"
                            >
                                <div className="text-2xl mb-2">💬</div>
                                <h4 className="text-white font-medium text-sm mb-1">WhatsApp</h4>
                                <p className="text-green-500 text-sm font-medium">
                                    +91 98765 43210
                                </p>
                            </a>
                        </div>

                        {/* Opening Hours */}
                        <div className="text-center mb-8 py-4 bg-dark-700/50 rounded-xl border border-white/5">
                            <p className="text-white/40 text-xs uppercase tracking-wider mb-2">Opening Hours</p>
                            <p className="text-white text-sm">
                                Mon - Sun: <span className="text-accent-gold">12:00 PM - 11:00 PM</span>
                            </p>
                        </div>

                        {/* Social Links */}
                        <div className="flex justify-center gap-4 mb-8">
                            <a
                                href="https://instagram.com"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="w-10 h-10 rounded-full bg-dark-600 flex items-center justify-center text-white/60 hover:text-pink-500 hover:bg-dark-700 transition-all"
                            >
                                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                                </svg>
                            </a>
                            <a
                                href="https://facebook.com"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="w-10 h-10 rounded-full bg-dark-600 flex items-center justify-center text-white/60 hover:text-blue-500 hover:bg-dark-700 transition-all"
                            >
                                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                                </svg>
                            </a>
                            <a
                                href="https://twitter.com"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="w-10 h-10 rounded-full bg-dark-600 flex items-center justify-center text-white/60 hover:text-sky-500 hover:bg-dark-700 transition-all"
                            >
                                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z" />
                                </svg>
                            </a>
                        </div>

                        {/* Bottom Bar */}
                        <div className="text-center pt-6 border-t border-white/5">
                            <p className="text-white/40 text-xs">
                                Made with ❤️ by Saffron & Spice
                            </p>
                            <p className="text-white/30 text-[10px] mt-2">
                                Prices are inclusive of all taxes. Menu items subject to availability.
                            </p>
                            <p className="text-white/20 text-[10px] mt-1">
                                © 2026 Saffron & Spice. All rights reserved.
                            </p>
                        </div>
                    </footer>
                </div>
            </div>
        </main>
    );
}
