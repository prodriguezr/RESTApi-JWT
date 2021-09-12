import app from './app';

app.listen(process.env.PORT || 4200);

console.log('Server listening on port', process.env.PORT || 4200);