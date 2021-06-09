import { BaseComponent } from '../base-component';
import { Button } from '../button/button';
import { settings } from '../utils/settings';
import { UserPanelAvatar } from './user-panel-avatar';
import './user-panel.scss';

export class UserPanel extends BaseComponent {
  buttonStart: Button;

  buttonRegister: Button;

  avatar: UserPanelAvatar;

  constructor() {
    super('div', ['user-panel']);
    this.buttonStart = new Button('a', ['user-panel__button-start']);
    this.buttonRegister = new Button('a', ['user-panel__button-register']);
    this.avatar = new UserPanelAvatar();
    this.element.append(
      this.buttonRegister.element,
      this.buttonStart.element,
      this.avatar.element
    );

    this.buttonStart.path = '#startgame';
    this.buttonStart.caption = 'start game';
    this.buttonStart.element.setAttribute('style', 'display:none;');

    this.buttonRegister.path = '#register';
    this.buttonRegister.caption = 'register new player';

    this.onRegistrationFinished = this.onRegistrationFinished.bind(this);
    this.onAvatarLoad = this.onAvatarLoad.bind(this);
    window.addEventListener('userregistered', this.onRegistrationFinished);
    window.addEventListener('avatarload', this.onAvatarLoad);
  }

  private onRegistrationFinished(): void {
    this.buttonStart.element.setAttribute('style', 'display:flex;');
    this.buttonRegister.element.setAttribute('style', 'display:none;');
  }

  private onAvatarLoad(): void {
    this.avatar.addImg(settings.currentUser.avatar);
  }
}
