import { PageFooter } from './components/page-footer/page-footer';
import { PageHeader } from './components/page-header/page-header';
import { PageMain } from './components/page-main/page-main';
import { PopupRegistration } from './components/popups/popup-registration';
import { Router } from './components/router/router';
import { Game } from './components/game/game';
import { PageMainAbout } from './components/page-main-about/page-main-about';
import { PageMainBest } from './components/page-main-best/page-main-best';
import { PageMainSettings } from './components/page-main-settings/page-main-settings';

export class App {
  private readonly pageMain: PageMain;

  private readonly pageHeader: PageHeader;

  private readonly pageFooter: PageFooter;

  private readonly popupRegistration: PopupRegistration;

  private readonly globalRouter: Router;

  constructor(private readonly rootElement: HTMLElement) {
    this.pageHeader = new PageHeader();
    this.rootElement.appendChild(this.pageHeader.element);
    this.pageMain = new PageMain();
    this.rootElement.appendChild(this.pageMain.element);
    this.pageFooter = new PageFooter();
    this.rootElement.appendChild(this.pageFooter.element);
    this.popupRegistration = new PopupRegistration();
    this.rootElement.appendChild(this.popupRegistration.element);

    this.globalRouter = new Router();
    this.globalRouterInit();
  }

  private globalRouterInit(): void {
    const firstPage = new PageMainAbout(this.pageMain.element).render;
    const game = new Game(this.pageMain.element);

    this.globalRouter.addRoute('about', firstPage);
    this.globalRouter.addRoute(
      'best',
      new PageMainBest(this.pageMain.element).render
    );
    this.globalRouter.addRoute(
      'settings',
      new PageMainSettings(this.pageMain.element).render
    );
    this.globalRouter.addRoute('startgame', game.render);
    this.globalRouter.setDefault('about', firstPage);

    this.globalRouter.addRoute('register', this.popupRegistration.open);

    // starting first page
    firstPage();
    window.location.hash = 'about';
  }
}
