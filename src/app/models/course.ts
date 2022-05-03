export interface Course {
  id: string;
  title: string;
  image: string;
  sections: Section[];
}

export interface Section {
  title: string;
  subsections: Subsection[];
}

export interface Subsection {
  title: string;
  words: string[];
}
