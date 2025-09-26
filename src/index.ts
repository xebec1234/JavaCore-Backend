import app from "./app";

if (process.env.NODE_ENV !== "lambda") {
  const port = process.env.PORT || 8080;
  app.listen(port, () => {
    
// import reportIntroduction from "./routes/report/report-introduction.route";
// app.use("/api/report/report-introduction", reportIntroduction);
    console.log(`Server running on port: ${port}`);
  });
}
