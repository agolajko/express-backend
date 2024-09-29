import express, { Request, Response } from 'express';
import jwt from 'jsonwebtoken';

const port = 3000

const app = express();

app.use(express.json());

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
const secretKey: string = 'your-secret-key';


app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})

//public route
app.get('/', (req, res) => {
    res.send('Hello World!')
})

// Register user with a POST request
app.post('/register', (req, res) => {
    const { username, password, email } = req.body;

    // Check if username or email is taken
    // Hash password
    // Add user to DB
    // create token?

    // For now, just logging the received data
    console.log(`Received: username=${username}, email=${email}`);

    res.send('User registered');
});

// Login user with a POST request
app.post('/login', (req, res) => {
    const { username, password } = req.body;

    // Check if user exists
    // Check if password is correct
    // create token?

    // For now, just logging the received data
    console.log(`Login: username=${username}`);


    // Function to create a token
    function createToken(user: JwtPayload): string {
        return jwt.sign(user, secretKey, { expiresIn: '1h' });
    }

    // Function to verify a token
    function verifyToken(token: string): JwtPayload | null {
        try {
            return jwt.verify(token, secretKey) as JwtPayload;
        } catch (error) {
            console.error('Token verification failed:', error);
            return null;
        }
    }

    // Usage example
    const newToken = createToken({ userId: 456, username: 'newuser' });
    const verifiedPayload = verifyToken(newToken);

    if (verifiedPayload) {
        console.log('Verified user:', verifiedPayload.username);
    } else {
        console.log('Invalid token');
    }


    res.send('User logged in');
});

// protected route
app.get('/protected', (req, res) => {
    // Check if token is valid
    // If valid, send protected data
    // If not, send unauthorized




    res.send('Protected route');
});


