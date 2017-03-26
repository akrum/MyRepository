/**
 * Created by akrum on 25.03.17.
 */
var chosenSignId;
function doneButtonPushed(evnt) {
    document.getElementById("detailedThing").style.display="none";
    startScrolling();
    unblurSiteElements();
    evnt.preventDefault();
}
function removeButtonPushed(evnt) {
    articleService.removeArticle(chosenSignId);
    tagService.updateArticles();
    document.getElementById("detailedThing").style.display="none";
    startScrolling();
    unblurSiteElements();
    evnt.preventDefault();
}
function showDetailedThing(article)
{
    document.getElementById("detailed-title-label").innerText=article.title;
    document.getElementById("detailed-auth-name").innerText="by "+article.author;
    document.getElementById("detailed-content").innerText=article.content;
    document.getElementById("detailedThing").style.display="inline";
}
function gotClickOnASign(evnt) {
    if(evnt.target.classList.contains("my-signs")||evnt.target.classList.contains("sign-text"))
    {
        if(evnt.target.getAttribute("data-id"))
        {
            stopScrolling();
            var chosenArticle = articleService.getArticle(evnt.target.getAttribute("data-id"));
            chosenSignId = chosenArticle.id;
            blurSiteElements();
            showDetailedThing(chosenArticle);
            document.forms.detailedForm.doneButton.addEventListener("click",doneButtonPushed);
            document.forms.detailedForm.removeButton.addEventListener("click",removeButtonPushed);
            // alert("was chosen"+JSON.stringify(chosenArticle));

        }
    }
}
function initSignWrapper() {
    document.getElementById("articleContainer").addEventListener("click",gotClickOnASign);
}
document.addEventListener('DOMContentLoaded', initSignWrapper);
