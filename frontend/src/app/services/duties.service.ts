import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Duty } from '../interfaces/duty.interface';


@Injectable()
export class DutiesService {

  loading: boolean;
  backURL: string = 'http://localhost:3000/duty'

  constructor(public http: HttpClient) {

  }

  getAllDuties() {
    this.loading = true;
    let url = this.backURL;
    return this.http.get(url);
  }

  addDuty(duty: Duty) {
    this.loading = true;
    let url = this.backURL;
    return this.http.post(url, duty);
  }

  deleteDuty(id: any) {
    let url = this.backURL + '/' + id;
    return this.http.delete(url);
  }

  editDuty(duty: Duty) {
    let url = this.backURL + '/' + duty._id;
    return this.http.put(url, duty);
  }

}
