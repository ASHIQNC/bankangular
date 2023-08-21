import { Component, OnInit } from '@angular/core';
import { BankService } from '../service/bank.service';
//ethu oru class aanu eth use aakanenl namukk oru object create cheyyanm
import jspdf from 'jspdf';
//ee autotable oru method aanu nammal create cheytha pdf  table format aakan vendi
import 'jspdf-autotable';

@Component({
  selector: 'app-accountstatement',
  templateUrl: './accountstatement.component.html',
  styleUrls: ['./accountstatement.component.css'],
})
export class AccountstatementComponent implements OnInit {
  acno: any;
  transactions: any = [];

  //html file akath egane aanu date pipe vechitt eganann kodukan nokka
  date: any;

  //nammak ee key vechitaan debit/credit/all button click cheyumpo data change avandath
  searchKey: any = '';

  constructor(private ds: BankService) {}
  ngOnInit(): void {
    this.date = new Date();

    //take acno for calling the api
    if (localStorage.getItem('currentacno')) {
      this.acno = localStorage.getItem('currentacno');
    }
    this.ds.transactionHistory(this.acno).subscribe((result: any) => {
      this.transactions = result;
      console.log(this.transactions);
    });
  }

  //ee method call cheyumpo filteration nadakanam
  ////ee key aanu nammal ee searchKey variable akath pondath
  //ee key ee function call chyyna button kodukanm argument aayit
  searchKeyChange(key: any) {
    this.searchKey = key;
  }

  //converting into pdf

  convertPdf() {
    //create an object for pdf
    let pdf = new jspdf();

    //set colums for the table
    //column headings
    let col = ['Transaction Type', '	Amount', 'Account holder name', 'Date'];

    //row'
    //pdf akath input aayitt array mathram accept cheyyullu
    //so namukk table row data object aayit aaanu ellath .so ath array aayitt maattanam
    //for that

    let row = [];

    //style the set of data
    //nammale pdfnte tablinte style set aaakan
    //all are inbuild method

    //font size
    pdf.setFontSize(16);

    //pdf akath heading set cheyyan vendi

    pdf.text('Account Statement', 15, 10);

    //text color
    //99 lkodukumpo black kittum
    pdf.setTextColor(99);

    //fontsize reset
    //headingin 16 vendath baakki size cherth mathy same method thanne use aaka
    pdf.setFontSize(1);

    //array of object is converted to array of array

    let allPdfTransaction = this.transactions;

    //any loop cheyyanm,oro objectine edukaaan vendi
    for (let i of allPdfTransaction) {
      //converting into array
      let rowData = [i.type, i.amount, i.user, i.date];
      row.push(rowData);
    }

    //namukk kittya nested arrayne pdf aayit convert cheyyan
    //startY:15 ->nammal create cheyyuna table evidunn start cheyyanm ennn theerumanikan
    (pdf as any).autoTable(col, row, { startY: 15 });

    //nammale pdf vere windowl open aakan vendi
    pdf.output('dataurlnewwindow');

    //pdf generated aayath automatically download aavan vendi
    pdf.save('ministatement.pdf');
  }
}
