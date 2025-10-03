import React, { useState } from 'react';
import { TopNavigation, BottomNavigation } from '@/components/Navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Phone, Facebook, Mail, MapPin, Send, CheckCircle } from 'lucide-react';
import { useApp } from '@/context/AppContext';

const Contact: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    subject: '',
    message: ''
  });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const { showAlert } = useApp();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Basic validation
    if (!formData.name || !formData.message) {
      showAlert('Please fill in all required fields', 'error');
      return;
    }

    // Email functionality
    const emailBody = `Name: ${formData.name}\nPhone: ${formData.phone}\n\nMessage:\n${formData.message}`;
    const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);

    if (isMobile) {
      const mailtoLink = `mailto:zupramart@gmail.com?subject=${encodeURIComponent(
        formData.subject || 'Contact Form Submission'
      )}&body=${encodeURIComponent(emailBody)}`;
      window.location.href = mailtoLink;
    } else {
      const gmailLink = `https://mail.google.com/mail/?view=cm&fs=1&to=zupramart@gmail.com&su=${encodeURIComponent(
        formData.subject || 'Contact Form Submission'
      )}&body=${encodeURIComponent(emailBody)}`;
      window.open(gmailLink, '_blank');
    }

    setIsSubmitted(true);
    showAlert('Email client opened! Please send your message.', 'success');

    // ফর্ম ডেটা রিসেট করবেন না যদি আপনি চান যে ইনপুট বক্সগুলো দেখাতে থাকবে
    // setFormData({
    //   name: '',
    //   phone: '',
    //   subject: '',
    //   message: ''
    // });

    setTimeout(() => {
      setIsSubmitted(false);
    }, 5000);
  };

  const handleCall = () => {
    window.open('tel:+8809638845910', '_self');
  };

  const handleFacebook = () => {
    window.open('https://facebook.com/ZupraMart', '_blank');
  };

  return (
    <div className="min-h-screen bg-background">
      <TopNavigation 
        title="Contact Us" 
        showBack={true} 
        showSearch={false}
        showWishlist={false}
        showCart={false}
      />
      
      <main className="pb-20 md:pb-8">
        <section className="container mx-auto px-4 py-6 md:py-10 space-y-8">
          {/* Logo and Welcome Section */}
          <div className="text-center space-y-4 md:space-y-6">
            <div className="flex justify-center">
              <div className="w-28 h-28 md:w-40 md:h-40 rounded-full overflow-hidden bg-card border-4 border-primary/10 shadow-lg">
                <img 
                  src="/ZupraMart.jpg" 
                  alt="ZupraMart Logo" 
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
            <h2 className="font-inter font-bold text-3xl md:text-4xl text-foreground">ZupraMart</h2>
            <p className="text-muted-foreground text-base md:text-lg max-w-2xl mx-auto">
              We're here to help you with any questions or concerns. Feel free to reach out to us anytime.
            </p>
          </div>

          {isSubmitted && (
            <div className="p-4 bg-green-100 text-green-800 rounded-lg flex items-center gap-2 mb-4">
              <CheckCircle className="h-5 w-5 text-green-600" />
              <span>Message prepared successfully! Please send from your email client.</span>
            </div>
          )}

          {/* Contact Form - সবসময় দেখাবে */}
          <Card className="max-w-2xl mx-auto shadow-lg">
            <CardHeader>
              <CardTitle className="font-inter text-xl md:text-2xl text-center">Send us a Message</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="space-y-2">
                  <Label htmlFor="name" className="text-sm">Name *</Label>
                  <Input
                    id="name"
                    name="name"
                    type="text"
                    value={formData.name}
                    onChange={handleInputChange}
                    className="h-11 border border-gray-300"
                    required
                    placeholder="Enter your name"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="phone" className="text-sm">Phone</Label>
                  <Input
                    id="phone"
                    name="phone"
                    type="tel"
                    value={formData.phone}
                    onChange={handleInputChange}
                    className="h-11 border border-gray-300"
                    placeholder="Enter your phone number"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="subject" className="text-sm">Subject</Label>
                  <Input
                    id="subject"
                    name="subject"
                    type="text"
                    value={formData.subject}
                    onChange={handleInputChange}
                    className="h-11 border border-gray-300"
                    placeholder="Enter subject"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="message" className="text-sm">Message *</Label>
                  <Textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    className="min-h-32 border border-gray-300"
                    rows={6}
                    required
                    placeholder="Enter your message"
                  />
                </div>

                <Button 
                  type="submit"
                  className="w-full h-12 bg-primary hover:bg-primary-hover text-primary-foreground flex items-center justify-center gap-2 text-base"
                >
                  <Send className="h-5 w-5" />
                  Send Message
                </Button>
              </form>
            </CardContent>
          </Card>

          {/* Contact Information */}
          <Card className="max-w-2xl mx-auto shadow-lg">
            <CardHeader>
              <CardTitle className="font-inter text-xl md:text-2xl text-center">Get in Touch</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Contact Icons */}
              <div className="flex justify-center items-center gap-6 md:gap-8">
                <button 
                  onClick={handleCall}
                  className="flex flex-col items-center gap-2 group"
                  aria-label="Call us"
                >
                  <div className="w-14 h-14 md:w-16 md:h-16 rounded-full bg-success hover:bg-success/90 text-success-foreground flex items-center justify-center shadow-lg transition-transform group-hover:scale-110">
                    <Phone className="h-6 w-6 md:h-7 md:w-7" />
                  </div>
                  <span className="text-xs md:text-sm font-medium text-muted-foreground">Call</span>
                </button>
                
                <button 
                  onClick={() => window.open('mailto:zupramart@gmail.com', '_blank')}
                  className="flex flex-col items-center gap-2 group"
                  aria-label="Email us"
                >
                  <div className="w-14 h-14 md:w-16 md:h-16 rounded-full bg-primary hover:bg-primary-hover text-primary-foreground flex items-center justify-center shadow-lg transition-transform group-hover:scale-110">
                    <Mail className="h-6 w-6 md:h-7 md:w-7" />
                  </div>
                  <span className="text-xs md:text-sm font-medium text-muted-foreground">Email</span>
                </button>
                
                <button 
                  onClick={handleFacebook}
                  className="flex flex-col items-center gap-2 group"
                  aria-label="Facebook"
                >
                  <div className="w-14 h-14 md:w-16 md:h-16 rounded-full bg-facebook hover:bg-facebook/90 text-facebook-foreground flex items-center justify-center shadow-lg transition-transform group-hover:scale-110">
                    <Facebook className="h-6 w-6 md:h-7 md:w-7" />
                  </div>
                  <span className="text-xs md:text-sm font-medium text-muted-foreground">Facebook</span>
                </button>
              </div>
              
              {/* Contact Details */}
              <div className="space-y-3 text-center pt-4 border-t">
                <div className="flex items-center justify-center gap-2 text-muted-foreground">
                  <MapPin className="h-5 w-5 text-primary" />
                  <span className="text-base">Dhaka, Bangladesh</span>
                </div>
                <div className="flex items-center justify-center gap-2 text-muted-foreground">
                  <Mail className="h-5 w-5 text-primary" />
                  <span className="text-base">zupramart@gmail.com</span>
                </div>
                <div className="flex items-center justify-center gap-2 text-muted-foreground">
                  <Phone className="h-5 w-5 text-primary" />
                  <span className="text-base">+880 963 884 5910</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </section>
      </main>

      <BottomNavigation />
    </div>
  );
};

export default Contact;
