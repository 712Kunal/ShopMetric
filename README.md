# ShopMetric

ShopMetric is a full-stack store rating and management platform where users can discover stores, submit ratings, and interact with a role-based ecosystem designed for admins, store owners, and normal users.

The project follows a modern monorepo architecture using:

- React + Vite for the frontend
- Node.js + Express for the backend
- Supabase PostgreSQL as the database
- JWT Authentication with Access & Refresh Tokens
- Role-Based Access Control (RBAC)
- Redux Toolkit & RTK Query for state management

The platform is designed with scalability, modularity, and clean architecture in mind while following SOLID principles.

---

# Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Prerequisites](#prerequisites)
- [Getting Started](#getting-started)
  - [1. Clone the Repository](#1-clone-the-repository)
  - [2. Backend Setup](#2-backend-setup)
  - [3. Frontend Setup](#3-frontend-setup)
- [Environment Variables](#environment-variables)
- [Running the App](#running-the-app)
- [API Overview](#api-overview)
- [User Roles](#user-roles)
- [Database Schema](#database-schema)
- [Authentication Flow](#authentication-flow)
- [SOLID Principles](#solid-principles)
- [Optional: Docker](#optional-docker)
- [Future Improvements](#future-improvements)
- [Contributing](#contributing)
- [License](#license)

---

# Features

## Authentication & Authorization

- JWT Authentication
- Access Token + Refresh Token strategy
- HttpOnly Cookie based refresh tokens
- Role-Based Access Control (RBAC)
- Protected routes
- Secure password hashing using bcrypt

---

## User Features

- User registration & login
- Browse stores
- View store details
- Submit ratings
- Update ratings
- View personal profile

---

## Store Owner Features

- Dedicated owner dashboard
- Manage owned store
- View ratings & analytics
- Track store performance

---

## Admin Features

- Create users
- Create stores
- Manage platform users
- Manage stores
- Role management
- Dashboard analytics

---

## Frontend Features

- Modern UI with reusable components
- Responsive layouts
- Sidebar navigation
- Redux Toolkit state management
- RTK Query API integration
- Feature-based architecture

---

## Backend Features

- Modular Express architecture
- Centralized error handling
- Validation middleware using Zod
- Structured logging
- Clean API response system
- Middleware-based authorization

---

# Tech Stack

## Frontend

- React.js
- Vite
- Redux Toolkit
- RTK Query
- React Router DOM
- Tailwind CSS
- ShadCN UI
- ESLint
- Prettier

---

## Backend

- Node.js
- Express.js
- JWT
- bcryptjs
- Zod
- Cookie Parser
- CORS

---

## Database

- Supabase
- PostgreSQL

---

## Dev Tools

- Nodemon
- Git & GitHub
- VS Code

---

# Project Structure

```bash
ShopMetric/
│
├── .vscode/
│
├── apps/
│   │
│   ├── .prettierignore
│   ├── .prettierrc
│   ├── package-lock.json
│   ├── package.json
│   │
│   ├── node_modules/
│   │
│   ├── server/
│   │   ├── .env
│   │   ├── .gitignore
│   │   ├── package-lock.json
│   │   ├── package.json
│   │   │
│   │   └── src/
│   │       ├── server.js
│   │       │
│   │       ├── config/
│   │       │   └── supabase.js
│   │       │
│   │       ├── controllers/
│   │       │   ├── admin.controller.js
│   │       │   ├── auth.controller.js
│   │       │   ├── owner.controller.js
│   │       │   ├── ratings.controller.js
│   │       │   └── store.controller.js
│   │       │
│   │       ├── middlewares/
│   │       │   ├── auth.middleware.js
│   │       │   ├── error.middleware.js
│   │       │   ├── rbac.js
│   │       │   └── validate.middleware.js
│   │       │
│   │       ├── routes/
│   │       │   ├── admin.routes.js
│   │       │   ├── auth.routes.js
│   │       │   ├── owner.routes.js
│   │       │   ├── ratings.routes.js
│   │       │   └── store.routes.js
│   │       │
│   │       ├── services/
│   │       │
│   │       ├── utils/
│   │       │   ├── ApiError.js
│   │       │   ├── ApiResponse.js
│   │       │   ├── GenerateTokens.js
│   │       │   └── logger.js
│   │       │
│   │       └── validators/
│   │           └── auth.validator.js
│   │
│   └── client/
│       ├── .gitignore
│       ├── components.json
│       ├── eslint.config.js
│       ├── index.html
│       ├── jsconfig.json
│       ├── package-lock.json
│       ├── package.json
│       ├── README.md
│       ├── vite.config.js
│       │
│       ├── public/
│       │   ├── favicon.svg
│       │   └── icons.svg
│       │
│       └── src/
│           ├── App.css
│           ├── App.jsx
│           ├── index.css
│           ├── main.jsx
│           │
│           ├── assets/
│           │   └── auth.jpg
│           │
│           ├── hooks/
│           │   └── use-mobile.js
│           │
│           ├── lib/
│           │   └── utils.js
│           │
│           ├── components/
│           │   └── ui/
│           │       ├── avatar.jsx
│           │       ├── badge.jsx
│           │       ├── button.jsx
│           │       ├── card.jsx
│           │       ├── collapsible.jsx
│           │       ├── dialog.jsx
│           │       ├── dropdown-menu.jsx
│           │       ├── field.jsx
│           │       ├── input.jsx
│           │       ├── label.jsx
│           │       ├── nav-user.jsx
│           │       ├── select.jsx
│           │       ├── separator.jsx
│           │       ├── sheet.jsx
│           │       ├── sidebar.jsx
│           │       ├── skeleton.jsx
│           │       ├── table.jsx
│           │       ├── tabs.jsx
│           │       ├── textarea.jsx
│           │       └── tooltip.jsx
│           │
│           ├── shared/
│           │   ├── constants/
│           │   │   ├── env.constant.js
│           │   │   └── routes.constants.js
│           │   │
│           │   ├── core/
│           │   │   └── AppSidebar.jsx
│           │   │
│           │   ├── Layouts/
│           │   │   ├── AppLayout.wrapper.jsx
│           │   │   ├── AuthLayout.wrapper.jsx
│           │   │   └── PublicLayout.wrapper.jsx
│           │   │
│           │   ├── pages/
│           │   │   ├── AccessDeniedPage.jsx
│           │   │   └── NotFoundPage.jsx
│           │   │
│           │   └── state/
│           │       ├── redux-api/
│           │       │   └── base.api.js
│           │       │
│           │       ├── slices/
│           │       │
│           │       └── store/
│           │           └── store.js
│           │
│           └── features/
│               ├── Landing/
│               │   └── pages/
│               │       └── LandingPage.jsx
│               │
│               ├── auth/
│               │   ├── components/
│               │   │   ├── EnhancedRightSection.jsx
│               │   │   ├── login-form.jsx
│               │   │   └── signup-form.jsx
│               │   │
│               │   ├── flows/
│               │   │   └── userAuthFlow.js
│               │   │
│               │   ├── pages/
│               │   │   ├── LoginPage.jsx
│               │   │   ├── RegisterPage.jsx
│               │   │   └── UpdatePasswordPage.jsx
│               │   │
│               │   ├── validators/
│               │   │
│               │   └── state/
│               │       ├── redux-api/
│               │       │   └── Authentication.api.js
│               │       │
│               │       └── slices/
│               │           └── userSlice.js
│               │
│               └── Roles/
│                   ├── admin/
│                   │   ├── components/
│                   │   ├── flows/
│                   │   │   └── userAuthFlow.js
│                   │   │
│                   │   ├── pages/
│                   │   │   ├── AdminCreateStore.jsx
│                   │   │   ├── AdminCreateUser.jsx
│                   │   │   ├── AdminDashboard.jsx
│                   │   │   ├── AdminStores.jsx
│                   │   │   ├── AdminUserDetail.jsx
│                   │   │   └── AdminUsers.jsx
│                   │   │
│                   │   ├── validators/
│                   │   │
│                   │   └── state/
│                   │       ├── redux-api/
│                   │       │   └── admin.api.js
│                   │       │
│                   │       └── slices/
│                   │
│                   ├── store owner/
│                   │   ├── components/
│                   │   ├── flows/
│                   │   │   └── userAuthFlow.js
│                   │   │
│                   │   ├── pages/
│                   │   │   └── OwnerDashboard.jsx
│                   │   │
│                   │   ├── validators/
│                   │   │
│                   │   └── state/
│                   │       ├── redux-api/
│                   │       │   └── owner.api.js
│                   │       │
│                   │       └── slices/
│                   │
│                   └── user/
│                       ├── components/
│                       ├── flows/
│                       │   └── userAuthFlow.js
│                       │
│                       ├── pages/
│                       │   ├── StoreDetail.jsx
│                       │   └── StoresList.jsx
│                       │
│                       ├── validators/
│                       │
│                       └── state/
│                           ├── redux-api/
│                           │   └── user.api.js
│                           │
│                           └── slices/
│
├── docs/
│
└── .gitignore
```
---

# Prerequisites

Before running the project, ensure you have installed:

- Node.js >= 18
- npm >= 9
- Git
- Supabase account
- PostgreSQL knowledge (basic)

---

# Getting Started

## 1. Clone the Repository

```bash
git clone https://github.com/your-username/shopmetric.git
```

```bash
cd shopmetric
```

---

## 2. Backend Setup

Move into the backend directory:

```bash
cd server
```

Install dependencies:

```bash
npm install
```

Create a `.env` file:

```env
PORT=5000
NODE_ENV=development

SUPABASE_URL=your_supabase_url
SUPABASE_ANON_KEY=your_supabase_anon_key

ACCESS_TOKEN_SECRET=your_access_secret
REFRESH_TOKEN_SECRET=your_refresh_secret

ACCESS_TOKEN_EXPIRY=15m
REFRESH_TOKEN_EXPIRY=7d
```

Start backend server:

```bash
npm run dev
```

---

## 3. Frontend Setup

Move into frontend directory:

```bash
cd client
```

Install dependencies:

```bash
npm install
```

Run frontend:

```bash
npm run dev
```

Frontend runs on:

```txt
http://localhost:5173
```

---

# Environment Variables

## Backend `.env`

```env
PORT=5000
NODE_ENV=development

SUPABASE_URL=
SUPABASE_ANON_KEY=

ACCESS_TOKEN_SECRET=
REFRESH_TOKEN_SECRET=

ACCESS_TOKEN_EXPIRY=15m
REFRESH_TOKEN_EXPIRY=7d
```

---

# Running the App

## Backend

```bash
cd server
npm run dev
```

## Frontend

```bash
cd client
npm run dev
```

---

# API Overview

## Authentication Routes

| Method | Endpoint | Description |
| --- | --- | --- |
| POST | /api/auth/register | Register user |
| POST | /api/auth/login | Login user |
| POST | /api/auth/logout | Logout user |
| GET | /api/auth/refresh-token | Refresh access token |
| PATCH | /api/auth/update-password | Update password |

---

## Store Routes

| Method | Endpoint | Description |
| --- | --- | --- |
| GET | /api/stores | Get all stores |
| GET | /api/stores/:id | Get store details |
| POST | /api/stores | Create store |
| PATCH | /api/stores/:id | Update store |
| DELETE | /api/stores/:id | Delete store |

---

## Ratings Routes

| Method | Endpoint | Description |
| --- | --- | --- |
| POST | /api/ratings | Add rating |
| PATCH | /api/ratings/:id | Update rating |
| DELETE | /api/ratings/:id | Delete rating |

---

# User Roles

## 1. Admin

Admin has complete platform control.

### Permissions

- Create users
- Create stores
- Manage all stores
- Manage all users
- Access analytics dashboard
- Assign roles

---

## 2. Store Owner

Store owners manage their own stores.

### Permissions

- View store dashboard
- Manage owned store
- View ratings
- View store analytics

---

## 3. Normal User

Users interact with stores.

### Permissions

- Browse stores
- Submit ratings
- Update ratings
- View store details

---

# Database Schema

## Enum

```sql
create type user_role as enum (
  'admin',
  'user',
  'store_owner'
);
```

---

## Users Table

```sql
create table users (
  id uuid primary key default gen_random_uuid(),
  name varchar(60) not null,
  email varchar(255) unique not null,
  address varchar(400),
  password text not null,
  role user_role not null default 'user',
  refresh_token text,
  created_at timestamp default now()
);
```

---

## Stores Table

```sql
create table stores (
  id uuid primary key default gen_random_uuid(),
  name varchar(60) not null,
  email varchar(255),
  address varchar(400),
  owner_id uuid references users(id) on delete set null,
  created_at timestamp default now()
);
```

---

## Ratings Table

```sql
create table ratings (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references users(id) on delete cascade,
  store_id uuid not null references stores(id) on delete cascade,
  value int not null check (value >= 1 and value <= 5),
  created_at timestamp default now(),
  unique(user_id, store_id)
);
```

---

# Authentication Flow

```txt
Login
   ↓
Generate Access Token
   ↓
Generate Refresh Token
   ↓
Store Refresh Token in DB
   ↓
Send Access Token to Frontend
   ↓
Send Refresh Token as HttpOnly Cookie
```

---

# SOLID Principles

The backend architecture follows SOLID principles.

## S — Single Responsibility Principle

Each module handles one responsibility.

Examples:

- Controllers → request handling
- Services → business logic
- Validators → validation logic
- Middlewares → auth/error handling

---

## O — Open/Closed Principle

Modules are open for extension but closed for modification.

RBAC middleware allows adding new roles without changing existing code.

---

## L — Liskov Substitution Principle

Middlewares and utility functions are interchangeable without breaking application flow.

---

## I — Interface Segregation Principle

Frontend features are modularized by roles and domain responsibilities.

---

## D — Dependency Inversion Principle

Controllers depend on abstractions/utilities instead of tightly coupled implementations.

---

# Optional: Docker

Example Docker setup can be added later.

## Example Docker Commands

```bash
docker-compose up --build
```

---

# Future Improvements

- Email verification
- Password reset
- Store analytics charts
- Redis caching
- WebSockets for real-time updates
- CI/CD pipelines
- Docker deployment
- Kubernetes support
- Unit & integration testing
- Pagination & filtering
- Search optimization

---

# Contributing

Contributions are welcome.

## Steps

1. Fork the repository
2. Create a new branch
3. Commit changes
4. Push branch
5. Open pull request

---

# License

This project is licensed under the MIT License.
