import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CourseComponent } from './course/course.component';
import { CoursesComponent } from './courses/courses.component';
import { WriterComponent } from './writer/writer.component';

const routes: Routes = [
  { path: '', component: CoursesComponent },
  { path: 'study', component: WriterComponent },
  { path: ':id', component: CourseComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
