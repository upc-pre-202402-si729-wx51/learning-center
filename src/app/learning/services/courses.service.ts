import { Injectable } from '@angular/core';
import {BaseService} from "../../shared/services/base.service";
import {Course} from "../model/course.entity";

@Injectable({
  providedIn: 'root'
})
export class CoursesService extends BaseService<Course>{

  constructor() {
    super();
    this.resourceEndPoint = '/courses';
  }

}
