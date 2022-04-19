const minute = 60 * 1000;
const day = 24 * 60 * minute;

export class Word {
  interval: number = minute;
  due?: number;

  constructor(
    public simplified: string,
    public traditional: string,
    public sounds: string,
    public pinyin: string,
    public definition: string
  ) {}

  gotIt(): void {
    this.due = Date.now() + this.interval;
    if (this.interval == 4 * minute) this.interval = day;
    if (this.interval <= 32 * day) this.interval *= 2;
  }

  again(): void {
    this.interval = minute;
    this.due = Date.now() + this.interval;
  }
}
