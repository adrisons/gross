import { NemoPage } from './app.po';

describe('nemo App', function() {
  let page: NemoPage;

  beforeEach(() => {
    page = new NemoPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
