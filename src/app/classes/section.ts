export class Section {
  public name: string = '';
  public image: string = '';
  public subsections: Section[] = [];
  public words: string[] = [];

  constructor(name: string = '') {
    this.name = name;
  }
}
