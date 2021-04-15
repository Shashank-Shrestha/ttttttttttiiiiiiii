// use the path of your model
const USER = require("../Model/userModel");
const mongoose = require("mongoose");
// use the new name of the database

const url = "mongodb://localhost:27017/ecommercetesting_database";
beforeAll(async () => {
  await mongoose.connect(url, {
    useNewUrlParser: true,
    useCreateIndex: true,
  });
});
afterAll(async () => {
  await mongoose.connection.close();
});

// describe("User Schema test anything", () => {
//   // the code below is for insert testing
//   it("Add user testing anything", () => {
//     const user = {
//       firstName: "asdfghjk",
//       lastName: "poiuytrew",
//       gender: "Male",
//       mobileNumber: "1274563222",
//       email: "shashank@gmail.com",
//       address: "Baneshwor",
//       username: "shashank",
//       password: "1234567890",
//       userType: "User",
//       userImage: "profile.jpg",
//     };

//     return USER.create(user).then((pro_ret) => {
//       expect(pro_ret.username).toEqual("shashank");
//     });
//   });
// });

//   // the code below is for delete testing
//   it("to test the delete product is working or not", async () => {
//     const status = await USER.deleteMany();
//     expect(status.ok).toBe(1);
//   });

//   it("testing User update", async () => {
//     return USER.findOneAndUpdate(
//       { _id: Object("606d93551f76691b60261dc7") },
//       { $set: { firstName: "Shashank" } }
//     ).then((pp) => {
//       expect(pp.firstName).toEqual("ram");
//     });
//   });
