function showPwd(x) {
  if (x.type === "password") {
    x.type = "text";
  } else {
    x.type = "password";
  }
}


function showCurrentPwd() {
  const currentPwdElement = document.getElementById("currentUserPwd");
  showPwd(currentPwdElement);
}

function showNewPwd() {
  const newPwdElement = document.getElementById("newUserPwd");
  showPwd(newPwdElement);
}

function showConfirmNewPwd() {
  const confirmNewPwdElement = document.getElementById("confirmUserPwd");
  showPwd(confirmNewPwdElement);
}

function showUserPwd() {
  const userPwdElement = document.getElementById("userPwd");
  showPwd(userPwdElement);
}
