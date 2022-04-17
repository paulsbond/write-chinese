export class Word {
  seconds: number = 30;
  due?: number;

  constructor(
    public simplified: string,
    public traditional: string,
    public sounds: string,
    public pinyin: string,
    public definition: string
  ) {}

  good(): void {
    this.due = Date.now() + this.seconds * 1000;
    this.seconds *= 2;
  }

  again(): void {
    this.seconds = 15;
    this.good();
  }
}
