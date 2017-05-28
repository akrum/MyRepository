/**
 * Created by akrum on 25.03.17.
 */
var oReq1 = new XMLHttpRequest();
function cleanOreq1() {
    oReq1.removeEventListener('load', gotUserCheckResponse);
}
function gotUserCheckResponse() {
    cleanOreq1();
    var response = JSON.parse(this.responseText);
    if (!response.logged) {
        alert("Seems that user '" + response.forUser + "' is not logged in. The changes can be not applied. Log out and log in again");
    }
}
function gotAddArticleResponse() {
    cleanOreq1();
}
function startComposeThing(evnt) {
    oReq1.open('GET', "/isLoggedIn?nickname=" + userName + "&sessionToken=" + sessionToken);
    oReq1.send();
    oReq1.addEventListener('load', gotUserCheckResponse);

    console.log("Opening edit menu");
    document.getElementById("editMenu").style.display = "inline";
    blurSiteElements();
    evnt.preventDefault();
    stopScrolling();
}
function endComposeThing(evnt) {
    document.getElementById("editableDiv").innerText = "";
    document.forms.editMenu.articleTitle.value = "";
    document.getElementById("editMenu").style.display = "none";
    unblurSiteElements();
    startScrolling();
    if (evnt) evnt.preventDefault();
}
function gotCopyPaste(evnt) {
    var clipboardData, pastedData;

    // Stop data actually being pasted into div
    evnt.stopPropagation();
    evnt.preventDefault();

    // Get pasted data via clipboard API
    clipboardData = evnt.clipboardData || window.clipboardData;
    pastedData = clipboardData.getData('Text');
    // Do whatever with pasteddata
    this.innerHTML += pastedData;
}
function saveChangesButtonClicked(evnt) {
    evnt.preventDefault();
    var tempArticle = articleService.compileDefaultArticle();
    tempArticle.title = document.forms.editMenu.articleTitle.value;
    tempArticle.summary = document.getElementById("editableDiv").innerText.slice(0, 50) + "...";
    tempArticle.createdAt = new Date();
    tempArticle.author = userName;
    tempArticle.content = document.getElementById("editableDiv").innerText;
    tempArticle.tags = ["TECH", "DEMO"];
    tempArticle.articleAuthorPicture=thisUserPicture;
    if (articleService.validateArticle(tempArticle)) {
        articleService.addArticle(tempArticle);
        tagService.updateArticles();
        console.log("Successfully added article:");
        console.log(JSON.stringify(tempArticle));
        endComposeThing();
    }
    else {
        alert("check article contents please");
        console.log("article: ");
        console.log(JSON.stringify(tempArticle));
    }
}
document.getElementById("composeButton").addEventListener("click", startComposeThing);
document.forms.editMenu.editMenuCancelButton.addEventListener("click", endComposeThing);
document.getElementById("editableDiv").addEventListener("paste", gotCopyPaste);
document.forms.editMenu.editMenuDoneButton.addEventListener("click", saveChangesButtonClicked);