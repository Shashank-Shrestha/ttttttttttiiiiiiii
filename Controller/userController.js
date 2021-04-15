const User = require("../Model/userModel");
const Validation = require("../Validation/userValidation");

class UserController {
  async getCurrentUser(request, response) {
    // let id = response.authUser.id;
    // let userId = request.params.id;
    let user = await User.findById({ _id: request.authUser.id });
    if (!user) {
      response
        .status(404)
        .json({ success: false, message: "User does not exist!" });
    } else {
      response.status(200).json({ success: true, user: user });
    }
  }

  //update
  async updateUser(req, res) {
    console.log(req.body);
    console.log("......");
    const result = Validation.USER(req.body)

    if (result.error) {
      let error = result.error.details[0];
      res.status(422).json({
        success: false,
        status: 422,
        message: error.message,
      });
    } else {
      try {
        // save the new user in db
        const userId = req.params.id;
        let {
          firstName,
          lastName,
          mobileNumber,
          email,
          address,
        } = result.value;
        let updateUser = await User.findByIdAndUpdate(
          { _id: userId },
          { firstName, lastName, mobileNumber, email, address },
          { new: true }
        );
        res.status(201).json({
          success: true,
          message: "User updated successfully!",
          user: updateUser,
        });
      } catch (error) {
        res.status(500).json({ success: false, error: error.message });
      }
    }
  }

  //displayAll User
  async showUser(req, res) {
    try {
      let user = await User.find();
      res.status(201).json({
        status: 201,
        success: true,
        message: "User displayed successfully!",
        users: user.reverse(),
      });
    } catch (error) {
      res.status(500).json({ success: false, error: error.message });
    }
  }

  //deleteProduct
  async deleteUser(req, res) {
    try {
      let id = req.params.id;
      let users = await User.findById({ _id: id });
      if (!users) {
        res.status(404).json({
          status: 404,
          success: false,
          message: "User Not Found",
        });
      }
      let user = await User.findByIdAndDelete({ _id: id });
      res.status(201).json({
        status: 201,
        success: true,
        message: "User deleted successfully!",
        user: user,
      });
    } catch (error) {
      res.status(500).json({ success: false, error: error.message });
    }
  }
}

module.exports = new UserController();
