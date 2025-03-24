const functions = require('firebase-functions');
const admin = require("firebase-admin");
const {Storage} = require("@google-cloud/storage");

admin.initializeApp();

const storage = new Storage({
  keyFile: ""
})

const bucketName = "kindafire.appspot.com";

exports.handleDelete = functions.firestore.document("gallery/{userDoc}/images/{doc}").onDelete((snapshot, context) => {
  const data = snapshot.data();
  
  try {
    storage.bucket(bucketName).file(data.filename).delete();
    return {success: `file ${data.filename} successfully deleted`};
  } catch (err) {
    return {error: `failed to delete file ${data.filename}`};
  }
})

// exports.handleReset = functions.https.onCall(async (data, ctx) => {
//  const {email} = ctx.auth.token || null;

//  console.log(email);

//   const link = await admin.auth().generatePasswordResetLink(email, {
//       // URL you want to redirect back to. The domain (www.example.com) for this
//       // URL must be in the authorized domains list in the Firebase Console.
//       url: 'http://localhost:8080/complete',
//   });

//   console.log(link);

//   // sendEmail() is a helper defined elsewhere that puts the link into a custom
//   // email template, and sends it out using SendGrid.
//   return {url: link};
// })
