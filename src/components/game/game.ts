import { ImageCategoryModel } from '../../models/image-category-model';
import { BaseComponent } from '../base-component';
import { Card } from '../card/card';
import { CardsField } from '../cards-field/cards-field';
import { delay } from '../utils/delay';
import { settings } from '../utils/settings';
import './game.scss';
import { TimerTablo } from '../timer-tablo/timer-tablo';
import { PopupCongratulations } from '../popups/popup-congratulations';
import { DataBase } from '../database/database';
import { PrepareGame } from './prepare-game';

type GameStatistics = {
  movesDone: number;
  wrongMoves: number;
  cardsNumberRemain: number;
};

export class Game extends BaseComponent {
  private timerTablo: TimerTablo;

  private activeCard?: Card;

  private isAnimation = false;

  private gameStat: GameStatistics = {
    movesDone: 0,
    wrongMoves: 0,
    cardsNumberRemain: 0,
  };

  private isReady = false;

  cardsField: CardsField;

  mainPageRoot: HTMLElement;

  allImages: ImageCategoryModel[] = [];

  images: string[] = [];

  constructor(mainPageRoot: HTMLElement) {
    super('div', ['game-field', 'page-main__inner-element']);

    this.timerTablo = new TimerTablo(['game-field__timer-tablo']);
    this.cardsField = new CardsField();
    this.element.append(this.timerTablo.element, this.cardsField.element);

    this.mainPageRoot = mainPageRoot;
    this.render = this.render.bind(this);

    PrepareGame.prepare(this);
  }

  chooseImages(index: number): void {
    const cat: ImageCategoryModel = this.allImages[index];
    this.images = cat.images
      .map((name: string) => `${cat.category}/${name}`)
      .slice(0, settings.currentDifficulty / 2);
  }

  private checkEndOfGame() {
    if (this.gameStat.cardsNumberRemain > 0) return;

    const gameFinishTime = this.timerTablo.stop();
    let gameScore =
      (this.gameStat.movesDone - this.gameStat.wrongMoves) * 100 -
      Math.floor(gameFinishTime / 100);
    if (gameScore < 0) gameScore = 0;

    settings.currentUser.result = gameScore;
    const db = new DataBase();
    db.addUserResult(settings.currentUser);

    const alert = new PopupCongratulations();
    document.body.children[1].appendChild(alert.element);
    alert.open();
    alert.box.element.insertAdjacentHTML(
      'afterbegin',
      `Congratulations ${settings.currentUser.firstName}!!!
      Your score is ${gameScore} <br> moves done: ${this.gameStat.movesDone}`
    );
    this.timerTablo.clear();
    this.gameStat.movesDone = 0;
  }

  private startGame() {
    this.cardsField.clear();
    this.gameStat.cardsNumberRemain = this.images.length * 2;
    this.gameStat.wrongMoves = 0;
    this.gameStat.movesDone = 0;

    const cards = this.images
      .concat(this.images)
      .map((url) => new Card(url))
      .sort(() => Math.random() - 0.5);

    this.cardsField.addCards(cards).then(() => {
      this.timerTablo.run();
      this.isReady = true;
    });

    cards.forEach((card) => {
      card.element.addEventListener('click', () => this.cardHandler(card));
    });
  }

  public newGame(): void {
    this.isReady = false;
    this.timerTablo.stop();
    this.timerTablo.clear();
    PrepareGame.prepare(this).then(() => this.startGame());
  }

  public render(): void {
    this.mainPageRoot.innerHTML = '';
    this.mainPageRoot.append(this.element);
    this.newGame();
  }

  private async cardHandler(card: Card): Promise<void> {
    if (!this.isReady) return;
    if (this.activeCard === card) return;
    if (this.isAnimation) return;
    this.isAnimation = true;

    await card.flipToFront();

    if (!this.activeCard) {
      this.activeCard = card;
      this.isAnimation = false;
      return;
    }

    if (this.activeCard.image !== card.image) {
      this.gameStat.movesDone++;
      this.gameStat.wrongMoves++;
      await delay(settings.flipDelay);
      await Promise.all([this.activeCard.flipToBack(), card.flipToBack()]);
    } else {
      this.gameStat.cardsNumberRemain -= 2;
      this.gameStat.movesDone++;
      this.checkEndOfGame();
    }

    this.activeCard = undefined;
    this.isAnimation = false;
  }
}
