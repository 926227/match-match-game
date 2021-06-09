import { BaseComponent } from '../base-component';
import { settings } from '../utils/settings';

export class AvatarLoader extends BaseComponent {
  public input: HTMLInputElement;

  public img: HTMLImageElement;

  constructor(tag: keyof HTMLElementTagNameMap = 'div', style: string[] = []) {
    super(tag, ['avatar', ...style]);

    this.input = document.createElement('input');
    this.input.id = 'avatar-file';
    this.input.classList.add('avatar__input');
    this.input.type = 'file';

    const label: HTMLLabelElement = document.createElement('label');
    label.htmlFor = 'avatar-file';
    label.classList.add('avatar__label');

    this.img = document.createElement('img');
    this.img.classList.add('avatar__img');

    this.element.append(this.input, this.img, label);

    this.onFileAdd = this.onFileAdd.bind(this);
    this.input.addEventListener('change', this.onFileAdd);
  }

  private onFileAdd(): void {
    if (!this.input.files) return;
    const file: File = this.input.files[0];
    const fileName = file.name.toLowerCase();
    const avatarPreview = this.img;

    const matches = settings.avatarFielTypes.some((it) => {
      return fileName.endsWith(it);
    });

    if (matches) {
      const reader = new FileReader();
      reader.addEventListener('load', () => {
        avatarPreview.src = reader.result as string;
        avatarPreview.classList.add('visible');
      });
      reader.readAsDataURL(file);
      this.input.value = '';
    }
  }
}
