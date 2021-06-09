import { Button } from '../button/button';
import { PopupBaseComponent } from './popup-base-component';
import './popup-congratulations.scss';

export class PopupCongratulations extends PopupBaseComponent {
  okButton: Button;

  constructor() {
    super(['popup-congratulations']);

    this.okButton = new Button('button', ['popup-congratulations__button']);
    this.box.element.append(this.okButton.element);
    this.okButton.caption = 'ok';
    this.okButton.element.addEventListener(
      'click',
      this.onOkButtonClick.bind(this),
      { once: true }
    );

    this.close = this.close.bind(this);
  }

  close(): void {
    this.element.parentElement?.removeChild(this.element);
  }

  private onOkButtonClick(): void {
    this.close();
  }
}
