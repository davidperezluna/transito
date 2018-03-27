"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// empieza la carga del front end
var login_routes_1 = require("./login/login.routes");
var dashboard_routes_1 = require("./dashboard/dashboard.routes");
var index_1 = require("./login/index");
exports.routes = login_routes_1.LoginRoutes.concat(dashboard_routes_1.DashboardRoutes, [
    {
        path: '**',
        component: index_1.LoginComponent
    }
]);
//# sourceMappingURL=app.routes.js.map