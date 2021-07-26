export interface State {
  chatrooms: any
  client: any
  positionInQueue: number
  person: {
    name: string,
    key: string,
    theme: string,
    subtheme: string,
  }
}

export interface Action {
  type: string;
  payload: any;
}
