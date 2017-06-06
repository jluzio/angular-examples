import { browser, element, by } from 'protractor';

export class HttpPage {
  navigateTo() {
    return browser.get('/');
  }

  getParagraphText() {
    return element(by.css('http-root h1')).getText();
  }
}
