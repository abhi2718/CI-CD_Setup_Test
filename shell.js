// show dbs -> Display all  databases
// use flights -> switched to db flights
// cls -> to clear shell

// CRUD

// Create
db.flightData.insertOne({
  departureAirport: "LHR",
  arrivalAirport: "TXL",
  aircraft: "Airbus A320",
  distance: 950,
  intercontinental: false,
});

db.flightData.insertMany([
  {
    departureAirport: "MUC",
    arrivalAirport: "SFO",
    aircraft: "Airbus A380",
    distance: 12000,
    intercontinental: true,
  },
  {
    departureAirport: "LHR",
    arrivalAirport: "TXL",
    aircraft: "Airbus A320",
    distance: 950,
    intercontinental: false,
  },
]);

// Read
db.flightData.find().pretty();
db.flightData.find({
  distance: { $gt: 900 },
});

// Update

// db.flightData.updateOne({distance:1200},{visible:true})
// MongoInvalidArgumentError: Update document requires atomic operators

db.flightData.updateOne(
  { departureAirport: "LHR" },
  { $set: { visible: true } }
);

db.flightData.updateMany({}, { $set: { marker: "toDelete" } });

// Delete
db.flightData.deleteOne({ departureAirport: "LHR" });

// find always retun Cursor Object
db.passengers.find().forEach((passenger) => printjson(passenger));
db.passengers.find().pretty();
db.passengers.find().toArray();

// Projection in find(filterObject,optionsObject)
db.passengers.find({}, { name: 1, _id: 0 });

// if a collection as a key as array of string we can directly find such document with find example

// {
//     _id: ObjectId('67c9515f4b68fb42d0356fdb'),
//     name: 'Gordon Black',
//     age: 38,
//     hobby: [ 'Dancing', 'Coding', 'Teaching' ]
//   }

db.passengers.find({ hobby: "Coding" });

// Finding nested document
db.passengers.find({ "country.state": "U.P" })[
  {
    _id: ObjectId("67c9515f4b68fb42d0356fdb"),
    name: "Gordon Black",
    age: 38,
    hobby: ["Dancing", "Coding", "Teaching"],
    country: { state: "U.P" },
  }
];

//  To get rid of your data, you can simply load the database you want to get rid of (use databaseName) and then execute db.dropDatabase().
// Similarly, you could get rid of a single collection in a database via db.myCollection.drop().

// Relation Ship
// A one-to-one relationship in MongoDB means that each document in one collection is related to exactly one document in another collection. This can be implemented in multiple ways:

// 1. Embedded Document (Best for Small Related Data)
// If the related data is small and always accessed together, embedding it within the parent document is more efficient.

//Example:

// {
//   "_id": ObjectId("650abc1234"),
//   "name": "Shivani Singh",
//   "email": "shivani@example.com",
//   "profile": {
//     "age": 25,
//     "gender": "Female",
//     "bio": "UI/UX Designer"
//   }
// }
// Pros:

// Faster read performance since all data is in a single document.
// No need for joins.
// Cons:

// Increases document size, causing performance issues if the embedded object grows large.
// Cannot reference this data from other documents.
// 2. Reference with ObjectId (Best for Large Data or Multiple References)
// If the related data is large or frequently accessed separately, store it in a separate collection and reference it using an ObjectId.

// User Collection
// json
// Copy
// Edit
// {
//   "_id": ObjectId("650abc1234"),
//   "name": "Shivani Singh",
//   "email": "shivani@example.com",
//   "profileId": ObjectId("789xyz4567")
// }
// Profile Collection
// json
// Copy
// Edit
// {
//   "_id": ObjectId("789xyz4567"),
//   "age": 25,
//   "gender": "Female",
//   "bio": "UI/UX Designer"
// }
// Query with $lookup (to join data)
// js
// Copy
// Edit
// db.users.aggregate([
//   {
//     $lookup: {
//       from: "profiles",
//       localField: "profileId",
//       foreignField: "_id",
//       as: "profile"
//     }
//   },
//   { $unwind: "$profile" }
// ])
// Pros:

// Keeps documents small and manageable.
// Allows flexibility and scalability.
// Cons:

// Requires additional queries ($lookup) to fetch related data.

// Choosing the Right Approach
// Use embedding when data is small and always retrieved together.
// Use referencing when data is large or shared across multiple documents.

db.authors.aggregate([
  {
    $lookup: {
      from: "books",
      localField: "books",
      foreignField: "_id",
      as: "book-authors",
    },
  },
]);

const outPut = [
  {
    _id: ObjectId("67cc174d70930a37aa356fc3"),
    name: "Ashutosh",
    books: [
      ObjectId("67cc16ad70930a37aa356fc2"),
      ObjectId("67cc178e70930a37aa356fc4"),
    ],
    "book-authors": [
      {
        _id: ObjectId("67cc16ad70930a37aa356fc2"),
        name: "Master js",
        price: 1200,
      },
      {
        _id: ObjectId("67cc178e70930a37aa356fc4"),
        name: "Master TS",
        price: 1000,
      },
    ],
  }
];
