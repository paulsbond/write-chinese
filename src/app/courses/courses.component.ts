import { Component, OnInit } from '@angular/core';
import { hsk } from './hsk';

@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.css'],
})
export class CoursesComponent implements OnInit {
  hsk = hsk;
  constructor() {}

  ngOnInit(): void {}
}
