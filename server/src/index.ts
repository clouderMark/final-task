import 'dotenv/config';
import cors from 'cors';
import fileUpload from 'express-fileupload';
import express, {Application} from 'express';
import cookieParser from 'cookie-parser';
import sequelize from './sequelize';
import router from './routes/index';
import ErrorHandler from './middleware/ErrorHandler';

const PORT = process.env.PORT || 2900;
const app: Application = express();

app.use(cors({origin: ['http://localhost:3000'], credentials: true}));
app.use(express.json());
app.use(express.static('static'));
app.use(fileUpload());
app.use(cookieParser(process.env.SECRET_KEY));
app.use('/api', router);

// Обработка ошибок
app.use(ErrorHandler);

const start = async () => {
  try {
    await sequelize.authenticate();
    await sequelize.sync();

    app.listen(PORT, () => console.log('Сервер запущен', PORT));
  } catch (e) {
    console.log(e);
  }
};

start();
