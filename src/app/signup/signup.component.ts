import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { BankService } from '../service/bank.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
})
export class SignupComponent {
  //form validation vendi oru variable create cheyyaa
  pswMatch: boolean = false;
  acnoMatch: boolean = false;

  //we are creating model for sign up
  //nammal group vechittan model create cheyyandth
  signUpModelForm = this.formbuilder.group({
    acno: ['', [Validators.required, Validators.pattern('[0-9]+')]],
    uname: ['', [Validators.required, Validators.pattern('[a-zA-Z]+')]],
    psw: ['', [Validators.required, Validators.pattern('[0-9a-zA-Z]+')]],
    cpsw: ['', [Validators.required, Validators.pattern('[0-9a-zA-Z]+')]],
  });

  //we are doing dependency injection here
  //use private always for dependency injection

  constructor(
    private route: Router,
    private formbuilder: FormBuilder,
    private ds: BankService
  ) {}

  // method
  signup() {
    console.log(this.signUpModelForm.value);
    let path = this.signUpModelForm.value;
    //ee variable name namukk eshtamullath kodukkam
    let acountno = path.acno;
    let username = path.uname;
    let password = path.psw;
    let confirmpass = path.cpsw;

    if (this.signUpModelForm.valid) {
      if (password == confirmpass) {
        this.pswMatch = false;
        this.ds.signupApi(acountno, username, password).subscribe(
          (res: any) => {
            console.log(res);
            alert(`${res.uname} registered..`);
            this.route.navigateByUrl('');
          },
          (res) => {
            alert(`${res.error}`);
          }
        );
      } else {
        this.pswMatch = true;
      }
    } else {
      // this.acnoMatch = true;
      alert('invalid form');
    }

    //alert('sign up workds');
    //
  }
}
