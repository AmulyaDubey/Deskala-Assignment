import { Component, OnInit } from '@angular/core';
import { CandidateService } from '../services/candidate.service';
import * as statesList from './states.list.json';
import { NgForm } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-candidate',
  templateUrl: './add-candidate.component.html',
  styleUrls: ['./add-candidate.component.css', '../app.component.css'],
})
export class AddCandidateComponent implements OnInit {
  states = [];

  constructor(
    public candidateService: CandidateService,
    private authService: AuthService,
    private router: Router
  ) {
    this.states = statesList['default'];
  }

  ngOnInit(): void {}

  onFormSubmit = (form: NgForm) => {
    const userId = this.authService.getUserId();
    const candidateId = this.candidateService.selectedCandidate._id;
    const isNew = candidateId === '';
    console.log({ isNew });
    if (!isNew) this.updateCandidate(form.value, candidateId);
    else this.addCandidate(form.value, userId);
  };

  addCandidate = (value, userId) => {
    this.candidateService.addCandidate(value, userId).subscribe(
      (res) => {
        this.router.navigateByUrl('/dashboard');
      },
      (err) => {
        console.log(err);
      }
    );
  };

  updateCandidate = (value, candidateId) => {
    this.candidateService.updateCandidate(value, candidateId).subscribe(
      (res) => {
        this.router.navigateByUrl('/dashboard');
      },
      (err) => {
        console.log(err);
      }
    );
  };

  cancelForm = (form: NgForm) => {
    form.resetForm();
    this.router.navigateByUrl('/dashboard');
  };
}
