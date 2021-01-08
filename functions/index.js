const functions = require('firebase-functions');
const {Storage} = require("@google-cloud/storage");

const storage = new Storage({
  keyFile: "kindafire-3769272770bd.json"
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