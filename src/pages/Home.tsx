import React, { useState, useMemo } from 'react';
import { TopNavigation, BottomNavigation } from '@/components/Navigation';
import { CategoryScroll } from '@/components/CategoryScroll';
import { ProductCard } from '@/components/ProductCard';
import { ScrollToTopButton } from '@/components/ScrollToTopButton';
import { BannerCarousel } from '@/components/BannerCarousel';
import { HomeSearchBox } from '@/components/HomeSearchBox';
import { products, categories } from '@/data/products';

const Home: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredProducts = useMemo(() => {
    let filtered = products;
    
    // Filter by category
    if (selectedCategory !== 'All') {
      filtered = filtered.filter(product => product.category === selectedCategory);
    }
    
    // Filter by search query
    if (searchQuery.trim()) {
      filtered = filtered.filter(product =>
        product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.category.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
    
    return filtered;
  }, [selectedCategory, searchQuery]);

  return (
    <div className="min-h-screen bg-background">
      <TopNavigation showSearch={false} />
      
      <main className="pb-20 md:pb-8">
        {/* Desktop: Banner Left, Categories Right | Mobile: Stacked */}
        <div className="md:grid md:grid-cols-2 md:gap-4 md:container md:mx-auto md:px-4 md:py-4">
          {/* Banner Section */}
          <div className="md:order-1">
            <BannerCarousel />
            
            {/* Search Box - stays below banner */}
            <div className="px-4 py-3 md:px-0 md:pt-3">
              <HomeSearchBox searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
            </div>
          </div>

          {/* Categories Section - Desktop Only on Right */}
          <div className="hidden md:block md:order-2">
            <CategoryScroll
              categories={categories}
              selectedCategory={selectedCategory}
              onCategoryChange={setSelectedCategory}
            />
          </div>
        </div>

        {/* Mobile Categories - Full Width */}
        <section className="py-2 md:hidden">
          <CategoryScroll
            categories={categories}
            selectedCategory={selectedCategory}
            onCategoryChange={setSelectedCategory}
          />
        </section>

        {/* Products Grid */}
        <section className="container mx-auto px-4 pt-2">
          <h2 className="font-inter font-semibold text-xl mb-3">
            {selectedCategory === 'All' ? 'All Products' : selectedCategory}
          </h2>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
            {filteredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </section>
      </main>

      <ScrollToTopButton />
      <BottomNavigation />
    </div>
  );
};

export default Home;
