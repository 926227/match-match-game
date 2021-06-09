import { BaseComponent } from '../base-component';
import { Timer } from '../timer/timer';
import './timer-tablo.scss';

export class TimerTablo extends BaseComponent {
  private intervalID = 0;

  minutes: BaseComponent;

  seconds: BaseComponent;

  timer: Timer;

  constructor(style: string[] = []) {
    super('div', ['timer-tablo', ...style]);

    this.minutes = new BaseComponent('span', ['timer-tablo__minutes']);
    this.seconds = new BaseComponent('span', ['timer-tablo__seconds']);
    this.element.append(this.minutes.element, ':', this.seconds.element);

    this.timer = new Timer();

    this.minutes.element.textContent = '00';
    this.seconds.element.textContent = '00';

    this.run = this.run.bind(this);
    this.stop = this.stop.bind(this);
    this.clear = this.clear.bind(this);
    this.showTime = this.showTime.bind(this);
  }

  public run(): void {
    this.timer.start();
    this.intervalID = window.setInterval(this.showTime, 1000);
  }

  public stop(): number {
    const stopTime = this.timer.result;
    window.clearInterval(this.intervalID);
    return stopTime;
  }

  public clear(): void {
    this.minutes.element.textContent = '00';
    this.seconds.element.textContent = '00';
  }

  private showTime(): void {
    this.minutes.element.textContent = this.timer.minutes;
    this.seconds.element.textContent = this.timer.seconds;
  }
}
