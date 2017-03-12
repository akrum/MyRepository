/**
 * Created by akrum on 28.02.17.
 */
const authorFilter=0b0010;
const dateFilter=0b0100;
const tagFilter=0b1000;
var articleService=(function () {
    var articles = [
        {
            id: '1',
            title: 'Минское «Динамо» обыграло ярославский «Локомотив»',
            summary: 'Минское «Динамо» обыграло ярославский «Локомотив» в четвертом матче первого раунда плей-офф КХЛ — 4:2',
            createdAt: new Date('2017-02-27T23:00:00'),
            author: 'Иванов Иван',
            content: 'Гости создали больше опасных моментов и в два раза перебросали минчан, но «зубры» на этот раз очень эффективно использовали свои моменты.',
            tags: ['politics']
        },
        {
            id: '2',
            title: 'Facebook now lets you add your flag to your profile photo',
            summary: 'You can now spruce up your profile photo with your country’s flag – no special event or cause necessary.',
            createdAt: new Date('2017-02-01T22:53:00'),
            author: 'NAPIER LOPEZ',
            content: 'The profile flags appear line up with Mark Zuckerberg’s new manifesto to turn Facebook into a platform for a unified global community, but as TechCrunch‘s Josh Constine points out, they also run the risk of making rifts between nationalities more apparent.',
            tags: ['apps']
        },
        {
            id: '3',
            title: 'This drum-like keyboard lets you type in virtual reality like a boss',
            summary: 'Typing could be quite the ordeal when both of your hands are full – and this is particularly true for virtual reality, where you constantly have to keep a tight grip of your joysticks to maintain control over the experience. But one resourceful designer has found.',
            createdAt: new Date('2017-02-23T18:15:00'),
            author: 'MIX',
            content: 'Independent VR developer Jonathan Ravasz has built a nifty keyboard functionality for virtual reality experiences that lets you type without having to let go of the controllers. The PunchKeyboard is fundamentally a visual input interface that lets you use the joysticks to type in VR.',
            tags: ['apps']
        },
        {
            id: '4',
            title: 'Google and Microsoft will soon prevent pirate websites from popping up in search',
            summary: 'Google and Microsoft’s Bing will no longer let you browse for pirated content and illegal streams as effortlessly as you used to.',
            createdAt: new Date('2017-02-23T18:15:00'),
            author: 'MIX',
            content: "In addition to steering UK netizens away from pirated content, the new code will also direct searches for films, music, digital books and sports coverage to certified content providers rather than other illegitimate distributors.Organisers say the new agreement builds upon previous anti-piracy measures – like court ordered site blocking – designed to reduce online copyright infringement.",
            tags: ['apps','WORLD']
        },
        {
            id: '5',
            title: "This creepy tool reveals how Facebook’s AI tracks and studies your activity" ,
            summary: "Have you ever wondered how Facebook collects all the data it has to feed you with the content it presumes you’ll like and keep you coming back for more? Well, now there’s an app that can answer these questions.",
            createdAt: new Date('2017-02-17T12:03:00'),
            author: "MIX",
            content: "Available for free, Data Selfie is an open-source Chrome extension that helps you discover how machine learning algorithms track and process your Facebook activity, and gain insights about your personality and habits.\nTo accomplish this, the nifty extension monitors your Facebook interactions for patterns and then crunches the collected data into insightful reports.\n Data Selfie essentially tracks your activity – what you look at, how long you look at it, what you like, what you click and what you type – and then applies natural language processing and machine learning algorithms from IBM Watson and the University of Cambridge to turn this data into insight.",
            tags: ['apps',' FACEBOOK']
        },
        {
            id: '6',
            title: "Tesla plans to build at least 3 new Gigafactories",
            summary: "Do you want the good news, or the bad news? Tesla’s day really depends on how you frame it.",
            createdAt: new Date('2017-02-23T01:14:00'),
            author: "BRYAN CLARK",
            content: "After a less-than-stellar Q4 saw Tesla miss earnings by a wide margin, we still have reason for optimism. The disappointing earnings report took a turn for the better when Tesla representatives announced they were looking to build as many as five Gigafactories over the next few years.\nThe first, Gigafactory 1 in Sparks, Nevada, is set to hit full capacity at some point next year. Once at full capacity, Musk’s 13 million square foot facility, would split production between Tesla Energy storage products, and battery packs for Tesla vehicles. The plant would triple the worldwide production of li-ion batteries once it hit its stride.",
            tags: ['TECH','TESLA', 'CARS']
        },
        {
            id: '7',
            title: "Google’s new tech turns VR headsets invisible",
            summary: "If you’ve ever watched someone wear and use a VR headset, you know how odd they look with a high-tech blindfold on. That’s not good for demonstrating the emerging technology, especially while it still has a lot to prove before it enters the mainstream.",
            createdAt: new Date('2017-02-22T10:52:00'),
            author: "ABHIMANYU GHOSHAL",
            content: "That’s why Google’s Research arm and Daydream Labs have partnered to figure out a way to let spectators see VR headset users’ full faces while they’re immersed in an experience – as if the headsets were practically invisible. The end goal is to allow for less awkward demonstrations of VR technology and experiences on video.\nTo achieve this, the team first constructs a 3D model of the user’s face, using a color and depth camera in a process that takes about a minute to complete.\nNext, they’re handed a modified HTC Vive headset that’s capable of tracking eye-gaze. For a fully immersive video demo, the user is shot in front of a green screen while they’re engaged in a VR experience, with their VR environment composited into the background.",
            tags: ['TECH','GOOGLE']
        },
        {
            id: '8',
            title: 'Google’s balloon-powered internet service is 100x closer to becoming a reality',
            summary: "Nearly four years ago, Google embarked on a mission to bring internet coverage to remote areas with specially designed balloons. It’s made steady progress in Project Loon’s numerous trials, but today, it’s announced a breakthrough that will make it significantly easier to deploy the service.",
            createdAt: new Date('2017-02-17'),
            author: "ABHIMANYU GHOSHAL",
            content: "Until now, the balloons were set to float around the globe in rings, moving up or down in the stratosphere to ride winds moving in the direction they need to travel; when one balloon drifted away from an area that required connectivity, another would arrive to replace it.",
            tags: ['TECH',' GOOGLE']
        },
        {
            id: '9',
            title: "Paris airport hopes facial recognition is the answer to long lines",
            summary: "If you’re traveling through Charles de Gaulle airport in Paris, be prepared for some invasive new biometric security measures.",
            createdAt: new Date('2017-02-13T23:00:00'),
            author: "RACHEL KASER",
            content: "Following terrorist attacks on the European capital, delays in airport security have doubled. Groupe ADP, who operates Paris’ airports, is testing the new software in Charles de Gaulle in an attempt to cut down on these times.\nThis software, from a company called Vision-Box, will check your passport image against your face. Only visitors from other European Union countries currently have this option. Bloomberg says, “The move comes as airports worldwide are rushing to tap digital technologies, including biometric recognition, to speed passengers through airports.”",
            tags: ['TECH']
        },
        {
            id: '10',
            title: "Apple once considered building futuristic cybercafes instead of Apple Stores",
            summary: "While few would disagree that throughout the years the Apple Store has gradually cemented its presence as an integral part of the overall ‘Apple experience,’ it turns out the Cupertino behemoth didn’t always envision its retail spaces as we know them nowadays.",
            createdAt: new Date('2017-02-14T19:16:00'),
            author: "MIX",
            content: "In an curious interview with Fastco Design, Landmark Entertainment Group founder Tony Christopher revealed Apple briefly considered going against traditional retail models with a series of futuristic cybercafe locations, infusing the common retail experience with the coziness of a boutique coffee shop.\nDeveloped in collaboration with Mega Bytes, the Apple Cafe was imagined as an innovative internet cafe with a “high tech” interior design that reflected the forward-looking mindset the Big A aspired to stand for.",
            tags: ['APPLE','TECH']
        },
        {
            id: "11",
            title: "Tesla implements advertising plan suggested by fifth-grader",
            summary: "Tesla doesn’t advertise. But, on the advice of a Michigan fifth-grader, that could soon change.",
            createdAt: new Date('2017-03-03T05:19') ,
            author: "BRYAN CLARK",
            content: "The endearing pre-teen, Bria, caught the attention of the Tesla CEO Elon Musk after her father re-posted her letter, a class assignment, to Twitter\nIn the letter, Bria thanks Musk for his contributions to a cleaner environment and details her desire to become a politician to remove the Tesla ban in Michigan — currently, you can’t buy a Tesla in Michigan due to some asinine restriction that keeps automakers from selling their own cars. She then poses a unique take on Tesla advertising by offering up your council:\nMusk, after reading the letter, green-lit the idea.",
            tags: ["CARS", "TECH"]
        },
        {
            id: "12",
            title: "Google leaks Internet Explorer bug that Microsoft has yet to fix",
            summary: "In case you happen to be one of the eight percent that still relies on Edge and Internet Explorer to surf the internet, it might be time to reconsider your preferences.",
            createdAt: new Date('2017-02-28T16:07') ,
            author: "MIX",
            content: "The flaw fundamentally allows ill-intended individuals to build websites that cause the browsers to spontaneously crash and – more worryingly –  to take control of your browser in certain cases, BBC reports.\n",
            tags: ["GOOGLE"," MICROSOFT", "TECH"]
        },
        {
            id: "13",
            title: "Yahoo confirms 32M accounts hacked as CEO forfeits annual bonus in apology",
            summary: "Yahoo continues its downhill slide as an investigation by the US Securities and Exchange Commission (SEC) confirmed more than 32 million accounts were breached in a cookie-forging attack dating back to 2015 and 2016.",
            createdAt: new Date('2017-03-02T13:30') ,
            author: "MIX",
            content: "The news follows two separate massive breaches affecting over 500 million and one billion users in 2014 and 2013 respectively. While details remain inconclusive, the investigation asserts the attack could have been linked to the 2014 hackings to some extent.",
            tags: ["TECH"]
        },
        {
            id: "14",
            title: "Oculus price drop proves competition is key to VR success",
            summary: "Gaming in VR has a bit of a barrier to entry. Nestled between the phone-based headsets and the high-end experiences is the PlayStation VR, but that’s still $399 plus the PlayStation itself. For Oculus or HTC you’re looking at $800-plus and a high-end gaming rig that should set youbackatleastagrand.",
            createdAt: new Date('2017-03-01T22:43') ,
            author: "BRYAN CLARK",
            content: "The company today announced a price drop on its Rift headset with Touch controllers. The bundle will now sell for $598, down from the $798 retail price it’s typically listed at. If you already have Rift, you can grab touch for just $99 — although you’ll have to splurge for the $58 sensor to map its movements.",
            tags: ["TECH"]
        },
        {
            id: "15",
            title: "It’s illegal to wakeboard Amsterdam’s canals – unless you’re Casey Neistat",
            summary: "Amsterdam is known for being particularly strict when it comes to how people use its waterways. It’s understandable – they’re more than 300 years old. So what does it take to get them to relax their rules to allow a jet ski and a wakeboard to cruise them for an entire morning?",
            createdAt: new Date('2016-05-27') ,
            author: "MATTHEW ELWORTHY",
            content: "The potential for the video to go viral thanks to Casey Neistat and TNW Conference, it would seem.\nAfter witnessing Casey’s awesome feat of snowboarding around NYC, we decided Amsterdam was the perfect place to recreate it on water. The city is home to 100km of canals after all, as well as 90 islands, and 1,500 bridges.\nCatch Casey on our TNW Conference livestream tomorrow at 15:00 CEST. Get involved in the conversation using the hashtag #TNWEurope.",
            tags: ["TNW"]
        },
        {
            id: "16",
            title: "SpaceX is flying two tourists around the moon in 2018",
            summary: "You no longer have to be an astronaut to travel into outer space. SpaceX has announced that it’s flying two private citizens to the moon sometime around the tail end of 2018.",
            createdAt: new Date('2017-02-28T08:55') ,
            author: "ABHIMANYU GHOSHAL",
            content: "The unnamed passengers will embark on their mission aboard a new version of SpaceX’s Dragon spacecraft. The original was designed to deliver cargo and people to orbiting destinations like the International Space Station; later this year, the revamped Crew Dragon, whose development was largely funded by NASA, will conduct its first unmanned demo mission to the ISS later this year. Here’s what the interior of the current model looks like:",
            tags: ["SpaceX"," Tech"]
        },
        {
            id: "17",
            title: "This browser simulation lets you wreck cars to train self-driving AI",
            summary: "Driving, driving, driving… DEATH! If ceding control of your car to AI scares you, this demo isn’t going to ease your fears.",
            createdAt: new Date('2017-02-27T22:47') ,
            author: "BRYAN CLARK",
            content: "Created by 17-year-old designer and engineer Jan Hünermann, the application acts as an on-going project journal. His goal is to “create a fully self-learning agent” capable of piloting a car in a 2D environment. It’s obviously a work in progress.",
            tags: ["TECH"]
        },
        {
            id: "18",
            title: "Marathon runner cuts corners to win race, tracker data exposes her cheat big time",
            summary: "In what could have been a softcore episode of the CSI franchise, a marathon runner was caught in an epically failed attempt to cover up her wrongdoings after cheating in a race last weekend. Her mistake? Wearing a fitness tracker.",
            createdAt: new Date('2017-02-23T16:31') ,
            author: "MIX",
            content: "Following her runner-up finish in the Fort Lauderdale A1A Half Marathon, New York food critic Jane Seo was busted for cutting corners during the race and then shamelessly doctoring tracking data to back up her phony finish time. The cheater has since admitted the violation in a now-deleted Instagram post.",
            tags: ["TECH"]
        },
        {
            id: "19",
            title: "This Skittles sorting machine solves the ultimate first world problem",
            summary: "Tropical Skittles are my jam. Well, except the yellow ones; fuck you Banana Berry.",
            createdAt: new Date('2017-02-21') ,
            author: "BRYAN CLARK",
            content: "Willem Pennings, a Dutch inventor, feels my pain. After seeing a color-sorting machine years back, Pennings decided to create his own and use it for the ultimate good: to sort shitty Skittles flavors so we don’t have to eat them.\nPro tip: it also works for M&M’s. But Mars has already confirmed that color doesn’t impact taste (it’s literally just food coloring) so maybe you should get over yourself.",
            tags: ["TECH"]
        },
        {
            id: "20",
            title: "BeeHex robot can 3D-print (and cook) a pizza in just 6 minutes",
            summary: "Forget about autonomous cars for a second and imagine a world where delicious pizza goes from concept to noms in all of six minutes. It’s as American an idea as the bald eagle: food at your fingertips with minimal effort. And it’s now real.",
            createdAt: new Date('2017-03-03T22:50') ,
            author: "BRYAN CLARK",
            content: "It all starts with a smartphone app. After selecting the pizza’s size, dough, sauce, and cheese the bot goes to work. In all of 60 seconds the machine creates the pizza before notifying you its time to put it in the oven. Five minutes later you get delicious pizza.\nAnd if you’re feeling artistic, the pizza bot offers customization options. Simply upload a jpg, and the machine will do its best to mimic the shape and curves contained within the image — like this USA-shaped pie that screams freedom.",
            tags: ["TECH"]
        }

    ];
    function rgb(r, g, b){
        return "rgb("+r%256+","+g%256+","+b%256+")";
    }
    var tags=[
        {
            tag:"TECH",
            color: rgb(255,0,0)
        },
        {
            tag:"SpaceX",
            color: rgb(0,255,0)
        },
        {
            tag:"TNW",
            color: rgb(0,255,0)
        },
        {
            tag:"GOOGLE",
            color: rgb(0,0,255)
        },
        {
            tag:"MICROSOFT",
            color: rgb(40,10,20)
        },
        {
            tag:"FACEBOOK",
            color: rgb(230,254,0)
        },
        {
            tag:"CARS",
            color: rgb(255,0,0)
        },
        {
            tag:"APPLE",
            color: rgb(20,20,20)
        },
        {
            tag:"TESLA",
            color: rgb(210,0,210)
        },
        {
            tag:"apps",
            color: rgb(80,255,70)
        },
        {
            tag:"WORLD",
            color: rgb(0,210,210)
        },
        {
            tag:"POLITICS",
            color: rgb(0,0,0)
        },
    ];
    function checkTagForExistanceIn(someTag, place) {
        // console.log("Searching:"+someTag+" in");
        // console.log(place);
        var didFind=false;
        place.forEach(function (someString) {
            if(someString.toLowerCase().trim()==someTag.trim().toLowerCase()){
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
        if (!article.title)return false;
        else
        {
            if ((article.title.length>=100)||article.title.length==0){
                console.log("wrong article title length");
                return false;
            }
        }

        if(!article.summary)return false;
        else
        {
            if(article.summary.length>=300||article.summary.length==0){
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
        else if (article.author.length==0){
            console.log("wrong article author length");
            return false;
        }
        if(!article.content){
            console.log("something with content");
            return false;
        }
        else if (article.content.length==0){
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
    var nextIndex=21;
    function getArticle(idNumber) {
        return articles.filter(function (article) {
            return article.id===idNumber;
        })[0];
    }
    function getAllArticles() {
        return articles;
    }
    function getArticles(skip=0, top=10,filterConfig, filterStringAuthor,filterStringDate, filterStringTags)
    {
        console.log("skip:"+skip+" top:"+top);
        var result=articles;
        if ((filterConfig&authorFilter)==authorFilter)
        {
            console.log("using author Filter");
            result=result.filter(function (article) {
                return article.author.toLowerCase()===filterStringAuthor.toLowerCase();
            })
        }
        if ((filterConfig&dateFilter)==dateFilter)
        {
            console.log("using date filter");
            result=result.filter(function (article) {
                return article.createdAt.getYear()== new Date(filterStringDate).getYear();
            })
        }
        if ((filterConfig&tagFilter)==tagFilter)
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
        }
        else return false;
    }
    function removeArticle(id) {
        var index=0;
        for(var i=0;i<articles.length;i++){
            if(articles[i].id==id)
            {
                index=i;
                break;
            }
        }
        articles.splice(index,1);
        nextIndex--;
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
                if(articles[i].id==articleID)
                {
                    articles[i]=clone;
                    return true;
                }
            }
        }
        else return false;
    }
    function getTagArray() {
        return tags;
    }
    return{
        checkTagForExistenceIn: checkTagForExistanceIn,
        sortArticles: sortArticles,
        validateArticle: validateArticle,
        getArticle: getArticle,
        getArticles: getArticles,
        addArticle: addArticle,
        removeArticle: removeArticle,
        editArticle: editArticle,
        getAllArticles: getAllArticles,
        getTagArray: getTagArray
    };
}());

articleService.getAllArticles().forEach(function (article) {
    console.log(articleService.validateArticle(article));
});
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
        if(innerText!=undefined)
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
        result+=buildOneTag("img",buildAttribute("src","Sign-better.png")+buildAttribute("class","my-signs"),undefined);
        result+=buildOneTag("img",buildAttribute("src","loginPicture.png")+buildAttribute("class","sign-auth-pic"),undefined);
        var percentage=40;
        article.tags.forEach(function (thisArtTag) {
            articleService.getTagArray().forEach(
                function (availableTag) {
                    if(availableTag.tag.toLowerCase().trim()==thisArtTag.trim().toLowerCase())
                    {
                        result+=buildOneTag("button",buildAttribute("style","background-color:"+availableTag.color+";\nleft:"+percentage.toString()+"%")+buildAttribute("class","small-dot-tag"),"");
                        percentage+=3;
                    }
                }
            )
        });
        result+=buildOneTag("p",buildAttribute("class","sign-text"),article.title);
        result+=buildOneTag("p",buildAttribute("class","like-container"),buildOneTag("i",buildAttribute("class","fa fa-heart"),"")+"1000");
        result+=buildOneTag("b",buildAttribute("class","sign-auth-name"),"by "+article.author);
        result=buildOneTag("div",buildAttribute("class","sign-container")+buildAttribute("data-id",article.id),result);
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
    articleInsertTool.init();

    // articleInsertTool.appendArticlesToContainer(articleService.getAllArticles());
    /* Нарисуем статьи из массива GLOBAL_ARTICLES в DOM */
    // renderArticles();
}