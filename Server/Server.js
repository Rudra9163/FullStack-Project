const express = require('express');
const bodyParser = require('body-parser');
const { FormData }  = require('./Mongo/index')
const cors = require('cors');
const app = express();
const joi = require('joi')
const path = require('path');
app.use(cors());
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));
function isAuth(req, res, next) {
  const auth = req.headers.create;
  // console.log(auth,"req" )
  if (auth === 'password') {
    next();
  } else {
    res.status(401);
    res.send('Access forbidden');
  }
}


app.post('/api/submit-form',isAuth, async (req, res) => {
  console.log(req.body,"body");
  console.log(req.query,"query")
  try {
    const formData = new FormData(req.body);
    await formData.save();
    res.json({ success: true, message: 'Form data submitted successfully!',res:req.body });
  } catch (error) {
    // console.error('Error during form submission:', error);
    res.status(400).json({ success: false, error: 'Invalid data format' });
  }
});
app.post('/api/new-post',async (req,res)=>{
  // console.log(req.body)
  // console.log(req.query)

   res.send({success:true,res:req.body})

  // res.status(201).json({success:true,res:req.body})
})

app.get('/api/personal',async (req,res)=>{

  try{
    // res.send([
    //   {
    //     "firstName": "Marcos",
    //     "lastName": "Silva",
    //     "email": "marcos.henrique@toptal.com",
    //     "password": "Y+XZEaR7J8xAQCc37nf1rw==$p8b5ykUx6xpC6k8MryDaRmXDxncLumU9mEVabyLdpotO66Qjh0igVOVerdqAh+CUQ4n/E0z48mp8SDTpX2ivuQ==",
    //     "permissionLevel": 1,
    //     "id": "5b02c5c84817bf28049e58a3"
    //  },
    //   {2:"test2"},
    //   {3:"test3"},
    //   {4:"test4"},
    //   {5:"test5"},
    //  ])
    const filePath = path.join(__dirname, 'public', 'text.txt');
    res.sendFile(filePath, 'text.txt', (err) => {
      if (err) {
        // Handle errors, for example, file not found
        console.error(err);
        res.status(500).send('Internal Server Error');
      }
    });
  }catch(error){
    res.status(500).json({error:"internal server error"})
  }
    
})

app.get('/api/get-data', async (req, res) => {
  try {
    const data = await FormData.find();
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.delete('/api/delete-data/:id', async (req, res) => {
 
  // console.log(req.query)
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
app.put('/api/update-data/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const updatedData = req.body;
    await FormData.findByIdAndUpdate(id, updatedData);
    res.json({ success: true, message: 'Data updated successfully!' });
  } catch (error) {
    // console.error('Error updating data:', error);
    res.status(500).json({ success: false, error: 'Internal Server Error' });
  }
});

const port = 5000;
app.listen(port, () => {
  // console.log(`Server is running on port ${port}`);
});
