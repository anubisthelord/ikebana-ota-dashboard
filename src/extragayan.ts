// 5. hooks/ — Reusable React logic
// Purpose: Store custom React hooks.
// hooks/
// ├── useAuth.ts
// ├── useDebounce.ts
// └── usePagination.ts


// What are hooks?

// Hooks let us reuse React logic without duplicating it across components.

// For example:
// const { user, isAuthenticated } = useAuth();


// Instead of manually checking the logged-in user on every page, we can reuse the same hook.

// Other examples:
// - useDebounce: Delay search requests while typing.
// - usePagination: Manage pagination.
// - useAuth: Access authentication state.
// 6. lib/ — External libraries and configurations
// Purpose: Configure tools and utilities used throughout the application.
// lib/
// ├── api.ts
// ├── utils.ts
// └── constants.ts


// api.ts
// This is especially important.

// It will configure Axios to communicate with NestJS.

// Example:
// import axios from "axios";

// export const api = axios.create({
//   baseURL: import.meta.env.VITE_API_BASE_URL,
//   headers: {
//     "Content-Type": "application/json",
//   },
// });


// All feature services will use this shared API client.

// For example:
// api.get("/vendors/my");
// api.post("/vendors", vendorData);


// We won't create separate Axios configurations for every feature.
// utils.ts
// Common helper functions.

// Examples:
// - Format dates.
// - Format currency.
// - Convert text to title case.
// - Handle common formatting operations.
// constants.ts
// Store reusable fixed values.

// Examples:
// - API paths.
// - Application name.
// - Pagination defaults.
// - Status labels.
// 7. types/ — Shared TypeScript types
// Purpose: Define data structures shared across different features.
// types/
// ├── user.types.ts
// ├── api.types.ts
// └── common.types.ts


// For example, a shared user type:
// export interface User {
//   id: string;
//   fullName: string;
//   email: string;
//   globalRole: "USER" | "SUPER_ADMIN";
//   status: "ACTIVE" | "SUSPENDED";
// }


// Why is this important?

// Our backend already returns structured JSON. TypeScript types help the frontend understand what data it receives.

// It also helps prevent mistakes when passing information between components.

// Feature-specific types, such as Vendor and TeamMember, will remain inside their respective feature folders.
// 8. App.tsx and main.tsx
// These two files are important, but they are not folders.
// main.tsx — Application entry point
// This is where React starts.
// import React from "react";
// import ReactDOM from "react-dom/client";
// import App from "./App";

// ReactDOM.createRoot(
//   document.getElementById("root")!
// ).render(
//   <React.StrictMode>
//     <App />
//   </React.StrictMode>
// );


// App.tsx — Main application component
// This connects the application to our router and global providers.

// We'll keep most routing configuration in app/router.tsx, not inside App.tsx.