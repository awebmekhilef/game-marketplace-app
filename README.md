# Game Marketplace App

Demo: https://game-marketplace-app.herokuapp.com/

### Features
- CRUD game pages
- Upload cover images and game files
- Game querying system
- Markdown description

### Tech Stack
- EJS
- Node
- Express
- MongoDB

## Get started
1. Create firebase storage and admin service account
2. Configure environment variables:
    - Set GOOGLE_CONFIG_BASE64 to base64 encoded service account key
    - Set BUCKET_NAME to firebase storage bucket name
    - Set DB_URI to MongoDB database uri
3. Run `yarn start` script
