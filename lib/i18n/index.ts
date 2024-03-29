import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import global from './global';

import home from './home';
import auth from './auth';
import dashboard from './dashboard';

const resources = {
  en: {
    t: {
      ...global,
      home: { ...home },
      auth: { ...auth },
      dash: { ...dashboard },
    },
  },
};

i18n.use(initReactI18next).init({
  resources,
  lng: 'en',
});

if (!i18n.services.formatter) throw new Error('i18n.services.formatter is not defined');

i18n.services.formatter.add('lowercase', (value) => value.toLowerCase());

i18n.services.formatter.add('capitalize', (value) =>
  [value.slice(0, 1).toUpperCase(), value.slice(1)].join(''),
);

export default i18n;
