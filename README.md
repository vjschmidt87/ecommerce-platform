# ShopHub - E-Commerce Platform

A full-stack e-commerce platform built with Java 21, Spring Boot 3, Angular 17, and PostgreSQL. Containerized with Docker for easy deployment.

## Architecture

```
┌─────────────────┐     ┌─────────────────┐     ┌─────────────────┐
│                 │     │                 │     │                 │
│   Angular 17    │────>│  Spring Boot 3  │────>│  PostgreSQL 16  │
│   (Frontend)    │<────│   (Backend)     │<────│   (Database)    │
│                 │     │                 │     │                 │
│  Port: 4200     │     │  Port: 8080     │     │  Port: 5432     │
│  Nginx (prod)   │     │  REST API       │     │                 │
└─────────────────┘     └─────────────────┘     └─────────────────┘
        │                       │
   SPA Routing          JWT Authentication
   Lazy Loading         JPA / Hibernate
   RxJS State           Spring Security
```

## Tech Stack

| Layer      | Technology                        | Version |
|------------|-----------------------------------|---------|
| Frontend   | Angular + TypeScript              | 17.x    |
| State      | RxJS BehaviorSubjects             | 7.x     |
| Backend    | Java + Spring Boot                | 21 / 3.2 |
| Security   | Spring Security + JWT             | 6.x     |
| ORM        | Spring Data JPA / Hibernate       | 6.x     |
| Database   | PostgreSQL                        | 16      |
| API Docs   | SpringDoc OpenAPI (Swagger)       | 2.3     |
| Container  | Docker + Docker Compose           | 24+     |

## Features

- **Product Catalog** - Browse, search, and filter products by category and price range
- **User Authentication** - JWT-based registration and login
- **Shopping Cart** - Add, update, and remove items with real-time totals
- **Order Management** - Place orders, view order history, cancel pending orders
- **Stock Management** - Automatic inventory tracking on order placement
- **Responsive Design** - Mobile-first layout with CSS Grid
- **Search** - Debounced search-as-you-type with RxJS
- **Lazy Loading** - Angular feature modules loaded on demand
- **API Documentation** - Interactive Swagger UI

## Prerequisites

- [Docker](https://docs.docker.com/get-docker/) 24+ and [Docker Compose](https://docs.docker.com/compose/install/) v2+
- (For local development) [Java 21](https://adoptium.net/), [Maven 3.9+](https://maven.apache.org/), [Node.js 20+](https://nodejs.org/)

## Getting Started

### Docker Compose (Recommended)

The fastest way to run the entire stack:

```bash
# Clone the repository
git clone https://github.com/your-username/ecommerce-platform.git
cd ecommerce-platform

# Copy the environment file and adjust values
cp .env.example .env

# Start all services
docker-compose up --build

# The application will be available at:
# Frontend:  http://localhost:4200
# Backend:   http://localhost:8080
# Swagger:   http://localhost:8080/swagger-ui.html
```

### Local Development

**Backend:**

```bash
cd backend

# Make sure PostgreSQL is running locally (or use Docker for just the DB)
docker run -d --name ecommerce-db \
  -e POSTGRES_DB=ecommerce_db \
  -e POSTGRES_USER=postgres \
  -e POSTGRES_PASSWORD=postgres123 \
  -p 5432:5432 postgres:16-alpine

# Run the Spring Boot application
./mvnw spring-boot:run
```

**Frontend:**

```bash
cd frontend

# Install dependencies
npm install

# Start the development server
npm start

# Navigate to http://localhost:4200
```

## API Endpoints

### Authentication
| Method | Endpoint           | Description          | Auth |
|--------|--------------------|----------------------|------|
| POST   | `/api/auth/register` | Register new user   | No   |
| POST   | `/api/auth/login`    | Login and get JWT   | No   |

### Products
| Method | Endpoint                          | Description               | Auth  |
|--------|-----------------------------------|---------------------------|-------|
| GET    | `/api/products`                   | List products (paginated) | No    |
| GET    | `/api/products/{id}`              | Get product by ID         | No    |
| GET    | `/api/products/search?query=`     | Search products           | No    |
| GET    | `/api/products/category/{id}`     | Products by category      | No    |
| POST   | `/api/products`                   | Create product            | Admin |

### Categories
| Method | Endpoint              | Description        | Auth  |
|--------|-----------------------|--------------------|-------|
| GET    | `/api/categories`     | List categories    | No    |
| GET    | `/api/categories/{id}`| Get category by ID | No    |
| POST   | `/api/categories`     | Create category    | Admin |

### Cart
| Method | Endpoint              | Description        | Auth |
|--------|-----------------------|--------------------|------|
| GET    | `/api/cart`           | Get cart items     | Yes  |
| POST   | `/api/cart/add`       | Add item to cart   | Yes  |
| PUT    | `/api/cart/{itemId}`  | Update quantity    | Yes  |
| DELETE | `/api/cart/{itemId}`  | Remove item        | Yes  |
| DELETE | `/api/cart/clear`     | Clear cart         | Yes  |

### Orders
| Method | Endpoint                   | Description     | Auth |
|--------|----------------------------|-----------------|------|
| POST   | `/api/orders`              | Place order     | Yes  |
| GET    | `/api/orders`              | Order history   | Yes  |
| GET    | `/api/orders/{id}`         | Order details   | Yes  |
| PUT    | `/api/orders/{id}/cancel`  | Cancel order    | Yes  |

## Default Credentials

| Role  | Email            | Password  |
|-------|------------------|-----------|
| Admin | admin@shop.com   | admin123  |

## Project Structure

```
ecommerce-platform/
├── backend/
│   ├── src/main/java/com/portfolio/ecommerce/
│   │   ├── config/          # OpenAPI, CORS configuration
│   │   ├── controller/      # REST controllers
│   │   ├── dto/             # Request/Response DTOs
│   │   │   ├── request/
│   │   │   └── response/
│   │   ├── entity/          # JPA entities
│   │   ├── exception/       # Custom exceptions, global handler
│   │   ├── repository/      # Spring Data JPA repositories
│   │   ├── security/        # JWT, filters, security config
│   │   └── service/         # Business logic interfaces
│   │       └── impl/        # Service implementations
│   ├── src/main/resources/
│   │   └── application.yml
│   ├── Dockerfile
│   └── pom.xml
├── frontend/
│   ├── src/
│   │   ├── app/
│   │   │   ├── core/        # Services, guards, interceptors, models
│   │   │   ├── features/    # Lazy-loaded feature modules
│   │   │   │   ├── auth/
│   │   │   │   ├── products/
│   │   │   │   ├── cart/
│   │   │   │   └── orders/
│   │   │   └── shared/      # Header, shared components
│   │   ├── environments/
│   │   └── styles.scss
│   ├── Dockerfile
│   ├── nginx.conf
│   └── package.json
├── docker-compose.yml
├── init.sql
├── .env
├── .gitignore
└── README.md
```

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.
