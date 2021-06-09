import { BaseComponent } from '../base-component';
import { settings } from '../utils/settings';
import './card.scss';

export class Card extends BaseComponent {
  constructor(readonly image: string) {
    super('div', ['card-container']);
    this.image = image;
    this.render();
  }

  private render() {
    this.element.innerHTML = `
      <div class="card">
          <div class="card__front" style="background-image: url('${settings.cardImagesPath}${this.image}')"></div>
          <div class="card__back"></div>
      </div>
    `;
  }

  flipToFront(): Promise<void> {
    return this.flip(false);
  }

  flipToBack(): Promise<void> {
    return this.flip(true);
  }

  private flip(toBack = true): Promise<void> {
    return new Promise((resolve) => {
      if (toBack) this.element.classList.add(settings.flipToBackClass);
      else this.element.classList.remove(settings.flipToBackClass);
      this.element.addEventListener('transitionend', () => resolve(), {
        once: true,
      });
    });
  }
}
