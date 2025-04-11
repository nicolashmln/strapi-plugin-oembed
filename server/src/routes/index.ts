import adminRoutes from './admin';

const routes = {
  admin: {
    type: 'admin',
    routes: adminRoutes,
  },
};

export default routes;
