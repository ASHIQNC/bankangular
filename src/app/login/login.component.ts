import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BankService } from '../service/bank.service';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  // data = 'Hi happy banking with us';
  pdata = 'enter account number';

  // accnum: any = '';
  // passwrd: any = '';
  //thisvariable is for coditional validation

  loginModelForm = this.formbuilder.group({
    acno: ['', [Validators.required, Validators.pattern('[0-9]+')]],
    psw: ['', [Validators.required, Validators.pattern('[a-zA-Z0-9]+')]],
  });

  constructor(
    private route: Router,
    private ds: BankService,
    private formbuilder: FormBuilder
  ) {}

  ngOnInit(): void {}

  // login(a: any, b: any) {
  //   console.log(a.value);
  //   console.log(b.value);
  // }

  login() {
    if (this.loginModelForm.valid) {
      let acno = this.loginModelForm.value.acno;
      let psw = this.loginModelForm.value.psw;

      this.ds.loginApi(acno, psw).subscribe(
        (res: any) => {
          console.log(res);
          alert(`${res.uname} login succesfull`);
          //store uname and pass in local storage for using this data in home page
          localStorage.setItem('currentuname', res.uname);
          localStorage.setItem('currentacno', res.acno);

          //setting tocken
          //tokene strigify cheyyanm
          localStorage.setItem('token', JSON.stringify(res.token));

          this.route.navigateByUrl('home');
          //for cheking is logged in or not
          // this.ds.setLoggedIn(true);
        },
        (res) => alert(res.error)
      );
    } else {
      alert('invalid form data');
    }
  }

  // accnoChange(data: any) {
  //   //oru variabline access cheyyanamenkil this keyword use aakanm in class
  //   //note:namukk data kurach tyme kayijtaan vernnathenkil numkk aa data oru variabilil store aakan aadhyam declare cheyyaa value ennit aa class akath aa value call aakan " this keyword use aaka"
  //   this.accnum = data.target.value;
  //   // console.log(this.accnum);
  // }
  // passChange(pass: any) {
  //   // console.log('pass:', pass.target.value);
  // }
}
