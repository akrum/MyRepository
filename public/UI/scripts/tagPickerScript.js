/**
 * Created by akrum on 18.03.17.
 */

var tagService = (function () {
    var availableTags=[];
    var chosenTags=[];
    var chosenTagsHTMLContainer;
    var availableTagsHTMLContainer;
    function rgb(r, g, b){
        return "rgb("+r%256+","+g%256+","+b%256+")";
    }
    var allTags = [];
    function buildOneTag(tagName,attributes,innerText) {
        var result="<";
        result+=tagName;
        result+=" "+attributes;
        result+=">\n";
        if(innerText !== undefined)
        {
            result+=innerText;
            result+="</";
            result+=tagName;
            result+=">\n";
        }

        return result;
    }
    function buildAttribute(attributeName, innerString) {
        var result=(attributeName+'="');
        result+=innerString+('" ');
        return result;
    }
    function refillChosenHTML() {
        var tempResult = "";
        chosenTags.forEach(function (chosenTag) {
            tempResult+=buildOneTag("button",buildAttribute("class","tag-pick-field-chosen")+buildAttribute("style","border: 2px solid "+chosenTag.color),chosenTag.tag)
        });
        chosenTagsHTMLContainer.innerHTML=tempResult;
    }
    function refillAvailableHTML() {
        var tempResult = "";
        availableTags.forEach(function (availableTag) {
            tempResult+=buildOneTag("button",buildAttribute("class","tag-pick-field")+buildAttribute("style","border: 2px solid "+availableTag.color),availableTag.tag)
        });
        availableTagsHTMLContainer.innerHTML=tempResult;
    }
    function fillByDefault() {
        refillAvailableHTML();
        refillChosenHTML();
    }
    function init() {
        chosenTagsHTMLContainer= document.getElementById("chosenTagsID");
        availableTagsHTMLContainer = document.getElementById("availableTagsID");
        allTags = JSON.parse(localStorage.getItem("defaultTags"));
        allTags.forEach(function (oneTag) {
            availableTags.push(oneTag);
        });
        fillByDefault();
    }
    function moveTagFromAvailableToChosen(tagName) {
        var index=0;
        for(var i=0;i<availableTags.length;i++){
            if(availableTags[i].tag.trim().toLowerCase()===tagName.trim().toLowerCase())
            {
                chosenTags.push(availableTags[i]);
                index=i;
                break;
            }
        }
        availableTags.splice(index,1);
        fillByDefault();
        filterArticlesWithTags(chosenTags);
    }
    function moveTagFromChosenToAvailable(tagName) {
        var index=0;
        for(var i=0;i<chosenTags.length;i++){
            if(chosenTags[i].tag.trim().toLowerCase()===tagName.trim().toLowerCase())
            {
                availableTags.push(chosenTags[i]);
                index=i;
                break;
            }
        }
        chosenTags.splice(index,1);
        fillByDefault();
        filterArticlesWithTags(chosenTags);
    }
    function gotMouseOnAvailableClickFunction(evnt)
    {
        if(evnt.target.nodeName.toUpperCase()==="BUTTON")
        {
            console.log("will move tag from available to chosen");
            moveTagFromAvailableToChosen(evnt.target.textContent);
        }
        setSignsPositionToZero();
        evnt.preventDefault();
    }
    function gotMouseOnChosenClickFunction(evnt) {
        if(evnt.target.nodeName.toUpperCase()==="BUTTON")
        {
            console.log("Will move tag from chosen to available");
            moveTagFromChosenToAvailable(evnt.target.textContent);
        }
        setSignsPositionToZero();
        evnt.preventDefault();
    }
    function updateArticles() {
        filterArticlesWithTags(chosenTags);
    }
    return {
        init: init,
        gotMouseOnAvailableClickFunction: gotMouseOnAvailableClickFunction,
        gotMouseOnChosenClickFunction:gotMouseOnChosenClickFunction,
        updateArticles:updateArticles
    };
}());
document.addEventListener('DOMContentLoaded', startRoutine);
document.getElementById('availableTagsID').addEventListener('click',tagService.gotMouseOnAvailableClickFunction);
document.getElementById('chosenTagsID').addEventListener('click',tagService.gotMouseOnChosenClickFunction);
function startRoutine() {
    tagService.init();
}
