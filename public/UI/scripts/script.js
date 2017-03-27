/**
 * Created by akrum on 28.02.17.
 */
//stormpass
const authorFilter=0b0010;
const dateFilter=0b0100;
const tagFilter=0b1000;
var userLoggedIn = false;
var userName = "default";
var articleService=(function () {
    var articles;
    var isInitiated = false;
    var nextIndex;
    var tags=[];
    function init()
    {
      articles = JSON.parse(localStorage.getItem("userArticles"),function (key, value) {
          if(key==="createdAt")return new Date(value);
          return value;
      });
      nextIndex=parseInt(JSON.parse(localStorage.getItem("defaultNextIndex")));
      tags = JSON.parse(localStorage.getItem("defaultTags"));
      console.log("Will be using next index:", nextIndex);

      isInitiated=true;
    }
    function saveChanges()
    {
        localStorage.setItem("userArticles",JSON.stringify(articles));
        localStorage.setItem("defaultNextIndex",JSON.stringify(nextIndex));
    }
    function rgb(r, g, b){
        return "rgb("+r%256+","+g%256+","+b%256+")";
    }

    function checkTagForExistanceIn(someTag, place) {
        // console.log("Searching:"+someTag+" in");
        // console.log(place);
        var didFind=false;
        place.forEach(function (someString) {
            if(someString.toLowerCase().trim()===someTag.trim().toLowerCase()){
                // console.log("found");
                didFind=true;
            }
        });
        return didFind;
    }
    function sortArticles(someArticles) {
        someArticles.sort(function (a, b) {
            if (a.createdAt - b.createdAt < 0) {
                return 1;
            } else {
                return - 1; }
        });
    }

    function validateArticle(article) {
        if (!article.id)
        {
            console.log("wrong article id");
            return false;
        }
        if (!article.title)
        {
            return false;
        }
        else
        {
            if ((article.title.length>=100)||article.title.length===0){
                console.log("wrong article title length");
                return false;
            }
        }

        if(!article.summary){
            return false;
        }
        else
        {
            if(article.summary.length>=300||article.summary.length<4){
                console.log("wrong article:"+article.id+" summary length: "+article.summary.length);
                return false;
            }
        }
        if (!article.createdAt)
        {
            console.log("wrong article id");
            return false;
        }
        if(!article.author) {
            console.log("wrong article author");
            return false;
        }
        else if (article.author.length===0){
            console.log("wrong article author length");
            return false;
        }
        if(!article.content){
            console.log("something with content");
            return false;
        }
        else if (article.content.length<2){
            console.log("wrong article content length");
            return false;
        }
        if(!article.tags){
            console.log("something wrong with tags");
            return false;
        }
        else {
            if(!tags.find(function (someTag) {
                    return checkTagForExistanceIn(someTag.tag,article.tags);
                }))
            {
                return false;
            }
        }
        return true;
    }
    function getArticle(idNumber) {
        return articles.filter(function (article) {
            return article.id===idNumber;
        })[0];
    }
    function getAllArticles() {
        sortArticles(articles);
        return articles;
    }
    function getArticles(skip=0, top=10,filterConfig, filterStringAuthor,filterStringDate, filterStringTags)
    {
        console.log("skip:"+skip+" top:"+top);
        var result=articles;
        if ((filterConfig&authorFilter)===authorFilter)
        {
            console.log("using author Filter");
            result=result.filter(function (article) {
                return article.author.toLowerCase()===filterStringAuthor.toLowerCase();
            })
        }
        if ((filterConfig&dateFilter)===dateFilter)
        {
            console.log("using date filter");
            result=result.filter(function (article) {
                return article.createdAt.getYear()=== new Date(filterStringDate).getYear();
            })
        }
        if ((filterConfig&tagFilter)===tagFilter)
        {
            console.log("using tag filter");
            if (tags.find(function (tag) {
                    return checkTagForExistanceIn(tag.tag, filterStringTags);
                }))
            {
                console.log("will filter with tag");
                console.log(result);
                result=result.filter(function (article) {
                    var didFind=false;
                    filterStringTags.forEach(function (someTag) {
                        console.log("checking "+someTag+" for existence");
                        if (checkTagForExistanceIn(someTag, article.tags)){
                            console.log("OK");
                            didFind=true;
                        }
                    });
                    console.log(didFind.toString());
                    return didFind;
                }) ;
            }
            else {
                console.log("check tag name");
                return undefined;
            }

        }
        sortArticles(result);
        return result.splice(skip,top);
    }

    function addArticle(article) {
        article.id=nextIndex.toString();
        if (validateArticle(article)) {
            articles.push(article);
            nextIndex++;
            saveChanges();
        }
        else return false;
    }
    function removeArticle(id) {
        var index=0;
        for(var i=0;i<articles.length;i++){
            if(articles[i].id===id)
            {
                index=i;
                break;
            }
        }
        articles.splice(index,1);
        nextIndex--;
        saveChanges();
    }
    function editArticle(articleID,someArticle) {
        var clone = Object.assign({}, getArticle(articleID));
        if (someArticle.id)clone.id=someArticle.id;
        if (someArticle.author) clone.author=someArticle.author;
        if (someArticle.summary)clone.summary=someArticle.summary;
        if (someArticle.createdAt)clone.createdAt=someArticle.createdAt;
        if(someArticle.title)clone.title=someArticle.title;
        if(someArticle.content)clone.content=someArticle.content;
        if (someArticle.tags)clone.tags=someArticle.tags;
        if (validateArticle(clone)) {
            for(var i=0;i<articles.length;i++){
                if(articles[i].id===articleID)
                {
                    articles[i]=clone;
                    saveChanges();
                    return true;
                }
            }
        }
        else return false;
    }
    function getTagArray() {
        return tags;
    }
    function compileDefaultArticle() {
        var tempResult=
            {
                id: nextIndex,
                title: "default title",
                summary: "default summary",
                createdAt: new Date(),
                author: userName,
                content: "default content",
                tags: ["TECH", "DEMO"]
            };
        return tempResult;
    }
    return{
        init:init,
        checkTagForExistenceIn: checkTagForExistanceIn,
        sortArticles: sortArticles,
        validateArticle: validateArticle,
        getArticle: getArticle,
        getArticles: getArticles,
        addArticle: addArticle,
        removeArticle: removeArticle,
        editArticle: editArticle,
        getAllArticles: getAllArticles,
        getTagArray: getTagArray,
        compileDefaultArticle:compileDefaultArticle
    };
}());


// articleService.addArticle({
//     title: "Oculus price drop proves competition is key to VR success",
//     summary: "Gaming in VR has a bit of a barrier to entry. Nestled between the phone-based headsets and the high-end experiences is the PlayStation VR, but that’s still $399 plus the PlayStation itself. For Oculus or HTC you’re looking at $800-plus and a high-end gaming rig that should set youbackatleastagrand.",
//     createdAt: new Date('2017-03-01T22:43') ,
//     author: "BRYAN CLARK",
//     content: "The company today announced a price drop on its Rift headset with Touch controllers. The bundle will now sell for $598, down from the $798 retail price it’s typically listed at. If you already have Rift, you can grab touch for just $99 — although you’ll have to splurge for the $58 sensor to map its movements.",
//     tags: ["TECH","CARS"]
// });
// articleService.getArticle("15");
// articleService.removeArticle("21");
// console.log(articleService.editArticle("2",{author:"Andrew Rumiantsev", undefined}));
// articleService.sortArticles(articleService.getAllArticles());
// console.log(articleService.getAllArticles());
// console.log(articleService.getArticles(undefined,undefined,authorFilter|dateFilter|tagFilter,"MIX","2017",["TECH","FACEBOOK"]));

var articleInsertTool = (function () {
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
document.addEventListener('DOMContentLoaded', initInsertToolAndStartRoutine);

function test1() {
    articleInsertTool.appendArticlesToContainer(articleService.getArticles(undefined,undefined,authorFilter,"MIX","",""));
}
function test2() {
    articleService.addArticle({
        title: "Oculus price drop proves competition is key to VR success",
        summary: "Gaming in VR has a bit of a barrier to entry. Nestled between the phone-based headsets and the high-end experiences is the PlayStation VR, but that’s still $399 plus the PlayStation itself. For Oculus or HTC you’re looking at $800-plus and a high-end gaming rig that should set youbackatleastagrand.",
        createdAt: new Date('2017-03-01T22:43') ,
        author: "MIX",
        content: "The company today announced a price drop on its Rift headset with Touch controllers. The bundle will now sell for $598, down from the $798 retail price it’s typically listed at. If you already have Rift, you can grab touch for just $99 — although you’ll have to splurge for the $58 sensor to map its movements.",
        tags: ["TECH","CARS"]
    });
    articleInsertTool.resetArticleContainer();
    articleInsertTool.appendArticlesToContainer(articleService.getArticles(undefined,undefined,authorFilter,"MIX","",""));
}
function test3() {
    articleService.removeArticle("21");
    articleInsertTool.resetArticleContainer();
    articleInsertTool.appendArticlesToContainer(articleService.getArticles(undefined,undefined,authorFilter,"MIX","",""));
}
function test4() {
    articleService.editArticle("13",{title:"Strange edited article"});
    articleInsertTool.resetArticleContainer();
    articleInsertTool.appendArticlesToContainer(articleService.getArticles(undefined,undefined,authorFilter,"MIX","",""));

}
function initInsertToolAndStartRoutine() {
    /* DOM Загрузился.
     Можно найти в нем нужные элементы и сохранить в переменные */
    articleService.init();
    articleService.getAllArticles().forEach(function (article) {
        console.log(articleService.validateArticle(article));
    });
    articleInsertTool.init();
    // test1();
    articleInsertTool.appendArticlesToContainer(articleService.getAllArticles());
}
function filterArticlesWithTags(someTags) {
    var compiledTags=[];
    someTags.forEach(function (oneTag) {
        compiledTags.push(oneTag.tag);
    });
    if(compiledTags.length===0)articleInsertTool.appendArticlesToContainer(articleService.getAllArticles());
    if(compiledTags.length!==0) articleInsertTool.appendArticlesToContainer(articleService.getArticles(undefined,20,tagFilter,"","",compiledTags));
}