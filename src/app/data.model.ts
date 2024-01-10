export class DataModel {
  id: string;
  int: number;
  float: number;
  color: string;
  child: ChildModel;
}

export class ChildModel {
  id: string;
  color: string;
}
