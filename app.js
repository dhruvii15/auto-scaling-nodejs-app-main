const express = require('express');
const app = express();
const port = 5000;

// Home Route
app.get('/', (req, res) => {
  res.send('<h1>Auto Scaling Demo App</h1> <h4>Message: Success</h4> <p>Version: 1.0.0</p>');
});

// 404 Not Found Handler
app.use((req, res, next) => {
  res.status(404).send('<h1>404 Not Found</h1><p>The page you are looking for does not exist.</p>');
});

// Global Error Handler
app.use((err, req, res, next) => {
  console.error('Error:', err.stack);
  res.status(500).send('<h1>500 Internal Server Error</h1><p>Something went wrong!</p>');
});

app.listen(port, () => {
  console.log(`Demo app is up and listening to port ${port}`);
});
