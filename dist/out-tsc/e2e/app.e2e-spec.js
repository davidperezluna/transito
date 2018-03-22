"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var app_po_1 = require("./app.po");
describe('AdminuxNG App', function () {
    var page;
    beforeEach(function () {
        page = new app_po_1.AdminuxNGPage();
    });
    it('should display message saying app works', function () {
        page.navigateTo();
        expect(page.getParagraphText()).toEqual('AdminuxNG BS 4 Angular 4');
    });
});
//# sourceMappingURL=app.e2e-spec.js.map