//Routes that handle user registration and authorization

const Router = require("express");
const User = require("../models/User");
const bcypt = require("bcryptjs");
// for cheking invalid password and email
// then importing two fanction: check and validationResalt
const { check, validationResult } = require("express-validator");

const router = new Router();

// creating first metod: post request by url:   /registration
// second param is array where
router.post(
  "/registration",
  [
    // we call fuction to check(first param is email, second is error)
    check("email", "Incorrect email").isEmail(),
    check(
      "password",
      "Password mut be longer than 3 and shorter then 12"
    ).isLength({ min: 3, max: 12 }),
  ],
  async (req, res) => {
    try {
      // using function validateResult getting the validation result
      // getting email and password for request body
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ message: "Incorrect request", errors });
      }

      // getting email and password from body of request
      const { email, password } = req.body;
      console.log(email);
      // checking if user already exist in DB
      // passing the email received from the query into the function findOne
      const candidate = await User.findOne({ email });
      console.log(candidate);

      if (candidate) {
        return res
          .status(400)
          .json({ message: `User with the email ${email} already exist` });
      }
      // hashing the password for security purposes
      // call the function 'hash' in which passing the password
      // add asyc/await
      const hashPassword = await bcypt.hash(password, 15);

      // if user doesnt exist creating new User
      const user = new User({ email, password: hashPassword });

      // last step: saving the user in DB
      await user.save();

      // getting request from server that user was created
      return res.json({ message: "User was created" });
    } catch (e) {
      console.log(e);
      res.send({ message: "Server error" });
    }
  }
);

module.exports = router;
