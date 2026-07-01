import { CommonModule } from '@angular/common';
import { Component, inject, signal } from '@angular/core';
import {
  FormBuilder,
  ReactiveFormsModule,
  Validators
} from '@angular/forms';

import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MigrationService } from '../../services/migration.service';
import { MatTabsModule } from '@angular/material/tabs';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    CommonModule,
  ReactiveFormsModule,
  MatTabsModule,
  MatCardModule,
  MatFormFieldModule,
  MatInputModule,
  MatButtonModule,
  MatSelectModule,
  MatProgressSpinnerModule
  ],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent {

  projectInfo = signal<any | null>(null);
  response = signal<any>(null);

  private fb = inject(FormBuilder);

  private migrationService = inject(MigrationService);

  loading = signal(false);

  successMessage = signal('');

  errorMessage = signal('');

  angularVersions = [
    8,9,10,11,12,13,14,15,16,17,18,19,20
  ];

  migrationForm = this.fb.nonNullable.group({

    repositoryUrl: [
      '',
      [
        Validators.required,
        Validators.pattern(/^https?:\/\/.+/)
      ]
    ],

    fromVersion: [
      12,
      Validators.required
    ],

    toVersion: [
      20,
      Validators.required
    ],

    outputFolder: [
      '',
      Validators.required
    ]

  });

  startMigration(): void {

  this.successMessage.set('');
  this.errorMessage.set('');

  if (this.migrationForm.invalid) {
    this.migrationForm.markAllAsTouched();
    return;
  }

  if (
    this.migrationForm.controls.fromVersion.value >=
    this.migrationForm.controls.toVersion.value
  ) {
    this.errorMessage.set(
      'Target version must be greater than current version.'
    );
    return;
  }

  this.loading.set(true);

  const request = this.migrationForm.getRawValue();

  this.migrationService.startMigration(request).subscribe({

    next: (response) => {
      console.log('response:::',response);

      this.loading.set(false);

      this.successMessage.set(response.message);

      this.projectInfo.set(response.projectInfo);
       this.response.set(response);

      console.log('Job ID:', response.jobId);

    },

    error: (err) => {

      this.loading.set(false);

      if (err.status === 0) {

        this.errorMessage.set(
          'Cannot connect to backend. Please start the NestJS server.'
        );

        return;
      }

      this.errorMessage.set(
        err.error?.message ?? 'Unexpected server error.'
      );

    }

  });

}

  reset(): void {

    this.migrationForm.reset({

      repositoryUrl:'',

      fromVersion:12,

      toVersion:20,

      outputFolder:''

    });

    this.loading.set(false);

    this.successMessage.set('');

    this.errorMessage.set('');

  }

}
