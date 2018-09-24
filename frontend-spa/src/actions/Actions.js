import { qs } from 'quantum-store';
import { translate as en } from "../strings/en.js"
import { translate as es } from "../strings/es.js"

export const Actions = {
  setMessageFromBackend: (message) => {
    qs.set("app", {message: message, isCallingBackend: false} );
  },
  startLoadingMessageFromBackend: () => {
    qs.set("app", {...qs.get("app"), isCallingBackend: true} );
  },
  stopLoadingMessageFromBackend: () => {
    qs.set("app", {...qs.get("app"), isCallingBackend: false} );
  },
  setLanguage: (locale) => {
    qs.set("strings", {...qs.get("strings"), 
      locale: locale, strings: (locale === 'es') ? es : en 
    })
  } 
};
