import Express from "express";
import { router as apiRouter } from "./Src/Routers/index.routers.js";

const app = Express();

// Middleware to parse incoming JSON requests
app.use(Express.json());

// Define your routes
app.use("/api", apiRouter);

// 404 Error Handling Middleware for invalid paths
app.use((req, res, next) => {
    res.status(404).json({
        error: 'Not Found',
        message: `The path ${req.originalUrl} does not exist`
    });
});

// General Error Handling Middleware for any other server errors
app.use((err, req, res, _) => {
    console.error(err.stack); // Log the error stack for debugging
    res.status(500).json({
        error: 'Internal Server Error',
        message: err.message
    });
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Running on port ${PORT}`);
});
