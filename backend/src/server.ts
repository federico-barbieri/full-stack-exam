import express, { Response, Request, Express, NextFunction } from "express";
import cors from "cors";
import helmet from "helmet";
import userRoutes from "./routes/users";

const app: Express = express();

app.use(helmet());

// Define allowed origins and methods for CORS
const allowedOrigins = ['http://127.0.0.1:5173'];
app.use(
  cors({
    origin: allowedOrigins,
    methods: ['GET', 'POST'],  // Allow POST for adding new users
    credentials: true,
  })
);

// Body parser middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Test route to verify the server is running
app.get('/', (req: Request, res: Response) => {
  res.status(200).json({ message: 'Backend is running' });
});

// Mount user routes
app.use('/api', userRoutes);

// Error-handling middleware should be defined at the bottom
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

export default app;