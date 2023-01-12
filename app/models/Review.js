import { Realm } from "@realm/react";

export class Review extends Realm.Object {
  static generate(firstName, lastName, restaurant, vegRating, description, userId) {
    return {
      _id: new Realm.BSON.ObjectId(),
      firstName,
      lastName,
      restaurant,
      description: description,
      vegRating,
      createdAt: new Date(),
      userId: userId,
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
      description: 'string',
      createdAt: 'date',
      userId: 'string',
    },
    required: {
      _id: 'objectId',
      firstName: 'string',
      lastName: 'string',
      restaurant: 'string',
      vegRating: 'int',
      createdAt: 'date',
      userId: 'string',
    }
  };
}