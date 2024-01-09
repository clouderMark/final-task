import {ELang} from '../../types/types';
import {IContent} from './types';

export const content: IContent = {
  [ELang.ENG]: {
    login: {
      title: {
        login: 'Authorization',
        registration: 'Registration',
      },
      placeholder: {
        name: 'Enter your name...',
        email: 'Enter your email...',
        password: 'Enter your password...',
      },
      button: {
        login: 'Enter',
        registration: 'Registration',
      },
      label: {
        login: 'Don\'t have an account?',
        registration: 'Already have an account? ',
      },
      link: {
        login: ' Register!',
        registration: 'Sign in!',
      },
    },
    bar: {
      login: 'Login',
      logout: 'Logout',
      adminUsers: 'Users',
      collections: 'Collections',
    },
    adminUser: {
      blocked: 'blocked',
      active: 'active',
      userName: 'user name',
      changeStatus: 'change status',
      changeRole: 'change role',
    },
    admin: 'Admin',
    user: 'User',
  },
  [ELang.BEL]: {
    login: {
      title: {
        login: 'Аўтарызацыя',
        registration: 'Рэгістрацыя',
      },
      placeholder: {
        name: 'Увядзіце імя...',
        email: 'Увядзіце адрас электроннай пошты...',
        password: 'Увядзіце пароль...',
      },
      button: {
        login: 'Увайсці',
        registration: 'Рэгістрацыя',
      },
      label: {
        login: 'У вас няма акаўнта?',
        registration: 'У вас ужо ёсць уліковы запіс? ',
      },
      link: {
        login: ' Рэгістрацыя!',
        registration: 'Увайсці!',
      },
    },
    bar: {
      login: 'Увайсці',
      logout: 'Выйсці',
      adminUsers: 'Карыстальнікі',
      collections: 'Калекцыі',
    },
    adminUser: {
      blocked: 'заблакаваны',
      active: 'актыўны',
      userName: 'імя карыстальніка',
      changeStatus: 'змяніць статус',
      changeRole: 'змяніць роль',
    },
    admin: 'Адмін',
    user: 'Карыстальнік',
  },
};
