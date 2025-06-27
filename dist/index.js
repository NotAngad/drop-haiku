'use strict';
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, '__esModule', { value: true });
/** Library */
const cors_1 = __importDefault(require('cors'));
const helmet_1 = __importDefault(require('helmet'));
const express_1 = __importDefault(require('express'));
/** Routes */
const index_route_1 = __importDefault(require('./routes/index.route'));
/** Utility */
const mongoose_1 = require('./lib/mongoose');
const app = (0, express_1.default)();
app.use((0, helmet_1.default)());
app.use(
  (0, cors_1.default)({
    origin: process.env.CORS_ORIGIN || '*',
    credentials: true,
  }),
);
app.use(express_1.default.json({ limit: '10mb' }));
app.use(express_1.default.urlencoded({ extended: true, limit: '10mb' }));
(0, mongoose_1.connectDB)()
  .then(() => {
    console.log('🚀 DB connected');
  })
  .catch(() => {
    console.error('Could not connect to mongo');
  });
app.get('/health', (_req, res) => {
  res.status(200).json({
    status: 'OK',
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
  });
});
app.use('/api', index_route_1.default);
// eslint-disable-next-line no-unused-vars
app.use((err, _req, res, _next) => {
  console.error('Error:', err);
  const statusCode = err.statusCode || err.status || 500;
  const message = err.message || 'Internal Server Error';
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
