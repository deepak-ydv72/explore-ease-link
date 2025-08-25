import { useLocation, Link } from "react-router-dom";
import { useEffect } from "react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary/5 to-secondary/5">
      <div className="text-center max-w-md mx-auto px-4">
        <div className="text-8xl font-bold text-primary mb-4">404</div>
        <h1 className="text-3xl font-bold mb-4">Page Not Found</h1>
        <p className="text-muted-foreground mb-8">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <div className="space-y-4">
          <Link to="/">
            <button className="bg-gradient-ocean text-white px-6 py-3 rounded-lg hover:shadow-glow transition-all">
              Return to Home
            </button>
          </Link>
          <div>
            <Link to="/travel" className="text-primary hover:underline">
              Browse Destinations
            </Link>
            {" • "}
            <Link to="/chat" className="text-primary hover:underline">
              Get Support
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
