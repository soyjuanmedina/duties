import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms'
import { Duty } from './interfaces/duty.interface';
import { DutiesService } from './services/duties.service';
declare var $: any;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  duties: Array<Duty> = [];
  selectedDuty: Duty;
  originalDuty: Duty;
  dutyForm = new FormGroup({
    duty: new FormControl()
  })

  constructor(public _dutiesService: DutiesService) {
    this.dutyForm.controls["duty"].setValidators([Validators.minLength(10), Validators.required]);
    this.getAllDuties();
  }

  getAllDuties() {
    this._dutiesService.getAllDuties().subscribe(data => {
      this.duties = data as Array<Duty>;
      this._dutiesService.loading = false;
    });
  }

  addDuty() {
    let duty: Duty = {
      name: this.dutyForm.value.duty
    }
    this._dutiesService.addDuty(duty).subscribe(data => {
      this.dutyForm.reset()
      this.getAllDuties();
    });
  }

  selectDuty(duty) {
    this.selectedDuty = duty;
  }

  cancelEdit() {
    this.getAllDuties();
  }

  deleteDuty() {
    this._dutiesService.deleteDuty(this.selectedDuty._id).subscribe(data => {
      $("#deleteDutyModal").modal("hide");
      this.getAllDuties();
    });
  }

  editDuty() {
    this._dutiesService.editDuty(this.selectedDuty).subscribe(data => {
      $("#editDutyModal").modal("hide");
      this.getAllDuties();
    });
  }

}
