const mongoose = require('mongoose');
const joi = require('joi')
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
// console.log(mongoose.model('FormData', formDataSchema),"89");
exports.FormData = mongoose.model('FormData', formDataSchema);
