const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/studentAttendance', { useNewUrlParser: true });

const db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
    console.log('Connected to MongoDB!');
});

const studentSchema = new mongoose.Schema({
    rollNumber: String,
    name: String,
    checkInTime: Date,
    checkOutTime: Date
});

const Student = mongoose.model('Student', studentSchema);

const port = 3000;
app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});

app.post('/api/students', (req, res) => {
    // create a new student
    const student = new Student(req.body);
    student.save((error, student) => {
        if (error) {
            res.status(500).send(error);
        } else {
            res.status(201).send(student);
        }
    });
});

app.get('/api/students', (req, res) => {
    // get a list of all students
    Student.find((error, students) => {
        if (error) {
            res.status(500).send(error);
        } else {
            res.send(students);
        }
    });
});



