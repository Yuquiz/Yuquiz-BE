# Quizin 📑
A simple API implementing CRUD, authentication, and authorization for quiz application

## Stack 🧰
![JavaScript Badge](https://img.shields.io/badge/JavaScript-F7DF1E?logo=javascript&logoColor=000&style=for-the-badge)
![Node.js Badge](https://img.shields.io/badge/Node.js-393?logo=nodedotjs&logoColor=fff&style=for-the-badge)
![Express Badge](https://img.shields.io/badge/Express-000?logo=express&logoColor=fff&style=for-the-badge) 
![MySQL Badge](https://img.shields.io/badge/MySQL-4479A1?logo=mysql&logoColor=fff&style=for-the-badge)
![MariaDB Badge](https://img.shields.io/badge/MariaDB-003545?logo=mariadb&logoColor=fff&style=for-the-badge)
![JSON Web Tokens Badge](https://img.shields.io/badge/JSON%20Web%20Tokens-000?logo=jsonwebtokens&logoColor=fff&style=for-the-badge)


## Features 🌟
- See who's on top of every quiz you have
- See how well you're doing in the quiz you've done by seeing your stats, show them who's the boss!
- Make quiz that is either private or public, it's up to you!
- Make private rooms to access your private quizzes
- Manage who could access your private rooms
- Register and log in to your account!
  
## Schema 🗺
![Quizzin Schema](./misc/quizSchema.png)

## Endpoints 📍
List of endpoints of this API
### `/auth`
- `/login`: Log in to your registered account
  - POST
    <br> - Requires: ~
    <br> - Role: Any
- `/register`: Create an account to use
  - POST
    <br> - Requires: ~
    <br> - Role: Any

### `/app`
- `/profile` - See your own profile
  - GET
    <br> - Requires: Valid JWT Token
    <br> - Role: Any
- `/dashboard` - See your the statistics of the quizzes you've done
  - GET
    <br> - Requires: Valid JWT Token
    <br> - Role: Any
- `/leaderboard/:quizId`
  - GET
    <br> - Requires: ~
    <br> - Role: Any

### `/user`
- `/` - Get all data from `Users`
  - GET
    <br> - Requires: Valid JWT Token
    <br> - Role: Superadmin
- `/:userId` - Do something on `Users` with id `userId`
  - GET
    <br> - Requires: Valid JWT Token which has `id` data that matches `userId`
    <br> - Role: Any
  - POST
    <br> - Requires: Valid JWT Token which has `id` data that matches `userId`
    <br> - Role: Superadmin
  - PUT
    <br> - Requires: Valid JWT Token which has `id` data that matches `userId`
    <br> - Role: Any
  - DELETE
    <br> - Requires: Valid JWT Token which has `id` data that matches `userId`
    <br> - Role: Superadmin
### `/quiz`
- `/` - Get all data from `Quizzes`
  - GET
    <br> - Requires: Valid JWT Token
    <br> - Role: Admin, superadmin
- `/:quizId` - Do something on `Quizzes` with id `quizId`
  - GET
    <br> - Requires: - Valid JWT Token which has `id` data that matches `quizId`
    <br> - Role: Any
  - POST
    <br> - Requires: Valid JWT Token which has `id` data that matches `quizId`
    <br> - Role: Superadmin
  - PUT
    <br> - Requires: Valid JWT Token which has `id` data that matches `quizId`
    <br> - Role: Any
  - DELETE
    <br> - Requires: Valid JWT Token which has `id` data that matches `quizId`
    <br> - Role: Superadmin
### `/question`
- `/` - Get all data from `Questions`
  - GET
    <br> - Requires: Valid JWT Token
    <br> - Role: Admin, superadmin
- `/:questionId` - Do something on `Questions` with id `questionId`
  - GET
    <br> - Requires: Valid JWT Token
    <br> - Role: Any
  - POST
    <br> - Requires: Valid JWT Token
    <br> - Role: Superadmin
  - PUT
    <br> - Requires: Valid JWT Token
    <br> - Role: Any
  - DELETE
    <br> - Requires: Valid JWT Token
    <br> - Role: Superadmin
### `/answer`
- `/` - Get all data from `AnswerChoices`
  - GET
    <br> - Requires: Valid JWT Token
    <br> - Role: Admin, superadmin
- `/:answerId` - Do something on `AnswerChoices` with id `answerId`
  - GET
    <br> - Requires: Valid JWT Token
    <br> - Role: Any
  - POST
    <br> - Requires: Valid JWT Token
    <br> - Role: Superadmin
  - PUT
    <br> - Requires: Valid JWT Token
    <br> - Role: Any
  - DELETE
    <br> - Requires: Valid JWT Token
    <br> - Role: Superadmin
### `/attempts`
- `/` - Get all data from `Attempts`
  - GET
    <br> - Requires: Valid JWT Token
    <br> - Role: Admin, superadmin
- `/:attemptId` - Do something on `Attempts` with id `attemptId`
  - GET
    <br> - Requires: Valid JWT Token
    <br> - Role: Any
  - POST
    <br> - Requires: Valid JWT Token
    <br> - Role: Superadmin
  - PUT
    <br> - Requires: Valid JWT Token
    <br> - Role: Any
  - DELETE
    <br> - Requires: Valid JWT Token
    <br> - Role: Superadmin
### `/room`
- `/` - Get all data from `PrivateRooms`
  - GET
    <br> - Requires: Valid JWT Token
    <br> - Role: Admin, superadmin
- `/:roomId` - Do something on `PrivateRooms` with id `roomId`
  - GET
    <br> - Requires: Valid JWT Token
    <br> - Role: Any
  - POST
    <br> - Requires: Valid JWT Token
    <br> - Role: Superadmin
  - PUT
    <br> - Requires: Valid JWT Token
    <br> - Role: Any
  - DELETE
    <br> - Requires: Valid JWT Token
    <br> - Role: Superadmin
### `/roomPermission`
- `/` - Get all data from `RoomPermissions`
  - GET
    <br> - Requires: Valid JWT Token
    <br> - Role: Admin, superadmin
- `/:roomPermissionId` - Do something on `RoomPermissions` with id `roomPermissionId`
  - GET
    <br> - Requires: Valid JWT Token
    <br> - Role: Any
  - POST
    <br> - Requires: Valid JWT Token
    <br> - Role: Superadmin
  - PUT
    <br> - Requires: Valid JWT Token
    <br> - Role: Any
  - DELETE
    <br> - Requires: Valid JWT Token
    <br> - Role: Superadmin
### `/roomQuiz`
- `/` - Get all data from `RoomQuizzes`
  - GET
    <br> - Requires: Valid JWT Token
    <br> - Role: Admin, superadmin
- `/:roomQuizId` - Do something on `RoomQuizzes` with id `roomQuizId`
  - GET
    <br> - Requires: Valid JWT Token
    <br> - Role: Any
  - POST
    <br> - Requires: Valid JWT Token
    <br> - Role: Superadmin
  - PUT
    <br> - Requires: Valid JWT Token
    <br> - Role: Any
  - DELETE
    <br> - Requires: Valid JWT Token
    <br> - Role: Superadmin

