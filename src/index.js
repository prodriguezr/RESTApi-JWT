import app from './app';
import * as Config from './config/env';

import './config/database';

app.listen(Config.env.Port);

console.log('Server listening on port', Config.env.Port);