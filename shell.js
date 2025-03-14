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
  },
];

// Comparison Operators
db.movies.find({ runtime: { $ne: 47 } });

// Embeded object query
db.movies.find({ "externals.tvrage": 0 });

// Logical Operators
db.movies.find({
  $or: [{ "rating.average": { $gte: 4.5 } }, { "rating.average": { $lte: 9 } }],
});

db.movies.find({
  $and: [{ "rating.average": { $gte: 8 } }, { genres: "Drama" }],
});

// Element Operators
//$exists -> It find only those documents that contain age field .
db.userInfo.find({
  age: {
    $exists: true,
    $ne: null,
  },
});

// $type -> It only find all the elements whose age is null
db.userInfo.find({ age: { $type: "null" } });

// regex -> It should follow the given regex
db.userInfo.find({
  $or: [{ email: { $regex: "r" } }, { email: { $regex: "s" } }],
});

// expr
// 1.Compare Two Fields from a Single Document

db.monthlyBudget.insertMany([
  { _id: 1, category: "food", budget: 400, spent: 450 },
  { _id: 2, category: "drinks", budget: 100, spent: 150 },
  { _id: 3, category: "clothes", budget: 100, spent: 50 },
  { _id: 4, category: "misc", budget: 500, spent: 300 },
  { _id: 5, category: "travel", budget: 200, spent: 650 },
]);

db.monthlyBudget.find({ $expr: { $gt: ["$spent", "$budget"] } });

// Output:
[
  { _id: 1, category: "food", budget: 400, spent: 450 },
  { _id: 2, category: "drinks", budget: 100, spent: 150 },
  { _id: 5, category: "travel", budget: 200, spent: 650 },
];

// Use $expr With Conditional Statements --> https://www.mongodb.com/docs/manual/reference/operator/query/expr/

let discountedPrice = {
  $cond: {
    if: { $gte: ["$qty", 100] },
    then: { $multiply: ["$price", NumberDecimal("0.50")] },
    else: { $multiply: ["$price", NumberDecimal("0.75")] },
  },
};

db.supplies.find({ $expr: { $lt: [discountedPrice, NumberDecimal("5")] } });

[
  { _id: 2, item: "notebook", qty: 200, price: Decimal128("8") },
  { _id: 3, item: "pencil", qty: 50, price: Decimal128("6") },
  { _id: 4, item: "eraser", qty: 150, price: Decimal128("3") },
];

// Array
db.userInfo.find({ "hobbies.title": "Sport" })[
  {
    _id: ObjectId("67cece9f2ddfbcd81f356fc2"),
    name: "Ram",
    gender: "Male",
    email: "ram@test.com",
    hobbies: [
      { title: "Sport", frequency: 4 },
      { title: "Music", frequency: 6 },
    ],
  }
];

// $size operator -> is use to find all documets how matches the provided size value of any array
db.userInfo.find({ hobbies: { $size: 2 } })[
  {
    _id: ObjectId("67cece9f2ddfbcd81f356fc2"),
    name: "Ram",
    gender: "Male",
    email: "ram@test.com",
    hobbies: [
      { title: "Sport", frequency: 4 },
      { title: "Music", frequency: 6 },
    ],
  }
];

// $elemMatch Operator -> It will work like filter method in array
db.userInfo.find({ hobbies: { $elemMatch: { title: "Sport" } } })[
  {
    _id: ObjectId("67cece9f2ddfbcd81f356fc2"),
    name: "Ram",
    gender: "Male",
    email: "ram@test.com",
    hobbies: [
      { title: "Sport", frequency: 4 },
      { title: "Music", frequency: 6 },
    ],
  }
];

//sorting
db.userInfo.find().sort({ "hobbies.frequency": -1 });
db.userInfo.find().sort({ name: 1 })[
  ({
    _id: ObjectId("67cece9f2ddfbcd81f356fc4"),
    name: "Abhi",
    age: 24,
    gender: "Male",
  },
  {
    _id: ObjectId("67cecfc82ddfbcd81f356fc5"),
    name: "Ashish",
    gender: "Male",
    age: null,
  },
  {
    _id: ObjectId("67cece9f2ddfbcd81f356fc2"),
    name: "Ram",
    gender: "Male",
    email: "ram@test.com",
    hobbies: [
      { title: "Sport", frequency: 4 },
      { title: "Music", frequency: 6 },
    ],
  },
  {
    _id: ObjectId("67cece9f2ddfbcd81f356fc3"),
    name: "Shyam",
    email: "shyam@test.com",
  })
];

// skip & limit
db.userInfo.find().sort({ name: -1 }).skip(2).limit(2)[
  ({
    _id: ObjectId("67cecfc82ddfbcd81f356fc5"),
    name: "Ashish",
    gender: "Male",
    age: null,
  },
  {
    _id: ObjectId("67cece9f2ddfbcd81f356fc4"),
    name: "Abhi",
    age: 24,
    gender: "Male",
  })
];

// Projection
db.userInfo.find(
  {},
  {
    name: 1,
    email: 1,
    "hobbies.title": 1,
  }
)[
  // output
  ({
    _id: ObjectId("67cece9f2ddfbcd81f356fc2"),
    name: "Ram",
    email: "ram@test.com",
    hobbies: [{ title: "Sport" }, { title: "Music" }],
  },
  {
    _id: ObjectId("67cece9f2ddfbcd81f356fc3"),
    name: "Shyam",
    email: "shyam@test.com",
  },
  { _id: ObjectId("67cece9f2ddfbcd81f356fc4"), name: "Abhi" },
  { _id: ObjectId("67cecfc82ddfbcd81f356fc5"), name: "Ashish" })
];

// Update

// $inc -> It will increment age by 1
db.userInfo.updateOne(
  {
    _id: ObjectId("67cece9f2ddfbcd81f356fc2"),
  },
  {
    $inc: {
      age: 1,
    },
  }
);

// $unset -> Getting Rid of Fields

db.userInfo.updateOne(
  { _id: ObjectId("67cece9f2ddfbcd81f356fc4") },
  { $unset: { age: "" } }
);

// $rename -> We use this operator to rename a field
db.userInfo.updateOne(
  { _id: ObjectId("67cece9f2ddfbcd81f356fc2") },
  { $remane: { hobbies: "hobbyList" } }
);

// upsert:true -> if doc found it will update if not then first it will create than update it
db.userInfo.updateOne(
  { name: "Shivani" },
  { $set: { age: 24, email: "shivani.test@gmail.com" } },
  { upsert: true }
);

// ------------------------ Array CRUD Section ---------------------------

// "hobbyList.$.team" -> Here $ represent the first filter document (it is like find it will only filter first match document)
// Note it will only update fist matching hobby object of each document
// visit Lecture No - 114
db.userInfo.updateOne(
  {
    _id: ObjectId("67cece9f2ddfbcd81f356fc2"),
    hobbyList: { $elemMatch: { title: "Sport", frequency: 4 } },
  },
  { $set: { "hobbyList.$.team": "MI" } }
);

// To introduce new field in each element of an array we use hobbyList.$[].isGreatorThan2
// Visit Lecture No - 115
db.userInfo.updateMany(
  { hobbyList: { $elemMatch: { frequency: { $gte: 2 } } } },
  { $set: { "hobbyList.$[].isGreatorThan2": true } }
);

// Below method will find all matching objects and update them while $ will only find first matching document like find in array
// Visit Lecture No - 116
db.userInfo.updateMany(
  { hobbyList: { $elemMatch: { frequency: { $gte: 2 } } } },
  { $set: { "hobbyList.$[el].isFound": true } },
  { arryFilters: [{ "el.frequency": { $gt: 1 } }] }
);
// ================== Adding Element in array ==============
// Adding single element in array
// Visit Lecture No - 117
db.userInfo.updateMany(
  {},
  { $push: { hobbyList: { title: "coding", frequency: 10 } } }
);

// Adding multile elements in array
// Visit Lecture No - 118
db.userInfo.updateMany(
  {},
  { $push: { hobbyList: { $each: [{ title: "t10" }, { title: "t11" }] } } }
);

// =========================== removing element from array =====================
db.userInfo.updateMany({},{$pull:{hobbyList:{title:"t10"}}})

// removing last element of  array 
db.userInfo.updateMany({},{$pop:{hobbyList:1}})

// removing first element of array
db.userInfo.updateMany({}, { $pop: { hobbyList: -1 } })

// $addToSet is use to add one document like push but it will only add unique value it will not add old value