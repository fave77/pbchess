const app = require('./app');
const port = process.env.PORT || 4000;

app.listen(port, () => {
  console.log(`Server is Live!\nListening on port: ${port}`);
});

module.exports = app;
