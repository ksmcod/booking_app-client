export interface User {
  id: string;
  email: string;
  name: string; // Used with OAuth authentication
  password?: string; // Null if using OAuth
  image?: string; // Optional profile picture
  createdAt: Date;
  updatedAt: Date;

  // OAuth fields
  provider?: string; // e.g., 'google', 'github'
  providerId?: string; // OAuth provider's unique user ID
}
