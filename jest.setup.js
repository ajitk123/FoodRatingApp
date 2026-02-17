// Jest setup file for FoodRatingApp

// Mock react-native-maps
jest.mock("react-native-maps", () => {
  const { View } = require("react-native");
  const MockMapView = (props) => <View {...props} />;
  MockMapView.Marker = (props) => <View {...props} />;
  MockMapView.Callout = (props) => <View {...props} />;
  return {
    __esModule: true,
    default: MockMapView,
    Marker: MockMapView.Marker,
    Callout: MockMapView.Callout,
  };
});

// Mock realm
jest.mock("realm", () => ({
  BSON: { ObjectId: jest.fn() },
}));

// Mock @realm/react
jest.mock("@realm/react", () => ({
  createRealmContext: jest.fn(() => ({
    RealmProvider: ({ children }) => children,
    useRealm: jest.fn(),
    useQuery: jest.fn(() => []),
    useObject: jest.fn(),
  })),
}));

// Silence specific warnings in test output
const originalWarn = console.warn;
console.warn = (...args) => {
  if (
    typeof args[0] === "string" &&
    args[0].includes("Animated: `useNativeDriver`")
  ) {
    return;
  }
  originalWarn(...args);
};
