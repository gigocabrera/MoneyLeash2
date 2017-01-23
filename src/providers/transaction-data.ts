export class TransactionData {  
  
    $key: string;
    referrer: string;
    transactiontype: string;
    accountfrom: string;
    accountfromid: string;
    accountto: string;
    accounttoid: string;
    payeename: string;
    payeeid: string;
    categoryname: string;
    categoryid: string
    amount: string;
    notes: string;
    photo: any;
    photodisplay: any;
    ismodified: boolean = false;
 
    constructor() {}

    // Referrer
    // ---------------------------------
    setReferrer(referrer: string) {
        this.referrer = referrer;
    }
    getReferrer(): string {
        return this.referrer;
    }  
    // Transaction Type
    // ---------------------------------
    setTransactionType(type: string) {
        this.transactiontype = type;
    }
    getTransactionType() {
      /*//
      // We need to know the transaction type first for all cases: Expense/Income/Transfer
      //
      if (this.transactiontype === "Transfer" && this.$key === this.accounttoid) {
          this.transactiontype = 'Income';
      } else if (this.transactiontype === "Transfer" && this.$key !== this.accounttoid) {
          this.transactiontype = 'Expense';
      } else {
        //this.transactiontype = 
      }*/
      return this.transactiontype;
    }
    // Account from
    // ---------------------------------
    setAccountFrom(accountfrom: string) {
        this.accountfrom = accountfrom;
    }
    getAccountFrom() {
        return this.accountfrom;
    }
    setAccountFromId(accountfromid: string) {
        this.accountfromid = accountfromid;
    }
    getAccountFromId() {
        return this.accountfromid;
    }
    // Account to
    // ---------------------------------
    setAccountTo(accountto: string) {
        this.accountto = accountto;
    }
    getAccountTo() {
        return this.accountto;
    }
    setAccountToId(accounttoid: string) {
        this.accounttoid = accounttoid;
    }
    getAccountToId() {
        return this.accountfromid;
    }
    // Payee
    // ---------------------------------
    setPayeeName(payeename: string ) {
        this.payeename = payeename;
    }
    getPayeeName() {
        return this.payeename;
    }
    setPayeeID(payeeid: string ) {
        this.payeeid = payeeid;
    }
    getPayeeID() {
        return this.payeeid;
    }
    // Category
    // ---------------------------------
    setCategoryName(categoryname: string) {
        this.categoryname = categoryname;
    }
    getCategoryName() {
        return this.categoryname;
    }
    setCategoryID(categoryid: string) {
        this.categoryid = categoryid;
    }
    getCategoryID() {
        return this.categoryid;
    }
    // Amount
    // ---------------------------------
    setAmount(amount: string) {
        this.amount = amount;
    }
    getAmount() {
        return this.amount;
    }
    // Note
    // ---------------------------------
    setNotes(notes: string) {
        this.notes = notes;
    }
    getNotes() {
        return this.notes;
    }
    // Photo
    // ---------------------------------
    setPhoto(photo: any) {
        this.photo = photo;
    }
    getPhoto() {
        return this.photo;
    }
    setPhotoDisplay(photodisplay: any) {
        this.photodisplay = photodisplay;
    }
    getPhotoDisplay() {
        return this.photodisplay;
    }

    reset() {
      this.referrer = '';
      this.transactiontype = '';
      this.payeename = '';
      this.payeeid = '';
      this.categoryname = '';
      this.categoryid = '';
      this.amount = '';
      this.notes = '';
      this.photo = '';
      this.photodisplay = '';
    }
}