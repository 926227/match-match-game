import { settings } from '../utils/settings';
import { Game } from './game';

export class PrepareGame {
  private static lastDifficulty: number = settings.currentDifficulty;

  private static lastCategoryIndex: number = settings.currentCategoryIndex;

  public static prepare(game: Game): Promise<void> {
    if (
      game.images.length > 0 &&
      PrepareGame.lastCategoryIndex === settings.currentCategoryIndex &&
      PrepareGame.lastDifficulty === settings.currentDifficulty
    ) {
      return new Promise((resolve) => resolve());
    }

    return fetch(settings.pathToImagesSettings)
      .then((res) => res.json())
      .then((res) => {
        game.allImages = res;
      })
      .then(() => {
        PrepareGame.lastCategoryIndex = settings.currentCategoryIndex;
        PrepareGame.lastDifficulty = settings.currentDifficulty;
        game.chooseImages(settings.currentCategoryIndex);
        const sideSize = Math.sqrt(settings.currentDifficulty);
        const style = `
          grid-template-columns: repeat(${sideSize}, 1fr);
          grid-template-rows: repeat(${sideSize}, 1fr);`;
        game.cardsField.element.setAttribute('style', style);
      });
  }
}
