import { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Badge } from '@/components/ui/badge';
import { Plus, MoreHorizontal, Search, ArrowUpDown, Star } from 'lucide-react';

const dummyStores = [
  {
    id: '1',
    name: 'Best Cafe',
    email: 'bestcafe@example.com',
    address: '123 Coffee Lane, New York, NY 10001',
    rating: 4.8,
    totalRatings: 245,
  },
  {
    id: '2',
    name: 'Great Restaurant',
    email: 'greatrest@example.com',
    address: '456 Food Street, Los Angeles, CA 90001',
    rating: 4.5,
    totalRatings: 189,
  },
  {
    id: '3',
    name: 'Pizza Palace',
    email: 'pizzapalace@example.com',
    address: '789 Dough Rd, Chicago, IL 60601',
    rating: 4.2,
    totalRatings: 156,
  },
  {
    id: '4',
    name: 'Burger Haven',
    email: 'burgerhaven@example.com',
    address: '321 Meat Ave, Houston, TX 77001',
    rating: 4.6,
    totalRatings: 203,
  },
  {
    id: '5',
    name: 'Sushi Master',
    email: 'sushimaster@example.com',
    address: '654 Rice Lane, Phoenix, AZ 85001',
    rating: 4.7,
    totalRatings: 178,
  },
  {
    id: '6',
    name: 'Taco Fiesta',
    email: 'tacofiesta@example.com',
    address: '987 Tortilla Dr, Philadelphia, PA 19101',
    rating: 4.3,
    totalRatings: 142,
  },
];

const getRatingColor = (rating) => {
  if (rating >= 4.5) return 'text-green-600';
  if (rating >= 3.5) return 'text-yellow-600';
  return 'text-orange-600';
};

export default function AdminStores() {
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('name');
  const [sortOrder, setSortOrder] = useState('asc');

  const filteredStores = dummyStores.filter(
    (store) =>
      store.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      store.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      store.address.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const sortedStores = [...filteredStores].sort((a, b) => {
    let aValue = a[sortBy];
    let bValue = b[sortBy];

    const comparison =
      typeof aValue === 'string'
        ? aValue.localeCompare(bValue)
        : aValue - bValue;

    return sortOrder === 'asc' ? comparison : -comparison;
  });

  const toggleSort = (field) => {
    if (sortBy === field) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortBy(field);
      setSortOrder('asc');
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">
            Stores Management
          </h1>
          <p className="text-muted-foreground">
            Manage all stores on the platform
          </p>
        </div>

        <Link to="/admin/stores/create">
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            Add Store
          </Button>
        </Link>
      </div>

      {/* Card */}
      <Card>
        <CardHeader>
          <CardTitle>All Stores</CardTitle>
          <CardDescription>
            A list of all registered stores and their ratings
          </CardDescription>
        </CardHeader>

        <CardContent>
          {/* Search */}
          <div className="mb-6 flex items-center gap-2">
            <Search className="h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search by name, email, or address..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="flex-1"
            />
          </div>

          {/* Table */}
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>
                    <button
                      onClick={() => toggleSort('name')}
                      className="flex items-center gap-2"
                    >
                      Store Name <ArrowUpDown className="h-4 w-4" />
                    </button>
                  </TableHead>

                  <TableHead>
                    <button
                      onClick={() => toggleSort('email')}
                      className="flex items-center gap-2"
                    >
                      Email <ArrowUpDown className="h-4 w-4" />
                    </button>
                  </TableHead>

                  <TableHead>Address</TableHead>

                  <TableHead>
                    <button
                      onClick={() => toggleSort('rating')}
                      className="flex items-center gap-2"
                    >
                      Rating <ArrowUpDown className="h-4 w-4" />
                    </button>
                  </TableHead>

                  <TableHead>Total Ratings</TableHead>
                  <TableHead className="w-10">Actions</TableHead>
                </TableRow>
              </TableHeader>

              <TableBody>
                {sortedStores.map((store) => (
                  <TableRow key={store.id}>
                    <TableCell className="font-medium">{store.name}</TableCell>

                    <TableCell>{store.email}</TableCell>

                    <TableCell className="text-sm text-muted-foreground max-w-xs truncate">
                      {store.address}
                    </TableCell>

                    <TableCell>
                      <div className="flex items-center gap-1">
                        <Star
                          className={`h-4 w-4 fill-current ${getRatingColor(
                            store.rating
                          )}`}
                        />
                        <span
                          className={`font-semibold ${getRatingColor(
                            store.rating
                          )}`}
                        >
                          {store.rating.toFixed(1)}
                        </span>
                      </div>
                    </TableCell>

                    <TableCell>
                      <Badge variant="outline">{store.totalRatings}</Badge>
                    </TableCell>

                    <TableCell>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="sm">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>

                        <DropdownMenuContent align="end">
                          <DropdownMenuItem>View Details</DropdownMenuItem>
                          <DropdownMenuItem>View Ratings</DropdownMenuItem>
                          <DropdownMenuItem>Edit Store</DropdownMenuItem>
                          <DropdownMenuItem className="text-destructive">
                            Delete Store
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>

          {/* Empty State */}
          {sortedStores.length === 0 && (
            <div className="text-center py-8">
              <p className="text-muted-foreground">
                No stores found matching your search.
              </p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
