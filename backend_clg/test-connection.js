require('dotenv').config();
const mongoose = require('mongoose');

async function testConnection() {
  const uri = process.env.MONGO_URI;
  console.log('Testing MongoDB connection...');
  console.log('URI:', uri.replace(/:([^@]+)@/, ':****@')); // mask password
  
  try {
    const conn = await mongoose.connect(uri, {
      serverSelectionTimeoutMS: 10000, // 10 second timeout
    });
    console.log('✅ MongoDB Connected Successfully!');
    console.log('   Host:', conn.connection.host);
    console.log('   Database:', conn.connection.name);
    console.log('   Port:', conn.connection.port);
    
    // List collections
    const collections = await conn.connection.db.listCollections().toArray();
    console.log('   Collections:', collections.map(c => c.name).join(', ') || '(none)');
    
    await mongoose.disconnect();
    console.log('✅ Disconnected successfully.');
  } catch (error) {
    console.error('❌ MongoDB Connection FAILED!');
    console.error('   Error:', error.message);
    if (error.message.includes('ENOTFOUND') || error.message.includes('getaddrinfo')) {
      console.error('   → Check your cluster hostname in MONGO_URI');
    } else if (error.message.includes('Authentication failed') || error.message.includes('auth')) {
      console.error('   → Check your username and password in MONGO_URI');
    } else if (error.message.includes('timed out')) {
      console.error('   → Check your network / IP whitelist in MongoDB Atlas');
    }
  }
  process.exit(0);
}

testConnection();
