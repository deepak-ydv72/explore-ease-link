import { Link } from 'react-router-dom';
import { MapPin, Mail, Phone, Facebook, Twitter, Instagram } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

const Footer = () => {
  return (
    <footer className="bg-card border-t">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand Section */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-ocean rounded-lg flex items-center justify-center">
                <MapPin className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold bg-gradient-ocean bg-clip-text text-transparent">
                Strangers Travel
              </span>
            </div>
            <p className="text-muted-foreground text-sm">
              Discover amazing destinations and create unforgettable memories with our curated travel experiences.
            </p>
            <div className="flex space-x-3">
              <Button variant="outline" size="sm" className="w-9 h-9 p-0">
                <Facebook className="w-4 h-4" />
              </Button>
              <Button variant="outline" size="sm" className="w-9 h-9 p-0">
                <Twitter className="w-4 h-4" />
              </Button>
              <Button variant="outline" size="sm" className="w-9 h-9 p-0">
                <Instagram className="w-4 h-4" />
              </Button>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="font-semibold text-foreground">Quick Links</h3>
            <div className="space-y-2">
              <Link to="/" className="block text-muted-foreground hover:text-primary transition-colors">
                Home
              </Link>
              <Link to="/travel" className="block text-muted-foreground hover:text-primary transition-colors">
                Travel Packages
              </Link>
              <Link to="/chat" className="block text-muted-foreground hover:text-primary transition-colors">
                Support
              </Link>
              <Link to="/about" className="block text-muted-foreground hover:text-primary transition-colors">
                About Us
              </Link>
            </div>
          </div>

          {/* Support */}
          <div className="space-y-4">
            <h3 className="font-semibold text-foreground">Support</h3>
            <div className="space-y-2">
              <a href="#" className="block text-muted-foreground hover:text-primary transition-colors">
                Help Center
              </a>
              <a href="#" className="block text-muted-foreground hover:text-primary transition-colors">
                Booking Policy
              </a>
              <a href="#" className="block text-muted-foreground hover:text-primary transition-colors">
                Cancellation
              </a>
              <a href="#" className="block text-muted-foreground hover:text-primary transition-colors">
                Terms & Conditions
              </a>
            </div>
          </div>

          {/* Newsletter */}
          <div className="space-y-4">
            <h3 className="font-semibold text-foreground">Stay Updated</h3>
            <p className="text-muted-foreground text-sm">
              Get the latest travel deals and destination updates.
            </p>
            <div className="space-y-2">
              <Input placeholder="Enter your email" className="text-sm" />
              <Button variant="ocean" className="w-full">
                Subscribe
              </Button>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="mt-12 pt-8 border-t border-border">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="text-muted-foreground text-sm">
              © 2024 Strangers Travel. All rights reserved.
            </p>
            <div className="flex items-center space-x-6 text-sm text-muted-foreground">
              <div className="flex items-center space-x-1">
                <Mail className="w-4 h-4" />
                <span>contact@strangerstravel.com</span>
              </div>
              <div className="flex items-center space-x-1">
                <Phone className="w-4 h-4" />
                <span>+1 (555) 123-4567</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;