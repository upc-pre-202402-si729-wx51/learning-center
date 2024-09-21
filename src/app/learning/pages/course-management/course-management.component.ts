import {AfterViewInit, Component, inject, OnInit, ViewChild} from '@angular/core';
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
import {MatSort, MatSortHeader} from "@angular/material/sort";
import {MatPaginator} from "@angular/material/paginator";

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
    MatRowDef,
    MatSort,
    MatSortHeader,
    MatPaginator
  ],
  templateUrl: './course-management.component.html',
  styleUrl: './course-management.component.css'
})
export class CourseManagementComponent implements OnInit, AfterViewInit {
  protected courseData!: Course;
  protected columnsToDisplay: string[] = ['id', 'title', 'description', 'actions'];

  @ViewChild(MatSort, {static: false})
  protected sort!: MatSort;

  @ViewChild(MatPaginator, {static: false})
  protected paginator!: MatPaginator;

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

  ngAfterViewInit(): void {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
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
