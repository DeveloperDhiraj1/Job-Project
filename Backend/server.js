import express from 'express';
import connectDB, { sequelize } from './config/db.js';
import './models/index.js';
import mainRoute from './routes/mainRoute.js';

const app = express();
app.use(express.json());

const start = async () => {
    try {
        await connectDB();
        await sequelize.sync();
        app.use('/api', mainRoute);
        app.get('/', (req, res) => res.send('API is running...'));
        const PORT = process.env.PORT || 8050;
        app.listen(PORT, () => {
            console.log(`server is running on port ${PORT}`);
        });
    } catch (error) {
        console.error('Failed to start server:', error.message);
        process.exit(1);
    }
};

start();