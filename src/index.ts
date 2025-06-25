/** Library */
import cors from "cors";
import helmet from "helmet";
import express, { Application, Request, Response, NextFunction } from "express";

/** Routes */
import routes from "./routes/index.route";

/** Utility */
import { connectDB } from "./lib/mongoose";

const app: Application = express();

app.use(helmet());

app.use(
  cors({
    origin: process.env.CORS_ORIGIN || "*",
    credentials: true,
  })
);

app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true, limit: "10mb" }));

connectDB()
  .then(() => {
    console.log("🚀 DB connected");
  })
  .catch(() => {
    console.error("Could not connect to mongo");
  });

app.get("/health", (_req: Request, res: Response) => {
  res.status(200).json({
    status: "OK",
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
  });
});

app.use("/api", routes);

app.use((err: any, _req: Request, res: Response, _next: NextFunction) => {
  console.error("Error:", err);

  const statusCode = err.statusCode || err.status || 500;
  const message = err.message || "Internal Server Error";

  res.status(statusCode).json({
    error: true,
    message,
    statusCode,
    ...(process.env.NODE_ENV === "development" && { stack: err.stack }),
  });
});

const PORT = process.env.PORT || 3000;
const NODE_ENV = process.env.NODE_ENV || "development";

app.listen(PORT, () => {
  console.log(`🚀 Server is running on port ${PORT}`);
  console.log(`📝 Environment: ${NODE_ENV}`);
  console.log(`🔗 Health check: http://localhost:${PORT}/health`);
  console.log(`📡 API base URL: http://localhost:${PORT}/api`);
});
