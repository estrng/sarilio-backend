import cors from 'cors';
import app from './app';

app.use(cors());
app.listen(process.env.PORT || 3333);
