import React from "react";
import { Text } from "react-native";

export const DateFormat = ({ date, style }) => {
  if (!date) return null;

  const formatted = date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });

  return <Text style={style}>{formatted}</Text>;
};
