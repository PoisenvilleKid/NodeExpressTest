import mongoose from 'mongoose';

// Connect Mongoose to our URL and DB which is E-Uni
// In this scenario ***change last endpoint for other DB's***
mongoose.connect("mongodb://localhost:27017/Test", { useNewUrlParser: true });

let db = mongoose.connection;

// Check Connection
db.once("open", function() {
    console.log("Connected To MongoDB");
  });
  
  // Check for DB errors
  db.on("error", function(err) {
    console.log(err);
  });
  
  // Export our db connection to the program
  export default db;