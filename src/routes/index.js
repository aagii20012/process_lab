const express = require('express');
const auth = require('./auth.routes');
const authRoute = require('./auth.routes');
const userRoute = require('./user.routes');

const router = express.Router();

const defaultRoutes = [
  {
    path: '/',
    route: authRoute,
  },
  {
    path: '/users',
    route: userRoute,
  },
];

defaultRoutes.forEach((route) => {
  router.use(route.path, route.route);
});

module.exports = router;
