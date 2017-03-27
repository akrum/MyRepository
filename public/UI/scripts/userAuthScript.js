/**
 * Created by akrum on 20.03.17.
 */
function loginButtonPushed(evnt) {
    var form = document.forms.loginForm;
    if(form.loginField.value==="demo")
    {
        if(form.passwordField.value==="demo")
        {
            document.getElementById("loginButton").style.display="none";
            document.getElementById("registerButton").style.display="none";
            document.getElementById("logOutButton").style.display="inline-block";
            document.getElementById("authorPicture").setAttribute("src","loginPicture.png");
            userName=form.loginField.value;
            form.loginField.value="";
            form.passwordField.value="";
            hideLoginFiields();
            evnt.preventDefault();
        }
    }
    evnt.preventDefault();
}
function registerButtonPushed(evnt) {

}
function logOutButtonPushed(evnt) {
    document.getElementById("loginButton").style.display="inline-block";
    document.getElementById("registerButton").style.display="inline-block";
    document.getElementById("logOutButton").style.display="none";
    document.getElementById("authorPicture").setAttribute("src","mainInterfaceObjects/unknownUser.png");
    userName="default";
    evnt.preventDefault();
}
document.getElementById("loginSubmitButton").addEventListener("click", loginButtonPushed);
document.getElementById("registerSubmitButton").addEventListener("click",registerButtonPushed);
document.getElementById("logOutButton").addEventListener("click",logOutButtonPushed);