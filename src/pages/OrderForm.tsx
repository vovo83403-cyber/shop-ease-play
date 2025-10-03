import React from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { TopNavigation, BottomNavigation } from '@/components/Navigation';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';

const OrderForm: React.FC = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  
  const productName = searchParams.get('name') || '';
  const productId = searchParams.get('id') || '';
  const quantity = searchParams.get('quantity') || '1';
  const price = searchParams.get('price') || '';

  // Copy product details to clipboard
  React.useEffect(() => {
    const formData = `Product: ${productName}\nProduct ID: ${productId}\nQuantity: ${quantity}\nPrice: ৳${price}`;
    navigator.clipboard.writeText(formData).catch(() => {
      console.log('Could not copy to clipboard');
    });
  }, [productName, productId, quantity, price]);

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <TopNavigation 
        title="Order Form" 
        showBack={true}
        showWishlist={false}
        showCart={false}
      />
      
      <main className="flex-1 pb-20 md:pb-8">
        <div className="container mx-auto px-4 py-6">
          <div className="bg-card rounded-lg shadow-lg p-4 mb-4">
            <h2 className="font-inter font-semibold text-lg mb-2">Product Details (Copied to Clipboard)</h2>
            <div className="space-y-1 text-sm text-muted-foreground">
              <p><span className="font-medium">Product:</span> {productName}</p>
              <p><span className="font-medium">Product ID:</span> {productId}</p>
              <p><span className="font-medium">Quantity:</span> {quantity}</p>
              <p><span className="font-medium">Price:</span> ৳{price}</p>
            </div>
          </div>

          {/* Google Form Embed */}
          <div className="bg-card rounded-lg shadow-lg overflow-hidden">
            <iframe 
              src="https://docs.google.com/forms/d/e/1FAIpQLSdZgov7x1FOD6teCXeqV-9b7nmv6iVxbT_4Z037Xpg4bY56xQ/viewform?embedded=true"
              width="100%" 
              height="1072" 
              frameBorder="0" 
              marginHeight={0} 
              marginWidth={0}
              className="w-full"
            >
              Loading…
            </iframe>
          </div>

          {/* Back Button */}
          <div className="mt-6 mb-24 flex justify-center">
            <Button
              onClick={() => navigate(-1)}
              className="bg-[#166534] hover:bg-[#166534]/90 text-white"
              size="lg"
            >
              <ArrowLeft className="h-5 w-5 mr-2" />
              Go Back
            </Button>
          </div>
        </div>
      </main>

      <BottomNavigation />
    </div>
  );
};

export default OrderForm;
