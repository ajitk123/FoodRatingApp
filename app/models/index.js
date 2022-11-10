import { createRealmContext } from "@realm/react";
import { Review } from "./Review";
import { UserProfile } from "./UserProfile";

export const ReviewRealmContext = createRealmContext({
  schema: [Review],
});

export const UserProfileRealmContext = createRealmContext({
  schema: [UserProfile],
})
