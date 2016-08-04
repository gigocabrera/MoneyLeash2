export interface IType {
  $key?: string;
  name: string;
  icon: string;
}

export class Type implements IType {
  name: string;
  icon: string;

  constructor(name: string, icon: string) {
    this.name = name;
    this.icon = icon;
  }
}