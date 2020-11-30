import { hello } from "./hello/hello";

export const App = async () => {
  await hello(3);
};
