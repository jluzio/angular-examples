import { browser, element, by } from 'protractor';

export class AuthPage {
  navigateTo() {
    return browser.get('/');
  }

  getParagraphText() {
    return element(by.css('auth-root h1')).getText();
  }
}
