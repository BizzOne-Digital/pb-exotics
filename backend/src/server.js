const app = require('./app');
const connectDB = require('./config/db');

connectDB().catch(() => process.exit(1));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`PB Exotics server running on port ${PORT}`));
