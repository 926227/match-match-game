import { BaseComponent } from '../base-component';
import { Card } from '../card/card';
import './cards-field.scss';
import { settings } from '../utils/settings';

export class CardsField extends BaseComponent {
  private cards: Card[] = [];

  constructor() {
    super('div', ['cards-field']);
  }

  public clear(): void {
    this.cards = [];
    this.element.innerHTML = '';
  }

  public async addCards(cards: Card[]): Promise<void> {
    const promise = new Promise<void>((resolve) => {
      this.cards = cards;
      this.cards.forEach((card) => this.element.appendChild(card.element));

      const id = setTimeout(() => {
        this.cards.forEach((card) => card.flipToBack());
        resolve();
        window.clearTimeout(id);
      }, settings.prepareShowCardTime);
    });
    return promise;
  }
}
