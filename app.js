
const mongoose = require('mongoose');
//set url
mongoose.connect("mongodb://localhost:27017/fruitsDB");//here fruitsDB is created database 

const fruitSchema = new mongoose.Schema({
    //there is a validation feature 
    name:{ 
        type:String,
        //if not in the schemes then shows below msg
        required:[true,'please check your data entry ,name not mention']
    },
    //this is for validation 
    //valid data only inserted
    rating:{
        type:Number,
        min:1, 
        max:10
    },
    review:String
});

const Fruit =mongoose.model("Fruit",fruitSchema);

const fruit =new Fruit({
  name:'Apple',
  rating:5,
  review:'awesome'
});

//fruit.save();

const personSchema=new mongoose.Schema({
    name:String,
    age:Number,
    //this is for relationship between
    favouriteFruit:fruitSchema
});
const Person=mongoose.model("Person",personSchema);

const bestfruit=new Fruit({
    name:'plump',
    score:6,
    review:'best forever'
})
//bestfruit.save();

const person=new Person({
 name:'neoj',
 age:23,
 //here we use another schema fruitschema  in personSchema
 //so here is a relationship between them
 //somebody can use aother schema that's why we use this schema
 favouriteFruit:bestfruit
});


//person.save();

//to insert in bulk data 
const kiwi=new Fruit({
    name:'kiwi',
    rating:7,
    review:'good'
});
const banana=new Fruit({
    name:'banana',
    rating:9,
    review:'excellent'
});
const mango=new Fruit({
    name:'mango',
    rating:5,
    review:'wow'
});
//for each runnig it will added in db so commeted this
/*
Fruit.insertMany([kiwi, banana,mango],function(err){
    if(err){
        console.log(err);
    }
    else
    {
        console.log('successfullyy added items');
    }
});
*/
//to get the data from databases 
Fruit.find(function(err,fruits){
    if(err){
        console.log(err);
    }
    else{
        //for repeted insert in ds it will remove 
        //it insert only one if same items
       // mongoose.connection.close();
        //console.log(fruits)
        let tr=0;
        fruits.forEach(function(fruit){
            console.log(fruit.name);
            tr+=fruit.rating;
        
        })
        console.log(tr);
    }
})
//to update the data in db
Fruit.updateOne({_id:"6252893c3ae24b9eb991bae0"},{name:'watermelon'},function(err){
    if(err){
        console.log(err);
    }
    else{
        console.log('successfully updated');
    }
});
//update and add relationship
//creating fruits schema
const nirofruit=new Fruit({
    name:'graphs',
    rating:6,
    review:'testy'
})
nirofruit.save();
//here added niroj favorite fruit
Person.updateOne({_id:"62528240fe7311d2e9fe6d76"},{favouriteFruit:nirofruit},function(err){
    if(err){
        console.log(err);
    }
    else{
        console.log('successfully added relation and updated');
    }
});

//to delet items for db by id
Fruit.deleteOne({_id:"62528931b622d93483efe5df"},function(err){
    if(err){
        console.log(err);
    }
    else{
        console.log('successfully deleted');
    }
});
/*
//deteted by using the
Fruit.deleteOne({name:"Apple"},function(err){
    if(err){
        console.log(err);
    }
    else{
        console.log('successfully deleted');
    }
});
*/
//to delete many items not for single data
Fruit.deleteMany({name:"Apple"},function(err){
    if(err){
        console.log(err);
    }
    else{
        console.log('successfully deleted multiple');
    }
});
//establishing relationship between collections of db
