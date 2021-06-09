import { ImageCategoryModel } from '../../models/image-category-model';
import { BaseComponent } from '../base-component';
import { settings } from '../utils/settings';
import './page-main-settings.scss';

export class PageMainSettings extends BaseComponent {
  private gameCards: BaseComponent;

  private difficulty: BaseComponent;

  constructor(readonly mainPageRoot: HTMLElement) {
    super('div', ['page-main-settings']);
    this.mainPageRoot = mainPageRoot;

    let temp: BaseComponent = new BaseComponent('div', [
      'page-main-settings__title',
    ]);
    temp.element.textContent = 'Game cards';
    this.element.append(temp.element);
    this.gameCards = new BaseComponent('select', [
      'page-main-settings__select',
    ]);
    this.element.append(this.gameCards.element);
    temp = new BaseComponent('div', ['page-main-settings__title']);
    temp.element.textContent = 'Difficulty';
    this.element.append(temp.element);
    this.difficulty = new BaseComponent('select', [
      'page-main-settings__select',
    ]);
    this.element.append(this.difficulty.element);

    this.render = this.render.bind(this);

    fetch(settings.pathToImagesSettings)
      .then((res) => res.json())
      .then((res) => {
        res.forEach((item: ImageCategoryModel, index: number) => {
          const option = new BaseComponent('option', [
            'page-main-settings__option',
          ]);
          option.element.setAttribute('value', index.toString());
          option.element.textContent = item.category;
          this.gameCards.element.append(option.element);
          // console.log(123);
        });
      });

    temp = new BaseComponent('option', ['page-main-settings__option']);
    temp.element.setAttribute('value', '16');
    temp.element.textContent = '4x4';
    this.difficulty.element.append(temp.element);

    temp = new BaseComponent('option', ['page-main-settings__option']);
    temp.element.setAttribute('value', '36');
    temp.element.textContent = '6x6';
    this.difficulty.element.append(temp.element);

    temp = new BaseComponent('option', ['page-main-settings__option']);
    temp.element.setAttribute('value', '64');
    temp.element.textContent = '8x8';
    this.difficulty.element.append(temp.element);

    this.onInputGameCards = this.onInputGameCards.bind(this);
    this.onInputDifficulty = this.onInputDifficulty.bind(this);

    this.gameCards.element.addEventListener('change', this.onInputGameCards);
    this.difficulty.element.addEventListener('input', this.onInputDifficulty);
  }

  render(): void {
    this.mainPageRoot.innerHTML = '';
    this.mainPageRoot.append(this.element);
  }

  private onInputGameCards(): void {
    settings.currentCategoryIndex = +(
      this.gameCards.element as HTMLSelectElement
    ).value;
  }

  private onInputDifficulty(): void {
    settings.currentDifficulty = +(this.difficulty.element as HTMLSelectElement)
      .value;
  }
}
