export interface ITransaction {
  $key: string;
  accountFrom: string;
  accountFromId: string;
  accountTo: string;
  accountToId: string;
  addedby: string;
  amount: string;
  category: string;
  categoryid: string;
  clearedBal: string;
  date: number;
  iscleared: boolean;
  isphoto: boolean;
  isrecurring: boolean;
  istransfer: boolean;
  linkedtransactionid: string;
  notes: string;
  payee: string;
  payeeid: string;
  payeelower: string;
  photo: string;
  runningbal: string;
  type: string;
  typedisplay: string;
}

export class Transaction implements ITransaction {

  public $key: string = '';
  public accountFrom: string = '';
  public accountFromId: string = '';
  public accountTo: string = '';
  public accountToId: string = '';
  public addedby: string = '';
  public amount: string = '';
  public category: string = '';
  public categoryid: string = '';
  public clearedBal: string = '';
  public date: number;
  public iscleared: boolean = false;
  public isphoto: boolean = false;
  public isrecurring: boolean = false;
  public istransfer: boolean = false;
  public linkedtransactionid: string = '';
  public notes: string = '';
  public payee: string = '';
  public payeeid: string = '';
  public payeelower: string = '';
  public photo: string = '';
  public runningbal: string = '';
  public type: string = '';
  public typedisplay: string = '';

  constructor() {}

  fromData(transaction?: ITransaction) {
    this.$key = (transaction.$key == undefined)? '' : transaction.$key;    
    this.accountFrom = (transaction.accountFrom == undefined)? '' : transaction.accountFrom;    
    this.accountFromId = (transaction.accountFromId == undefined)? '' : transaction.accountFromId;
    this.accountTo = (transaction.accountTo == undefined)? '' : transaction.accountTo;
    this.accountToId = (transaction.accountToId == undefined)? '' : transaction.accountToId;
    this.addedby = (transaction.addedby == undefined)? '' : transaction.addedby;
    this.amount = (transaction.amount == undefined)? '' : transaction.amount;
    this.category = (transaction.category == undefined)? '' : transaction.category;
    this.categoryid = (transaction.categoryid == undefined)? '' : transaction.categoryid;
    this.clearedBal = (transaction.clearedBal == undefined)? '' : transaction.clearedBal;
    this.date = transaction.date;
    this.iscleared = (transaction.iscleared == undefined)? false : transaction.iscleared;
    this.isphoto = (transaction.isphoto == undefined)? false : transaction.isphoto;
    this.isrecurring = (transaction.isrecurring == undefined)? false : transaction.isrecurring;
    this.istransfer = (transaction.istransfer == undefined)? false : transaction.istransfer;
    this.linkedtransactionid = (transaction.linkedtransactionid == undefined)? '' : transaction.linkedtransactionid;
    this.notes = (transaction.notes == undefined)? '' : transaction.notes;
    this.payee  = (transaction.payee == undefined)? '' : transaction.payee;
    this.payeeid = (transaction.payeeid == undefined)? '' : transaction.payeeid;
    this.payeelower = (transaction.payeelower == undefined)? '' : transaction.payeelower;
    this.photo = (transaction.photo == undefined)? '' : transaction.photo;
    this.runningbal = (transaction.runningbal == undefined)? '' : transaction.runningbal;
    this.type = (transaction.type == undefined)? '' : transaction.type;
    this.typedisplay = (transaction.typedisplay == undefined)? '' : transaction.typedisplay;
  }

  toString() {
    let trans = {
      'accountFrom': this.accountFrom,
      'accountFromId': this.accountFromId,
      'accountTo': this.accountTo,
      'accountToId': this.accountToId,
      'addedby': this.addedby,
      'amount':this.amount,
      'category': this.category,
      'categoryid': this.categoryid,
      'clearedBal': this.clearedBal,
      'date': this.date,
      'iscleared': this.iscleared,
      'isphoto': this.isphoto,
      'isrecurring': this.isrecurring,
      'istransfer': this.istransfer,
      'linkedtransactionid': this.linkedtransactionid,
      'notes': this.notes,
      'payee': this.payee,
      'payeeid': this.payeeid,
      'payeelower': this.payeelower,
      'photo': this.photo,
      'runningbal': this.runningbal,
      'type': this.type,
      'typedisplay': this.typedisplay,
    }
    return trans;
  }
   
}