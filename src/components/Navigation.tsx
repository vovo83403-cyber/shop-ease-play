import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Heart, ShoppingCart, ArrowLeft, Home, Phone, Download, Search } from 'lucide-react';
import { useApp } from '@/context/AppContext';
import { Button } from '@/components/ui/button';

interface TopNavProps {
  title?: string;
  showBack?: boolean;
  showSearch?: boolean;
  showWishlist?: boolean;
  showCart?: boolean;
}

export const TopNavigation: React.FC<TopNavProps> = ({
  title = 'ZupraMart',
  showBack = false,
  showSearch = true,
  showWishlist = true,
  showCart = true
}) => {
  const { cart, wishlist } = useApp();
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null);
  const [isInstalled, setIsInstalled] = useState(false);

  useEffect(() => {
    // Check if app is already installed
    if (window.matchMedia('(display-mode: standalone)').matches || 
        window.matchMedia('(display-mode: fullscreen)').matches) {
      setIsInstalled(true);
    }

    const handler = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e);
    };

    window.addEventListener('beforeinstallprompt', handler);
    
    window.addEventListener('appinstalled', () => {
      setIsInstalled(true);
      setDeferredPrompt(null);
    });

    return () => {
      window.removeEventListener('beforeinstallprompt', handler);
    };
  }, []);

  const handleInstallClick = async () => {
    if (!deferredPrompt) return;

    deferredPrompt.prompt();
    const { outcome } = await deferredPrompt.userChoice;
    
    if (outcome === 'accepted') {
      setDeferredPrompt(null);
    }
  };

  const isHomePage = title === 'ZupraMart' && !showBack;
  
  return (
    <header className="sticky top-0 z-40 w-full bg-background border-b">
      <div className="container mx-auto px-4 h-14 flex items-center justify-between">
        <div className="flex items-center gap-3">
          {showBack && (
            <Button variant="ghost" size="sm" asChild>
              <Link to="/" className="p-2">
                <ArrowLeft className="h-5 w-5" />
              </Link>
            </Button>
          )}
          {isHomePage ? (
            <h1 className="font-inter font-semibold text-lg">
              <span className="text-foreground">Zupra</span>
              <span className="text-[#166534]">Mart</span>
            </h1>
          ) : (
            <h1 className="font-inter font-semibold text-lg text-foreground">{title}</h1>
          )}
        </div>
        
        <div className="flex items-center gap-2">
          {isHomePage && !isInstalled && deferredPrompt && (
            <Button 
              size="sm" 
              onClick={handleInstallClick} 
              className="bg-[#166534] hover:bg-[#166534]/90 text-white px-3 py-1.5 h-8 text-xs"
            >
              <Download className="h-4 w-4 mr-1" />
              Install
            </Button>
          )}
          {showWishlist && (
            <Button variant="ghost" size="sm" asChild className="relative">
              <Link to="/wishlist" className="p-2">
                <Heart className="h-5 w-5" />
                {wishlist.length > 0 && (
                  <span className="absolute -top-1 -right-1 bg-[#166534] text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                    {wishlist.length}
                  </span>
                )}
              </Link>
            </Button>
          )}
          {showCart && (
            <Button variant="ghost" size="sm" asChild className="relative">
              <Link to="/cart" className="p-2">
                <ShoppingCart className="h-5 w-5" />
                {cart.length > 0 && (
                  <span className="absolute -top-1 -right-1 bg-[#166534] text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                    {cart.reduce((sum, item) => sum + item.quantity, 0)}
                  </span>
                )}
              </Link>
            </Button>
          )}
        </div>
      </div>
    </header>
  );
};

export const BottomNavigation: React.FC = () => {
  const location = useLocation();
  
  const navItems = [
    { href: '/', icon: Home, label: 'Home' },
    { href: '/search', icon: Search, label: 'Search' },
    { href: '/cart', icon: ShoppingCart, label: 'Cart' },
    { href: '/contact', icon: Phone, label: 'Contact' }
  ];
  
  return (
    <nav className="fixed bottom-0 left-0 right-0 z-40 bg-background border-t">
      <div className="flex items-center justify-around h-16">
        {navItems.map(({ href, icon: Icon, label }) => {
          const isActive = location.pathname === href;
          return (
            <Button
              key={href}
              variant="ghost"
              size="sm"
              asChild
              className={`flex-1 flex-col h-full rounded-none ${
                isActive ? 'text-primary' : 'text-muted-foreground'
              }`}
            >
              <Link to={href}>
                <Icon className="h-5 w-5 mb-1" />
                <span className="text-xs">{label}</span>
              </Link>
            </Button>
          );
        })}
      </div>
    </nav>
  );
};
