# Train Smart

<br>

# Quick Compo

<br>

## Description

Is a project designed to assist personal trainers in creating effective workout plans for their clients. With a user-friendly interface and customizable options, trainers can easily track progress and optimize results.

## User Stories

- **404:** As a user I get to see a 404 page with a feedback message if I try to reach a page that does not exist so that I know it's my fault.
- **Signup:** As an anonymous user I can sign up on the platform so that I can start creating and managing tournaments.
- **Login:** As a user I can login to the platform so that I can access my profile and start creating and managing tournaments.
- **Logout:** As a logged in user I can logout from the platform so no one else can use it.
- **Profile Page**: As a logged in user I can visit my profile page so that I can see my profile data.
- **Add Trains:** As a logged in user I can access the add tournament page so that I can create a new tournament.
- **Edit trains:** As a logged in user, with a role of personal trainer you can access the edit trains page.
- **Add Students:** As a user with a role of personal trainer can add students.
- **View Trains Table:** As a user I want to see the trains details and trains calendar.
- **View Sudents Table:** As a user with a role of personal trainer, can see the students list.

<br>

# Client / Frontend

## React Router Routes (React App)

| Path            | Component        | Permissions                | Behavior                                          |
| --------------- | ---------------- | -------------------------- | ------------------------------------------------- |
| `/login`        | LoginPage        | anon only `<AnonRoute>`    | Login form, navigates to home page after login.   |
| `/signup`       | SignupPage       | anon only `<AnonRoute>`    | Signup form, navigates to home page after signup. |
| `/`             | HomePage         | public `<Route>`           | Home page.                                        |
| `/user-profile` | ProfilePage      | user only `<PrivateRoute>` | User and player profile for the current user.     |
| `/user-profile` | ViewTrainsPage   | user only `<PrivateRoute>` | View trains page.                                 |
| `/train`        | ViewStudentsPage | user only `<PrivateRoute>` | View students table.                              |

## Components

Pages:

- LoginPage

- SignupPage

- HomePage

- ProfilePage

- ViewTrainsPage

- ViewStudentsPage

Components:

- TrainCard
- StudentsCard
- Navbar
- Loading
- IsPrivate
- IsAnon

## Services

- **Auth Service**

  - `authService` :
    - `.login(user)`
    - `.signup(user)`
    - `.logout()`
    - `.verify()`

<br>

# Server / Backend

## Models

**User model**

```javascript
{
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: {type: String, enum: ['personal', 'student'], required: true}
  students: [ { type: Schema.Types.ObjectId, ref:'User' } ]
}
```

**Exercises model**

```javascript
 {
   name: { type: String, required: true },
   img: { type: String },
   description: {type: String,
   require: true},
   reps: [ { type: Number, require: true } ],
   sets: {type : Number,
   require: true },

 }
```

**Train model**

```javascript
 {
   name: { type: String, required: true },
   time: {type: Number,
   require: true},
   interval: {type: String,
   require: true},
   exercises: [{ type: Schema.Types.ObjectId, ref:'Exercises' }]

 }


<br>

## API Endpoints (backend routes)

| HTTP Method | URL                    | Request Body                 | Success status | Error Status | Description                                                                                                                     |
| ----------- | ---------------------- | ---------------------------- | -------------- | ------------ | ------------------------------------------------------------------------------------------------------------------------------- |
| GET         | `/auth/profile    `    | Saved session                | 200            | 404          | Check if user is logged in and return profile page                                                                              |
| POST        | `/auth/signup`         | {name, email, password}      | 201            | 404          | Checks if fields not empty (422) and user not exists (409), then create user with encrypted password, and store user in session |
| POST        | `/auth/login`          | {username, password}         | 200            | 401          | Checks if fields not empty (422), if user exists (404), and if password matches (404), then stores user in session              |
| POST        | `/auth/logout`         |                              | 204            | 400          | Logs out the user                                                                                                               |
| GET         | `/profile`     |                              |                | 400          | Show profile of user                                                                                                           |
| PUT         | `/profile/:id:type` |                              |                |              | Update Profile                                                                                                        |
| GET        | `/train`     | { name, img, students }       | 201            | 400          | Create and save a new trains                                                                                               |
| GET         | `/train/:trainId`     | { name, img }                | 201            | 400          | edit player                                                                                                                     |
| PUT         | `/train/:trainId` | { name, img, studants }       | 200            | 400          | edit tournament                                                                                                                 |
| DELETE      | `/train/:trainId` |                              | 201            | 400          | delete trains                                                                                                              |
| GET         | `/students/:personalId`     |                              |                |              | show students                                                                                                            |
| POST        | `/students`         | { name, personalId, studentsId }  | 200            | 404          | add player                                                                                                                      |
| GET      | `/students/:studentsId`     |                              | 200            | 400          | See details of students


<br>

## API's

<br>

## Packages

<br>

## Links

### Trello/Kanban

[Link to your trello board](https://trello.com/b/PBqtkUFX/curasan) or a picture of your physical board

### Git

The url to your repository and to your deployed project

[Client repository Link](https://github.com/waggnerl/Project3_Frontend)

[Server repository Link](https://github.com/waggnerl/Project3_Backend)

[Deployed App Link](http://heroku.com)

### Slides

[Slides Link](http://slides.com) - The url to your _public_ presentation slides

### Contributors

José Lira - <waggnerl> - <[[linkedin-profile-link](https://www.linkedin.com/in/wagner-lira/)](https://github.com/waggnerl)>

FirstName LastName - <PeterLoyal> - <[[linkedin-profile-link](https://www.linkedin.com/in/pedroleal6/)](https://github.com/PeterLoyal)>
```
