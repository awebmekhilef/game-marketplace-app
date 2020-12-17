# Game Marketplace App

### Features
- CRUD game pages
- Upload cover images and game files
- Game querying system
- Markdown description

### Stack
- EJS
- Node
- Express
- MongoDB

### How to run?
1. Create firebase storage and admin service account
2. Configure environment variables:
    - Set GOOGLE_CONFIG_BASE64 to base64 encoded service account key
    - Set BUCKET_NAME to firebase storage bucket name
    - Set DB_URI to MongoDB database uri
3. Run start script
