const express = require('express')
const router = express.Router();
const User = require("../models/User")
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const fetchuser = require("../middleware/fetchuser")


let JWT_SECRET = 'IAmAGoodBoy';

//ROUTE 1: Create a user using: Post "/api/auth/createuser". No login require
router.post('/createuser', [
  body('name', "Enter a Valid Name!!").isLength({ min: 3 }),
  body('email', "Enter a Valid email!!").isEmail(),
  body('password', "Password must be at least 6 Character!!").isLength({ min: 6 })
], async (req, res) => {
  //If there are errors Return Bad Request!!
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  try {
    //Check whether the user with this email already Exists! 
    let user = await User.findOne({ email: req.body.email })
    if (user) {
      return res.status(400).json({ error: "Sorry, A user with this email already Exists!" })
    }

    const salt = await bcrypt.genSalt(10)
    let secPass = await bcrypt.hash(req.body.password, salt)
    user = await User.create({
      name: req.body.name,
      email: req.body.email,
      password: secPass
    })
    const data = {
      user: {
        id: user.id
      }
    }

    const authToken = jwt.sign(data, JWT_SECRET);
    res.json({ authToken })

  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal Server Error")
  }
})



//ROUTE 2: Authenticate the user: Post "/api/auth/login". No login Require
router.post('/login', [
  body('email', "Enter a Valid email!!").isEmail(),
  body('password', "Password Cannot be blank!!").exists()
], async (req, res) => {

  //If there are errors Return Bad Request!!
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { email, password } = req.body;
  try {
    //Check whether the user with this email already Exists! 
    let user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ error: "Please try to login with correct Credentials" })
    }
    const passwordCompare = await bcrypt.compare(password, user.password);
    if (!passwordCompare) {
      return res.status(400).json({ error: "Please try to login with correct Credentials" })
    }

    const data = {
      user: {
        id: user.id
      }
    }
    const authToken = jwt.sign(data, JWT_SECRET);
    res.json({ authToken })
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal Server Error")

  }
})


//ROUTE 3: Get Loggedin User details Using: Post "/api/auth/getuser". Login Require
router.post('/getuser',fetchuser, async (req, res) => {
  try {
    let userId = req.user.id;
    const user = await User.findById(userId).select("-password")
    res.send(user)
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal Server Error")  
  }
})
module.exports = router