import { BaseComponent } from '../base-component';

export class UserPanelAvatar extends BaseComponent {
  img: HTMLImageElement;

  constructor() {
    super('div', ['user-panel__avatar']);

    this.img = document.createElement('img');
    this.img.classList.add('user-panel__avatar-img');

    this.element.append(this.img);

    this.addImg = this.addImg.bind(this);
  }

  public addImg(str: string): void {
    if (!str) return;
    this.img.src = str;
    this.img.setAttribute('style', 'display:block');
  }
}
