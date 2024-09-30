import jwt from 'jsonwebtoken';

// Interfaces
interface User {
    id: number;
    username: string;
    password: string; // In a real app, never store plain text passwords
}

// Define types for payload and token
interface JwtPayload {
    userId: number;
    username: string;
}

export const secretKey: string = 'your-secret-key';

// Function to create a token
export function createToken(user: JwtPayload): string {
    return jwt.sign(user, secretKey, { expiresIn: '1h' });
}

// Function to verify a token
export function verifyToken(token: string): JwtPayload | null {
    try {
        return jwt.verify(token, secretKey) as JwtPayload;
    } catch (error) {
        console.error('Token verification failed:', error);
        return null;
    }
}
