
import ngrok from 'ngrok';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const ENV_PATH = path.join(__dirname, '../.env');
const PORT = 3000;

async function setup() {
    try {
        console.log('🚀 Starting ngrok tunnel...');
        const url = await ngrok.connect({
            addr: PORT,
            proto: 'http'
        });

        console.log(`✅ Tunnel established: ${url}`);

        let envContent = fs.readFileSync(ENV_PATH, 'utf8');
        
        // Update NEXTAUTH_URL
        if (envContent.includes('NEXTAUTH_URL=')) {
            envContent = envContent.replace(/NEXTAUTH_URL=.*/, `NEXTAUTH_URL=${url}`);
        } else {
            envContent += `\nNEXTAUTH_URL=${url}`;
        }

        fs.writeFileSync(ENV_PATH, envContent);
        console.log('📝 Updated .env with new NEXTAUTH_URL');
        console.log('\n--- IMPORTANT ---');
        console.log('1. If Next.js is already running, you MUST RESTART it to pick up the new .env values.');
        console.log(`2. Your application is now accessible at: ${url}`);
        console.log('-----------------\n');

        // Keep process alive
        process.on('SIGINT', async () => {
            console.log('\nStopping ngrok...');
            await ngrok.kill();
            process.exit();
        });

    } catch (error) {
        console.error('❌ Error starting ngrok:', error);
        
        if (error.message.includes('auth token')) {
            console.error('\nTIP: It looks like you might need an ngrok authtoken.');
            console.error('Run: ngrok config add-authtoken YOUR_TOKEN');
        }
    }
}

setup();
