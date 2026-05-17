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
import { Plus, MoreHorizontal, Search, ArrowUpDown } from 'lucide-react';

const dummyUsers = [
  {
    id: '1',
    name: 'John Doe',
    email: 'john@example.com',
    address: '123 Main St, New York, NY 10001',
    role: 'user',
  },
  {
    id: '2',
    name: 'Jane Smith',
    email: 'jane@example.com',
    address: '456 Oak Ave, Los Angeles, CA 90001',
    role: 'user',
  },
  {
    id: '3',
    name: 'Bob Wilson',
    email: 'bob@example.com',
    address: '789 Pine Rd, Chicago, IL 60601',
    role: 'store_owner',
  },
  {
    id: '4',
    name: 'Alice Brown',
    email: 'alice@example.com',
    address: '321 Elm St, Houston, TX 77001',
    role: 'user',
  },
  {
    id: '5',
    name: 'Charlie Davis',
    email: 'charlie@example.com',
    address: '654 Maple Dr, Phoenix, AZ 85001',
    role: 'admin',
  },
  {
    id: '6',
    name: 'Emma Evans',
    email: 'emma@example.com',
    address: '987 Birch Ln, Philadelphia, PA 19101',
    role: 'user',
  },
];

const roleColors = {
  user: 'default',
  store_owner: 'secondary',
  admin: 'destructive',
};

const roleLabels = {
  user: 'User',
  store_owner: 'Store Owner',
  admin: 'Admin',
};

export default function AdminUsers() {
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('name');
  const [sortOrder, setSortOrder] = useState('asc');

  const filteredUsers = dummyUsers.filter(
    (user) =>
      user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.address.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const sortedUsers = [...filteredUsers].sort((a, b) => {
    const aValue = a[sortBy];
    const bValue = b[sortBy];

    const comparison = String(aValue).localeCompare(String(bValue));

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
            Users Management
          </h1>
          <p className="text-muted-foreground">
            Manage all users on the platform
          </p>
        </div>

        <Link to="/admin/users/create">
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            Add User
          </Button>
        </Link>
      </div>

      {/* Card */}
      <Card>
        <CardHeader>
          <CardTitle>All Users</CardTitle>
          <CardDescription>
            A list of all registered users and their details
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
                      Name <ArrowUpDown className="h-4 w-4" />
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
                      onClick={() => toggleSort('role')}
                      className="flex items-center gap-2"
                    >
                      Role <ArrowUpDown className="h-4 w-4" />
                    </button>
                  </TableHead>

                  <TableHead className="w-10">Actions</TableHead>
                </TableRow>
              </TableHeader>

              <TableBody>
                {sortedUsers.map((user) => (
                  <TableRow key={user.id}>
                    <TableCell className="font-medium">{user.name}</TableCell>

                    <TableCell>{user.email}</TableCell>

                    <TableCell className="text-sm text-muted-foreground max-w-xs truncate">
                      {user.address}
                    </TableCell>

                    <TableCell>
                      <Badge variant={roleColors[user.role]}>
                        {roleLabels[user.role]}
                      </Badge>
                    </TableCell>

                    <TableCell>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="sm">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>

                        <DropdownMenuContent align="end">
                          <DropdownMenuItem asChild>
                            <Link to={`/admin/users/${user.id}`}>
                              View Details
                            </Link>
                          </DropdownMenuItem>

                          <DropdownMenuItem>Edit User</DropdownMenuItem>

                          <DropdownMenuItem className="text-destructive">
                            Delete User
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
          {sortedUsers.length === 0 && (
            <div className="text-center py-8">
              <p className="text-muted-foreground">
                No users found matching your search.
              </p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
