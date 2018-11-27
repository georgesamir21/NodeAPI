# Users End Points.

**To start this project you need to have**
* Nodejs, npm and MongoDB installed
* To have the project files setup and installed run `npm install`
* To start the project run `npm start`
***You will be having the node server listening on PORT 8080***

## Project Description
The project has three end points 
* Registeratin
* Login
* Get User Status

#### Registeratin
path: `/users/add`
method: POST, request body:
```
{
  "first_name": "string",
  "last_name": "string",
  "country_code": "string",
  "phone_number": "string",
  "gender": "string",
  "birthdate": "Date",
  "avatar": "string",
  "email": "string"
  "password": "string"
}
```
response code: `201` and body is the created user.

#### Login
path: `/users/login`
method: POST, request body:
```
{
  "phone_number": "string",
  "password": "string"
}
```
success response: status: `200`, body:
```
{
   "succes": true,
   "message": "Authentication Success!",
   "token": token
}
```
#### Get user status
path: `/home`
method: POST, request body:
```
{
  "token": "token"
}
```
response: status: `200`, body:
```
{
  message: "HOME PAGE",
  data: user
}
```
