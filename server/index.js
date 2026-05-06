import express from "express";

// 🔥 Import route modules (backend only)
import authRoutes from "./src/routes/auth.routes.js";
import donorRoutes from "./src/routes/donor.routes.js";
import requestRoutes from "./src/routes/request.routes.js";
import inventoryRoutes from "./src/routes/inventory.routes.js";

const app = express();

app.use(express.json());

// ✅ Health check
app.get("/", (req, res) => {
  res.send("API running...");
});

/**
 * 🔥 API ROUTES
 * Each domain gets its own endpoint
 */
app.use("/api/auth", authRoutes);
app.use("/api/donors", donorRoutes);
app.use("/api/requests", requestRoutes);
app.use("/api/inventory", inventoryRoutes);

// 🚀 Start server
app.listen(5000, () => {
  console.log("Server running on port 5000");
});