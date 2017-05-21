/**
 * Created by akrum on 28.02.17.
 */
//stormpath
const authorFilter = 0b0010;
const dateFilter = 0b0100;
const tagFilter = 0b1000;
var userLoggedIn = false;
var userName = "default";
var articleService = (function () {
    var articles;
    var MongoClient = require('mongodb').MongoClient;
    var isInitiated = false;
    var nextIndex;
    var tags = [];
    var db;
    var dbUri = "mongodb://flightServer:nRNXsgEqrkvgfxWj@cluster0-shard-00-00-gdy3y.mongodb.net:27017,cluster0-shard-00-01-gdy3y.mongodb.net:27017,cluster0-shard-00-02-gdy3y.mongodb.net:27017/FlightMainDB?ssl=true&replicaSet=Cluster0-shard-0&authSource=admin";
    var assert = require('assert');
    function init(databasePath) {
        var uri = "mongodb://flightServer:nRNXsgEqrkvgfxWj@cluster0-shard-00-00-gdy3y.mongodb.net:27017,cluster0-shard-00-01-gdy3y.mongodb.net:27017,cluster0-shard-00-02-gdy3y.mongodb.net:27017/FlightMainDB?ssl=true&replicaSet=Cluster0-shard-0&authSource=admin";
        var assert = require('assert');
        MongoClient.connect(dbUri, function (err, dbConnected) {
            assert.equal(null, err);
            console.log("Connected correctly to atlas server.");
            dbConnected.collection("nextIndexString").find().toArray(
                function (error, items) {
                    assert.equal(null, err);
                    //    console.log("got next index: ");
                    //    console.log(items[0]);
                    nextIndex = items[0].nextIndexLine;
                    console.log("next index "+nextIndex+" is loaded successfully from atlas");
                }
            );
            dbConnected.collection("mainBunchOfArticles").find().toArray(
                function (error, items) {
                    assert.equal(null, err);
                    //    console.log("got articles: ");
                    //    console.log(items);
                    articles = items;
                    console.log("articles are loaded successfully from atlas");
                }
            );
            dbConnected.close();
        });

        db = require('diskdb');
        db.connect(databasePath, ['mainBunchOfArticles', 'nextIndexString', 'tagDatabase']);
        // articles = db.mainBunchOfArticles.find();
        // nextIndex = parseInt(db.nextIndexString.find()[0].nextIndexLine);
        //   console.log("next index:",nextIndex);
        tags = db.tagDatabase.find();
        isInitiated = true;
    }
    /////!!!!!!!!!!!
    function updateDB(articleID) {
        db.mainBunchOfArticles.update({ id: articleID }, getArticle(articleID), { multi: false, upsert: false });

    }
    function updateNextIndexInDB() {
        var tempObject = db.nextIndexString.find({ key: "mainIndex" })[0];
        tempObject.nextIndexLine = nextIndex;
        db.nextIndexString.update({ key: "mainIndex" }, tempObject, { multi: false, upsert: false });
        MongoClient.connect(dbUri, function (err, db) {
            // Get the collection
            var col = db.collection('nextIndexString');
            col.updateOne({ key: "mainIndex" }
                , { $set: { nextIndexLine: nextIndex } }
                , { upsert: true }).then(function (r) {
                    // assert.equal(nextIndex.toString, r.matchedCount);
                    // assert.equal(nextIndex.toString, r.upsertedCount);
                    // Finish up test
                    db.close();
                });
        });
    }
    function rgb(r, g, b) {
        return "rgb(" + r % 256 + "," + g % 256 + "," + b % 256 + ")";
    }

    function checkTagForExistanceIn(someTag, place) {
        // console.log("Searching:"+someTag+" in");
        // console.log(place);
        var didFind = false;
        place.forEach(function (someString) {
            if (someString.toLowerCase().trim() === someTag.trim().toLowerCase()) {
                // console.log("found");
                didFind = true;
            }
        });
        return didFind;
    }
    function sortArticles(someArticles) {
        someArticles.sort(function (a, b) {
            if (a.createdAt - b.createdAt < 0) {
                return 1;
            } else {
                return - 1;
            }
        });
    }

    function validateArticle(article) {
        if (!article.id) {
            console.log("wrong article id");
            return false;
        }
        if (!article.title) {
            return false;
        }
        else {
            if ((article.title.length >= 100) || article.title.length === 0) {
                console.log("wrong article title length");
                return false;
            }
        }

        if (!article.summary) {
            return false;
        }
        else {
            if (article.summary.length >= 300 || article.summary.length < 4) {
                console.log("wrong article:" + article.id + " summary length: " + article.summary.length);
                return false;
            }
        }
        if (!article.createdAt) {
            console.log("wrong article id");
            return false;
        }
        if (!article.author) {
            console.log("wrong article author");
            return false;
        }
        else if (article.author.length === 0) {
            console.log("wrong article author length");
            return false;
        }
        if (!article.content) {
            console.log("something with content");
            return false;
        }
        else if (article.content.length < 2) {
            console.log("wrong article content length");
            return false;
        }
        if (!article.tags) {
            console.log("something wrong with tags");
            return false;
        }
        else {
            if (!tags.find(function (someTag) {
                return checkTagForExistanceIn(someTag.tag, article.tags);
            })) {
                return false;
            }
        }
        return true;
    }

    function getAllArticles() {
        sortArticles(articles);
        return articles;
    }
    function getNextIndex() {
        return nextIndex;
    }
    function getArticle(idNumber) {
        return articles.filter(function (article) {
            return article.id === idNumber;
        })[0];
    }
    function getArticles(skip = 0, top = 10, filterConfig, filterStringAuthor, filterStringDate, filterStringTags) {
        console.log("skip:" + skip + " top:" + top);
        var result = articles;
        if ((filterConfig & authorFilter) === authorFilter) {
            console.log("using author Filter");
            result = result.filter(function (article) {
                return article.author.toLowerCase() === filterStringAuthor.toLowerCase();
            })
        }
        if ((filterConfig & dateFilter) === dateFilter) {
            console.log("using date filter");
            result = result.filter(function (article) {
                return article.createdAt.getYear() === new Date(filterStringDate).getYear();
            })
        }
        if ((filterConfig & tagFilter) === tagFilter) {
            console.log("using tag filter");
            if (tags.find(function (tag) {
                return checkTagForExistanceIn(tag.tag, filterStringTags);
            })) {
                console.log("will filter with tag");
                console.log(result);
                result = result.filter(function (article) {
                    var didFind = false;
                    filterStringTags.forEach(function (someTag) {
                        console.log("checking " + someTag + " for existence");
                        if (checkTagForExistanceIn(someTag, article.tags)) {
                            console.log("OK");
                            didFind = true;
                        }
                    });
                    console.log(didFind.toString());
                    return didFind;
                });
            }
            else {
                console.log("check tag name");
                return undefined;
            }

        }
        sortArticles(result);
        return result.splice(skip, top);
    }

    function addArticle(article) {
        article.id = nextIndex.toString();
        if (validateArticle(article)) {
            articles.push(article);
            nextIndex++;
            updateNextIndexInDB();
            let smallPromise = new Promise((resolve, reject) => {
                db.mainBunchOfArticles.save(article);
                resolve();
            }).then(() => { console.log("successfully added article:" + article.id); })
            MongoClient.connect(dbUri, function (err, db) {
                assert.equal(null, err);
                db.collection("mainBunchOfArticles").insertOne(article, function (err, result) {
                    assert.equal(err, null);
                    console.log("inserted article successfully to atlas");
                });
                db.close();
            });
            // console.log("successfully added article: "+JSON.stringify(article));
            return true;
        }
        else return false;
    }
    function removeArticle(id) {
        var index = -1;
        for (var i = 0; i < articles.length; i++) {
            if (articles[i].id === id) {
                index = i;
                break;
            }
        }
        if (index == -1) return false;
        else {
            articles.splice(index, 1);
            console.log("successfully deleted article with id:", id);
            updateNextIndexInDB();
            new Promise((resolve, reject) => {
                db.mainBunchOfArticles.remove({ id: id }, false);
                resolve(id);
            }).then((tempID) => { console.log("db:removed article with id:" + tempID) });
            return true;
        }

    }
    function editArticle(articleID, someArticle) {
        var clone = Object.assign({}, getArticle(articleID));
        if (someArticle.id) clone.id = someArticle.id;
        if (someArticle.author) clone.author = someArticle.author;
        if (someArticle.summary) clone.summary = someArticle.summary;
        if (someArticle.createdAt) clone.createdAt = someArticle.createdAt;
        if (someArticle.title) clone.title = someArticle.title;
        if (someArticle.content) clone.content = someArticle.content;
        if (someArticle.tags) clone.tags = someArticle.tags;
        if (validateArticle(clone)) {
            for (var i = 0; i < articles.length; i++) {
                if (articles[i].id === articleID) {
                    articles[i] = clone;
                    let smallPromise = new Promise((resolve, reject) => {
                        updateDB(articleID);
                        resolve();
                    }
                    ).then(() => { console.log("Database is updated"); })
                    // updateDB(articleID);
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
        var tempResult =
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
    return {
        init: init,
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
        compileDefaultArticle: compileDefaultArticle,
        nextIndex: getNextIndex
    };
}());

function filterArticlesWithTags(someTags) {
    var compiledTags = [];
    someTags.forEach(function (oneTag) {
        compiledTags.push(oneTag.tag);
    });
    if (compiledTags.length === 0) articleInsertTool.appendArticlesToContainer(articleService.getAllArticles());
    if (compiledTags.length !== 0) articleInsertTool.appendArticlesToContainer(articleService.getArticles(undefined, 20, tagFilter, "", "", compiledTags));
}
function test1() {
    var tempA = articleService.compileDefaultArticle();
    tempA.author = "_aKrYm_";
    articleService.addArticle(tempA);
}
module.exports = {
    articleService: articleService,
    test1: test1,
    nextArticleIndex: articleService.nextIndex
}