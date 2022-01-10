import { Component, OnInit } from '@angular/core';
import { CandidateService } from '../services/candidate.service';
import { AuthService } from '../services/auth.service';
import { Candidate } from '../models/candidate.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css', '../app.component.css'],
})
export class DashboardComponent implements OnInit {
  columns = [
    {
      title: '#',
      key: 'index',
    },
    {
      title: 'Name',
      key: 'name',
    },
    {
      title: 'Date of Birth',
      key: 'dob',
    },
    {
      title: 'Email',
      key: 'email',
    },
    {
      title: 'Result',
      key: 'result',
    },
    {
      title: 'Actions',
      key: 'actions',
    },
  ];
  candidates = [];
  constructor(
    private candidateService: CandidateService,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    const userId = this.authService.getUserId();
    this.candidateService.getCandidatesList(userId).subscribe(
      (res: any) => {
        this.candidates = res;
      },
      (err) => {}
    );
  }

  updateCandidate = (candidate: Candidate) => {
    this.candidateService.selectedCandidate = candidate;
    this.router.navigateByUrl('/candidate/form');
  };

  updateCandidateResult = (candidate: Candidate, result) => {
    this.candidateService.updateCandidate({ result }, candidate._id).subscribe(
      (res) => {},
      (err) => {}
    );
  };

  deleteCandidate = (candidateId: string) => {
    this.candidateService.deleteCandidate(candidateId).subscribe(
      (res) => {
        this.candidates = this.candidates.filter(
          (candidate) => candidate._id !== candidateId
        );
      },
      (err) => {
        console.log(err);
      }
    );
  };
}
