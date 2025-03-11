Project Setup Guide
Backend Setup
Navigate to the root of the project:

cd vehicleMs
Install backend dependencies:

npm install
Frontend Setup
Navigate to the frontend directory:

cd frontend
Install frontend dependencies:

npm install
Environment Variables Setup
Create a .env file at the root of the project.
Add the following environment variables:

PORT=5000
MONGO_URL=<your_mongodb_connection_string>
UPSTASH_REDIS_URL=<your_upstash_redis_url>
ACCESS_TOKEN_SECRET=<your_access_token_secret>
REFRESH_TOKEN_SECRET=<your_refresh_token_secret>
CLOUDINARY_CLOUD_NAME=<your_cloudinary_cloud_name>
CLOUDINARY_API_KEY=<your_cloudinary_api_key>
CLOUDINARY_API_SECRET=<your_cloudinary_api_secret>
STRIPE_SECRET_KEY=<your_stripe_secret_key>
CLIENT_URL=http://localhost:5173
NODE_ENV=production
Running the Application

Start the backend:

npm run dev
Start the frontend:

cd frontend  
npm run dev
Happy coding! 💻✨🔥 You got this! 🎯🏆







