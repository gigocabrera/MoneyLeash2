export class AccountData {  
  
    referrer: string;
    accountname: string;
    accounttype: string;
 
    constructor() {}

    // Referrer
    // ---------------------------------
    setReferrer(referrer: string) {
        this.referrer = referrer;
    }
    getReferrer(): string {
        return this.referrer;
    }

    // Account Name
    // ---------------------------------
    setAccountName(accountname: string ) {
        this.accountname = accountname;
    }
    getAccountName() {
        return this.accountname;
    }

    // Account Type
    // ---------------------------------
    setAccountType(accounttype: string ) {
        this.accounttype = accounttype;
    }
    getAccountType() {
        return this.accounttype;
    }

    reset() {
      this.referrer = '';
      this.accountname = '';
      this.accounttype = '';
    }
}