# MERN Authenticate

### You can access the live version of this project [here](https://mern-authenticate.surge.sh/).  

This is a simple authentication app based on email/password. The email is verified using OTP. JWT is used as authentication mechanism.

The app uses React for the frontend.  
The app uses Express, MongoDB for the backend.  
The app uses LocalStorage of the browser to persist the JWT.  
The app uses Heroku.com for hosting the Express server.  
The app uses Surge.sh for hosting the React client.  
The app uses MLab.com for hosting the MongoDB database.  
The app uses Mailgun for sending emails.

---
To use this application locally, follow the next steps.  

```
echo "
REACT_APP_SERVER_URL=http://localhost:5000
" > react-client/.env  

echo "
MONGO_URI=mongodb://localhost:27017/mernauthenticate
PORT=5000
MAILGUN_DOMAIN_NAME=<MAILGUN_DOMAIN_NAME>
MAILGUN_API_KEY=<MAILGUN_API_KEY>
MAILGUN_FROM=\"MERN Authentication <mern@autentication.mailgun.org>\"
JWT_SECRET=jwtsecret
" > express-server/.env

cd express-server
yarn install
yarn dev

cd ../react-client
yarn install
yarn start
```
---
### You can access the live version of this project [here](https://mern-authenticate.surge.sh/).

#### Thanks!!
