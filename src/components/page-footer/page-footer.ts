import { BaseComponent } from '../base-component';
import './page-footer.scss';

export class PageFooter extends BaseComponent {
  constructor() {
    super('footer', ['page-footer']);
    this.render();
  }

  render(): void {
    this.element.innerHTML = `
    <svg width ="100" fill="white" >
      <use xlink:href="./images/rs_school_logo.svg#logo"></use>
    </svg>
    `;
  }
}
