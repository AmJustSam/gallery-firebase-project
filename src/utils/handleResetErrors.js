const handleResetErrors = (err) => {
  switch (err.code){
    case "auth/invalid-email":
      return "Provided email address is not valid."
    case "auth/user-disabled":
      return "This account has been disbaled.";
    case "auth/operation-not-allowed":
      return "Sorry, not accepting any more signups using this method."
   default:
      return "If this email exist in our database then you'll receive reset link shortly in your inbox."
  }
} 

export default handleResetErrors;