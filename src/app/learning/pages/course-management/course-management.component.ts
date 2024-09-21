import {Component, inject, OnInit} from '@angular/core';
import {CourseCreateAndEditComponent} from "../../components/course-create-and-edit/course-create-and-edit.component";
import {Course} from "../../model/course.entity";
import {
  MatCell, MatCellDef,
  MatColumnDef,
  MatHeaderCell,
  MatHeaderCellDef, MatHeaderRow, MatHeaderRowDef, MatRow, MatRowDef,
  MatTable,
  MatTableDataSource
} from "@angular/material/table";
import {MatIcon} from "@angular/material/icon";
import {CoursesService} from "../../services/courses.service";

@Component({
  selector: 'app-course-management',
  standalone: true,
  imports: [
    CourseCreateAndEditComponent,
    MatTable,
    MatColumnDef,
    MatHeaderCell,
    MatCell,
    MatHeaderCellDef,
    MatCellDef,
    MatIcon,
    MatHeaderRow,
    MatRow,
    MatHeaderRowDef,
    MatRowDef
  ],
  templateUrl: './course-management.component.html',
  styleUrl: './course-management.component.css'
})
export class CourseManagementComponent implements OnInit {
  protected courseData!: Course;
  protected columnsToDisplay: string[] = ['id', 'title', 'description', 'actions'];

  protected isEditMode: boolean = false;
  protected dataSource!: MatTableDataSource<any>;

  private courseService: CoursesService = inject(CoursesService);

  constructor() {
    this.isEditMode = false;
    this.courseData = new Course({});
    this.dataSource = new MatTableDataSource();
  }

  ngOnInit() {
    this.getAllCourses();
  }

  getAllCourses(){
    this.courseService.getAll().subscribe((response: Array<Course>) => {
      this.dataSource.data = response;
    });
  }

  onCourseAdded(course: Course) {
    this.courseData = course;
    this.createCourse();
    this.resetEditState();
  }

  createCourse(){
    this.courseService.create(this.courseData).subscribe((response:Course) => {
      this.dataSource.data.push(response);
      this.dataSource.data = this.dataSource.data;
    })
  }

  onCourseUpdated(course: Course) {
    this.courseData = course;
    this.updateCourse();
    this.resetEditState();
  }

  updateCourse(){
    let courseToUpdate: Course = this.courseData;
    this.courseService.update(courseToUpdate.id, courseToUpdate).subscribe((response: Course) => {
      let index = this.dataSource.data.findIndex((item: Course) => item.id === response.id);
      this.dataSource.data[index] = response;
      this.dataSource.data = this.dataSource.data;
    });
  }

  onDeleteItem(course: Course) {
    this.deleteCourse(course);
  }

  deleteCourse(course: Course){
    this.courseService.delete(course.id).subscribe(()=>{
      this.dataSource.data = this.dataSource.data.filter((item: Course) => item.id !== course.id);
    })
  }

  onCancelEdit() {
    this.resetEditState();
    this.getAllCourses();
  }

  onEditItem(course: Course) {
    this.isEditMode = true;
    this.courseData = course;
  }

  private resetEditState() {
    this.courseData = new Course({});
    this.isEditMode = false;
  }
}
