import { UserResultModel } from '../../models/user-model';
import { BaseComponent } from '../base-component';
import './game-result.scss';

export class GameResult extends BaseComponent {
  private avatar: BaseComponent;

  private fullName: BaseComponent;

  private email: BaseComponent;

  private score: BaseComponent;

  private userResult: UserResultModel;

  constructor(userResult: UserResultModel) {
    super('article', ['game-result']);
    this.userResult = userResult;

    /* Render layout */
    this.avatar = new BaseComponent('img', ['game-result__avatar']);
    const userInfo = new BaseComponent('div', ['game-result__user-info']);
    this.fullName = new BaseComponent('div', ['game-result__full-name']);
    this.email = new BaseComponent('div', ['game-result__email']);
    userInfo.element.append(this.fullName.element, this.email.element);
    const scoreWrapper = new BaseComponent('div', ['game-result__score']);
    scoreWrapper.element.innerHTML =
      '<span class="game-resule__score-title">Score: </span>';
    this.score = new BaseComponent('span', ['game-result__score-number']);
    scoreWrapper.element.append(this.score.element);

    /* Add inner content */
    if (this.userResult.avatar)
      (this.avatar.element as HTMLImageElement).src = this.userResult.avatar;
    this.fullName.element.textContent = `${this.userResult.firstName} ${this.userResult.lastName}`;
    this.email.element.textContent = this.userResult.email;
    this.score.element.textContent = String(this.userResult.result);

    /* Final. render full element */
    this.element.append(
      this.avatar.element,
      userInfo.element,
      scoreWrapper.element
    );
  }
}
