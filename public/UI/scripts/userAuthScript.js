/**
 * Created by akrum on 20.03.17.
 */
var oReq = new XMLHttpRequest();
function cleanOreq()
{
    oReq.removeEventListener('load', gotResponseForLoginRequest);
}
function gotResponseForLoginRequest()
{
    var form = document.forms.loginForm;
    var response = JSON.parse(this.responseText);
    if(response.checkSucceded)
    {
        document.getElementById("loginButton").style.display="none";
        document.getElementById("registerButton").style.display="none";
        document.getElementById("logOutButton").style.display="inline-block";
        document.getElementById("authorPicture").setAttribute("src",response.picture);
        userName=form.loginField.value;
        form.loginField.value="";
        form.passwordField.value="";
        hideLoginFiields();
    }
    else
    {
        var errorString="Check user name or password";
        if(response.errordescription)errorString+="server details:"+errordescription;
        alert(errorString);
    }
    console.log(response);
    cleanOreq();
}
function loginButtonPushed(evnt) {
    var form = document.forms.loginForm;
    oReq.open('POST', "/accountLogin");
    oReq.setRequestHeader('content-type', 'application/json');
    const body = JSON.stringify({
        nickname: form.loginField.value,
        password: form.passwordField.value
    });
    oReq.send(body);
    oReq.addEventListener('load', gotResponseForLoginRequest);
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