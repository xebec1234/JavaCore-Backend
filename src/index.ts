import app from "./app";

if (process.env.NODE_ENV !== "lambda") {
  const port = process.env.PORT || 8080;
  const server = app.listen(port, () => {
    console.log(`✅ Server running on port: ${port}`);
  });

  server.on("error", (err) => {
    console.error("❌ Failed to start server:", err);
  });
}
