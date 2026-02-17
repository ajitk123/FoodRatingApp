import { Realm } from "@realm/react";

export class Review extends Realm.Object {
  static generate(
    firstName,
    lastName,
    restaurant,
    vegRating,
    description,
    userId,
    latitude,
    longitude,
    address,
  ) {
    return {
      _id: new Realm.BSON.ObjectId(),
      firstName,
      lastName,
      restaurant,
      description,
      vegRating,
      createdAt: new Date(),
      userId,
      latitude: latitude != null ? latitude : null,
      longitude: longitude != null ? longitude : null,
      address: address || null,
    };
  }

  static schema = {
    name: "Review",
    primaryKey: "_id",
    properties: {
      _id: "objectId",
      firstName: "string",
      lastName: "string",
      restaurant: "string",
      vegRating: "int",
      description: "string",
      createdAt: "date",
      userId: "string",
      latitude: "double?",
      longitude: "double?",
      address: "string?",
    },
  };
}
