process.env['NODE_CONFIG_DIR'] = __dirname + '/configs';

import 'dotenv/config';
import App from '@/app';
import AuthRoute from '@routes/auth.route';
import IndexRoute from '@routes/index.route';
import UsersRoute from '@routes/users.route';
import validateEnv from '@utils/validateEnv';
import HomesRoute from './routes/homes.route';
import RoomsRoute from './routes/rooms.route';
import DevicesRoute from './routes/devices.route';

validateEnv();
const routes = [new IndexRoute(), new AuthRoute(), new UsersRoute(), new HomesRoute(), new RoomsRoute(), new DevicesRoute()];

const app = new App(routes);

app.listen();
