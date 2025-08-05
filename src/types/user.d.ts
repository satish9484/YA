// src/types/user.d.ts

/**
 * Represents the structure of a user object,
 * typically received from an API authentication endpoint.
 */
interface User {
    id: string;
    token: string; // JWT or similar token
    username: string;
    email: string;
    firstName?: string; // Optional property
    lastName?: string;
    roles: ('admin' | 'editor' | 'viewer')[]; // A union type for roles
}
