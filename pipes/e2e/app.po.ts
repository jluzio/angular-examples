import { browser, element, by } from 'protractor';

export class PipesPage {
  navigateTo() {
    return browser.get('/');
  }

  getParagraphText() {
    return element(by.css('pipes-root h1')).getText();
  }
}
