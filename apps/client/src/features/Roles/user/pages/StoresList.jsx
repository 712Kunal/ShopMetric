import { useState } from 'react';
import { Heart, MapPin, Star, Search, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Link } from 'react-router-dom';

const dummyStores = [
  {
    id: '1',
    name: 'Best Cafe',
    address: '123 Coffee Lane, New York, NY',
    avg_rating: 4.8,
  },
  {
    id: '2',
    name: 'Great Restaurant',
    address: '456 Food Street, Los Angeles, CA',
    avg_rating: 4.5,
  },
  {
    id: '3',
    name: 'Pizza Palace',
    address: '789 Dough Rd, Chicago, IL',
    avg_rating: 4.2,
  },
  {
    id: '4',
    name: 'Burger Haven',
    address: '321 Meat Ave, Houston, TX',
    avg_rating: 4.6,
  },
  {
    id: '5',
    name: 'Sushi Master',
    address: '654 Rice Lane, Phoenix, AZ',
    avg_rating: 4.7,
  },
  {
    id: '6',
    name: 'Taco Fiesta',
    address: '987 Tortilla Dr, Philadelphia, PA',
    avg_rating: 4.3,
  },
];

export default function StoresList() {
  const [stores] = useState(dummyStores);
  const [searchQuery, setSearchQuery] = useState('');
  const [favorites, setFavorites] = useState(new Set());

  const filteredStores = stores.filter(
    (store) =>
      store.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      store.address.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const toggleFavorite = (id) => {
    const updated = new Set(favorites);

    if (updated.has(id)) {
      updated.delete(id);
    } else {
      updated.add(id);
    }

    setFavorites(updated);
  };

  const getRatingColor = (rating) => {
    if (rating >= 4) return 'bg-green-500/20 text-green-700 border-green-200';
    if (rating >= 3)
      return 'bg-yellow-500/20 text-yellow-700 border-yellow-200';
    return 'bg-orange-500/20 text-orange-700 border-orange-200';
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b bg-card">
        <div className="max-w-7xl mx-auto px-6 py-12">
          <h1 className="text-3xl font-bold mb-2">Discover Restaurants</h1>
          <p className="text-muted-foreground">
            Explore amazing food & dining experiences
          </p>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Search */}
        <div className="mb-8 relative">
          <Search className="absolute left-3 top-3 h-5 w-5 text-muted-foreground" />

          <Input
            placeholder="Search restaurants..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 h-11"
          />
        </div>

        {/* Empty State */}
        {filteredStores.length === 0 ? (
          <div className="text-center py-12">
            <MapPin className="mx-auto h-10 w-10 text-muted-foreground mb-4" />
            <p className="text-muted-foreground">No restaurants found</p>

            <Button
              className="mt-4"
              variant="outline"
              onClick={() => setSearchQuery('')}
            >
              Clear Search
            </Button>
          </div>
        ) : (
          /* Grid */
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredStores.map((store) => (
              <Card key={store.id} className="overflow-hidden">
                <CardContent className="p-0">
                  {/* Image */}
                  <div className="h-40 bg-gray-200 flex items-center justify-center relative">
                    <span className="text-sm text-muted-foreground">
                      {store.name}
                    </span>

                    <button
                      onClick={() => toggleFavorite(store.id)}
                      className="absolute top-3 right-3 bg-white p-2 rounded-full"
                    >
                      <Heart
                        size={18}
                        className={
                          favorites.has(store.id)
                            ? 'text-red-500 fill-red-500'
                            : 'text-gray-400'
                        }
                      />
                    </button>
                  </div>

                  {/* Info */}
                  <div className="p-4">
                    <h3 className="font-semibold mb-2">{store.name}</h3>

                    <div className="flex items-center gap-2 mb-2">
                      <Star className="h-4 w-4 text-yellow-500 fill-yellow-500" />

                      <Badge
                        variant="outline"
                        className={getRatingColor(store.avg_rating)}
                      >
                        {store.avg_rating}
                      </Badge>
                    </div>

                    <div className="flex items-center gap-1 text-sm text-muted-foreground mb-4">
                      <MapPin size={14} />
                      {store.address}
                    </div>

                    <Link to={`/stores/${store.id}`}>
                      <Button variant="outline" className="w-full">
                        View Details
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </Button>
                    </Link>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
