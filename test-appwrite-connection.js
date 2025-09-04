import { Client, Account } from 'appwrite';

// Test Appwrite connection
const client = new Client()
    .setEndpoint('https://fra.cloud.appwrite.io/v1')
    .setProject('68b95e19001efb0ef952');

const account = new Account(client);

async function testConnection() {
    console.log('🔍 Testing Appwrite connection...');
    console.log('📍 Endpoint:', 'https://fra.cloud.appwrite.io/v1');
    console.log('🆔 Project ID:', '68b95e19001efb0ef952');
    
    try {
        // Try to get account info (will fail if not logged in, but connection works)
        const user = await account.get();
        console.log('✅ Connection successful!');
        console.log('👤 Current user:', user.email);
    } catch (error) {
        if (error.code === 401) {
            console.log('✅ Connection successful! (No user logged in, which is expected)');
            console.log('📝 Error details:', error.message);
        } else {
            console.error('❌ Connection failed:', error.message);
            console.error('🔧 Error code:', error.code);
        }
    }
    
    // Test creating a session (to verify platform is configured)
    try {
        console.log('\n🔐 Testing platform configuration...');
        // This will fail but give us info about platform config
        await account.createEmailPasswordSession('test@test.com', 'wrongpassword');
    } catch (error) {
        if (error.message.includes('Invalid credentials') || error.code === 401) {
            console.log('✅ Platform is properly configured! (Login failed as expected with wrong credentials)');
        } else if (error.message.includes('platform') || error.message.includes('origin')) {
            console.log('❌ Platform configuration issue:');
            console.log('   Need to add localhost:3001 as web platform in Appwrite console');
        } else {
            console.log('ℹ️  Platform test result:', error.message);
        }
    }
}

testConnection();