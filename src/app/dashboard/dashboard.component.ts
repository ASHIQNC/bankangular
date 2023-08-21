import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BankService } from '../service/bank.service';
import { FormBuilder, Validators } from '@angular/forms';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit {
  user: any = '';

  acno: any;
  profileData: any = {};
  balanceData: any = {};
  //for storing the transaction message from be
  message: any = '';

  //childilekk pokanda acno
  shareAcno: any = '';

  status: any = true;
  //creating model form for money transfer
  moneyTransferForm = this.fb.group({
    toAcno: ['', [Validators.required, Validators.pattern('[0-9]+')]],
    amount: ['', [Validators.required, Validators.pattern('[0-9]+')]],
    psw: ['', [Validators.required, Validators.pattern('[0-9a-zA-Z]+')]],
  });
  constructor(
    private route: Router,
    private ds: BankService,
    private fb: FormBuilder,
    private datepipe: DatePipe
  ) {}

  ngOnInit(): void {
    //  history.pushState(null, '');
    //nammal logout cheythtt browser back button adichal home pagilott verand erikkan
    if (!localStorage.getItem('currentacno')) {
      alert('please login first');
      this.route.navigateByUrl('');
    }
    //ng oninit code run aakumpo thannne work aaakum
    if (localStorage.getItem('currentuname')) {
      this.user = localStorage.getItem('currentuname');
      console.log(this.user);
    }
  }

  profileView() {
    //first we need to get accno number from local storage

    if (localStorage.getItem('currentacno')) {
      this.acno = localStorage.getItem('currentacno');
      // console.log(this.acno);
    }
    this.ds.getProfile(this.acno).subscribe((response) => {
      this.profileData = response;
      console.log('profile', response);
    });
  }

  balanceView() {
    if (localStorage.getItem('currentacno')) {
      this.acno = localStorage.getItem('currentacno');
      console.log(this.acno);
    }
    this.ds.getBalanceEnquery(this.acno).subscribe((response) => {
      console.log('balnce detail', response);
      this.balanceData = response;
    });
  }

  //money tranfer function
  transfer() {
    if (this.moneyTransferForm.valid) {
      //we need to get the account number from local storage
      //ee account number aaakum "fromAcno"
      if (localStorage.getItem('currentacno')) {
        this.acno = localStorage.getItem('currentacno');
        console.log(this.acno);
      }
      //we ned to get other values from the form

      let path = this.moneyTransferForm.value;
      //toacno
      let toAcno = path.toAcno;
      // console.log(toAcno);

      //psw
      let psw = path.psw;
      //   console.log(psw);

      //amount
      let amount = path.amount;
      // console.log(amount);

      //date
      //angular pipe:used to convert data format into anither formats
      let date = new Date();

      let dateData = this.datepipe.transform(date, 'short');
      //   console.log(dateData);
      //api
      this.ds
        .moneyTranferApi(this.acno, toAcno, psw, amount, dateData)
        .subscribe(
          (result: any) => {
            this.message = result.message;
            this.status = true;
          },
          (result: any) => {
            this.message = result.error.message;
            this.status = false;
          }
        );
    } else {
      // alert('invaid form data');
      this.message = 'invaid form data';
      this.status = false;
    }
  }

  logout() {
    localStorage.removeItem('currentacno');
    localStorage.removeItem('currentuname');

    this.route.navigateByUrl('');
  }
  //delete acount
  deleteAcount() {
    //share the data to childe component
    //eth cheyyunne vechaa acount number avide ethyal mathrame delete button click cheyyumpo acount delete cheyyan paadullu
    if (localStorage.getItem('currentacno')) {
      this.shareAcno = localStorage.getItem('currentacno');
      console.log(this.shareAcno);
    }
  }

  //nammal model akath no button click cheyyumpo model poii bakki data veranam
  cancel() {
    this.shareAcno = '';
  }
  //nammal yes button click cheympo account delete aakanm
  deleteCompleteAccount(event: any) {
    this.ds.acDelete(event).subscribe((result: any) => {
      alert(`${event} deleted successfullly`);
      this.logout();
    });
  }
}
