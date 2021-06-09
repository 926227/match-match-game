import { UserResultModel } from '../../models/user-model';
import { BaseComponent } from '../base-component';
import { DataBase } from '../database/database';
import { GameResult } from '../game-result/game-result';
import './page-main-best.scss';

export class PageMainBest extends BaseComponent {
  title: BaseComponent;

  resultsBoard: BaseComponent;

  constructor(readonly mainPageRoot: HTMLElement) {
    super('div', ['page-main-best', 'page-main__inner-element']);
    this.mainPageRoot = mainPageRoot;

    this.title = new BaseComponent('h2', ['page-main-best__title']);
    this.resultsBoard = new BaseComponent('div', [
      'page-main-best__result-board',
    ]);

    this.title.element.textContent = 'Best players';

    this.element.append(this.title.element, this.resultsBoard.element);

    this.render = this.render.bind(this);
  }

  public render(): void {
    function showUserResults(
      best10: UserResultModel[] = [],
      element: HTMLElement
    ) {
      if (best10.length <= 0) return;
      element.innerHTML = '';
      best10.forEach((item) => element.append(new GameResult(item).element));
    }
    const db = new DataBase();
    db.getUserResult().then((res) => {
      showUserResults(res, this.resultsBoard.element);
    });

    this.mainPageRoot.innerHTML = '';
    this.mainPageRoot.append(this.element);
  }
}
