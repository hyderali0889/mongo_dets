const fs = require('fs');
const mongoose = require('mongoose');
const colors = require('colors');
// Load models
const Bootcamp = require('./models/BootcampModel');
const Courses = require('./models/CourseModel');



// Connect to DB
mongoose.connect('mongodb+srv://hyderali:Ilovewindows10@bootcamp.dj1hc7i.mongodb.net/myDB?retryWrites=true&w=majority');

// Read JSON files
const bootcamps = JSON.parse(
  fs.readFileSync(`${__dirname}/Resources/_data/bootcamps.json`, 'utf-8')
);

// Read JSON files
const courses = JSON.parse(
  fs.readFileSync(`${__dirname}/Resources/_data/courses.json`, 'utf-8')
);


// Import into DB
const importData = async () => {
  try {
    await Bootcamp.create(bootcamps);
   await Courses.create(courses);

    console.log('Data Imported...'.green.inverse);
    process.exit();
  } catch (err) {
    console.error(err);
  }
};

// Delete data
const deleteData = async () => {
  try {
    await Bootcamp.deleteMany();
   await Courses.deleteMany();
  console.log('Data Destroyed...'.red.inverse);
    process.exit();
  } catch (err) {
    console.error(err);
  }
};

if (process.argv[2] === '-i') {
  importData();
} else if (process.argv[2] === '-d') {
  deleteData();
}
