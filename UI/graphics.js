/**
 * Created by akrum on 01.03.17.
 */
var globalRope0Position=0;
var globalRope1Position=screen.width;
var globalSignsPosition=0;
var mouseEvent= function (evnt) {
        // console.log(evnt.deltaX);
        if((globalRope0Position<=(-1*screen.width))&&evnt.deltaX>0)globalRope0Position=globalRope0Position+2*screen.width;
        if((globalRope1Position<=(-1*screen.width))&&evnt.deltaX>0)globalRope1Position=globalRope1Position+2*screen.width;

        if((globalRope0Position>=screen.width)&&evnt.deltaX<0)globalRope0Position=globalRope0Position-2*screen.width;
        if((globalRope1Position>=screen.width)&&evnt.deltaX<0)globalRope1Position=globalRope1Position-2*screen.width;

        globalRope0Position-=evnt.deltaX/2;
        globalRope1Position-=evnt.deltaX/2;
        globalSignsPosition-=evnt.deltaX/2;
        document.getElementById("pageRope0").style.left=globalRope0Position+"px";
        document.getElementById("pageRope1").style.left=globalRope1Position+"px";
        document.getElementById("pageSigns").style.left=globalSignsPosition+"px";

};

document.getElementById("ropeAndSigns").addEventListener("wheel",mouseEvent);
console.log("position:"+parseInt(document.getElementById("pageRope0").style.left,10));
document.getElementById("pageSigns").style.top=document.getElementById("pageRope0").style.top;