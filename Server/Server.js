const express = require('express');
const bodyParser = require('body-parser');

const cors = require('cors');
const bcrypt = require('bcrypt');
const joi = require('joi');

const app = express();
app.use(cors());
app.use(bodyParser.json());
const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/your-database-name', {
  // useNewUrlParser: true,
  // useUnifiedTopology: true,
});

const formDataSchema = new mongoose.Schema({
  FirstName: String,
  LastName: String,
  EmailAdress: String,
  PhoneNumber: Number,
  Adress: String,
  PinCode: Number,
  Country: String,
  State: String,
  City: String,
  Remarks: String,
});

const SignUpSchema = new mongoose.Schema({
  username: { type: String, unique: true, required: true },
  password: { type: String, required: true },
});
const SignUpData = mongoose.model('SignUpData', SignUpSchema);
// console.log(mongoose.model('FormData', formDataSchema),"89");
const FormData = mongoose.model('FormData', formDataSchema);


const validateAccessToken = (token) => {
  return token === 'your_access_token';
};

//this is authentication part
const isAuth=(req, res, next)=> {
  const accessToken = req.headers.authorization;

  if (!accessToken || !validateAccessToken(accessToken)) {
    res.status(401);
    res.send('Access forbidden');
  } else {
    next();
  }
}

const formDataValidationSchema = joi.object({  
  FirstName: joi.string().required(),
  LastName: joi.string().required(),
  EmailAdress: joi.string().email().required(),
  PhoneNumber: joi.number().required(),
  Adress: joi.string().required(),
  PinCode: joi.number().required(),
  Country: joi.string().required(),
  State: joi.string().required(),
  City: joi.string().required(),
  Remarks: joi.string(),
});



//post api for requesting the data from frontend and storing that data in mongodb server
app.post('/api/submit-form',isAuth, async (req, res) => {
  try {
    const validationResult = formDataValidationSchema.validate(req.body);
    console.log(validationResult,"validationResult");
    if (validationResult.error) {
      return res.status(400).json({ success: false, error: validationResult.error.message });
    }
    const formData = new FormData(req.body);
    await formData.save();
    res.json({ success: true, message: 'Form data submitted successfully!',res:req.body });
  } catch (error) {
    res.status(400).json({ success: false, error: 'Invalid data format' });
  }
});

//get api for fetching data from monodb database
app.get('/api/get-data', async (req, res) => {
  try {
    const data = await FormData.find();
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

//delete api for the deletion of table row from there id
app.delete('/api/delete-data/:id',isAuth, async (req, res) => {
  try {
    const { id } = req.params;
    console.log(req.params,"params" )
    const result = await FormData.findByIdAndDelete(id);
    if (result) {
      res.json({ success: true, message: 'Data deleted successfully!' });
    } else {
      res.status(404).json({ success: false, error: 'Data not found' });
    }
  } catch (error) {
    res.status(500).json({ success: false, error: 'Internal Server Error' });
  }
});

//put api for the updation of data in table
app.put('/api/update-data/:id',isAuth, async (req, res) => {
  try {
    const { id } = req.params;
    const updatedData = req.body;
    await FormData.findByIdAndUpdate(id, updatedData);
    res.json({ success: true, message: 'Data updated successfully!' });
  } catch (error) {
    res.status(500).json({ success: false, error: 'Internal Server Error' });
  }
});
app.post('/api/signup', async (req, res) => {
  try {
    const { username, password } = req.body;

    const existingUser = await SignUpData.findOne({ username });
    if (existingUser) {
      return res.status(400).json({ success: false, error: 'Username already exists' });
    }

    await SignUpData.create({ username, password });

    res.json({ success: true, message: 'Signup successful' });
  } catch (error) {
    console.error('Error during signup:', error);
    res.status(500).json({ success: false, error: 'Internal Server Error' });
  }
});

// Login API
app.post('/api/login', async (req, res) => {
  try {
    const { username, password } = req.body;

    const user = await SignUpData.findOne({ username });
    if (!user) {
      return res.status(401).json({ success: false, error: 'Invalid username or password' });
    }

    if (password !== user.password) {
      return res.status(401).json({ success: false, error: 'Invalid username or password' });
    }

    res.json({ success: true, message: 'Login successful' });
  } catch (error) {
    console.error('Error during login:', error);
    res.status(500).json({ success: false, error: 'Internal Server Error' });
  }
});


// for starting the server
const port = 5000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
