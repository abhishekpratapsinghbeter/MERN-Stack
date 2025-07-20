const express = require('express');
const path = require('path');
const app = express();
const cors = require('cors');
// Serve the static files from the React app
app.use(express.static(path.join(__dirname, 'frontend/build')));
app.use(cors())
// Handles any requests that don't match the ones above
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname,'/frontend/build/index.html'));
});

// Start the server
const PORT = process.env.PORT || 5007;
app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});
