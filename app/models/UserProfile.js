import { Realm } from "@realm/react";

export class UserProfile extends Realm.Object {
  static generate(firstName, lastName, userName, Password, userId) {
    return {
      _id: new Realm.BSON.ObjectId(),
      firstName,
      lastName,
      userName,
      Password,
      createdAt: new Date(),
      userId: userId || "_SYNC_DISABLED_",
    };
  }

  // To use a class as a Realm object type, define the object schema on the static property "schema".
  static schema = {
    name: "UserProfile",
    primaryKey: "_id",
    properties: {
      _id: "objectId",
      firstName: 'string',
      lastName: 'string',
      userName: 'string',
      Password: 'string',
      createdAt: "date",
      userId: "string",
    },
  };
}
