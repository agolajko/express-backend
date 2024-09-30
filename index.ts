import express, { Request, Response } from 'express';
import { secretKey, createToken, verifyToken } from './token';

const port = 3000

const app = express();

app.use(express.json());

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

    // Usage example
    const token = createToken({ userId: 456, username: 'newuser' });

    // Return token in response
    res.json({
        message: 'Logged in successfully',
        token: token
    });
});

// protected route
app.get('/protected', (req, res) => {
    // Check if token is valid
    // If valid, send protected data
    // If not, send unauthorized

    // find token from request
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1] as string; // Bearer <token>

    // verify token
    const verifiedPayload = verifyToken(token ? token : '');

    if (verifiedPayload) {
        console.log('Verified user:', verifiedPayload.username);
    } else {
        console.log('Invalid token');
    }

    res.json({ message: 'Accessed protected route' });
});


