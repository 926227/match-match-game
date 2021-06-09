import { BaseComponent } from '../base-component';
import { NavMenuItemModel } from '../../models/nav-menu-item-model';

export class NavMenuItem extends BaseComponent {
  constructor(readonly menuItem: NavMenuItemModel) {
    super('a', ['nav-menu__item']);
    this.render();
  }

  private render() {
    const icon: HTMLElement = new BaseComponent('div', ['nav-menu__icon'])
      .element;
    const name: HTMLElement = new BaseComponent('div', ['nav-menu__name'])
      .element;

    icon.setAttribute(
      'style',
      `background-image: url('./icons/${this.menuItem.icon}')`
    );
    name.append(this.menuItem.name);
    this.element.append(icon, name);
    this.element.setAttribute('href', `#${this.menuItem.path}`);
  }
}
