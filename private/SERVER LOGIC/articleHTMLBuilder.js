
var htmlBuilder = (function () {
    var articleContainer;
    function init() {
        articleContainer = document.getElementById("articleContainer");
    }
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
    function makeHtmlForArticle(article)
    {
        var result="";
        result+=buildOneTag("img",buildAttribute("src","mainInterfaceObjects/Sign-better.png")+buildAttribute("class","my-signs")+buildAttribute("data-id",article.id),undefined);
        result+=buildOneTag("img",buildAttribute("src","loginPicture.png")+buildAttribute("class","sign-auth-pic"),undefined);
        var percentage=40;
        article.tags.forEach(function (thisArtTag) {
            articleService.getTagArray().forEach(
                function (availableTag) {
                    if(availableTag.tag.toLowerCase().trim()===thisArtTag.trim().toLowerCase())
                    {
                        result+=buildOneTag("button",buildAttribute("style","background-color:"+availableTag.color+";\nleft:"+percentage.toString()+"%")+buildAttribute("class","small-dot-tag")+buildAttribute("title",availableTag.tag),"");
                        percentage+=3;
                    }
                }
            )
        });
        result+=buildOneTag("p",buildAttribute("class","sign-text")+buildAttribute("data-id",article.id),article.title);
        result+=buildOneTag("p",buildAttribute("class","like-container"),buildOneTag("i",buildAttribute("class","fa fa-heart"),"")+"1000");
        result+=buildOneTag("b",buildAttribute("class","sign-auth-name"),"by "+article.author);
        result=buildOneTag("div",buildAttribute("class","sign-container"),result);
        return result;
    }
    function makeHtmlForAllArticles(articles) {
        var newResult="";
        articles.forEach(function (article) {
            newResult+=makeHtmlForArticle(article);
        });
        return newResult;
    }
    function appendArticlesToContainer(articles) {
        // console.log(makeHtmlForAllArticles(articles));
        articleContainer.innerHTML=makeHtmlForAllArticles(articles);
    }
    function resetArticleContainer() {
        articleContainer.innerHTML="";
    }
    return{
        init: init,
        makeHtmlForArticle:makeHtmlForArticle,
        appendArticlesToContainer:appendArticlesToContainer,
        resetArticleContainer: resetArticleContainer
    };
}());