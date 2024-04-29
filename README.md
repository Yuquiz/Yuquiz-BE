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

## Endpoints
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

