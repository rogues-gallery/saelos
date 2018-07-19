import i18next from "i18next";
import XHR from "i18next-xhr-backend";

let i18nextOptions = window.i18nextOptions || {
  escapeValue: false,
  defaultNS: "saelos",
  fallbackNS: "saelos",
  keySeparator: "^",
  lng: "en",
  fallbackLng: "en",
  react: {
    wait: true
  },
  backend: {
    loadPath: "/i18next/fetch/{{lng}}/{{ns}}",
    allowMultiloading: false,
    crossDomain: false,
    withCredentials: false
  }
};

i18next.use(XHR).init(i18nextOptions, (err, t) => {
  if (err) return console.error("Translations Error: ", err);
});

const _t = (key, args) => i18next.t(key, args);

export { _t };

export default i18next;
