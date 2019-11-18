# MERN Authenticate

### You can access the live version of this project [here](https://mern-authenticate.surge.sh/).

This is a simple authentication based on email/password. The email is verified using OTP. JWT is used as authentication mechanism.

The app uses React for the frontend.
The app uses Express, MongoDB for the backend.
The app uses LocalStorage of the browser to persist the JWT.

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
MAILGUN_FROM="MERN Authentication <mern@autentication.mailgun.org>"
JWT_SECRET=jwtsecret
" > express-server/.env
```
---
### You can access the live version of this project [here](https://mern-authenticate.surge.sh/).

#### Thanks!!
