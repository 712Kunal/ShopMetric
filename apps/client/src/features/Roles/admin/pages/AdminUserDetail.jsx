import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft, Mail, MapPin, User, Star } from 'lucide-react';

const mockUser = {
  id: '1',
  name: 'John Doe',
  email: 'john@example.com',
  address: '123 Main St, New York, NY 10001',
  role: 'user',
  createdAt: '2024-01-15',
  totalRatings: 12,
  averageRating: 4.5,
};

const mockUserStats = [
  { label: 'Total Ratings Submitted', value: '12', icon: Star },
  { label: 'Average Rating Given', value: '4.5/5', icon: Star },
  { label: 'Member Since', value: 'Jan 15, 2024', icon: User },
];

const roleColors = {
  user: 'default',
  store_owner: 'secondary',
  admin: 'destructive',
};

const roleLabels = {
  user: 'Regular User',
  store_owner: 'Store Owner',
  admin: 'Admin',
};

export default function UserDetail() {
  const { id } = useParams(); // 👈 React Router equivalent of params
  const [isEditMode, setIsEditMode] = useState(false);

  return (
    <div className="space-y-6">
      {/* Back button */}
      <Link to="/admin/users">
        <Button variant="ghost" size="sm">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Users
        </Button>
      </Link>

      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">User Details</h1>
          <p className="text-muted-foreground">
            View and manage user information
          </p>
        </div>

        <Button
          onClick={() => setIsEditMode(!isEditMode)}
          variant={isEditMode ? 'outline' : 'default'}
        >
          {isEditMode ? 'Cancel' : 'Edit User'}
        </Button>
      </div>

      {/* User Info */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-2xl">{mockUser.name}</CardTitle>
              <CardDescription className="mt-2">User ID: {id}</CardDescription>
            </div>

            <Badge variant={roleColors[mockUser.role]}>
              {roleLabels[mockUser.role]}
            </Badge>
          </div>
        </CardHeader>

        <CardContent className="space-y-4">
          <div className="grid gap-6 md:grid-cols-2">
            {/* Email */}
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <Mail className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm font-medium">Email</span>
              </div>
              <p className="text-sm text-muted-foreground ml-6">
                {mockUser.email}
              </p>
            </div>

            {/* Address */}
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <MapPin className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm font-medium">Address</span>
              </div>
              <p className="text-sm text-muted-foreground ml-6">
                {mockUser.address}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Stats */}
      <div className="grid gap-4 md:grid-cols-3">
        {mockUserStats.map((stat, i) => {
          const Icon = stat.icon;

          return (
            <Card key={i}>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium">
                  {stat.label}
                </CardTitle>
                <Icon className="h-4 w-4 text-muted-foreground" />
              </CardHeader>

              <CardContent>
                <div className="text-2xl font-bold">{stat.value}</div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Activity */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Activity</CardTitle>
          <CardDescription>Latest actions by this user</CardDescription>
        </CardHeader>

        <CardContent>
          <div className="space-y-4">
            {[
              {
                action: 'Submitted rating for "Best Cafe"',
                time: '2 hours ago',
                rating: '5/5',
              },
              {
                action: 'Updated profile information',
                time: '1 day ago',
                rating: null,
              },
              {
                action: 'Submitted rating for "Great Restaurant"',
                time: '3 days ago',
                rating: '4/5',
              },
              {
                action: 'Account created',
                time: 'Jan 15, 2024',
                rating: null,
              },
            ].map((activity, i) => (
              <div
                key={i}
                className="flex items-center justify-between border-b pb-4 last:border-b-0"
              >
                <div>
                  <p className="font-medium text-sm">{activity.action}</p>
                  <p className="text-xs text-muted-foreground">
                    {activity.time}
                  </p>
                </div>

                {activity.rating && (
                  <Badge variant="secondary">{activity.rating}</Badge>
                )}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Danger Zone */}
      <Card className="border-red-500/50">
        <CardHeader>
          <CardTitle className="text-red-600">Danger Zone</CardTitle>
          <CardDescription>Irreversible actions</CardDescription>
        </CardHeader>

        <CardContent className="space-y-4">
          <p className="text-sm text-muted-foreground">
            Deleting a user account will permanently remove all associated data.
          </p>

          <Button variant="destructive">Delete User Account</Button>
        </CardContent>
      </Card>
    </div>
  );
}
