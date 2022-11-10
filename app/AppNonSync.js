import React, { useMemo } from "react";

import { Review } from "./models/Review";
import { ReviewRealmContext } from "./models";
import { ReviewManager } from "./components/ReviewManager";

const { useQuery } = ReviewRealmContext;

export const AppNonSync = () => {
  const result = useQuery(Review);

  const tasks = useMemo(() => result.sorted("createdAt"), [result]);

  return <ReviewManager tasks={tasks} />;
};
