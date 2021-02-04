import express from 'express';
import { message } from './responses/message';

const app = express();
const port = 3000;

app.get('/', (req, res) => {
	res.status(200).json(message("Vevericka Report Service"));
});

app.listen(port, () => {
	console.log('Started listening')
})