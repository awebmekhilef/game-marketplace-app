# Game Marketplace

## Screenshots

![image](https://github.com/user-attachments/assets/757f9d5c-eb45-4e4c-b74d-1947adfa32f8)

![image](https://github.com/user-attachments/assets/d64d2085-6767-4da8-a6f8-5c1171e9d069)

## Info

### Features
- CRUD game pages
- Upload cover images and game files
- Game querying system
- Markdown description

### Tech Stack
- EJS
- Node.js
- Express
- MongoDB

## Get started
1. Create firebase storage and admin service account
2. Configure environment variables:
    - Set GOOGLE_CONFIG_BASE64 to base64 encoded service account JSON key
    - Set BUCKET_NAME to firebase storage bucket name
    - Set DB_URI to MongoDB database uri
3. Run `npm run start` script
