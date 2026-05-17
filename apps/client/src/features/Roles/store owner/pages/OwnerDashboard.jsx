'use client';

import React, { useState, useEffect } from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  LineChart,
  Line,
  Cell,
} from 'recharts';
import { Star, TrendingUp, Users, Calendar } from 'lucide-react';

// Dummy data matching API response structure
const DUMMY_DASHBOARD_DATA = {
  statusCode: 201,
  message: 'Fetched the dashboard',
  data: {
    store: {
      id: 'e335d50a-070f-4f15-a83b-c2a1853dec82',
      name: 'modiFoods',
      avg_ratings: '2.3',
    },
    ratings: [
      {
        id: 'd16ef94b-c51e-44a8-80fc-9c80131f2208',
        value: 4,
        created_at: '2026-05-16T16:31:41.865449',
        user: {
          name: 'kunal',
          email: 'jadhavkun0@gmail.com',
        },
      },
      {
        id: 'd3a1dace-3b49-429b-b409-840a92495eec',
        value: 1,
        created_at: '2026-05-16T16:37:53.925061',
        user: {
          name: 'modi',
          email: 'modi0@gmail.com',
        },
      },
      {
        id: '1ed3d135-e80f-458e-aedf-2dee9db5b8a4',
        value: 2,
        created_at: '2026-05-16T16:41:57.834989',
        user: {
          name: 'gomez',
          email: 'shelina0@gmail.com',
        },
      },
      {
        id: 'a1b2c3d4-e5f6-47g8-h9i0-j1k2l3m4n5o6',
        value: 5,
        created_at: '2026-05-17T10:15:22.123456',
        user: {
          name: 'priya',
          email: 'priya@gmail.com',
        },
      },
      {
        id: 'b2c3d4e5-f6g7-48h9-i0j1-k2l3m4n5o6p7',
        value: 3,
        created_at: '2026-05-17T12:45:30.654321',
        user: {
          name: 'arjun',
          email: 'arjun@gmail.com',
        },
      },
    ],
  },
  success: true,
};

// Generate rating trends data
const generateRatingTrends = (ratings) => {
  const trends = [];
  for (let i = 1; i <= 7; i++) {
    const dayRatings = ratings.filter((r) => {
      const date = new Date(r.created_at);
      const today = new Date();
      const dayDiff = Math.floor((today - date) / (1000 * 60 * 60 * 24));
      return dayDiff === 7 - i;
    });
    const avgRating =
      dayRatings.length > 0
        ? (
            dayRatings.reduce((sum, r) => sum + r.value, 0) / dayRatings.length
          ).toFixed(1)
        : 0;
    trends.push({
      day: `Day ${i}`,
      rating: parseFloat(avgRating),
      count: dayRatings.length,
    });
  }
  return trends;
};

// Generate rating distribution
const generateRatingDistribution = (ratings) => {
  const distribution = [
    { name: '5 Stars', value: 0, percentage: 0 },
    { name: '4 Stars', value: 0, percentage: 0 },
    { name: '3 Stars', value: 0, percentage: 0 },
    { name: '2 Stars', value: 0, percentage: 0 },
    { name: '1 Star', value: 0, percentage: 0 },
  ];

  ratings.forEach((rating) => {
    distribution[5 - rating.value].value += 1;
  });

  const total = ratings.length;
  distribution.forEach((item) => {
    item.percentage = total > 0 ? Math.round((item.value / total) * 100) : 0;
  });

  return distribution;
};

const COLORS = ['#10b981', '#3b82f6', '#f59e0b', '#ef4444', '#8b5cf6'];

export default function OwnerDashboard() {
  const [dashboardData, setDashboardData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [ratingTrends, setRatingTrends] = useState([]);
  const [ratingDistribution, setRatingDistribution] = useState([]);

  useEffect(() => {
    // Simulate API call with dummy data
    setTimeout(() => {
      setDashboardData(DUMMY_DASHBOARD_DATA.data);
      setRatingTrends(generateRatingTrends(DUMMY_DASHBOARD_DATA.data.ratings));
      setRatingDistribution(
        generateRatingDistribution(DUMMY_DASHBOARD_DATA.data.ratings)
      );
      setLoading(false);
    }, 500);
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-8 w-8 border-2 border-primary border-t-transparent"></div>
      </div>
    );
  }

  if (!dashboardData) {
    return (
      <div className="text-center py-12">Failed to load dashboard data</div>
    );
  }

  const avgRating = parseFloat(dashboardData.store.avg_ratings);
  const totalRatings = dashboardData.ratings.length;
  const fiveStarCount = dashboardData.ratings.filter(
    (r) => r.value === 5
  ).length;
  const fourStarCount = dashboardData.ratings.filter(
    (r) => r.value === 4
  ).length;

  const getRatingColor = (rating) => {
    if (rating >= 4) return 'bg-green-500/20 text-green-700 border-green-200';
    if (rating >= 3)
      return 'bg-yellow-500/20 text-yellow-700 border-yellow-200';
    return 'bg-orange-500/20 text-orange-700 border-orange-200';
  };

  const getStarColor = (stars) => {
    if (stars >= 4) return 'text-green-500';
    if (stars >= 3) return 'text-yellow-500';
    return 'text-orange-500';
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold tracking-tight">
          Store Owner Dashboard
        </h1>
        <p className="text-muted-foreground">
          Welcome back! Here's your store performance overview.
        </p>
      </div>

      {/* Store Info Header Card */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-2xl">
                {dashboardData.store.name}
              </CardTitle>
              <CardDescription>
                Store ID: {dashboardData.store.id}
              </CardDescription>
            </div>
            <Badge variant="outline" className={getRatingColor(avgRating)}>
              <Star className="h-3 w-3 mr-1 fill-current" />
              {avgRating} Rating
            </Badge>
          </div>
        </CardHeader>
      </Card>

      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Average Rating
            </CardTitle>
            <Star className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{avgRating}</div>
            <p className="text-xs text-muted-foreground">out of 5 stars</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Ratings</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalRatings}</div>
            <p className="text-xs text-muted-foreground">customer reviews</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              5 Star Reviews
            </CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{fiveStarCount}</div>
            <p className="text-xs text-muted-foreground">excellent reviews</p>
          </CardContent>
        </Card>
      </div>

      {/* Charts */}
      <div className="grid gap-4 md:grid-cols-2">
        {/* Rating Trends */}
        <Card>
          <CardHeader>
            <CardTitle>Rating Trends</CardTitle>
            <CardDescription>
              Average rating over the past 7 days
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={ratingTrends}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="day" />
                <YAxis domain={[0, 5]} />
                <Tooltip />
                <Legend />
                <Line
                  type="monotone"
                  dataKey="rating"
                  stroke="#3b82f6"
                  name="Avg Rating"
                  strokeWidth={2}
                />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Rating Distribution */}
        <Card>
          <CardHeader>
            <CardTitle>Rating Distribution</CardTitle>
            <CardDescription>Breakdown of customer ratings</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {ratingDistribution.map((item, index) => (
                <div key={item.name} className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">{item.name}</span>
                    <span className="text-sm text-muted-foreground">
                      {item.value} ({item.percentage}%)
                    </span>
                  </div>
                  <div className="w-full bg-muted rounded-full h-2">
                    <div
                      className="h-2 rounded-full transition-all"
                      style={{
                        width: `${item.percentage}%`,
                        backgroundColor: COLORS[index],
                      }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Recent Ratings */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Customer Ratings</CardTitle>
          <CardDescription>Latest reviews from your customers</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {dashboardData.ratings.map((rating) => {
              const date = new Date(rating.created_at);
              const formattedDate = date.toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'short',
                day: 'numeric',
              });
              const formattedTime = date.toLocaleTimeString('en-US', {
                hour: '2-digit',
                minute: '2-digit',
              });

              return (
                <div
                  key={rating.id}
                  className="border-b pb-4 last:border-b-0 space-y-3"
                >
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-3">
                      <Avatar>
                        <AvatarFallback>
                          {rating.user.name.charAt(0).toUpperCase()}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-medium text-sm">
                          {rating.user.name}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          {rating.user.email}
                        </p>
                      </div>
                    </div>
                    <Badge
                      variant="outline"
                      className={`${getStarColor(rating.value)} border-current`}
                    >
                      <Star className="h-3 w-3 mr-1 fill-current" />
                      {rating.value}
                    </Badge>
                  </div>
                  <div className="text-xs text-muted-foreground flex items-center gap-1">
                    <Calendar className="h-3 w-3" />
                    {formattedDate} at {formattedTime}
                  </div>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {/* Quick Stats Summary */}
      <Card>
        <CardHeader>
          <CardTitle>Performance Summary</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="space-y-2">
              <p className="text-sm text-muted-foreground">Positive Reviews</p>
              <p className="text-2xl font-bold text-green-600">
                {fiveStarCount + fourStarCount}
              </p>
              <p className="text-xs text-muted-foreground">4+ stars</p>
            </div>
            <div className="space-y-2">
              <p className="text-sm text-muted-foreground">Total Reviews</p>
              <p className="text-2xl font-bold">{totalRatings}</p>
              <p className="text-xs text-muted-foreground">all ratings</p>
            </div>
            <div className="space-y-2">
              <p className="text-sm text-muted-foreground">Current Rating</p>
              <p className="text-2xl font-bold">{avgRating}</p>
              <p className="text-xs text-muted-foreground">out of 5</p>
            </div>
            <div className="space-y-2">
              <p className="text-sm text-muted-foreground">Success Rate</p>
              <p className="text-2xl font-bold text-green-600">
                {totalRatings > 0
                  ? Math.round(
                      ((fiveStarCount + fourStarCount) / totalRatings) * 100
                    )
                  : 0}
                %
              </p>
              <p className="text-xs text-muted-foreground">positive rate</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
