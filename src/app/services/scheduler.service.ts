import { Injectable } from '@angular/core';
import hsk1 from '../data/lists/hsk1.json';

const minute = 60 * 1000;
const day = 24 * 60 * minute;

@Injectable({
  providedIn: 'root',
})
export class SchedulerService {
  constructor() {}

  nextWord(): string {
    return hsk1[0];
  }

  schedule(word: string, reset: boolean = false) {
    // if (reset) {
    //   this.interval = minute;
    //   this.due = Date.now() + this.interval;
    // } else {
    //   if (this.interval == 4 * minute) this.interval = day;
    //   if (this.interval <= 32 * day) this.interval *= 2;
    // }
  }
}
