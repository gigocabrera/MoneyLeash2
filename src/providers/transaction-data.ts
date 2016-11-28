export class TransactionData {  
  
    referrer: string;
    transactiontype: string;
    payeename: string;
    payeeid: string;
    categoryname: string;
    categoryid: string
    amount: string;
    notes: string;
    photo: any;
    photodisplay: any;
 
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
        return this.transactiontype;
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