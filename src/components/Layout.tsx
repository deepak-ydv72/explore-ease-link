import { Outlet, Link, useLocation } from 'react-router-dom';
import { Plus } from 'lucide-react';
import Navbar from './Navbar';
import Footer from './Footer';
import { Button } from './ui/button';

const Layout = () => {
  const location = useLocation();
  const isCreateTripPage = location.pathname === '/create-trip';

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1">
        <Outlet />
      </main>
      <Footer />
      
      {/* Floating Action Button for Create Trip - Hidden on create-trip page */}
      {!isCreateTripPage && (
        <Link 
          to="create-trip"
          className="fixed bottom-8 right-8 z-50"
        >
          <Button 
            variant="ocean" 
            className="rounded-full w-16 h-16 p-0 shadow-travel hover:shadow-glow transition-all duration-300 hover:scale-110"
          >
            <Plus className="w-7 h-7" />
          </Button>
        </Link>
      )}
    </div>
  );
};

export default Layout;