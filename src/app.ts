import express from 'express';
import morgan from 'morgan';
import cors from 'cors';
import helmet from 'helmet';
import mongoose from 'mongoose';
import dotenv from 'dotenv';

import { message } from './responses/message';
import { reportRoutes } from './routes/reportRoutes';

dotenv.config();

const app = express();
app.use(express.json());
app.use(morgan('[:date[web]] || :method :url  || Status: :status || Response time: :response-time ms'));
app.use(cors());
app.use(helmet());

const MONGOOSE_OPTIONS: mongoose.ConnectOptions = {
	useNewUrlParser: true,
	useUnifiedTopology: true,
};

mongoose.connect(process.env.DB_CONNECTION, MONGOOSE_OPTIONS, (err) => {
	if (err) {
		console.error(`Mongoose connection error: ${err.message}`);
	} else {
		console.log('Server connected to MongoDB')
	}
})


app.get('/', (req, res) => {
	res.status(200).json(message("Vevericka Report Service"));
});

app.use('/api/v1', reportRoutes);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
	console.log(`Server starting listening on port ${PORT}`);
});