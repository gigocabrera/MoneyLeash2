export interface ITransaction {
  $key: string;
  ClearedClass: string;
  accountFrom: string;
  accountFromId: string;
  accountTo: string;
  accountToId: string;
  addedby: string;
  amount: string;
  category: string;
  categoryid: string;
  clearedBal: string;
  date: string;
  displaydate: string;
  displaytime: string;
  iscleared: boolean;
  isphoto: boolean;
  isrecurring: boolean;
  istransfer: boolean;
  notes: string;
  payee: string;
  payeeid: string;
  photo: string;
  runningbal: string;
  type: string;
  typedisplay: string;
  mode: string;
  checked: string;
  recordindex: number;
  ionitemclass: string;
}

export class Transaction implements ITransaction {
  
  constructor(
    public $key: string,
    public ClearedClass: string,
    public accountFrom: string,
    public accountFromId: string,
    public accountTo: string,
    public accountToId: string,
    public addedby: string,
    public amount: string,
    public category: string,
    public categoryid: string,
    public clearedBal: string,
    public date: string,
    public displaydate: string,
    public displaytime: string,
    public iscleared: boolean,
    public isphoto: boolean,
    public isrecurring: boolean,
    public istransfer: boolean,
    public notes: string,
    public payee: string,
    public payeeid: string,
    public photo: string,
    public runningbal: string,
    public type: string,
    public typedisplay: string,
    public mode: string,
    public checked: string,
    public recordindex: number,
    public ionitemclass: string) {}
}