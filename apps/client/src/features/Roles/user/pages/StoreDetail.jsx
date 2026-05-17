import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Heart, MapPin, Mail, Calendar, ArrowLeft, Star } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

/* ---------------- DUMMY STORES ---------------- */

const STORES = {
  1: {
    id: 1,
    name: 'Sunset Café',
    email: 'sunsetcafe@example.com',
    address: '123 Main Street, New York',
    avg_rating: 4.8,
    created_at: '2024-01-10',
    owner_id: 'owner_101',
  },
  2: {
    id: 2,
    name: 'Gourmet Bistro',
    email: 'bistro@example.com',
    address: '456 Park Avenue, New York',
    avg_rating: 4.6,
    created_at: '2024-02-15',
    owner_id: 'owner_202',
  },
  3: {
    id: 3,
    name: 'Pizza Palace',
    email: 'pizza@example.com',
    address: '789 Food Street, Chicago',
    avg_rating: 4.2,
    created_at: '2024-03-01',
    owner_id: 'owner_303',
  },
};

/* ---------------- COMPONENT ---------------- */

export default function StoreDetail() {
  const { id } = useParams();

  const [store] = useState(STORES[id] || null);
  const [isFavorite, setIsFavorite] = useState(false);

  const formatDate = (date) => {
    if (!date) return 'N/A';

    return new Date(date).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  const getRatingColor = (rating) => {
    const r = Number(rating);

    if (r >= 4) return 'bg-green-500/20 text-green-700 border-green-200';

    if (r >= 3) return 'bg-yellow-500/20 text-yellow-700 border-yellow-200';

    return 'bg-orange-500/20 text-orange-700 border-orange-200';
  };

  /* ---------------- NOT FOUND ---------------- */

  if (!store) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-500 mb-4">Store not found</p>

          <Link to="/stores">
            <Button>Back to Stores</Button>
          </Link>
        </div>
      </div>
    );
  }

  /* ---------------- UI ---------------- */

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b bg-card">
        <div className="max-w-7xl mx-auto px-6 py-6">
          {/* Top bar */}
          <div className="flex items-center justify-between mb-6">
            <Link to="/stores">
              <Button variant="ghost" size="sm">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back
              </Button>
            </Link>

            <button
              onClick={() => setIsFavorite(!isFavorite)}
              className="p-2 rounded-full hover:bg-muted"
            >
              <Heart
                className={
                  isFavorite ? 'text-red-500 fill-red-500' : 'text-gray-400'
                }
              />
            </button>
          </div>

          {/* Title */}
          <h1 className="text-3xl font-bold mb-2">{store.name}</h1>

          <div className="flex items-center gap-4 flex-wrap">
            <div className="flex items-center gap-2">
              <Star className="h-4 w-4 text-yellow-500 fill-yellow-500" />

              <Badge
                variant="outline"
                className={getRatingColor(store.avg_rating)}
              >
                {store.avg_rating}
              </Badge>
            </div>

            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <MapPin className="h-4 w-4" />
              {store.address}
            </div>
          </div>
        </div>
      </div>

      {/* Body */}
      <div className="max-w-7xl mx-auto px-6 py-8">
        <Tabs defaultValue="info">
          <TabsList className="grid grid-cols-2 max-w-md">
            <TabsTrigger value="info">Info</TabsTrigger>
            <TabsTrigger value="details">Details</TabsTrigger>
          </TabsList>

          {/* INFO */}
          <TabsContent value="info" className="space-y-6">
            <div className="grid md:grid-cols-3 gap-4">
              <Card>
                <CardHeader>
                  <CardTitle className="flex gap-2 text-sm">
                    <Mail size={16} />
                    Email
                  </CardTitle>
                </CardHeader>
                <CardContent>{store.email}</CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex gap-2 text-sm">
                    <MapPin size={16} />
                    Address
                  </CardTitle>
                </CardHeader>
                <CardContent>{store.address}</CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex gap-2 text-sm">
                    <Calendar size={16} />
                    Created
                  </CardTitle>
                </CardHeader>
                <CardContent>{formatDate(store.created_at)}</CardContent>
              </Card>
            </div>

            {/* Rating */}
            <Card>
              <CardHeader>
                <CardTitle>Rating</CardTitle>
              </CardHeader>

              <CardContent>
                <div className="text-4xl font-bold">{store.avg_rating}</div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* DETAILS */}
          <TabsContent value="details">
            <Card>
              <CardHeader>
                <CardTitle>Store Details</CardTitle>
              </CardHeader>

              <CardContent className="space-y-4">
                <div>
                  <p className="text-sm text-muted-foreground">Store ID</p>
                  <p>{store.id}</p>
                </div>

                <div>
                  <p className="text-sm text-muted-foreground">Owner ID</p>
                  <p>{store.owner_id}</p>
                </div>

                <div>
                  <p className="text-sm text-muted-foreground">Created At</p>
                  <p>{formatDate(store.created_at)}</p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
