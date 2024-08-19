# Full Stack Notes Dockerized

![Placeholder Image](https://raw.githubusercontent.com/giodestone/full-stack-notes-dockerized/main/Images/Placeholder1.jpg)

** THIS PAGE AND PROJECT IS A WIP ON ITS POLISH STAGE **

A simple CRUD React/Express/TypeScript/Postgres full-stack notes app which is containerized for easy development.

This project was intended for me to learn more about React, TypeScript, NPM, Docker/containerization, and creating APIs. This was completed in my spare time.

## Technologies Used

Stack
* Node.js (ts-node)
* Express
* React
* Postgres
* Docker (compose)
* Linux (Alpine)

Coding Languages
* TypeScript
* JavaScript
* HTML
* CSS

Packages
* Attempted to use minimal additional dependancies.
* Sequelize
* Dotenv
* CORS
* PG

Other
* Vite for frontend
* Dev Containers

![JavaScript](https://img.shields.io/badge/javascript-%23323330.svg?style=for-the-badge&logo=javascript&logoColor=%23F7DF1E)
![TypeScript](https://img.shields.io/badge/typescript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white)
![HTML5](https://img.shields.io/badge/html5-%23E34F26.svg?style=for-the-badge&logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/css3-%231572B6.svg?style=for-the-badge&logo=css3&logoColor=white)
![NodeJS](https://img.shields.io/badge/node.js-6DA55F?style=for-the-badge&logo=node.js&logoColor=white)
![NPM](https://img.shields.io/badge/NPM-%23CB3837.svg?style=for-the-badge&logo=npm&logoColor=white)
![Express.js](https://img.shields.io/badge/express.js-%23404d59.svg?style=for-the-badge&logo=express&logoColor=%2361DAFB)
![React](https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB)
![Vite](https://img.shields.io/badge/vite-%23646CFF.svg?style=for-the-badge&logo=vite&logoColor=white)
![Postgres](https://img.shields.io/badge/postgres-%23316192.svg?style=for-the-badge&logo=postgresql&logoColor=white)
![Visual Studio Code](https://img.shields.io/badge/Visual%20Studio%20Code-0078d7.svg?style=for-the-badge&logo=visual-studio-code&logoColor=white)
![Linux](https://img.shields.io/badge/Linux-FCC624?style=for-the-badge&logo=linux&logoColor=black)
![Docker](https://img.shields.io/badge/docker-%230db7ed.svg?style=for-the-badge&logo=docker&logoColor=white)
![Git](https://img.shields.io/badge/git-%23F05033.svg?style=for-the-badge&logo=git&logoColor=white)

## Architecture

The application is split between the frontend, backend, and database. The database is interacted by using Sequelise, which creates the exact queries and ensures the database reflects the expected data schema.

TypeScript as it allows easier development, lower errors (through type checking), and better support for modern object orientated paradigms.

### Backend/API

The app uses Express to provide an API. The app's logic is wrapped in a class `NotesBackendApp` to better adhere to OO use. As little expansion was planned, no virtual functions/interfaces or inheritance was used.

The backend provides an API for front end to to:
* Retrieve all notes via `GET /api/notes`
* Insert new note via `POST /api/notes`
* Update a note via `PUT /api/notes/id`
* Delete a note via `DELETE /api/notes/id`
(replace `id` with the note's corresponding id in the database)

In order to practice security, I made sure the server responds either 400, or 500 on error to avoid backwards engineering. Though, a debug mode would be useful for finding errors without the need for a debugger.

### Frontend

The frontend uses a state to keep track of all the notes via an internal `type Note`. It retrieves all the notes at initial load.

The note editing/addition field is also monitored by state. It is made empty upon editing or deletion of a note.

Onclick callbacks are used to add functionality.

The frontend is wrapped in a React component.

### Database

Postgres was chosen as it is industry standard, secure, performant, and I am familiar with SQL.

Interaction with the DB is done in code using Sequelise, which was chosen due to its maturity and support.

The backend checks if the database has been built before, and if not, creates the tables or amends them.

The database is not directly accessed by the frontend, but rather through an API. This was done to remove the possibility add erronoius data without adding a large amount of input validation database-side.

### Docker

Docker was used to create a replicable development environment and to avoid the need to download development servers onto my machine. It also allows me to think of real world configurations and learn about dotenv.

The app is split across three services which are defined in the `docker-compose.yml`. They are turned on in the order that all apps do not fail.

### Future Work

The app currently is responsive, but not very pretty. Error toasts, loading screen, and better indication of whether a note is being edited or added would improve the UX; and the UI/UX practice would fit recommendations.

The front-end also would benefit from an offline mode and a way to verify all files on server match, and to reload if there have been changes not made by the app.

The API could use more useful error and removal of redundancy, such as returning the contents of the new note after an update.

The React part of the app would benefit from an overall cleanup and better modularization.

## How To Run

*These steps assume you are using Windows.*

0. Ensure you have Docker Desktop & Git installed.
1. Clone the repo.
2. Open the repo folder.
3. Run `docker compose up`.

## How To Develop

This development environment uses Dev Containers.

0. Install VSCode and the [Remote Develpment extension pack](https://marketplace.visualstudio.com/items?itemName=ms-vscode-remote.vscode-remote-extensionpack).
1. Follow 'How To Run'
3. Make sure the container is running.
4. Navigate to the 'Remote Explorer' Tab
5. Attach 'notes-app-frontend' in a new window.
6. Attach 'notes-app-backend' in a new window.

The provided configurations should allow for attaching a debugger to the `notes-app-backend` when in the appropriate window.

To debug the frontend, use the inspector provided with your browser.

Due to a bug with Watch, Vite and Docker you will have to run `docker compose up` after every change to the frontend. Alternatively, in the root window, right click on `docker-compose.yml` and select `Compose Up` from the context menu.

Happy hacking!

## Troubleshooting

### Archive related error upon building container

If the following error appears while trying to build a container:

`failed to solve: archive/tar: unknown file mode ?rwxr-xr-x`

This appears to be related to an known issue with Docker <= 4.33.1 on Windows, ![more info here.](https://github.com/docker/for-win/issues/14083)

To resolve this, either run docker from Windows Subsystem for Linux (WSL), or zip up the affected folder, delete it, and extract the old contents in its place and try `docker compose up`.

### CORS issue on Firefox

Firefox will at first complain of a CORS issue if hosted in localhost. If this is the case, either visit an API page in a separate tab (http://localhost:6868/api/notes/), refresh your current tab, and this should solve it. *TODO: Investigate CORS headers further...*

### Watch issue with Vite

On my machine, Vite refuses to re-compile due to (seemingly) a bug between docker and watch. I have attempted to mitigate this to no avail. A workaround is mentioned in the 'How To Develop' section.