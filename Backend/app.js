const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors');
app.use(cors())
// using mongoose.connect() function for connection to mongoDB atlas instance
mongoose.connect('mongodb+srv://akashshukla707:akash707@cluster0-1mvjs.mongodb.net/Jlloyds?retryWrites=true&w=majority');

// setting up the body parsed for sending body inside POST request
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());


// creating the mongoose schema for saving the data inside the collection
const schema  = mongoose.Schema({
    company_name:{type:String, required: true, unique: true},
    first_name:{type:String, required: true},
    last_name:{type:String, required: true},
    email:{type:String, required: true},
    license_start:{type:Date},
    license_end:{type:Date},
    status:Boolean,
    date: { type: Date, default: Date.now }
});

const Information = mongoose.model('Information',schema);


app.get('/companies',function(req,res){
    Information.find({}).sort('-date').exec(function (err, companies) {
        if(err){
            res.status(400).json({
                message:"Error in getting all the companies"
            });
        }else{
            res.status(200).json({
                companies:companies
            });
        }
    });
})


app.put('/company/:id',function(req,res){
    let status = {'status':false}
    Information.findByIdAndUpdate(req.params.id, status,function (err, response){
        if(err){
            res.status(400).json({
                message:"Error in updating the company status"
            });
        }else{
            res.status(200).json({
                message:"Company status updated successfully"
            });
        }
    });
})

app.post('/register',function(req,res){
    const information = new Information({
        company_name:req.body.company_name,
        first_name:req.body.first_name,
        last_name:req.body.last_name,
        email:req.body.email,
        license_start:req.body.license_start,
        license_end:req.body.license_end,
        status:true
    });
    // using mongoose save() function to save fields inside the mongodb collection
    information.save().then(result=>{
        console.log("Information saved successfully",result);
        res.status(200).json({
            message:"Information saved successfully",
            response:information
        });
    }).catch(err=>{
        console.log("Error in saving the information",err);
        if (err) {
            let errors= {}
            if (err.name == 'ValidationError') {
                let validationErrors= [];
                for (field in err.errors) {
                    validationErrors.push({field:err.errors[field].message}); 
                }
                errors.validation = validationErrors
            }else if(err.code == 11000){
                errors.unique = "Company with this name already exists! Please use another company name"
            }
            res.status(400).json({
                message:"Error in saving the information",
                errors:errors
            });
        }
    });
});

module.exports = app;

