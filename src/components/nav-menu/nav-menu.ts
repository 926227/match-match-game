import { NavMenuItemModel } from '../../models/nav-menu-item-model';
import { BaseComponent } from '../base-component';
import { settings } from '../utils/settings';
import { NavMenuItem } from './nav-menu-item';
import './nav-menu.scss';

export class NavMenu extends BaseComponent {
  menu: NavMenuItemModel[] = [];

  menuHTML: HTMLElement[] = [];

  constructor() {
    super('nav', ['nav-menu']);
    fetch(settings.pathToNavMenuSettings)
      .then((res) => res.json())
      .then((res) => {
        this.menu = res;
      })
      .then(() => this.render())
      .then(() =>
        NavMenu.highlightActivetMenuItem(
          this.element,
          this.element.children[0] as HTMLElement
        )
      );

    /* Highlight active menu-item the simplest way for now. then it could be active page check */
    NavMenu.highlightActivetMenuItem =
      NavMenu.highlightActivetMenuItem.bind(this);
    this.element.addEventListener('click', NavMenu.onMenuItemClick);
  }

  static highlightActivetMenuItem(
    parent: HTMLElement,
    target: HTMLElement | null = null
  ): void {
    for (let i = 0; i < parent.children.length; i++) {
      parent.children[i].classList.remove('active');
    }
    if (target) target.classList.add('active');
  }

  static onMenuItemClick(evt: MouseEvent): void {
    const target = (evt.target as HTMLElement).closest('.nav-menu__item');
    NavMenu.highlightActivetMenuItem(
      evt.currentTarget as HTMLElement,
      target as HTMLElement
    );
  }

  private render() {
    this.menuHTML = this.menu.map((item) => new NavMenuItem(item).element);
    this.element.append(...this.menuHTML);
  }
}
