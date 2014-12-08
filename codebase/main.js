var state='stop';
var mydivbs=600;
var mystuffbs=800;
var stuff='wall';
var condition=['wall','hole','bird','rock'];
var icondition=0;
var result=['kick','punch','jump','walk'];
var tresult=0;
var eresult=3;
var item=0;
var nextstate='';
var gameLoop;
(function() {
    var lastTime = 0;
    var vendors = ['ms', 'moz', 'webkit', 'o'];
    for(var x = 0; x < vendors.length && !window.requestAnimationFrame; ++x) {
        window.requestAnimationFrame = window[vendors[x]+'RequestAnimationFrame'];
        window.cancelAnimationFrame = window[vendors[x]+'CancelAnimationFrame'] 
                                   || window[vendors[x]+'CancelRequestAnimationFrame'];
    }
 
    if (!window.requestAnimationFrame)
        window.requestAnimationFrame = function(callback, element) {
            var currTime = new Date().getTime();
            var timeToCall = Math.max(0, 16 - (currTime - lastTime));
            var id = window.setTimeout(function() { callback(currTime + timeToCall); }, 
              timeToCall);
            lastTime = currTime + timeToCall;
            return id;
        };
 
    if (!window.cancelAnimationFrame)
        window.cancelAnimationFrame = function(id) {
            clearTimeout(id);
        };
}());

(function () {
			
	var mySprite,
		elRibeiro,
		canvas;	

	function gameLoop () {
	
	  window.requestAnimationFrame(gameLoop);

	  mySprite.update();
	  mySprite.render();
	}
	
	function sprite (options) {
	
		var that = {},
			frameIndex = 0,
			tickCount = 0,
			ticksPerFrame = options.ticksPerFrame || 0,
			numberOfFrames = options.numberOfFrames || 1;
		
		var inumberOfFrames={walk: 0, stop: 10, jump: 11, punch: 27, kick: 39};
		var enumberOfFrames={walk: 10, stop: 10, jump: 27, punch: 38, kick: 49};
		frameIndex=inumberOfFrames[state];
		
		that.context = options.context;
		that.width = options.width;
		that.height = options.height;
		that.image = options.image;
		
		that.update = function () {

            tickCount += 1;

            if (tickCount > ticksPerFrame) {

				tickCount = 0;
				
                // If the current frame index is in range
                if (frameIndex < inumberOfFrames[state]) {
                	frameIndex=inumberOfFrames[state];
                } else if (frameIndex < enumberOfFrames[state] - 1) {	
                    // Go to the next frame
                    frameIndex += 1;
                } else {
                	if(state=='jump' || state=='kick' || state=='punch') state='walk';
                    frameIndex = inumberOfFrames[state];
                }
            }
            if(state=='walk' || state=='jump') {
				mydivbs-=2;
				if(mydivbs<0) mydivbs=600;
				document.getElementById('mydiv').style.backgroundPosition=(mydivbs)+'px 246px';
				
				
				if(stuff=='wall') {
					mystuffbs-=2;
					if(mystuffbs<-300) mystuffbs=800;
					document.getElementById('stuff').style.backgroundPosition=(mystuffbs)+'px 222px';
				}
				//trigger
				if(mystuffbs==220) {
					state=nextstate;
					if(nextstate!="jump") setTimeout('theend()',1000);
				}
				
				
			}
        };
		
		that.render = function () {
		
		  // Clear the canvas
		  that.context.clearRect(0, 0, that.width, that.height);
		  
		  
		  // Draw the animation
		  that.context.drawImage(
		    that.image,
		    frameIndex * that.width / numberOfFrames,
		    0,
		    that.width / numberOfFrames,
		    that.height,
		    0,
		    0,
		    that.width / numberOfFrames,
		    that.height);
		};
		
		return that;
	}
	
	// Get canvas
	canvas = document.getElementById("myGame");
	canvas.width = 180;
	canvas.height = 340;
	
	// Create sprite sheet
	elRibeiro = new Image();
	
	// Create sprite
	mySprite = sprite({
		context: canvas.getContext("2d"),
		width: 8640,
		height: 340,
		image: elRibeiro,
		numberOfFrames: 48,
		ticksPerFrame: 4
	});
	
	// Load sprite sheet
	elRibeiro.addEventListener("load", gameLoop);
	elRibeiro.src = "images/ribeiro180.png";

} ());

function stopstart() {
	if(document.getElementById('stopstart').innerHTML=='true') {
		document.getElementById('stopstart').innerHTML='false';
		state='stop';
	} else {
		document.getElementById('stopstart').innerHTML='true';
		state='walk';
	}
}

function setstate(value) {
	if(state=='stop') {
		if(value=='walk') state=value;
	} else state=value;
}

function submitscript() {
	document.getElementById("myscripts").innerHTML='<span id=sp'+item+'>&bullet; IF '+document.getElementById("myif").innerHTML+' THEN '+document.getElementById("mythen").innerHTML+' ELSE '+document.getElementById("myelse").innerHTML+' <a href="javascript: myremove('+item+');" style="color: red">X</a></span>';
	item++;
	if(document.getElementById("myif").innerHTML=='wall') nextstate=document.getElementById("mythen").innerHTML;
	else nextstate='';
}

function myremove(val) {
	var element = document.getElementById('sp'+val);
	element.parentNode.removeChild(element);
	nextstate='';
}

function changeif() {
	icondition++;
	if(icondition>condition.length-1) icondition=0;
	document.getElementById("myif").innerHTML=condition[icondition];
}

function changethen() {
	tresult++;
	if(tresult>result.length-1) tresult=0;
	document.getElementById("mythen").innerHTML=result[tresult];
}

function changeelse() {
/*	eresult++;
	if(eresult>result.length-1) eresult=0;
	document.getElementById("myelse").innerHTML=result[eresult];*/
}

function theend() {
	document.getElementById('theend').style.display='block';
	state='';
}
