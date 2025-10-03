import React from 'react';
import { Search, X } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

interface HomeSearchBoxProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
}

export const HomeSearchBox: React.FC<HomeSearchBoxProps> = ({ searchQuery, setSearchQuery }) => {
  return (
    <div className="relative">
      <div className="relative group">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-[#166534] group-hover:scale-110 group-hover:rotate-12 transition-all duration-300" />
        <Input
          type="text"
          placeholder="Search products..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="pl-10 pr-10 h-12 border-2 border-[#166534] focus-visible:ring-[#166534] focus-visible:ring-2 focus-visible:border-[#166534] shadow-md hover:shadow-lg focus-visible:shadow-xl transition-all duration-300 bg-white/80 backdrop-blur-sm rounded-lg animate-fade-in"
        />
        {searchQuery && (
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setSearchQuery('')}
            className="absolute right-2 top-1/2 -translate-y-1/2 h-8 w-8 p-0 hover:bg-[#166534]/10 animate-scale-in"
          >
            <X className="h-4 w-4 text-[#166534]" />
          </Button>
        )}
      </div>
    </div>
  );
};
