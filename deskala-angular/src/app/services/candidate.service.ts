import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Candidate } from '../models/candidate.model';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class CandidateService {
  selectedCandidate: Candidate = {
    name: '',
    dob: '',
    age: 0,
    address: '',
    state: '',
    pincode: '',
    email: '',
    result: '',
    _id: '',
  };
  constructor(private http: HttpClient) {}

  addCandidate = (candidate: Candidate, userId: string) => {
    console.log({ userId });
    return this.http.post(
      `${environment.apiBaseUrl}/add-candidate/${userId}`,
      candidate
    );
  };

  getCandidatesList = (userId: string) => {
    return this.http.get(`${environment.apiBaseUrl}/get-candidates/${userId}`);
  };

  updateCandidate = (updatedFields: any, candidateId: string) => {
    return this.http.put(
      `${environment.apiBaseUrl}/update-candidate/${candidateId}`,
      updatedFields
    );
  };

  deleteCandidate = (candidateId: string) => {
    return this.http.delete(
      `${environment.apiBaseUrl}/delete-candidate/${candidateId}`
    );
  };
}
