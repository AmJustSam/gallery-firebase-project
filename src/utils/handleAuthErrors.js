const handleAuthErrors = (err, authType) => {
   switch (err.code){
     case "auth/email-already-in-use":
       return "Email is already taken.";
     case "auth/invalid-email":
       return "Provided email address is not valid."
     case "auth/weak-password":
       return "Password should be at least 6 characters long."
     case "auth/user-disabled":
       return "This account has been disbaled.";
     case "auth/operation-not-allowed":
       return "Sorry, not accepting any more signups using this method."
     case "auth/popup-closed-by-user":
       return `Popup closed before finalizing the ${authType} process.`
    default:
       return "Email or Password is not correct."
   }
} 

export default handleAuthErrors;