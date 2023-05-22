import express from "express";
import morgan from "morgan";
import cors from "cors"
import UserRoutes from "./routes/routes";

const app = express();

// Cors
app.use(cors())

// Settings 
app.set("port", 4000);

// Middleware
app.use(morgan("dev"));
app.use(express.json());


// Routes 
app.use('/api/', UserRoutes);

export default app;
