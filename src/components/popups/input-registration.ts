import { BaseComponent } from '../base-component';
import { BaseInputComponent } from '../base-input-component';
import { settings } from '../utils/settings';
import { InputPropertiesModel } from '../../models/input-propeties-model';

const validationEvent = new Event('invalid', { bubbles: true });

export class InputRegistration extends BaseComponent {
  caption: BaseComponent;

  inputArea: BaseInputComponent;

  indicator: BaseComponent;

  props: InputPropertiesModel = {};

  valid = false;

  constructor(title = 'Label', style: string[] = []) {
    super('label', style);
    this.caption = new BaseComponent('span', [
      'popup-registration__label-caption',
    ]);
    this.caption.element.textContent = title;
    this.inputArea = new BaseInputComponent(['popup-registration__input']);
    this.indicator = new BaseComponent('div', [
      'popup-registration__indicator',
    ]);
    this.element.append(
      this.caption.element,
      this.inputArea.element,
      this.indicator.element
    );

    this.element.addEventListener('input', this.onInput.bind(this));
    this.props.required = true;
    this.validation();
  }

  onInput(): void {
    this.inputArea.element.value = this.inputArea.element.value.slice(
      0,
      settings.maxInputLength
    );
    this.validation();
  }

  set forbiddenSymbols(str: string) {
    const regexp = new RegExp(`[${str}]`, 'gi');
    this.props.forbiddenSymbols = regexp;
    this.validation();
  }

  set mask(mask: RegExp) {
    this.props.mask = mask;
    this.validation();
  }

  set require(flag: boolean) {
    this.props.required = flag;
    this.validation();
  }

  clear(): void {
    this.inputArea.element.value = '';
    this.validation();
  }

  private validation(): void {
    if (this.checkValidity()) {
      this.valid = true;
      this.showValidityState(true);
      this.element.dispatchEvent(validationEvent);
    } else {
      this.valid = false;
      this.showValidityState(false);
      this.element.dispatchEvent(validationEvent);
    }
  }

  private checkValidity(): boolean {
    if (this.props.required && this.inputArea.element.value.length === 0)
      return false;
    if (
      this.props.forbiddenSymbols &&
      this.inputArea.element.value.match(this.props.forbiddenSymbols)
    )
      return false;
    if (this.props.mask && !this.inputArea.element.value.match(this.props.mask))
      return false;
    return true;
  }

  private showValidityState(status: boolean): void {
    if (status) this.indicator.element.classList.add('valid');
    else this.indicator.element.classList.remove('valid');
  }
}
