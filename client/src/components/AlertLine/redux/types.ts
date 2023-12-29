export interface IInitialState {
  message: string;
  isOpen: boolean;
  statusCode: number | null;
}

export type AlertArg = Omit<IInitialState, 'id' | 'isOpen'> & {
  timeout?: number;
};
