import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  data = 'Hi happy banking with us';
  pdata = 'enter account number';

  accnum: any = '';
  passwrd: any = '';

  constructor() {}

  ngOnInit(): void {}

  login(a: any, b: any) {
    console.log(a.value);
    console.log(b.value);
  }

  accnoChange(data: any) {
    //oru variabline access cheyyanamenkil this keyword use aakanm in class
    //note:namukk data kurach tyme kayijtaan vernnathenkil numkk aa data oru variabilil store aakan aadhyam declare cheyyaa value ennit aa class akath aa value call aakan " this keyword use aaka"
    this.accnum = data.target.value;
    // console.log(this.accnum);
  }
  passChange(pass: any) {
    // console.log('pass:', pass.target.value);
  }
}
