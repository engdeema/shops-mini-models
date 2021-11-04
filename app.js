const express = require("express");
//import cors after yarn add cors
const cors = require("cors");
const productsRoutes = require("./apis/products/products.routes");
const shopsRoutes = require("./apis/shops/shops.routes");
const userRoutes = require("./apis/users/users.routes");
const connectDB = require("./db/database");
const morgan = require("morgan");
const logger = require("./middleware/logger");
const errorHandler = require("./middleware/errorHandler");
const path = require("path");

const app = express();

connectDB();

// Middleware
app.use(express.json());
//call cors in your MW so it will remove the block from browser
app.use(cors());
//mw that prints out the url http.... and adds media at the end,
//then we can call images
// صار جنه راوت واكسبرس.ستاتيك تحوله حق مدل وير
// to access images
app.use("/media", express.static(path.join(__dirname, "media")));
app.use(morgan("dev"));
app.use(logger);
app.use((req, res, next) => {
  if (req.body.name === "Broccoli Soup")
    res.status(400).json({ message: "I HATE BROCCOLI!! KEEFY! " });
  else next();
});

// Routes
app.use("/apis/products", productsRoutes);
app.use("/apis/shops", shopsRoutes);
app.use("/apis", userRoutes);

app.use((req, res, next) => {
  res.status(404).json({ message: "Path not found" });
});

app.use(errorHandler);

const PORT = 8000;
app.listen(PORT, () => console.log(`Application running on localhost:${PORT}`));
