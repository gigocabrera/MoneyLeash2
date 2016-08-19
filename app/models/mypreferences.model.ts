
export interface IMyPreferences {
  $key?: string;
  defaultbalance: string;
  defaultdate: string;
  usetouchid: string;
}

export class MyPreferences implements IMyPreferences {
  constructor(
      public id: string,
      public defaultbalance: string,
      public defaultdate: string,
      public usetouchid: string
    ) { }
};