import { AppPage } from './app.po';

describe('workspace-project App', () => {
  let page: AppPage;

  beforeEach(() => {
    page = new AppPage();
  });

  it('should display the title', () => {
    page.navigateTo();
    expect(page.getTitle()).toEqual('Rubik Cube');
  });

  it('should show undo and reset buttons once the user have played', () => {
    page.navigateTo();
    page.sendKeyDownEvent();
    expect(page.areButtonsPresent()).toBeTruthy();
  });

  it('should hide undo and reset buttons when there is no move history', () => {
    page.navigateTo();
    page.sendKeyDownEvent();
    page.undo();
    expect(page.areButtonsPresent()).toBeFalsy();
  });

  it('should hide undo and reset buttons when there is no move history', () => {
    page.navigateTo();
    page.sendKeyDownEvent();
    page.reset();
    expect(page.areButtonsPresent()).toBeFalsy();
  });

  it('should not play when the move Move is on', () => {
    page.navigateTo();
    page.enableMoveMode();
    page.sendKeyDownEvent();
    expect(page.areButtonsPresent()).toBeFalsy();
  });

  it('should play when the move Play is on', () => {
    page.navigateTo();
    page.enablePlayMode();
    page.sendKeyDownEvent();
    expect(page.areButtonsPresent()).toBeTruthy();
  });
});
