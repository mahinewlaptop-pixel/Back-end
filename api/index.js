const serverless = require('serverless-http');
const app = require('../app');
const mongoose = require('mongoose');

// Ensure DB is connected on cold start
const ensureConnected = async () => {
  if (mongoose.connection.readyState !== 1) {
    await mongoose.connect(process.env.MONGO_URL);
    console.log('Connected to DB (serverless)');
  }
};

const handler = serverless(app);

module.exports = async (req, res) => {
  if (mongoose.connection.readyState !== 1) {
    try {
      await ensureConnected();
    } catch (err) {
      console.error('Failed to connect to DB in serverless handler:', err.message);
      // let serverless-http handle the error downstream
    }
  }
  return handler(req, res);
};