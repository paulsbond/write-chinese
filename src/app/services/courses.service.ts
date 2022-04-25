import { Injectable } from '@angular/core';
import { Course } from '../models/course';
import hsk2 from '../data/hsk2.json';

@Injectable({
  providedIn: 'root',
})
export class CoursesService {
  courses: Course[] = [hsk2];

  constructor() {}
}
