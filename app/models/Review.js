import { Realm } from "@realm/react";

export class Review extends Realm.Object {
  static generate(firstName, lastName, restaurant, vegRating, description, userId) {
    return {
      _id: new Realm.BSON.ObjectId(),
      firstName,
      lastName,
      restaurant,
      description,
      vegRating,
      createdAt: new Date(),
      userId: userId || "_SYNC_DISABLED_",
    };
  }
  
  static schema = {
    name: 'Review',
    primaryKey: '_id',
    properties: {
      _id: 'objectId',
      firstName: 'string',
      lastName: 'string',
      restaurant: 'string',
      vegRating: 'int',
      description: 'string', // set default value for description
      createdAt: 'date',
      userId: 'string',
    },
  };
}