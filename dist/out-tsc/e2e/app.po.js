"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var protractor_1 = require("protractor");
var AdminuxNGPage = /** @class */ (function () {
    function AdminuxNGPage() {
    }
    AdminuxNGPage.prototype.navigateTo = function () {
        return protractor_1.browser.get('/');
    };
    AdminuxNGPage.prototype.getParagraphText = function () {
        return protractor_1.element(protractor_1.by.css('app-root h1')).getText();
    };
    return AdminuxNGPage;
}());
exports.AdminuxNGPage = AdminuxNGPage;
//# sourceMappingURL=app.po.js.map