export class Timer {
  timerStart?: number;

  start(): void {
    this.timerStart = Date.now();
  }

  get seconds(): string {
    const now = Date.now();
    const res = this.timerStart
      ? Math.floor((now - this.timerStart) / 1000) % 60
      : 0;
    if (res < 10) return `0${res}`;
    return String(res);
  }

  get minutes(): string {
    const now = Date.now();
    const res = this.timerStart
      ? Math.floor((now - this.timerStart) / (1000 * 60))
      : 0;
    if (res < 10) return `0${res}`;
    return String(res);
  }

  get result(): number {
    const now = Date.now();
    const res = this.timerStart ? now - this.timerStart : 0;
    return res;
  }
}
