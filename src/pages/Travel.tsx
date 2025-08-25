import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Search, Filter, Heart, Star, MapPin, Clock, Users } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { RootState } from '@/store/store';
import { setSearchTerm, setSelectedCategory, addToWishlist, removeFromWishlist, initializeFilter } from '@/store/slices/travelSlice';

const Travel = () => {
  const dispatch = useDispatch();
  const { filteredPackages, searchTerm, selectedCategory, wishlist } = useSelector((state: RootState) => state.travel);
  const [sortBy, setSortBy] = useState('price-low');

  useEffect(() => {
    dispatch(initializeFilter());
  }, [dispatch]);

  const handleSearch = (value: string) => {
    dispatch(setSearchTerm(value));
  };

  const handleCategoryChange = (category: string) => {
    dispatch(setSelectedCategory(category));
  };

  const toggleWishlist = (packageId: string) => {
    if (wishlist.includes(packageId)) {
      dispatch(removeFromWishlist(packageId));
    } else {
      dispatch(addToWishlist(packageId));
    }
  };

  const sortedPackages = [...filteredPackages].sort((a, b) => {
    switch (sortBy) {
      case 'price-low':
        return a.price - b.price;
      case 'price-high':
        return b.price - a.price;
      case 'rating':
        return b.rating - a.rating;
      default:
        return 0;
    }
  });

  const categories = ['All', 'Adventure', 'Cultural', 'Nature', 'Luxury', 'Budget'];

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="bg-gradient-ocean py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Discover Your Next Adventure
          </h1>
          <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
            Explore our handpicked travel experiences and find your perfect getaway
          </p>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Search and Filters */}
        <div className="bg-card rounded-lg shadow-card p-6 mb-8 -mt-8 relative z-10">
          <div className="flex flex-col lg:flex-row gap-4 items-center">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-5 h-5" />
              <Input
                placeholder="Search destinations, activities..."
                value={searchTerm}
                onChange={(e) => handleSearch(e.target.value)}
                className="pl-10"
              />
            </div>
            
            <Select value={selectedCategory} onValueChange={handleCategoryChange}>
              <SelectTrigger className="w-full lg:w-48">
                <Filter className="w-4 h-4 mr-2" />
                <SelectValue placeholder="Category" />
              </SelectTrigger>
              <SelectContent>
                {categories.map((category) => (
                  <SelectItem key={category} value={category}>
                    {category}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger className="w-full lg:w-48">
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="price-low">Price: Low to High</SelectItem>
                <SelectItem value="price-high">Price: High to Low</SelectItem>
                <SelectItem value="rating">Highest Rated</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Results Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-2xl font-semibold mb-2">
              {filteredPackages.length} Travel Packages Found
            </h2>
            {searchTerm && (
              <p className="text-muted-foreground">
                Showing results for "{searchTerm}"
                {selectedCategory !== 'All' && ` in ${selectedCategory}`}
              </p>
            )}
          </div>
        </div>

        {/* Travel Packages Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {sortedPackages.map((pkg) => (
            <Card key={pkg.id} className="group hover:shadow-travel transition-all duration-300 overflow-hidden">
              <div className="relative">
                <img
                  src={pkg.image}
                  alt={pkg.title}
                  className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
                />
                
                {/* Wishlist Button */}
                <Button
                  variant="outline"
                  size="sm"
                  className="absolute top-4 right-4 w-10 h-10 p-0 bg-background/80 backdrop-blur-sm hover:bg-background"
                  onClick={() => toggleWishlist(pkg.id)}
                >
                  <Heart 
                    className={`w-4 h-4 ${wishlist.includes(pkg.id) ? 'fill-red-500 text-red-500' : 'text-muted-foreground'}`}
                  />
                </Button>

                {/* Price Badge */}
                <div className="absolute bottom-4 left-4 bg-warning text-warning-foreground px-3 py-2 rounded-lg font-semibold">
                  ${pkg.price}
                </div>

                {/* Rating */}
                <div className="absolute bottom-4 right-4 bg-background/90 backdrop-blur-sm px-2 py-1 rounded-lg flex items-center space-x-1">
                  <Star className="w-4 h-4 fill-warning text-warning" />
                  <span className="text-sm font-medium">{pkg.rating}</span>
                </div>
              </div>

              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <h3 className="text-xl font-semibold group-hover:text-primary transition-colors">
                      {pkg.title}
                    </h3>
                    <div className="flex items-center text-muted-foreground mt-1">
                      <MapPin className="w-4 h-4 mr-1" />
                      <span className="text-sm">{pkg.location}</span>
                    </div>
                  </div>
                  <Badge variant="secondary">{pkg.category}</Badge>
                </div>
              </CardHeader>

              <CardContent>
                <p className="text-muted-foreground mb-4 line-clamp-3">
                  {pkg.description}
                </p>

                <div className="space-y-3">
                  {/* Duration */}
                  <div className="flex items-center text-sm text-muted-foreground">
                    <Clock className="w-4 h-4 mr-2" />
                    <span>{pkg.duration}</span>
                  </div>

                  {/* Highlights */}
                  <div className="flex flex-wrap gap-1">
                    {pkg.highlights.slice(0, 3).map((highlight, index) => (
                      <span
                        key={index}
                        className="text-xs bg-muted text-muted-foreground px-2 py-1 rounded-full"
                      >
                        {highlight}
                      </span>
                    ))}
                    {pkg.highlights.length > 3 && (
                      <span className="text-xs text-muted-foreground px-2 py-1">
                        +{pkg.highlights.length - 3} more
                      </span>
                    )}
                  </div>

                  {/* Book Button */}
                  <Button className="w-full" variant="ocean">
                    <Users className="w-4 h-4 mr-2" />
                    Book Now
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* No Results */}
        {sortedPackages.length === 0 && (
          <div className="text-center py-16">
            <div className="w-24 h-24 bg-muted rounded-full flex items-center justify-center mx-auto mb-6">
              <Search className="w-12 h-12 text-muted-foreground" />
            </div>
            <h3 className="text-2xl font-semibold mb-4">No packages found</h3>
            <p className="text-muted-foreground mb-8">
              Try adjusting your search criteria or browse all destinations
            </p>
            <Button onClick={() => {
              dispatch(setSearchTerm(''));
              dispatch(setSelectedCategory('All'));
            }}>
              Show All Packages
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Travel;