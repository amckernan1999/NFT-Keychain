const Authorize = require('../app/Middleware/Authorize.js');
const VerifyJWT = require('../app/Middleware/VerifyJWT.js');


/*
|--------------------------------------------------------------------------
| Default router
|--------------------------------------------------------------------------
|
| Default router is used to define any routes that don't belong to a
| controller. Also used as a parent container for the other routers.
|
*/
const router = require('koa-router')({
    prefix: '/api/v1'
});

router.get('/', function (ctx) {
    console.log('router.get(/)');
    return ctx.body = 'What is up?';
});

/*
|--------------------------------------------------------------------------
| login router
|--------------------------------------------------------------------------
|
| Description
|
*/


const LoginController = new (require('../app/Controllers/LoginController.js'))();
const loginRouter = require('koa-router')({
    prefix: '/login'
});
loginRouter.get('/:userName/:userPassword', LoginController.authorizeUser, (err) => console.log("nft_keychain_routes.js: loginRouter error:", err));
loginRouter.get('/:userName', LoginController.checkForUser, (err) => console.log("nft_keychain_routes.js: checkRouter error:", err));
loginRouter.get('/:userName/:userPassword/:create', LoginController.createUser, (err) => console.log("nft_keychain_routes.js: createRouter error:", err));
loginRouter.get('/:userName/:a/:b/:get', LoginController.getUserID, (err) => console.log("nft_keychain_routes.js: getUserID error:", err));



// const RoutesController = new (require('../app/Controllers/RoutesController.js'))();
const routesRouter = require('koa-router')({
    prefix: '/routes'
});

routesRouter.use(VerifyJWT);
// routesRouter.get('/all-routes', Authorize('admin'), RoutesController.allRoutes, err => console.log(`allRoutes ran into an error: ${err}`));
// routesRouter.get('/:routeID/', Authorize('admin'), RoutesController.routeWithRouteID);


/**
 * Register all of the controllers into the default controller.
 */
router.use(
    '',
    loginRouter.routes(),
    routesRouter.routes()
);

module.exports = function (app) {
    app.use(router.routes());
    app.use(router.allowedMethods());
};
