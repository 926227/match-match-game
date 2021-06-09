import { AvatarLoader } from '../avatar-loader/avatar-loader';
import { BaseComponent } from '../base-component';
import { Button } from '../button/button';
import { settings } from '../utils/settings';
import { InputRegistration } from './input-registration';
import { PopupBaseComponent } from './popup-base-component';
import './popup-registration.scss';

const eventRegistrationFinished = new Event('userregistered', {
  bubbles: true,
});
const eventAvatarAdd = new Event('avatarload', { bubbles: true });

export class PopupRegistration extends PopupBaseComponent {
  title: BaseComponent;

  inputFirstName: InputRegistration;

  inputLastName: InputRegistration;

  inputEmail: InputRegistration;

  avatar: AvatarLoader;

  addButton: Button;

  cancelButton: Button;

  constructor() {
    super(['popup-registration']);

    this.title = new BaseComponent('div', ['popup-registration__title']);
    this.inputFirstName = new InputRegistration('label', [
      'popup-registration__input-first-name',
    ]);
    this.inputLastName = new InputRegistration('label', [
      'popup-registration__input-last-name',
    ]);
    this.inputEmail = new InputRegistration('label', [
      'popup-registration__input-email',
    ]);
    this.avatar = new AvatarLoader('div', ['popup-registration__avatar']);
    this.addButton = new Button('button', ['popup-registration__add-button']);
    this.cancelButton = new Button('button', [
      'popup-registration__cancel-button',
    ]);

    const footer = new BaseComponent('div', ['popup-registration__footer'])
      .element;
    footer.append(this.addButton.element, this.cancelButton.element);
    const inputs = new BaseComponent('div', ['popup-registration__inputs'])
      .element;
    inputs.append(
      this.inputFirstName.element,
      this.inputLastName.element,
      this.inputEmail.element
    );

    this.box.element.append(
      this.title.element,
      inputs,
      this.avatar.element,
      footer
    );

    this.title.element.textContent = 'Register new Player';

    this.inputFirstName.caption.element.textContent = 'First name';
    this.inputFirstName.inputArea.element.setAttribute(
      'placeholder',
      'Enter here'
    );
    this.inputFirstName.forbiddenSymbols =
      '~!@#$%*()_—+=|:;"\'`<>,.?/^0123456789';

    this.inputLastName.caption.element.textContent = 'Last name';
    this.inputLastName.inputArea.element.setAttribute(
      'placeholder',
      'Enter here'
    );
    this.inputLastName.forbiddenSymbols =
      '~!@#$%*()_—+=|:;"\'`<>,.?/^0123456789';

    this.inputEmail.caption.element.textContent = 'Email';
    this.inputEmail.inputArea.element.setAttribute('placeholder', 'Enter here');
    this.inputEmail.mask = /([\w\.\-_]+)?\w+@[\w-_]+(\.\w+){1,}/gi;

    this.addButton.caption = 'add user';
    this.addButton.element.setAttribute('disabled', 'true');

    this.cancelButton.caption = 'cancel';

    this.element.addEventListener('invalid', this.onValidation.bind(this));
    this.addButton.element.addEventListener(
      'click',
      this.onAddButtonClick.bind(this)
    );
    this.cancelButton.element.addEventListener(
      'click',
      this.onCancelButtonClick.bind(this)
    );
  }

  private onValidation() {
    this.validation();
  }

  private collectUserData() {
    const userData = {
      firstName: this.inputFirstName.inputArea.element.value,
      lastName: this.inputLastName.inputArea.element.value,
      email: this.inputEmail.inputArea.element.value,
      result: 0,
      avatar: this.avatar.img.src || '',
    };

    settings.currentUser = userData;
  }

  private onAddButtonClick() {
    this.collectUserData();
    this.clearInputs();
    this.close();
    window.dispatchEvent(eventRegistrationFinished);
    window.dispatchEvent(eventAvatarAdd);
  }

  private onCancelButtonClick() {
    this.clearInputs();
    this.close();
  }

  private clearInputs() {
    this.inputFirstName.clear();
    this.inputLastName.clear();
    this.inputEmail.clear();
    this.avatar.img.src = '';
    this.avatar.img.classList.remove('visible');
  }

  private validation() {
    if (this.checkValidity()) {
      this.addButton.element.removeAttribute('disabled');
    } else this.addButton.element.setAttribute('disabled', 'true');
  }

  private checkValidity(): boolean {
    if (
      this.inputFirstName.valid &&
      this.inputLastName.valid &&
      this.inputEmail.valid
    )
      return true;
    return false;
  }
}
