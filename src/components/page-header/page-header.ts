import { BaseComponent } from '../base-component';
import { NavMenu } from '../nav-menu/nav-menu';
import { UserPanel } from '../user-panel/user-panel';
import './page-header.scss';

export class PageHeader extends BaseComponent {
  readonly navMenu: NavMenu;

  readonly userPanel: UserPanel;

  constructor() {
    super('header', ['page-header']);
    this.renderLogo();
    this.navMenu = new NavMenu();
    this.element.append(this.navMenu.element);
    this.userPanel = new UserPanel();
    this.element.append(this.userPanel.element);
  }

  private renderLogo() {
    this.element.innerHTML = `
      <div class="logo">
      <div class="logo__top">match</div>
      <div class="logo__bottom">match</div>
    </div>
    `;
  }
}
