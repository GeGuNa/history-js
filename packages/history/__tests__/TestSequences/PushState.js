import expect from "expect";

import { execSteps } from "./utils.js";

export default (history, done) => {
  let steps = [
    ({ location }) => {
      expect(location).toMatchObject({
        pathname: "/",
      });

      history.push("/home?the=query#the-hash", { the: "state" });
    },
    ({ action, location }) => {
      expect(action).toBe("PUSH");
      expect(location).toMatchObject({
        pathname: "/home",
        search: "?the=query",
        hash: "#the-hash",
        state: { the: "state" },
      });
    },
  ];

  execSteps(steps, history, done);
};
