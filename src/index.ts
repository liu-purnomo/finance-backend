require('dotenv').config();
import cors from 'cors';
import express from 'express';
import { errorHandler } from './app/middlewares';
import router from './app/routes';

const app = express();
const port = process.env.PORT || 5003;

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get('/', (req, res) => {
    res.status(200).json({
        message: 'Server is running'
    });
});

app.use('/api', router);

app.use(errorHandler);

app.listen(port, () => {
    console.log('Server is running on port', port);
});
