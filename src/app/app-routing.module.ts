import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CourseComponent } from './components/course.component';
import { CoursesComponent } from './components/courses.component';
import { WriterComponent } from './components/writer.component';

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
