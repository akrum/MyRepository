var userService = (function () {
    var userDB;
    var flightUsersARRAY;
    var loggedAccounts = [];
    var crypto = require('crypto');
    var base64url = require('base64url');
    var firebase = require("firebase");
    // var admin = require("firebase-admin");
    /** Sync */
    function randomStringAsBase64Url(size) {
        return base64url(crypto.randomBytes(size)).substring(0, size);
    }
    function init(databasePath) {
        // Initialize Firebase
        var config = {
            apiKey: "AIzaSyDTlvbRfKXRsOJkSGCMnMr3LpV8VafQiIU",
            authDomain: "flight-news-users.firebaseapp.com",
            databaseURL: "https://flight-news-users.firebaseio.com",
            projectId: "flight-news-users",
            storageBucket: "flight-news-users.appspot.com",
            messagingSenderId: "136798870802"
        };
        firebase.initializeApp(config);

        userDB = require('diskdb');
        userDB.connect(databasePath, ['userFlightDB']);
        flightUsersARRAY = userDB.userFlightDB.find();
    }
    function outputAllUsersToConsole() {
        console.log(flightUsersARRAY);
    }
    function getUserWithNickname(userNickname) {
        return flightUsersARRAY.filter(function (user) {
            return user.nickname === userNickname;
        })[0];
    }
    function outputProblemToConsole(problem) {
        console.log("user service output: " + problem);
    }
    function doesHaveAUserWithPassword(user) {
        if (!user.nickname) {
            outputProblemToConsole("couln't find a nickname in the input");
            return {
                verdict: false
            };
        }
        if (!user.password) {
            outputProblemToConsole("couln't find a password in the input");
            return {
                verdict: false
            };
        }
        var dbSuitableUser = flightUsersARRAY.find(function (tempUser) {
            return tempUser.nickname === user.nickname;
        })
        if (!dbSuitableUser) {
            outputProblemToConsole("doesn't have user with nickname:" + user.nickname);
            return {
                verdict: false
            };
        }
        if (dbSuitableUser.password !== user.password) {
            outputProblemToConsole("doesn't have user with password:" + user.password);
            return {
                verdict: false
            };
        }
        var loggedAccount = loggedAccounts.find(function (acc) {
            return acc.nickname === user.nickname;
        });
        dbSuitableUser.sessionToken = randomStringAsBase64Url(20);
        if (loggedAccount) {
            loggedAccount.sessionToken = dbSuitableUser.sessionToken;
        }
        else {
            loggedAccounts.push(dbSuitableUser);
        }
        outputProblemToConsole("user with nickname " + user.nickname + " has logged in");
        return {
            verdict: true,
            sessionToken: dbSuitableUser.sessionToken
        };
    }
    function isUserLoggedIn(userNickname, sessionToken) {
        var tempAcc = loggedAccounts.find(function (someAcc) {
            if (someAcc.nickname === userNickname && someAcc.sessionToken === sessionToken) return true;
        });
        if (tempAcc) return true;
        else return false;
    }
    function logOutUserWithNickname(userNickname) {
        var index = -1;
        for (var i = 0; i < loggedAccounts.length; i++) {
            if (loggedAccounts[i].nickname === userNickname) {
                index = i;
                break;
            }
        }
        if (index != -1) {
            loggedAccounts.splice(index, 1);
            outputProblemToConsole("user with nick:" + userNickname + " successfully logged out");
            return true;
        }
        else {
            outputProblemToConsole("couldn't log out user with nickname:" + userNickname);
            return false;
        }

    }
    function userPictureURL(userNickname) {
        var tempAcc = flightUsersARRAY.find(function (someAcc) {
            if (someAcc.nickname === userNickname) return true;
        });
        if (!tempAcc) 
        {
            return "mainInterfaceObjects/unknownUser.png";
        }
        if (tempAcc.userPicture !== undefined) return tempAcc.userPicture;
    }
    return {
        init: init,
        doesHaveAUserWithPassword: doesHaveAUserWithPassword,
        isUserLoggedIn: isUserLoggedIn,
        getUserPictureURL: userPictureURL,
        logOutUserWithNickname: logOutUserWithNickname
    };
}());
function test() {
    userService.doesHaveAUserWithPassword({ nickname: "_aKrYm_", password: "tempPass" });
    userService.logOutUserWithNickname("_aKrYm_");
}


module.exports = {
    init: userService.init,
    outputAllUsersToConsole: userService.outputAllUsersToConsole,
    doesHaveAUserWithPassword: userService.doesHaveAUserWithPassword,
    isUserLoggedIn: userService.isUserLoggedIn,
    getUserPictureURL: userService.getUserPictureURL,
    logOutUserWithNickname: userService.logOutUserWithNickname,
    test1: test
}