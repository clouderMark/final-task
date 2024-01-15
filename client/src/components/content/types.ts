import {ELang} from '../../types/types';

export interface IContent {
  [ELang.BEL]: IAppContent;
  [ELang.ENG]: IAppContent;
}

interface ILoginAndReg {
  login: string;
  registration: string;
}

interface IAppContent {
  login: {
    title: ILoginAndReg;
    placeholder: {
      name: string;
      email: string;
      password: string;
    };
    button: ILoginAndReg;
    label: ILoginAndReg;
    link: ILoginAndReg;
  };
  bar: {
    login: string;
    logout: string;
    adminUsers: string;
    collections: string;
  },
  adminUser: {
    blocked: string;
    active: string;
    userName: string;
    changeStatus: string;
    changeRole: string;
  }
  admin: string;
  user: string;
  save: string;
  string: string;
  bool: string;
  int: string;
  text: string;
  date: string;
  collection: {
    create: string;
    propsType: string;
  }
}
