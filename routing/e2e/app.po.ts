import { browser, element, by } from 'protractor';

export class RoutingPage {
  navigateTo() {
    return browser.get('/');
  }

  getParagraphText() {
    return element(by.css('r-root h1')).getText();
  }
}
