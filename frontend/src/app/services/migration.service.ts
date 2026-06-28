import { Injectable, inject } from '@angular/core';

import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';

import { environment } from '../../environments/environment';

import { MigrationRequest } from '../models/migration-request.model';

import { MigrationResponse } from '../models/migration-response.model';

@Injectable({
  providedIn: 'root'
})
export class MigrationService {

  private http = inject(HttpClient);

  private apiUrl = environment.apiUrl;

  startMigration(
    request: MigrationRequest
  ): Observable<MigrationResponse> {

    return this.http.post<MigrationResponse>(
      `${this.apiUrl}/migration/start`,
      request
    );

  }

}