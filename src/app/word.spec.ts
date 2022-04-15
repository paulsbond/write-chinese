import { Word } from './word';

describe('Word', () => {
  it('should create an instance', () => {
    expect(new Word("我", "我", "wo3", "wǒ", "I; me")).toBeTruthy();
  });
});
