import express, { Express, Request, Response } from 'express';
import { secretKey, createToken, verifyToken } from './token';
import cors from 'cors';
import path from 'path';

const app = express();


const port = process.env.PORT || 80;

app.listen(process.env.PORT || 80, () => {
    console.log('Example app listening on port 80');
});

app.set('trust proxy', true);

app.use(express.json());
app.use(express.static('dist'));

app.use(cors({
    origin: [
        'https://d2or8p4c819qrl.cloudfront.net',
        'http://d2or8p4c819qrl.cloudfront.net',
        'https://testdomain123.click',
        'https://www.testdomain123.click'
    ],
    methods: ['GET', 'POST'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true
}));

app.use((req, res, next) => {
    if (req.hostname === 'testdomain123.click' &&
        req.get('X-Forwarded-Proto') !== 'https') {
        return res.redirect(`https://${req.get('host')}${req.originalUrl}`);
    }
    next();
});

//public route
app.get('/', (req: Request, res: Response) => {
    res.send('Hello World!')
})

app.get('/api/health', (req: Request, res: Response) => {
    res.status(200).send('OK');
});

// Register user with a POST request
app.post('/api/register', (req: Request, res: Response) => {
    const { username, password, email } = req.body;

    // Check if username or email is taken
    // Hash password
    // Add user to DB

    // For now, just logging the received data
    console.log(`Received: username=${username}, email=${email}`);

    res.send('User registered');
});

const users = [
    { userId: 1, username: 'admin', password: 'password123' },
    { userId: 2, username: 'user', password: 'test123' }
];

app.post('/api/login', (req: Request, res: Response) => {
    const { username, password } = req.body;

    // Check if user exists
    // Check if password is correct
    // create token?

    const user = users.find(u =>
        u.username === username &&
        u.password === password
    );

    if (!user) {
        // console.log("Invalid credentials");
        res.status(401).json({ message: 'Invalid credentials' });
        return
    }

    // For now, just logging the received data
    console.log(`Login: username=${username}`);

    // Usage example
    const token = createToken({
        userId: user.userId,
        username: user.username
    });

    // Return token in response
    res.json({
        message: 'Logged in successfully',
        token: `Bearer ${token}`
    });

});

// protected route
app.get('/api/protected', (req: Request, res: Response) => {
    // Check if token is valid
    // If valid, send protected data
    // If not, send unauthorized

    // find token from request
    const authHeader = req.headers['authorization'];

    console.log('Auth header:', authHeader);

    const token = authHeader && authHeader.split(' ')[1] as string;

    // verify token
    console.log('Token:', token);
    const verifiedPayload = verifyToken(token ? token : '');

    if (verifiedPayload) {
        console.log('Verified user:', verifiedPayload.username);
        res.json({ message: 'Accessed protected route' });

    } else {
        console.log('Invalid token');
        res.status(401).json({ message: 'Unauthorized' });

    }

});

app.get('*', (req: Request, res: Response) => {
    res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});
