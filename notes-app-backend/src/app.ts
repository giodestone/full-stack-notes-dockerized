import { NotesBackendApp } from "./NotesBackendApp";

const app = new NotesBackendApp();


// import express from "express";
// import cors from 'cors';
// import dotenv from 'dotenv';
// import pg from 'pg'
// import { DatabaseConnectionInfo } from "./DatabaseConnectionInfo";
// import { Sequelize, DataTypes, Model } from 'sequelize';


// const databaseConnectionInfo = new DatabaseConnectionInfo();

// const sequelize = new Sequelize(databaseConnectionInfo.getPostgresConnectionURI());

// try {
//     await sequelize.authenticate();
//     console.log('Connection has been established successfully.');
// } catch (error) {
//     console.error('Unable to connect to the database:', error);
// }

// const Note = sequelize.define('Note', {
//     id: {
//         type: DataTypes.INTEGER,
//         primaryKey: true,
//         autoIncrement: true,
//     },
//     title: DataTypes.STRING,
//     description: DataTypes.STRING
// });

// await Note.sync();


// // https://dev.to/tienbku/dockerize-nodejs-and-postgres-example-4k2j

// /*
// CREATE TABLE public.notes (
// 	id SERIAL primary key,
// 	title text NOT NULL,
// 	description text NOT NULL
// );*/

// console.log("Configuring environment...");

// // dotenv.config() unneccessary as this is running in docker.



// // console.log("Starting connection to database...");

// // const { Client } = pg;
// // const client: pg.Client = new Client({
// //     user: process.env.DB_USER,
// //     password: process.env.DB_PASSWORD,
// //     host: process.env.DB_HOST,
// //     port: process.env.DB_PORT ? parseInt(process.env.DB_PORT) : undefined,
// //     database: process.env.DB_NAME,
// // });

// // try {


// //     client.connect();
// // }
// // catch (e: any) {
// //     console.log("Error: Failed to connect. Message:");
// //     console.log(e.message);
// //     process.exit(-1);
// // }



// // TODO: Ensure notes table is created, and if not, create it.



// console.log("Starting Notes Backend Server...");

// const app = express();

// app.use(express.json());
// app.use(cors());

// const PORT = process.env.APP_SERVER_DOCKER_PORT || 8080;



// console.log("Setting up API endpoints");

// app.get("/api/notes", async (req, res) => {
//     // const allNotes = await client.query('SELECT * FROM notes;');
//     // res.json(allNotes.rows);

//     const allNotes = await Note.findAll();

//     //return res.json(allNotes.)

//     });

// app.post("/api/notes", async (req, res) => {
//     // const note = req.body as Note;

//     // if (note == null) {
//     //     res.status(400);
//     //     return;
//     // }



// });
    
// app.listen(PORT, () => { console.log("Notes app server now running on port: ", PORT) });

// // await client.connect();

// // let currentDBTime = await client.query('SELECT NOW()');

// // console.log("Client connected to database! Time: ", currentDBTime.rows[0]["now"]);

// // start();

// // async function start()
// // {
// //     const PORT = process.env.NODE_DOCKER_PORT || 8080;

// //     app.get("/api/notes", async (req, res) => {
// //                 // await client.query('SELECT * FROM notes;');
        
// //                 res.json({ message: "Success! I love tomatoes and potatoes!!!!" });
// //             });
        
// //     app.listen(PORT, () => { console.log("Notes app server now running on port: ", PORT) });

// //     await client.connect();

// //     let currentDBTime = await client.query('SELECT NOW()');

// //     console.log("Client connected to database! Time: ", currentDBTime.rows[0]["now"]);
// // }