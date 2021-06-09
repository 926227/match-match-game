import { BaseComponent } from '../base-component';
import './popup-base-component.scss';

export class PopupBaseComponent extends BaseComponent {
  box: BaseComponent;

  constructor(style: string[] = []) {
    super('div', ['popup', ...style]);
    this.box = new BaseComponent('div', ['popup-box']);
    this.element.append(this.box.element);
    window.addEventListener('keydown', this.onEscdown.bind(this));
    this.close = this.close.bind(this);
    this.open = this.open.bind(this);
    this.close();
  }

  onEscdown(evt: KeyboardEvent): void {
    if (evt.code === 'Escape') this.close();
  }

  public close(): void {
    this.element.hidden = true;
  }

  public open(): void {
    this.element.hidden = false;
  }
}
