export interface Course {
  id: string;
  title: string;
  image: string;
  sections: Section[];
}

export interface Section {
  title: string;
  words: string[];
}
