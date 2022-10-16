import { Realm } from "@realm/react";
export class Task extends Realm.Object {
  static generate(vegRating, description, userId) {
    return {
      _id: new Realm.BSON.ObjectId(),
      description,
      vegRating,
      createdAt: new Date(),
      userId: userId || "_SYNC_DISABLED_",
    };
  }

  // To use a class as a Realm object type, define the object schema on the static property "schema".
  static schema = {
    name: "Task",
    primaryKey: "_id",
    properties: {
      _id: "objectId",
      vegRating: 'int',
      //overallRating: 'int',
      description: 'string',
      createdAt: "date",
      userId: "string",
    },
  };
}
