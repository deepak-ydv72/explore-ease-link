import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { ArrowRight, Star, Users, Globe, Award } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { RootState } from '@/store/store';
import { initializeFilter } from '@/store/slices/travelSlice';
import heroImage from '@/assets/hero-travel.jpg';
import mountainsImage from '@/assets/destination-mountains.jpg';
import cityImage from '@/assets/destination-city.jpg';
import jungleImage from '@/assets/destination-jungle.jpg';

const Home = () => {
  const dispatch = useDispatch();
  const { packages } = useSelector((state: RootState) => state.travel);

  useEffect(() => {
    dispatch(initializeFilter());
  }, [dispatch]);

  const topRatedTrips = [...packages].sort((a, b) => b.rating - a.rating).slice(0, 5);

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section 
        className="relative h-screen flex items-center justify-center bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `linear-gradient(rgba(0,0,0,0.4), rgba(0,0,0,0.4)), url(${heroImage})` }}
      >
        <div className="text-center text-white px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto animate-fade-in">
          <h1 className="text-5xl md:text-7xl font-bold mb-6 animate-slide-up">
            Explore the
            <span className="bg-gradient-ocean bg-clip-text text-transparent block">
              World Together
            </span>
          </h1>
          <p className="text-xl md:text-2xl mb-8 text-gray-200 animate-slide-up" style={{ animationDelay: '0.2s' }}>
            Discover breathtaking destinations and create unforgettable memories with strangers who become friends
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center animate-slide-up" style={{ animationDelay: '0.4s' }}>
            <Link to="/travel">
              <Button variant="ocean" size="lg" className="text-lg px-8 py-4 animate-float">
                Start Your Journey
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
            </Link>
            <Button variant="outline" size="lg" className="text-white border-white hover:bg-white hover:text-primary text-lg px-8 py-4">
              Watch Video
            </Button>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <div className="w-6 h-10 border-2 border-white rounded-full flex justify-center">
            <div className="w-1 h-3 bg-white rounded-full mt-2 animate-pulse"></div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-muted/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div className="animate-fade-in">
              <div className="text-4xl font-bold text-primary mb-2">10K+</div>
              <div className="text-muted-foreground">Happy Travelers</div>
            </div>
            <div className="animate-fade-in" style={{ animationDelay: '0.1s' }}>
              <div className="text-4xl font-bold text-primary mb-2">50+</div>
              <div className="text-muted-foreground">Destinations</div>
            </div>
            <div className="animate-fade-in" style={{ animationDelay: '0.2s' }}>
              <div className="text-4xl font-bold text-primary mb-2">4.9</div>
              <div className="text-muted-foreground">Average Rating</div>
            </div>
            <div className="animate-fade-in" style={{ animationDelay: '0.3s' }}>
              <div className="text-4xl font-bold text-primary mb-2">24/7</div>
              <div className="text-muted-foreground">Support</div>
            </div>
          </div>
        </div>
      </section>

      {/* Discover Your Next Adventure */}
      <section className="py-20 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4 animate-fade-in">
              Discover Your Next Adventure
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto animate-fade-in" style={{ animationDelay: '0.1s' }}>
              Explore our top-rated destinations and embark on unforgettable journeys
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6 mb-12">
            {topRatedTrips.map((destination, index) => (
              <Card key={destination.id} className="group cursor-pointer hover:shadow-travel transition-all duration-300 overflow-hidden animate-slide-up" style={{ animationDelay: `${index * 0.1}s` }}>
                <div className="relative overflow-hidden">
                  <img 
                    src={destination.image} 
                    alt={destination.title}
                    className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute top-4 left-4 bg-warning text-warning-foreground px-3 py-1 rounded-full text-sm font-medium">
                    ${destination.price}
                  </div>
                  <div className="absolute top-4 right-4 bg-background/80 backdrop-blur-sm px-2 py-1 rounded-full flex items-center space-x-1">
                    <Star className="w-4 h-4 fill-warning text-warning" />
                    <span className="text-sm font-medium">{destination.rating}</span>
                  </div>
                </div>
                <CardContent className="p-6">
                  <h3 className="text-xl font-semibold mb-2 group-hover:text-primary transition-colors">
                    {destination.title}
                  </h3>
                  <p className="text-muted-foreground mb-4 line-clamp-2">
                    {destination.description}
                  </p>
                  <div className="flex items-center justify-between">
                    <div className="text-sm text-muted-foreground">
                      {destination.duration} • {destination.location}
                    </div>
                    <span className="text-sm bg-secondary text-secondary-foreground px-3 py-1 rounded-full">
                      {destination.category}
                    </span>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="text-center">
            <Link to="/travel">
              <Button variant="ocean" size="lg">
                View All Destinations
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-20 bg-gradient-to-br from-primary/5 to-secondary/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">Why Choose Strangers Travel?</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              We make travel accessible, affordable, and unforgettable for everyone
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center group">
              <div className="w-16 h-16 bg-gradient-ocean rounded-full flex items-center justify-center mx-auto mb-6 group-hover:shadow-glow transition-all">
                <Users className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-4">Connect with Fellow Travelers</h3>
              <p className="text-muted-foreground">
                Meet like-minded people and form lasting friendships while exploring the world together
              </p>
            </div>

            <div className="text-center group">
              <div className="w-16 h-16 bg-gradient-sunset rounded-full flex items-center justify-center mx-auto mb-6 group-hover:shadow-glow transition-all">
                <Globe className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-4">Curated Experiences</h3>
              <p className="text-muted-foreground">
                Handpicked destinations and activities designed to create memorable and authentic experiences
              </p>
            </div>

            <div className="text-center group">
              <div className="w-16 h-16 bg-gradient-sky rounded-full flex items-center justify-center mx-auto mb-6 group-hover:shadow-glow transition-all">
                <Award className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-4">Best Price Guarantee</h3>
              <p className="text-muted-foreground">
                Competitive prices with no hidden fees. If you find a better deal, we'll match it
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">What Travelers Say</h2>
            <p className="text-xl text-muted-foreground">
              Real experiences from real travelers
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="p-6 hover:shadow-card transition-all">
              <div className="flex items-center mb-4">
                <div className="flex text-warning">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star key={star} className="w-5 h-5 fill-current" />
                  ))}
                </div>
              </div>
              <blockquote className="text-muted-foreground mb-4">
                "Amazing experience! Met incredible people and saw breathtaking places. The Alpine Adventure exceeded all expectations."
              </blockquote>
              <div className="flex items-center">
                <div className="w-10 h-10 bg-gradient-ocean rounded-full flex items-center justify-center text-white font-semibold">
                  S
                </div>
                <div className="ml-3">
                  <div className="font-semibold">Sarah Johnson</div>
                  <div className="text-sm text-muted-foreground">Verified Traveler</div>
                </div>
              </div>
            </Card>

            <Card className="p-6 hover:shadow-card transition-all">
              <div className="flex items-center mb-4">
                <div className="flex text-warning">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star key={star} className="w-5 h-5 fill-current" />
                  ))}
                </div>
              </div>
              <blockquote className="text-muted-foreground mb-4">
                "The best travel experience I've ever had. Professional guides, amazing group, and unforgettable memories."
              </blockquote>
              <div className="flex items-center">
                <div className="w-10 h-10 bg-gradient-sunset rounded-full flex items-center justify-center text-white font-semibold">
                  M
                </div>
                <div className="ml-3">
                  <div className="font-semibold">Michael Chen</div>
                  <div className="text-sm text-muted-foreground">Verified Traveler</div>
                </div>
              </div>
            </Card>

            <Card className="p-6 hover:shadow-card transition-all">
              <div className="flex items-center mb-4">
                <div className="flex text-warning">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star key={star} className="w-5 h-5 fill-current" />
                  ))}
                </div>
              </div>
              <blockquote className="text-muted-foreground mb-4">
                "Perfectly organized trip with great attention to detail. Made lifelong friends and memories to cherish forever."
              </blockquote>
              <div className="flex items-center">
                <div className="w-10 h-10 bg-gradient-sky rounded-full flex items-center justify-center text-white font-semibold">
                  E
                </div>
                <div className="ml-3">
                  <div className="font-semibold">Emily Rodriguez</div>
                  <div className="text-sm text-muted-foreground">Verified Traveler</div>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-ocean">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold text-white mb-6">
            Ready to Start Your Adventure?
          </h2>
          <p className="text-xl text-white/90 mb-8">
            Join thousands of travelers who have discovered the world with us
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/travel">
              <Button size="lg" variant="outline" className="bg-white text-primary hover:bg-gray-100 border-white">
                Browse Destinations
              </Button>
            </Link>
            <Link to="/register">
              <Button size="lg" className="bg-white/20 text-white hover:bg-white/30 border border-white/30">
                Sign Up Now
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;