const express = require('express');
const cors = require('cors');
require("dotenv").config();
const app = express();
const PORT = process.env.PORT || 5000;
const { GoogleGenerativeAI } = require('@google/generative-ai');


// Enable CORS for your React app===================================
app.use(cors({
  origin: 'http://localhost:3000',
  credentials: true
}));

app.use(express.json());


const genAI = new GoogleGenerativeAI('AIzaSyDBcwuUHG2k3CJo4F5krEy2qCLvQRx1Cj4');
const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });



// end hereeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
//   console.log(`Mock ATS scoring API available at http://localhost:${PORT}/api/analyze-resume);
});