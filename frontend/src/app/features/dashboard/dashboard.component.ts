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

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    CommonModule,
  ReactiveFormsModule,

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

  private fb = inject(FormBuilder);

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

    console.log(this.migrationForm.getRawValue());

    setTimeout(() => {

      this.loading.set(false);

      this.successMessage.set(
        'Validation completed. Backend integration coming in Part 3.'
      );

    },2000);

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