<h2 align="center">A mobile-first Issue management CRUD app with authentication, authorization, and more!</h2>

<h3 align="center">
<a href="https://japraj.github.io/bugtracker/#/demoStart">View the app live!</a>
  <img alt="Lines of Code" src="https://img.shields.io/tokei/lines/github/japraj/bugtracker">

  <img src="https://img.shields.io/badge/license-MIT-green" alt="License">
</h3>

<img alt="gif walking through the app" src="https://github.com/japraj/bugtracker/blob/master/demo.gif?raw=true">

_I apologize for the poor quality of the gif_

<hr>

# Technology Stack

**Clientside:**

- Written entirely in Typescript

- Built with React, using Redux for state management; consists primarily of modular functional components with hooks

- Uses Styled Components for dynamic styling and makes heavy use of Material-UI, an open-source React component library, for form elements, pagination, and modals

- Relies on React-Router to handle clientside routing

- Auto-formatted with Prettier

**Serverside:**

- Written in C#

- ASP.NET Core Web API is secure and conforms to REST standards

- Utilizes Entity Framework/AutoMapper and Postgresql for data management

- Uses cookie-based sessions for authorization and .Net Core Identity for authentication

![Image of site homepage](https://i.imgur.com/1gdtA5m.png)

# Features and Permissions Hierarchy

_Unauthenticated Users can..._

- Register and log in to an account

- Sort and search through tickets

- View other users' tickets and activities (profiles)

- View the latest activity on the site through an activity feed

- Access a demo mode that lets them tour the site as an Administrator

_Authenticated Users can..._

- Create new tickets and update/delete tickets they have created

- Post comments for discussion

- Receive notifications on their issues

- Update their profile

- Access a dashboard that summarizes long-term site-wide activity

_Developers can..._

- Be assigned to issues

- Update specific fields of other users' tickets (ex. mark a ticket as resolved)

- Access more tabs to sort tickets

_Managers can..._

- Assign other users to issues

- Promote users to the developer rank

_Administrators can..._

- Update users' ranks and avatars

- Blacklist users

# Project Structure

![Project Directory Example](https://i.imgur.com/jsZcZK6.png) ![App on mobile](https://i.imgur.com/Ug6141V.png)

_One of the largest directories of this project and a pic of the app on mobile; it is fully responsive_

Clientside: the project is split up into 5 main directories. Always look at the index.ts file of a directory first!

- api: an abstraction between the API and server, allows us to switch to a virtual local database in the background in demo mode
- components: the app makes heavy use of component composition. Each component has a styles and index file (styles bundled into index when only a few lines), and optionally, sub-components. There are three subdirectories
  - container: these components wrap pages and other components
  - global: reusable components for building routes. Avatar and iterable widget are two examples of components that are used _everywhere_
  - input: reusable form elements
- routes: the main pages of the app and routing is handled in the Routes.tsx file
- constants: interfaces, enums, static functions, etc. - all constants are placed here so that our imports are clean and simple (it gets messy when you have constants in the components folders)
- flux: all the state management logic is present here (the app uses Redux); each big feature of the app gets a slice file, which encapsulates all interactions in a single module

Two less important clientside directories:

- app: integrates the router, context provider, and main components
- seed: data generation logic for demo mode (generates a legit-seeming graph whose nodes are Tickets, Users, and Activity!)

Serverside: follows the .NET Web API scaffold

- Controllers: route controllers, this is where all the endpoints are defined; each route gets its own file (example: /users/ is in UsersController.cs)

- Models: here, the objects that Entity Framework maps to database tables, and Data Transfer Objects (DTOs), or API responses, are defined

- Data: interactions with the database context, object mappings (with AutoMapper), and internal datatypes are defined here

- Migrations: Entity Framework migrations

# Build Instructions

Requirements: must have npm to run the client, and the .NET Core SDK and Postgresql to host a local server. Note: the demo mode simulates a database locally using an abstraction between the API and server. Therefore, you can run the app locally with just npm (steps 1-3)!

1. Clone the repo

2. `cd bugtracker/client` and run `npm ci` (this will take a while)

3. Run `npm start` to launch the React app on localhost:3000. There will be several error messages like "Could not proxy request ..." because our server is not yet up. You can go to `http://localhost:3000/bugtracker/#/demo` to play around with the demo if you do not wish to go through the configuration steps to host a local server

4. Open a second terminal, run `cd bugtracker/server` and then `dotnet restore` (this will take a min) to install dependencies

5. Run `dotnet ef` - if this produces an error message, run `dotnet tool install dotnet-ef`

6. Run `psql -U postgres` and input your password. Next, run `CREATE DATABASE BugTracker;`, name case sensitive. If you get an error, see https://www.postgresql.org/docs/13/tutorial-createdb.html; if you wish to use a different name, you must update the `Database` field of the connection string in `appsettings.json` in step 9.

7. Run `CREATE USER bugtracker WITH PASSWORD 'put a password here';` (insert your own password) and then `GRANT ALL PRIVILEGES ON DATABASE "BugTracker" to bugtracker;` followed by `\q`

8. In the server directory, rename `appsettings copy.json` to `appsettings.json', then open the file.

9. Under the key `Postgre` in `ConnectionStrings`, fill in the fields User ID and Password with 'bugtracker' as uId and the password you used. Note: `appsettings.json` is in included in the gitignore to make sure you do not put sensitive info on the web. If you change the gitignore, be aware of this

10. Delete all files in the `server/migrations` directory

11. Back in the terminal, run `dotnet ef migrations add InitialMigration` and then `dotnet ef database update`. Note: if you are playing with the code and make any changes to the DTOs in the server directory, be sure to run `dotnet ef database update`.

12. Run `dotnet build` (you will get a lot of spam, don't worry about it) and then `dotnet run` to launch the server on localhost:6000!

13. Refresh your browser and play with the app! To start, try registering an account and creating a ticket. If you want administrator permissions on an account, set the rank of your user in the AspNetUsers table to 4. I advise that you use pgAdmin 4, a GUI for Postgresql, to make it simpler. If you want to play with a seeded database, go to
    `http://localhost:3000/bugtracker/#/demo`

# What could be improved?

- If I could do the project again from scratch, I would add testing. In my first semester year of university, I have learned how useful tests can be

- Accessibility: there are no aria labels

# Interesting extensions of the app

- a tab to the tickets menu that allows for private discussion between users with rank Developer and higher

- convert the app to be a PWA

- try to add a chat functionality using web-sockets

# Credits

Made by Japraj Sandhu. I would like to note that I used Akveo's Blur Admin dashboard as a basis for the front-end of the app. I wrote all of the tsx/React and css/styled components myself except for the loading animations. In some cases, I simply used dev tools to see what properties they had set for an element and copied what I liked (examples: widgets, loading animations, and background image). In other cases, I made my own version of a component using their site as a reference (examples: navigation, buttons, notifications). I also made heavy use of Material-UI, a React component library, for icons, form elements, modals, and pagination. This project was inspired by https://github.com/oldboyxx/jira_clone.
