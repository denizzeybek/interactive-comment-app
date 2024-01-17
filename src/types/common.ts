export interface IOption {
  [key: string]: any;
  label: string;
  value: any;
}

export interface IFilter {
  tabId?: number;
  searchTerm?: string;
  isNextAction?: boolean;
}

export interface IColType {
  span: number;
}
