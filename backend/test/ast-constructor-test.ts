import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-ast-test',
  template: '<p>AST Test</p>'
})
export class AstConstructorTestComponent {

  constructor(
    private router: Router,
    private http: HttpClient
  ) {}

  test() {
    console.log(this.router);
    console.log(this.http);
  }
}