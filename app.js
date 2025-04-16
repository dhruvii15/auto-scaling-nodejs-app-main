const express = require('express');
const app = express();
const port = 3000;

// Home Route
app.get('/', (req, res) => {
  res.send('<h1>The local IP Address of this Amazon EC2 instance is:</h1>');
});

app.listen(port, () => {
  console.log(`Demo app is up and listening to port ${port}`);
});
