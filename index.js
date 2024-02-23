const mongoose = require('mongoose');

// Connect to MongoDB
mongoose.connect('mongodb://127.0.0.1:27017/StudenData')
  .then(() => console.log('Database connected successfully'))
  .catch(err => console.error('Error connecting:', err));

// Define Schemas with proper data types
const academicSchema = new mongoose.Schema({
  StudentId: { type: Number, required: true, unique: true }, // Ensure unique student IDs
  Name: { type: String, required: true },
  Grades: { type: String, required: true }, // Consider using an object or array for grades
  Subject: { type: String, required: true }
});

const curricularSchema = new mongoose.Schema({
  StudentId: { type: Number, required: true },
  Name: { type: String, required: true },
  ActivityType: { type: String, required: true },
  Duration: { type: String, required: true },
  Achievements: { type: String, required: true }
});

// Create Mongoose models
const AcademicRecord = mongoose.model('academicRecord', academicSchema);
const CurricularRecord = mongoose.model('curricularRecord', curricularSchema);

// Improved error handling and logging
async function createDocument(data, collection) {
  try {
    const newRecord = await collection.create(data);
    console.log(`Successfully created document in ${collection.modelName}:`, newRecord);
  } catch (err) {
    console.error(`Error creating document in ${collection.modelName}:`, err);
  }
}

// Create documents with better data structure
async function createAcademicDocuments() {
  const data = [
    { StudentId: 1, Name: 'Ari', Grades: '{ "Math": "A", "Science": "B" }', Subject: 'Maths' },
    // {StudentId : 2 , Name :'Avinash', Grades : '{"Math":"B", ""Physics":"C"}',Subject : 'Science'},
    // ... other academic records
  ];
  await createDocument(data, AcademicRecord);
}

async function createCurricularDocuments() {
  const data = [
    { StudentId: 1, Name: 'Stephen', ActivityType: 'Sports - Hockey', Duration: '2 months', Achievements: 'Gold Medal' },
    {StudentId:2, Name : "Nancy", ActivityType: 'Art - Drawing', Duration: '1 month',Achievements:'Bronze'},
    // ... other curricular records
  ];
  await createDocument(data, CurricularRecord);
}

// Improved data retrieval with filtering (optional)
async function getData(collection, filter = {}) {
  try {
    const results = await collection.find(filter);
    console.log(`Retrieved data from ${collection.modelName}:`, results);
  } catch (err) {
    console.error(`Error retrieving data from ${collection.modelName}:`, err);
  }
}

// Update example (replace with specific update logic)
async function updateData(collection, filter, updateData) {
  try {
    const updatedRecord = await collection.findOneAndUpdate(filter, updateData, { new: true });
    console.log(`Updated document in ${collection.modelName}:`, updatedRecord);
  } catch (err) {
    console.error(`Error updating document in ${collection.modelName}:`, err);
  }
}

// Delete operation
async function deleteData(collection, filter) {
  try {
    const deletedRecord = await collection.deleteOne(filter);
    console.log(`Deleted document from ${collection.modelName}:`, deletedRecord.deletedCount);
  } catch (err) {
    console.error(`Error deleting document from ${collection.modelName}:`, err);
  }
}

// Example usage
createAcademicDocuments();
createCurricularDocuments();
getData(CurricularRecord, { StudentId: 2 }); // Filter curricular records by StudentId
getData(AcademicRecord); // Retrieve all academic records

// Update example (replace with specific criteria and changes)
updateData(AcademicRecord, { StudentId: 1 }, { Grades: '{ "Math": "A+", "Science": "A" , "Physics": "C"}' });

// Delete example (replace with specific criteria)
deleteData(AcademicRecord, { StudentId: 1 }); // Delete academic record with StudentId 3
