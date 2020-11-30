import { App } from "app";
console.debug("------------ START -------------");
App()
  .then(() => console.debug("------------- END --------------"))
  .catch((e) => console.error(e));
