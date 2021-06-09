import { BaseComponent } from '../base-component';
import './button.scss';

export class Button extends BaseComponent {
  props = {
    caption: '',
    path: '',
  };

  css = {
    color: '',
    height: '',
    width: '',
    'background-color': '',
  };

  constructor(
    tag: keyof HTMLElementTagNameMap = 'button',
    style: string[] = []
  ) {
    super(tag, ['button', ...style]);
  }

  set caption(str: string) {
    this.props.caption = str;
    this.element.textContent = str;
  }

  set path(str: string) {
    this.props.path = str;
    this.element.setAttribute('href', str);
  }

  set backgroundColor(str: string) {
    this.css['background-color'] = str;
    this.applyStyle();
  }

  set color(str: string) {
    this.css.color = str;
    this.applyStyle();
  }

  set width(str: string) {
    this.css.width = str;
    this.applyStyle();
  }

  set height(str: string) {
    this.css.height = str;
    this.applyStyle();
  }

  private applyStyle(): void {
    const styleOfButton = Object.entries(this.css).reduce((sum, current) => {
      if (current[1] !== '') return `${sum}${current[0]}:${current[1]}; `;
      return sum;
    }, '');
    this.element.setAttribute('style', styleOfButton);
  }
}
