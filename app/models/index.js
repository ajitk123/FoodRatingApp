import { createRealmContext } from "@realm/react";
import { Review } from "./Review";

export const ReviewRealmContext = createRealmContext({
  schema: [Review],
});
