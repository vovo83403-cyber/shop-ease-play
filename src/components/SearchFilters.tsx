import React from 'react';
import { Button } from '@/components/ui/button';

interface SearchFiltersProps {
  selectedCategory: string;
  onCategoryChange: (category: string) => void;
  priceRange: string;
  onPriceRangeChange: (range: string) => void;
  sortBy: string;
  onSortByChange: (sort: string) => void;
  categories: string[];
}

const priceRanges = [
  { label: 'All Prices', value: 'all' },
  { label: 'Under ৳50', value: '0-50' },
  { label: '৳50 - ৳200', value: '50-200' },
  { label: '৳200 - ৳500', value: '200-500' },
  { label: '৳500 - ৳1000', value: '500-1000' },
  { label: 'Above ৳1000', value: '1000+' }
];

const sortOptions = [
  { label: 'Name', value: 'name' },
  { label: 'Price: Low to High', value: 'price-low' },
  { label: 'Price: High to Low', value: 'price-high' },
  { label: 'Rating', value: 'rating' }
];

export const SearchFilters: React.FC<SearchFiltersProps> = ({
  selectedCategory,
  onCategoryChange,
  priceRange,
  onPriceRangeChange,
  sortBy,
  onSortByChange,
  categories
}) => {
  return (
    <div className="space-y-3">
      {/* Category Filter */}
      <div>
        <h3 className="text-xs font-medium text-muted-foreground mb-2 px-4">Category</h3>
        <div className="flex gap-2 overflow-x-auto pb-2 px-4 scrollbar-hide">
          {categories.map((category) => (
            <Button
              key={category}
              variant={selectedCategory === category ? 'default' : 'outline'}
              size="sm"
              onClick={() => onCategoryChange(category)}
              className="whitespace-nowrap shrink-0"
            >
              {category}
            </Button>
          ))}
        </div>
      </div>

      {/* Price Range Filter */}
      <div>
        <h3 className="text-xs font-medium text-muted-foreground mb-2 px-4">Price Range</h3>
        <div className="flex gap-2 overflow-x-auto pb-2 px-4 scrollbar-hide">
          {priceRanges.map((range) => (
            <Button
              key={range.value}
              variant={priceRange === range.value ? 'default' : 'outline'}
              size="sm"
              onClick={() => onPriceRangeChange(range.value)}
              className="whitespace-nowrap shrink-0"
            >
              {range.label}
            </Button>
          ))}
        </div>
      </div>

      {/* Sort By Filter */}
      <div>
        <h3 className="text-xs font-medium text-muted-foreground mb-2 px-4">Sort By</h3>
        <div className="flex gap-2 overflow-x-auto pb-2 px-4 scrollbar-hide">
          {sortOptions.map((option) => (
            <Button
              key={option.value}
              variant={sortBy === option.value ? 'default' : 'outline'}
              size="sm"
              onClick={() => onSortByChange(option.value)}
              className="whitespace-nowrap shrink-0"
            >
              {option.label}
            </Button>
          ))}
        </div>
      </div>
    </div>
  );
};
