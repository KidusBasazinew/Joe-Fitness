import express, { type Request, type Response } from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import router from './routes';

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

app.use('/api', router); // Mount subscription routes

app.get('/api/test', (req: Request, res: Response) => {
   res.send('Hello World');
});

app.listen(port, () => {
   console.log(`Server is running on http://localhost:${port}`);
});
