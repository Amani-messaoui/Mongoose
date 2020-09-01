const express = require("express");
const mongoose = require("mongoose");
var Schema = mongoose.Schema;
const PersonSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  age: Number,
  favoriteFoods: [String],
});
var personModel = mongoose.model("person", PersonSchema);

var person = new personModel({
    name: "laila",
    age: 18,
    favoriteFoods: ["spagetti", "pizza", "appel"],
  });
  
  person.save(function (err, data) {
    if (err) {
      console.log("err to save model");
    }
    console.log("element is added");
  })
  //----//
  // Create Many Records with model.create()
var arrayOfPeople = [
    { name: "roua", age: 35, favoriteFoods: ["couscous", "appel"] },
    { name: "brahim", age: 40, favoriteFoods: ["orange", "chocola"] },
    { name: "kaled", age: 10, favoriteFoods: ["cacao", "fanta"] },
    { name: "arij", age: 21, favoriteFoods: ["banana", "chocola"] },
  ];
  
  personModel.create(arrayOfPeople, (err, data) => {
    if (err) console.log(err);
    else console.log(arrayOfPeople);
  });
  // Use model.find() to Search Your Database
personModel
.find({ name: "roua" })
.then((doc) => {
  console.log(doc);
})
.catch((err) => {
  console.error(err);
});
//Use model.findOne() to Return a Single Matching Document from Database
personModel
  .findOne({ favoriteFoods: { $in: ["pizza"] } })
  .then((doc) => {
    console.log(doc);
  })
  .catch((err) => {
    console.error(err);
  });
  //Use model.findById() to Search Your Database By _id

personModel
.findById({
  _id: "5f4ec5c30170242254e1f4bc",
})
.then((doc) => {
  console.log(doc);
})
.catch((err) => {
  console.error(err);
});
//   Perform Classic Updates by Running Find, Edit, then Save

personModel.findById("5f4ec57b5fa6ae1420380245", (err, person) => {
    if (err) console.log(err);
    person.favoriteFoods.push("Touna");
    person.save((err, person) => {
      if (err) console.log(err);
      console.log(person);
    });
  });
// Perform New Updates on a Document Using model.findOneAndUpdate()

personModel.findOneAndUpdate(
    { name: "brahim" },
    { age: 20 },
    { new: true },
    (err, person) => {
      if (err) console.log(err);
      console.log(person);
    }
  );
  // Delete One Document Using model.findByIdAndRemove

personModel.findOneAndRemove("5f4ec5c30170242254e1f4bf", (err, person) => {
    if (err) console.log(err);
    console.log(person);
  });
  // MongoDB and Mongoose - Delete Many Documents with model.remove()

personModel.deleteMany({ name: "Mary" }, (err, person) => {
    if (err) console.log(err);
    console.log("Person(s) with name 'laila' was deleted");
  });
  // Chain Search Query Helpers to Narrow Search Results

personModel
.find({ favoriteFoods: { $in: ["Burrito"] } })
.sort({ name: 1 })
.limit(2)
.select("-age")
.exec()
.then((doc) => console.log(doc))
.catch((err) => console.error(err));

module.exports = mongoose.model('Person', PersonSchema);
