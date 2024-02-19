const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");

const corsOptions = {
  origin: 'http://example.com',
  methods: ['GET', 'POST'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true
};
const corsMiddleware = cors(corsOptions);
const cookieParserMiddleware = cookieParser();
const app = express();
app.use(corsMiddleware);
app.use(cookieParserMiddleware);



const dbHandler = require("./database/dbHandler.js");
dbHandler.connectToDatabase();
const port = process.env.PORT || 3000;

// Routers
const authRouter = require("./routes/auth.js");
const postsRouter = require("./routes/posts.js");
const usersRouter = require("./routes/users.js");
const climbsRouter = require("./routes/climbs.js");
const commentsRouter = require("./routes/comments.js");
const likesRouter = require("./routes/likes.js");



app.use("/ClimbingApp/auth", authRouter); //routes to login/sign up page
app.use("/ClimbingApp/posts", postsRouter); 
app.use("/ClimbingApp/users", usersRouter); 
app.use("/ClimbingApp/climbs", climbsRouter);
app.use("/ClimbingApp/comments", commentsRouter);
app.use("/ClimbingApp/likes", likesRouter);

app.listen(port, () => {
    console.log(`API is listening on ${port}`);
});

// process.on('SIGINT', async () => {
//     console.log('Received SIGINT signal. Shutting down...');
//     dbHandler.disconnectDatabase(() => {
//         console.log('Server closed.');
//         console.log('Disconnected from the database.');
//         process.exit(0); 
//     });
// });