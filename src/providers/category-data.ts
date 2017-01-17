
export class CategoryData {  
  
    referrer: string;
    categoryname: string;
    categorytype: string;
    categoryparent: string;
 
    constructor() {}

    // Referrer
    // ---------------------------------
    setReferrer(referrer: string) {
        this.referrer = referrer;
    }
    getReferrer(): string {
        return this.referrer;
    }

    // Category Name
    // ---------------------------------
    setCategoryName(categoryname: string ) {
        this.categoryname = categoryname;
    }
    getCategoryName() {
      return this.categoryname;
    }

    // Category Type
    // ---------------------------------
    setCategoryType(categorytype: string ) {
        this.categorytype = categorytype;
    }
    getCategoryType() {
        return this.categorytype;
    }

    // Category Parent
    // ---------------------------------
    setCategoryParent(categoryparent: string ) {
        this.categoryparent = categoryparent;
    }
    getCategoryParent() {
        return this.categoryparent;
    }

    reset() {
      this.referrer = '';
      this.categoryname = '';
      this.categorytype = '';
      this.categoryparent = '';
    }
}