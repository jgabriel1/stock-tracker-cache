import express from 'express';

import errorHandler from './errors/errorHandler';
import routes from './routes';

const app = express();

app.use(express.json());
app.use(errorHandler);

app.use(routes);

const port = process.env.PORT || 3334;

app.listen(port, () => {
  console.log(`Server started on port ${port}!`);
});
