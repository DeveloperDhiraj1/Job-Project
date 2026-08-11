import express from 'express'
import dotenv from 'dotenv';
import connectDB from './config/db.js';
import mainRoute from './routes/mainRoute.js';
import bodyParser from 'body-parser';


dotenv.config();
connectDB();

const app = express();
const PORT = process.env.PORT || 8050;

app.use(express.json());
app.use(bodyParser);

app.get('/', (req, res) => {
  res.send('API is running...');
});
app.use('/api', mainRoute);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

export default app;
