export class BaseInputComponent {
  element: HTMLInputElement;

  constructor(style: string[] = []) {
    this.element = document.createElement('input');
    this.element.classList.add(...style);
  }
}
