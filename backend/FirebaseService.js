const admin = require('firebase-admin');

const serviceAccount = require('serviceAccount-tiendalibrosunimayor-firebase-adminsdk-j7ny0-fb6166dba6.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: 'https://tiendalibrosunimayor.firebaseapp.com'
});

const auth = admin.auth();

module.exports = auth;