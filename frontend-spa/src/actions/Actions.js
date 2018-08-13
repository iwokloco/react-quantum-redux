import { qs } from "../quantum/quantum";

export const Actions = {
  setMessageFromBackend: (message) => {
    qs.set("app", {message: message, isCallingBackend: false} );
  },
  startLoadingMessageFromBackend: () => {
    qs.set("app", {...qs.get("app"), isCallingBackend: true} );
  },
  stopLoadingMessageFromBackend: () => {
    qs.set("app", {...qs.get("app"), isCallingBackend: false} );
  }
};
