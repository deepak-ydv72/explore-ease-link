import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface TravelPackage {
  id: string;
  title: string;
  description: string;
  price: number;
  duration: string;
  location: string;
  image: string;
  category: string;
  rating: number;
  highlights: string[];
}

interface TravelState {
  packages: TravelPackage[];
  filteredPackages: TravelPackage[];
  searchTerm: string;
  selectedCategory: string;
  wishlist: string[];
  loading: boolean;
}

const initialState: TravelState = {
  packages: [
    {
      id: '1',
      title: 'Alpine Adventure',
      description: 'Experience breathtaking mountain peaks and pristine alpine lakes in this unforgettable adventure.',
      price: 1299,
      duration: '7 days',
      location: 'Swiss Alps',
      image: '/src/assets/destination-mountains.jpg',
      category: 'Adventure',
      rating: 4.8,
      highlights: ['Mountain hiking', 'Cable car rides', 'Alpine cuisine', 'Photography tours']
    },
    {
      id: '2',
      title: 'Historic European Cities',
      description: 'Discover the rich history and stunning architecture of Europe\'s most beautiful cities.',
      price: 899,
      duration: '5 days',
      location: 'Prague, Czech Republic',
      image: '/src/assets/destination-city.jpg',
      category: 'Cultural',
      rating: 4.6,
      highlights: ['Historic tours', 'Local cuisine', 'Architecture', 'Cultural experiences']
    },
    {
      id: '3',
      title: 'Tropical Paradise',
      description: 'Immerse yourself in lush rainforests, exotic wildlife, and stunning waterfalls.',
      price: 1599,
      duration: '10 days',
      location: 'Costa Rica',
      image: '/src/assets/destination-jungle.jpg',
      category: 'Nature',
      rating: 4.9,
      highlights: ['Wildlife spotting', 'Waterfall hikes', 'Canopy tours', 'Beach relaxation']
    }
  ],
  filteredPackages: [],
  searchTerm: '',
  selectedCategory: 'All',
  wishlist: [],
  loading: false,
};

const travelSlice = createSlice({
  name: 'travel',
  initialState,
  reducers: {
    setSearchTerm: (state, action: PayloadAction<string>) => {
      state.searchTerm = action.payload;
      state.filteredPackages = filterPackages(state);
    },
    setSelectedCategory: (state, action: PayloadAction<string>) => {
      state.selectedCategory = action.payload;
      state.filteredPackages = filterPackages(state);
    },
    addToWishlist: (state, action: PayloadAction<string>) => {
      if (!state.wishlist.includes(action.payload)) {
        state.wishlist.push(action.payload);
      }
    },
    removeFromWishlist: (state, action: PayloadAction<string>) => {
      state.wishlist = state.wishlist.filter(id => id !== action.payload);
    },
    initializeFilter: (state) => {
      state.filteredPackages = state.packages;
    },
  },
});

function filterPackages(state: TravelState): TravelPackage[] {
  let filtered = state.packages;

  if (state.selectedCategory !== 'All') {
    filtered = filtered.filter(pkg => pkg.category === state.selectedCategory);
  }

  if (state.searchTerm) {
    filtered = filtered.filter(pkg =>
      pkg.title.toLowerCase().includes(state.searchTerm.toLowerCase()) ||
      pkg.location.toLowerCase().includes(state.searchTerm.toLowerCase()) ||
      pkg.description.toLowerCase().includes(state.searchTerm.toLowerCase())
    );
  }

  return filtered;
}

export const { 
  setSearchTerm, 
  setSelectedCategory, 
  addToWishlist, 
  removeFromWishlist,
  initializeFilter
} = travelSlice.actions;

export default travelSlice.reducer;