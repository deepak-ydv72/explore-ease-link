import { Outlet, Link } from 'react-router-dom';
import { Plus } from 'lucide-react';
import Navbar from './Navbar';
import Footer from './Footer';
import { Button } from './ui/button';

const Layout = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1">
        <Outlet />
      </main>
      <Footer />
      
      {/* Floating Action Button for Create Trip */}
      <Link 
        to="/create-trip"
        className="fixed bottom-6 right-6 z-50"
      >
        <Button 
          variant="ocean" 
          size="lg"
          className="rounded-full w-14 h-14 shadow-travel hover:shadow-glow transition-all duration-300 hover:scale-110"
        >
          <Plus className="w-6 h-6" />
        </Button>
      </Link>
    </div>
  );
};

export default Layout;