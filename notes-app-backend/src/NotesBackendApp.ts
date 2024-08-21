import express, { Request, Response } from "express";
import cors from 'cors';
import { DatabaseConnectionInfo } from "./DatabaseConnectionInfo";
import { Sequelize, DataTypes, Model, ModelStatic } from 'sequelize';
import Note, { NoteModel } from "./NotesModel";

/**
 * Class for the backend server for the app.
 */
export class NotesBackendApp {
    private sequelize: Sequelize | undefined;
    private app: express.Application | undefined;

    public constructor() {
        this.Begin();
    }

    /**
     * Begins the setup process.
     */
    private async Begin() {
        console.log("Setting up database...")
        await this.SetupSequelize();
        console.log("Setting up API...")
        await this.SetupExpress();
        console.log("Setup complete.")
    }

    /**
     * Sets up the database connection and note model for Sequelize.
     */
    private async SetupSequelize() {
        const databaseConnectionInfo = new DatabaseConnectionInfo();
        this.sequelize = new Sequelize(databaseConnectionInfo.getPostgresConnectionURI());

        try {
            await this.sequelize.authenticate();
            console.log('Connection has been established successfully.');
        } catch (error) {
            console.error('Unable to connect to the database:', error);
        }

        NoteModel(this.sequelize);
        await Note.sync({alter:true});
    }

    /**
     * Setup Express.js, cors, and API endpoints. This begins to run the application.
     */
    private async SetupExpress() {
        this.app = express();

        this.app.use(express.json());
        this.app.use(cors());

        const PORT = process.env.APP_SERVER_DOCKER_PORT || 8080;

        this.app.get("/api/notes", async (req:Request, res:Response) => {
            const allNotes = await Note.findAll();   
            return res.json(allNotes);
        });

        this.app.post("/api/notes", async (req: Request, res: Response) => {
            const { title, content } = req.body;
            if (!title || !content)
                return res.status(400).send();

            // Note.id does not matter, as the DB will allocate that.

            const newNote = new Note({ title: title, content: content });

            try {
                await newNote.save();
            } catch (err: any) {
                return res.status(500).send();
            }

            return res.status(200).json(newNote.dataValues).send();
        });

        this.app.put("/api/notes/:id", async (req: Request, res: Response) => {
            const { title, content } = req.body;
            const id = parseInt(req.params.id);

            if (id == null || id == undefined || Number.isNaN(id))
                return res.status(400).send();

            if (!title || !content)
                return res.status(400).send();

            try {
                // Run UPDATE query
                const numRowsReturned = await Note.update({
                    title: title, content: content
                }, {
                    where: {
                        id: id
                    }
                });

                if (numRowsReturned[0] === 0){
                    return res.status(400).send();
                }

                // Get updated note values.
                const updatedNote = await Note.findOne({ where: { id: id } });

                if (updatedNote === null) {
                    return res.status(500).send();
                }

                // Send 'em back
                return res.status(200).json(updatedNote.dataValues).send();
            }
            catch (err: any) {
                return res.status(500).send();
            }       
        });

        this.app.delete("/api/notes/:id", async (req: Request, res: Response) => {
            const id = parseInt(req.params.id);

            if (id == null || id == undefined || Number.isNaN(id))
                return res.status(400).send();

            try {
                await Note.destroy({ where: { id: id } });
            } catch (err: any) {
                return res.status(500).send();
            }

            return res.status(204).send();
        });
            
        this.app.listen(PORT, () => { console.log("Notes app server now running on port: ", PORT) });
    }
}