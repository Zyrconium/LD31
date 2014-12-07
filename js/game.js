var total = 0;
var totalText;
var lastIncrement = Date.now();
var boostText;
var critIndicatorText;

var min = 0;
var minText;
var incMinCost = 1;
var incMinCostText;

var max = 100;
var maxText;
var incMaxCost = 200;
var incMaxCostText;

var critChance = 0.00;
var CritChanceText;
var incCritChanceCost = 1000;
var incCritChanceCostText;

var critMulti = 2;
var CritMultiText;
var incCritMultiCost = 25;
var incCritMultiCostText;

var time = 5000;
var timeText;
var decTimeCost = 500;
var decTimeCostText;

window.addEventListener("load", function() {
	// call functions and make things happen here, and nowhere else
	
	totalText = document.getElementById("totalPoints");
	boostText = document.getElementById("lastAddition");
	critIndicatorText = document.getElementById("critIndicator");
	
	minText = document.getElementById("minimum");
	maxText = document.getElementById("maximum");
	critChanceText = document.getElementById("critChance");
	critMultiText = document.getElementById("critMulti");
	timeText = document.getElementById("time");
	
	incMinCostText = document.getElementById("incMinCost");
	incMaxCostText = document.getElementById("incMaxCost");
	incCritChanceCostText = document.getElementById("incCritChanceCost");
	incCritMultiCostText = document.getElementById("incCritMultiCost");
	decTimeCostText = document.getElementById("decTimeCost");
	
	setupButtons();
	setTimeout(randomBoost, time);
	tick();
})

function setupButtons() {
	var incMin = document.getElementById("incMin");
	var incMax = document.getElementById("incMax");
	var incCritChance = document.getElementById("incCritChance");
	var incCritMulti = document.getElementById("incCritMulti");
	var decTime = document.getElementById("decTime");
	var totalText = document.getElementById("totalPoints");
	incMin.addEventListener("click", function(event) {
		if((total>incMinCost)&&(min<max))
		{
			min += 1;
			minText.innerHTML = min;
			total -= incMinCost;
			incMinCost = min + 1;
			incMinCostText.innerHTML = incMinCost;
			totalText.innerHTML = total;
		}
	});
	incMax.addEventListener("click", function(event) {
		if((total>incMaxCost))
		{
			max += 1;
			maxText.innerHTML = max;
			total -= incMaxCost;
			incMaxCost = max*2;
			incMaxCostText.innerHTML = incMaxCost;
			totalText.innerHTML = total;
		}
	});
	incCritChance.addEventListener("click", function(event) {
		if((total>incCritChanceCost) && (critChance<100))
		{
			critChance += 0.01;
			critChanceText.innerHTML = (critChance*100).toFixed(0);
			total -= incCritChanceCost;
			incCritChanceCost = (((critChance*100)+100)*10).toFixed(0);
			incCritChanceCostText.innerHTML = incCritChanceCost;
			totalText.innerHTML = total;
		}
	});
	incCritMulti.addEventListener("click", function(event) {
		if((total>incCritMultiCost))
		{
			critMulti += 1;
			critMultiText.innerHTML = critMulti;
			total -= incCritMultiCost;
			incCritMultiCost = Math.pow((critMulti+3), 2);
			incCritMultiCostText.innerHTML = incCritMultiCost;
			totalText.innerHTML = total;
		}
	});
	decTime.addEventListener("click", function(event) {
		if((total>decTimeCost)&&(time>1000))
		{
			time -= 1000;
			var simpletime = time/1000;
			timeText.innerHTML = simpletime;
			total -= decTimeCost;
			decTimeCost = Math.pow((simpletime*100), (6-simpletime));
			decTimeCostText.innerHTML = decTimeCost;
			totalText.innerHTML = total;
		}
	});
};

function randomBoost() {

	lastIncrement = Date.now();
	if((Math.random())<critChance)
	{
		boost = (Math.ceil(Math.random()*(max - min)) + min)*critMulti;
		critIndicatorText.innerHTML = "CRITICAL GAINS!";
	}
	else
	{
		boost = Math.ceil(Math.random()*(max - min)) + min;
		critIndicatorText.innerHTML = "";
	}
	total += boost;
	totalText.innerHTML = total;
	boostText.innerHTML = boost;
	
	setTimeout(randomBoost, time);
}

function tick() {
	// do stuff
	var difference = Date.now() - lastIncrement;
	var percentage = difference/time;
	var progressBar = document.getElementById("progressBar");
	
	progressBar.value = percentage;
	
	
	requestAnimationFrame(tick);
}