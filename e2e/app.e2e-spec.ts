import { AdminuxNGPage } from './app.po';

describe('AdminuxNG App', function() {
  let page: AdminuxNGPage;

  beforeEach(() => {
    page = new AdminuxNGPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('AdminuxNG BS 4 Angular 4');
  });
});
