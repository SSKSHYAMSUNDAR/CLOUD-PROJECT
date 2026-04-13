const express = require('express');
const AWS = require('aws-sdk');
const path = require('path');

const app = express();
app.use(express.urlencoded({ extended: true }));

// Serve static files
app.use(express.static(__dirname));

// ✅ Use environment-based region (BEST PRACTICE)
const REGION = process.env.AWS_REGION || 'us-east-1';

AWS.config.update({
  region: REGION
});

// ✅ Create DynamoDB client
const dynamo = new AWS.DynamoDB.DocumentClient();

// ✅ Table name (must exist in DynamoDB)
const TABLE_NAME = process.env.TABLE_NAME || "StudentTable";

// Home route
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'form.html'));
});

// Save student
app.post('/students', async (req, res) => {
  const { student_id, name, age, course } = req.body;

  // Validation
  if (!student_id || !name || !age || !course) {
    return res.send("❌ All fields are required.");
  }

  const params = {
    TableName: TABLE_NAME,
    Item: {
      student_id: String(student_id),
      name: String(name),
      age: Number(age),
      course: String(course),
      created_at: new Date().toISOString()
    }
  };

  try {
    await dynamo.put(params).promise();

    res.send(`
      <h2>✅ Student saved successfully!</h2>
      <a href="/">⬅️ Add Another</a>
    `);

  } catch (err) {
    console.error("DynamoDB Error:", err);

    res.send(`
      <h2>❌ Error saving data</h2>
      <p>${err.message}</p>
      <a href="/">Try Again</a>
    `);
  }
});

// Start server
const PORT = 80;

app.listen(PORT, '0.0.0.0', () => {
  console.log(`🚀 Server running on port ${PORT}`);
});