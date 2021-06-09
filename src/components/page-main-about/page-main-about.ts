import { BaseComponent } from '../base-component';
import './page-main-about.scss';

export class PageMainAbout extends BaseComponent {
  mainPageRoot: HTMLElement;

  constructor(mainPageRoot: HTMLElement) {
    super('div', ['page-main-about', 'page-main__inner-element']);
    this.mainPageRoot = mainPageRoot;
    this.render = this.render.bind(this);

    let temp: BaseComponent;
    temp = new BaseComponent('h2', ['page-main-about__title']);
    temp.element.textContent = 'How to play?';
    this.element.append(temp.element);

    temp = new BaseComponent('div', [
      'page-main-about__step',
      'step',
      'step--1',
    ]);
    temp.element.innerHTML = `
    <div class="step__box">
      <div class="step__number">1</div>
      <div class="step__description">Register new player in game</div>
    </div>
    <img class="step__img" src="./images/about-1.jpg" alt="registration popup" />
    `;
    this.element.append(temp.element);

    temp = new BaseComponent('div', [
      'page-main-about__step',
      'step',
      'step--2',
    ]);
    temp.element.innerHTML = `
    <div class="step__box">
      <div class="step__number">2</div>
      <div class="step__description">Configure your game settings</div>
    </div>
    <img class="step__img" src="./images/about-2.jpg" alt="settings menu" />
    `;
    this.element.append(temp.element);

    temp = new BaseComponent('div', [
      'page-main-about__step',
      'step',
      'step--3',
    ]);
    temp.element.innerHTML = `
    <div class="step__box">
      <div class="step__number">3</div>
      <div class="step__description">
        Start you new game! Remember card positions and match it before times up.
      </div>
    </div>
    <img class="step__img" src="./images/about-3.jpg" alt="game field" />
    `;
    this.element.append(temp.element);
  }

  render(): void {
    this.mainPageRoot.innerHTML = '';
    this.mainPageRoot.append(this.element);
  }
}
