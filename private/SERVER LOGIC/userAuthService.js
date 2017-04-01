var userService=(function () 
{
    var userDB;
    var flightUsersARRAY;
    var loggedAccounts=[];
    function init(databasePath)
    {
        userDB = require('diskdb');
        userDB.connect(databasePath, ['userFlightDB']);
        flightUsersARRAY=userDB.userFlightDB.find();
    }
    function outputAllUsersToConsole()
    {
        console.log(flightUsersARRAY);
    }
    function getUserWithNickname(userNickname)
    {
        return flightUsersARRAY.filter(function (user) {
            return user.nickname===userNickname;
        })[0];
    }
    function outputProblemToConsole(problem)
    {
        console.log("user service output: "+problem);
    }
    function doesHaveAUserWithPassword(user)
    {
        if(!user.nickname)
        {
            outputProblemToConsole("couln't find a nickname in the input");
            return false;
        }
        if(!user.password)
        {
            outputProblemToConsole("couln't find a password in the input");
            return false;
        }
        var dbSuitableUser=flightUsersARRAY.find(function(tempUser)
        {
            return tempUser.nickname===user.nickname;
        })
        if(!dbSuitableUser)
        {
            outputProblemToConsole("doesn't have user with nickname:"+user.nickname);
            return false;
        }
        if(dbSuitableUser.password!==user.password)
        {
            outputProblemToConsole("doesn't have user with password:"+user.password);
            return false;
        }
        loggedAccounts.push(dbSuitableUser);
        outputProblemToConsole("user with nickname "+user.nickname+" has logged in");
        return true;
    }
    function isUserLoggedIn(userNickname)
    {
        var tempAcc=loggedAccounts.find(function(someAcc)
        {
            if(someAcc.nickname===userNickname)return true;
        });
        if(tempAcc)return true;
        else return false;
    }
    function userPictureURL(userNickname)
    {
        var tempAcc=loggedAccounts.find(function(someAcc)
        {
            if(someAcc.nickname===userNickname)return true;
        });
        if(tempAcc.userPicture)return tempAcc.userPicture;
        else return "mainInterfaceObjects/unknownUser.png";
    }
    return {
        init:init,
        doesHaveAUserWithPassword:doesHaveAUserWithPassword,
        isUserLoggedIn:isUserLoggedIn,
        getUserPictureURL:userPictureURL
    };
}());
module.exports = {
    init:userService.init,
    outputAllUsersToConsole:userService.outputAllUsersToConsole,
    doesHaveAUserWithPassword:userService.doesHaveAUserWithPassword,
    isUserLoggedIn:userService.isUserLoggedIn,
    getUserPictureURL:userService.getUserPictureURL
}