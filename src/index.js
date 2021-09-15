import app from './app';
import { env } from './config/env';

import './config/database';

app.listen(env.Port);

console.log('Server listening on port', env.Port);