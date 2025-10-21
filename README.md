# Mehrwerk Frontend Coding Challenge

A React application built as a coding challenge for Mehrwerk, integrating multiple API calls to fetch and display shop information with cashback rates.

## 🎯 Challenge Overview

This project was developed to demonstrate proficiency in React, TypeScript, API integration, state management, and modern frontend development practices.

## 🛠 Technical Stack

- **React 19.1.1** - Latest React with Suspense and `use()` hook
- **TypeScript** - Full type safety
- **Vite** - Fast build tool with HMR
- **React Router 7.9.4** - Client-side routing
- **Tailwind CSS 4.1.14** - Utility-first styling
- **Lucide React** - Modern icon library
- **React Error Boundary** - Error handling
- **React Compiler** - Automatic optimization

## 🏗 Architecture & Patterns

### Custom Query Hook

A lightweight implementation inspired by TanStack Query:

```typescript
useQuery({
  queryKey: string,
  queryFn: () => Promise<T>,
  options: { staleTime: number },
});
```

**Features:**

- Promise caching with Map-based storage
- Timestamp-based stale time checking
- Automatic refetch on stale data
- React Suspense integration
- Type-safe with generics

### Token Refresh Pattern

Automatic token renewal with race condition prevention:

- Intercepts 401 responses
- Refreshes token automatically
- Retries original request with new token
- Singleton promise prevents multiple refresh requests

### Component Structure

```
src/
├── components/
│   ├── ShopList.tsx           # Shop overview grid
│   ├── ShopTile.tsx           # Individual shop card
│   ├── ShopDetail.tsx         # Shop detail page
│   ├── ShopOverviewLoading.tsx # List loading skeleton
│   ├── ShopDetailLoading.tsx   # Detail loading skeleton
│   └── CashbackRateItem.tsx    # Cashback rate card
├── fetch/
│   └── index.ts               # API functions & useQuery hook
├── types.ts                   # TypeScript type definitions
├── App.tsx                    # Route configuration
└── main.tsx                   # App entry point
```

## 🚀 Getting Started

### Prerequisites

- Node.js (v18 or higher)
- pnpm (or npm/yarn)

### Installation

1. Clone the repository

```bash
git clone <repository-url>
cd mhrwrk-cc
```

2. Install dependencies

```bash
pnpm install
```

3. Create `.env` file in the root directory

```env
VITE_X_API_KEY=my-x-api-key
VITE_GRANT_TYPE=client_credentials
VITE_CLIENT_ID=my-client-id
VITE_CLIENT_SECRET=my-client-secret
```

4. Start development server

```bash
pnpm dev
```

5. Open your browser at `http://localhost:5173`

### Build for Production

```bash
pnpm build
```

### Preview Production Build

```bash
pnpm preview
```

## 🎨 Key Features

### Performance Optimizations

- Efficient `reduce()` for finding max cashback rate
- Proper React keys using unique identifiers
- Minimal re-renders with cached data
- Code splitting with React Router
- React Compiler for automatic optimizations

### Accessibility

- Semantic HTML elements
- Proper alt texts for images
- Keyboard navigation support
- ARIA labels where needed
- Focus management

### Code Quality

- Strict TypeScript configuration
- ESLint with React-specific rules
- Consistent code formatting
- Clean component separation
- Comprehensive error handling

## 📱 Responsive Design

The application is fully responsive with breakpoints:

- **Mobile:** Single column layout
- **Tablet:** 2-column grid
- **Desktop:** 3-column grid

## 🔒 Security Considerations

- Environment variables for sensitive data
- API keys not exposed in client code
- Token stored securely in localStorage
- Automatic token expiration handling

## 🧪 Testing Considerations

While tests are not included in this challenge submission, the code is structured for testability:

- Pure functions for data transformations
- Separated concerns (UI, logic, API)
- Dependency injection for API functions
- Predictable state management

## 📝 Future Enhancements

Potential improvements for production:

- Add unit tests (Jest/Vitest)
- Add E2E tests (Playwright/Cypress)
- Implement search and filter functionality
- Add pagination for shop list
- Implement favorites management
- Add analytics tracking
- Implement retry logic for failed requests
- Implement proper error logging (Sentry)

## 📄 License

This project was created as a coding challenge for Mehrwerk.

---

**Developed with ❤️ using React 19, TypeScript, and modern web technologies**
