// This script helps you add the SUPABASE_SERVICE_ROLE_KEY to your .env.local file
// Run it with: node update-env.js YOUR_SERVICE_ROLE_KEY

const fs = require('fs');
const path = require('path');

// Get the service role key from command line arguments
const serviceRoleKey = process.argv[2];

if (!serviceRoleKey) {
  console.error('Please provide your Supabase service role key as an argument.');
  console.error('Example: node update-env.js YOUR_SERVICE_ROLE_KEY');
  process.exit(1);
}

// Path to .env.local file
const envFilePath = path.join(__dirname, '.env.local');

// Check if .env.local exists
if (!fs.existsSync(envFilePath)) {
  console.error('.env.local file not found. Please create it first.');
  process.exit(1);
}

// Read the current content of .env.local
let envContent = fs.readFileSync(envFilePath, 'utf8');

// Check if SUPABASE_SERVICE_ROLE_KEY already exists
if (envContent.includes('SUPABASE_SERVICE_ROLE_KEY=')) {
  // Replace the existing key
  envContent = envContent.replace(
    /SUPABASE_SERVICE_ROLE_KEY=.*/,
    `SUPABASE_SERVICE_ROLE_KEY=${serviceRoleKey}`
  );
  console.log('Updated existing SUPABASE_SERVICE_ROLE_KEY in .env.local');
} else {
  // Add the key to the end of the file
  envContent += `\n\n# Supabase service role key (admin access)
SUPABASE_SERVICE_ROLE_KEY=${serviceRoleKey}\n`;
  console.log('Added SUPABASE_SERVICE_ROLE_KEY to .env.local');
}

// Write the updated content back to .env.local
fs.writeFileSync(envFilePath, envContent);

console.log('Done! Your .env.local file has been updated.');
console.log('Please restart your development server for the changes to take effect.'); 