import {
  faHouse,
  faRightFromBracket,
  faTableCellsLarge,
  faUser,
  faClipboardQuestion,
} from "@fortawesome/free-solid-svg-icons";

export const navlinks = [
  {
    name: 'home',
    icon: faHouse,
    link: '/',
    isAuth: false,
  },
  {
    name: 'profile',
    icon: faUser,
    link: '/profile',
    isAuth: true,
  },
  {
    name: 'faq',
    icon: faClipboardQuestion,
    link: '/faq',
    isAuth: false,
  },
  {
    name: 'logout',
    icon: faRightFromBracket,
    link: '/logout',
    isAuth: true,
  },
];
