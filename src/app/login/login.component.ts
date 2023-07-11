import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  data = 'Hi happy banking with us';
  pdata = 'enter account number';

  constructor() {}

  ngOnInit(): void {}

  login() {
    alert('login successfully');
  }
}
