import express from 'express';
import morgan from 'morgan';
import cors from 'cors';
import helmet from 'helmet';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import i18n from "i18n";

import { message } from './responses/message';
import { reportRoutes } from './routes/reportRoutes';
import { error } from './responses/error';
import path from "path";

dotenv.config();

i18n.configure({
	locales: ['en', 'tr'],
	directory: path.join(__dirname, 'locales'),
	defaultLocale: 'en',
	queryParameter: 'lang',
	objectNotation: true
});

const app = express();
app.use(express.json());
app.use(morgan('[:date[web]] || :method :url  || Status: :status || Response time: :response-time ms'));
app.use(cors());
app.use(helmet());
app.use(i18n.init);

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

app.set('trust proxy', 1);

app.get('/', (req, res) => {
	res.status(200).json(message("Vevericka Report Service"));
});

app.use('/api/v1', reportRoutes);

app.use((err, _req, res, next) => {
	if (err instanceof SyntaxError) {
		return res.status(400).json(error("Syntax error", 400))
	} else {
		next();
	}
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
	console.log(`Server starting listening on port ${PORT}`);
});