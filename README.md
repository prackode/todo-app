# TODO List Application
TODO List application using JavaScript with both the frontend and backend. The application allows users to signup, login, add, edit, delete, and mark todo(s) as complete. Data persists even after the page is refreshed along with real-time updates when tasks are modified.

## Key Features
- Authentication (login, signup) using JWT
- CRUD operations on todo(s)
- Data Validation and Error handling
- Retention of tasks after refreshing page

## Tech Stack
- ReactJS
- Node.js
- Express.js
- MongoDB


## Steps to run the app

1. Clone the repository

2. Change dir and install required node modules in both client and server directory 
```
cd todo-app
```

3. Change to server directory and instal modules
```
cd server
npm install 
```

4. Add .env file with following code:
```
MONGO_URI=[MongoDB database url]
SECRET=$SECRET$
PORT=5000
```

4. Start the server
```
npm run start
```

5. Now go to the client directory and run the client 
```
cd ..
cd client
npm install 
npm run start
```
Note: Make sure MongoDB database is intialised either on local or on Atlas and specified in the .env file appropriately


## Future Scope
- Sorting based on user specific parameters
- Due date and reminder notifications
- Caching mechanism
