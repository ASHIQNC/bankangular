import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

//overloading headrs
const option = {
  //epppo ore naml rand header aayi
  //ani eee headeril venam token add akan
  headers: new HttpHeaders(),
};
@Injectable({
  providedIn: 'root',
})
export class BankService {
  //  loggedInStatus = false;
  constructor(private http: HttpClient) {}

  //method to add tocken in api header
  createHeader() {
    //header create cheyyan nammal use cheyyunna class aanu http header
    //we need create an object
    //http headers

    const headers = new HttpHeaders();

    //accesss tocken from local storage
    if (localStorage.getItem('token')) {
      //evide json.parse cheyyumpo || ettit empty string kodukkanm
      //athava local storage token ellenkil empty sting edutholum
      let token = JSON.parse(localStorage.getItem('token') || '');

      //namml mele create cheytha header akath kodukanm
      option.headers = headers.append('access_token', token);
    }
    return option;

    //headerne overload cheyyanm ennale work cheyyullu
    //outside classl headering overload cheyyanm
    //overload means same namil header create cheya
  }

  // setLoggedIn(value: any) {
  //   this.loggedInStatus = value;
  // }
  // get isLoggedIn() {
  //   return this.loggedInStatus;
  // }
  // method for sign up
  signupApi(acno: any, uname: any, psw: any) {
    //namukk nammale body create cheyyanm enth data ano BE send aakunnath enn
    const bodyData = {
      //enthano nammal BE koduthe same variable thanne use aakanam
      //evide nammale key(BE variable) and value(FE variable) same name koduthath kond direct aayit thazhe kodutha pole kodukka

      acno,
      uname,
      psw,
    };
    //nammkk ee data  vere function akath use cheyyandath kond return keyword use aakanam
    return this.http.post(
      'https://serverbank-odvv.onrender.com/bankuser/userregister',
      bodyData
    );
  }

  //login api

  loginApi(acno: any, psw: any) {
    const bodyData = {
      acno,
      psw,
    };
    return this.http.post(
      'https://serverbank-odvv.onrender.com/bankuser/userlogin',
      bodyData
    );
  }

  //get userDetails
  getProfile(acno: any) {
    //nammal url koode "acno" parameter aayit pass aaakunn
    return this.http.get(
      'https://serverbank-odvv.onrender.com/bankuser/userprofile/' + acno,
      this.createHeader()
    );
  }
  // get balanceEnquery details

  getBalanceEnquery(acno: any) {
    return this.http.get(
      'https://serverbank-odvv.onrender.com/bankuser/userbalance/' + acno,
      this.createHeader()
    );
  }

  //money transfer method
  //we need fromacno ,toacno,fromacnopasw,amount,date and time
  //namukkk ethrayum data backendilekk send cheytha maathrame money transfer nadakulllu
  moneyTranferApi(
    fromAcno: any,
    toAcno: any,
    psw: any,
    amount: any,
    date: any
  ) {
    const bodeyData = {
      fromAcno,
      toAcno,
      psw,
      amount,
      date,
    };
    return this.http.post(
      'https://serverbank-odvv.onrender.com/bankuser/moneytransfer',
      bodeyData,
      this.createHeader()
    );
  }

  //transaction history
  //namukk already transaction history data basil und namukk avidunn data edukaan ullaa api create cheytha mathy
  transactionHistory(acno: any) {
    return this.http.get(
      'https://serverbank-odvv.onrender.com/bankuser/userhistory/' + acno,
      this.createHeader()
    );
  }

  //deleting an account

  acDelete(acno: any) {
    return this.http.delete(
      'https://serverbank-odvv.onrender.com/bankuser/userdelete/' + acno,
      this.createHeader()
    );
  }
}
