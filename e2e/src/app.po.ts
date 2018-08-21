import { browser, by, element, protractor } from 'protractor';

export class AppPage {
  navigateTo() {
    return browser.get('/');
  }

  getTitle() {
    return element(by.css('h2')).getText();
  }

  undo() {
    element(by.buttonText('Undo')).click();
  }

  reset() {
    element(by.buttonText('Reset')).click();
  }

  enablePlayMode() {
    element.all(by.css('.radio-container')).get(0).click();
  }

  enableMoveMode() {
    element.all(by.css('.radio-container')).get(1).click();
  }

  areButtonsPresent() {
    return element(by.css('button')).isPresent();
  }

  sendKeyDownEvent() {
    browser.actions().sendKeys(protractor.Key.ARROW_RIGHT).perform();
  }
}
