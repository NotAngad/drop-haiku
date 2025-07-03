/** Library */
import cors from 'cors';
import helmet from 'helmet';
import express, { Application, NextFunction, Request, Response } from 'express';

/** Routes */
import routes from './routes/index.route';

/** Utility */
import { connectDB } from './lib/mongoose';
import { INTERNAL_SERVER_ERROR_CODE, INTERNAL_SERVER_ERROR_MESSAGE } from './utils/constants';

const app: Application = express();

app.use(helmet());

app.use(
  cors({
    origin: process.env.CORS_ORIGIN || '*',
    credentials: true,
  }),
);

app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

connectDB()
  .then(() => {
    console.log('🚀 DB connected');
  })
  .catch(() => {
    console.error('Could not connect to mongo');
  });

app.get('/health', (_req: Request, res: Response) => {
  res.status(200).json({
    status: 'OK',
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
  });
});

app.use('/api', routes);

// eslint-disable-next-line no-unused-vars
app.use((err: any, _req: Request, res: Response, _next: NextFunction) => {
  console.error('Error:', err);

  const statusCode = err.statusCode || err.status || INTERNAL_SERVER_ERROR_CODE;
  const message = err.message || INTERNAL_SERVER_ERROR_MESSAGE;

  res.status(statusCode).json({
    isSuccess: false,
    message,
    statusCode,
    data: {},
    ...(process.env.NODE_ENV === 'development' && { stack: err.stack }),
  });
});

const PORT = process.env.PORT || 3001;
const NODE_ENV = process.env.NODE_ENV || 'development';

app.listen(PORT, () => {
  console.log(`🚀 Server is running on port ${PORT}`);
  console.log(`📝 Environment: ${NODE_ENV}`);
  console.log(`🔗 Health check: http://localhost:${PORT}/health`);
  console.log(`📡 API base URL: http://localhost:${PORT}/api`);
});
