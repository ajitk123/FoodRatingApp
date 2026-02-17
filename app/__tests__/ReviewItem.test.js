import React from "react";
import { render } from "@testing-library/react-native";
import ReviewItem from "../components/ReviewItem";

// Mock react-native-star-rating
jest.mock("react-native-star-rating", () => {
  const { View } = require("react-native");
  return (props) => <View testID="star-rating" {...props} />;
});

describe("ReviewItem", () => {
  const mockReview = {
    _id: { toString: () => "123" },
    name: "Test User",
    restaurantName: "Test Restaurant",
    description: "Great food and atmosphere",
    rating: 4,
    createdDate: new Date("2024-01-15"),
  };

  it("renders review information correctly", () => {
    const { getByText } = render(
      <ReviewItem review={mockReview} onDelete={jest.fn()} />,
    );

    expect(getByText("Test User")).toBeTruthy();
    expect(getByText("Test Restaurant")).toBeTruthy();
  });

  it("renders without crashing with minimal props", () => {
    const minimalReview = {
      _id: { toString: () => "456" },
      name: "User",
      restaurantName: "Restaurant",
      description: "",
      rating: 3,
      createdDate: new Date(),
    };

    const { getByText } = render(
      <ReviewItem review={minimalReview} onDelete={jest.fn()} />,
    );

    expect(getByText("User")).toBeTruthy();
  });
});
