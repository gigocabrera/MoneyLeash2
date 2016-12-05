export interface IAccount {
  $key: string;
  BalanceClass: string;
  accountname: string;
  accounttype: string;
  autoclear: string;
  balancecleared: string;
  balancecurrent: string;
  balancetoday: string;
  dateopen: string;
  displaydateopen: string;
  totalclearedtransactions: string;
  totalpendingtransactions: string;
  totaltransactions: string;
  mode: string;
}

export class Account implements IAccount {
  
  constructor(
    public $key: string,
    public BalanceClass: string,
    public accountname: string,
    public accounttype: string,
    public autoclear: string,
    public balancecleared: string,
    public balancecurrent: string,
    public balancetoday: string,
    public dateopen: string,
    public displaydateopen: string,
    public totalclearedtransactions: string,
    public totalpendingtransactions: string,
    public totaltransactions: string,
    public mode: string) {}
}