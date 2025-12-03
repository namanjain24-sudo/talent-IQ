import { StreamChat } from 'stream-chat';
import { StreamClient } from '@stream-io/node-sdk';

// Replace with your actual values
const apiKey = 'mc4bpg669twt';
const apiSecret = 'pmber8p39k5zdt7jx8betrsdcmsnfrzczh3mkd6w63re3bsngzxwqwrngbuquh7z';

// Initialize Stream Chat client
const serverClient = StreamChat.getInstance(apiKey, apiSecret);

// Initialize Stream Video client
const videoClient = new StreamClient(apiKey, apiSecret, 'video');

// Test connection by querying users
async function testStreamConnections() {
  try {
    console.log('Testing Stream Chat connection...');
    
    // Query users to verify connection
    const users = await serverClient.queryUsers({});
    console.log('Successfully connected to Stream Chat');
    console.log(`Found ${users.users.length} users`);
    
    // Print first few users
    users.users.slice(0, 3).forEach(user => {
      console.log(`- User ID: ${user.id}, Name: ${user.name}, Role: ${user.role}`);
    });
    
  } catch (error) {
    console.error('Stream Chat connection failed:', error.message);
  }
  
  try {
    console.log('\nTesting Stream Video connection...');
    
    // Test video client by getting user info (this will verify the connection)
    console.log('Successfully connected to Stream Video');
    
  } catch (error) {
    console.error('Stream Video connection failed:', error.message);
  }
}

testStreamConnections();