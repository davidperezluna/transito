"use strict";
// empieza la carga del front end
var login_routes_1 = require("./login/login.routes");
var dashboard_routes_1 = require("./dashboard/dashboard.routes");
var login_1 = require("./login");
exports.routes = login_routes_1.LoginRoutes.concat(dashboard_routes_1.DashboardRoutes, [
    {
        path: '**',
        component: login_1.LoginComponent
    }
]);
//# sourceMappingURL=app.routes.js.map