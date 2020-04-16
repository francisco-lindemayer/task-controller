const app = require('./server');
app.listen(process.env.PORT || 3000, process.env.HOST || '0.0.0.0');
