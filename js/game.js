var total = 0;
var totalText;
var min = 0;
var max = 100;
var time = 5000;
var lastIncrement = Date.now();
var boostText;
var minText;
var incMinCost = 1;
var incMinCostText;
var maxText;
var incMaxCost = 200;
var incMaxCostText;
var critChance = 0.00;
var CritChanceText;
var incCritChanceCost = 100;
var incCritChanceCostText;
var critMulti = 2;

window.addEventListener("load", function() {
	// call functions and make things happen here, and nowhere else
	totalText = document.getElementById("totalPoints");
	boostText = document.getElementById("lastAddition");
	minText = document.getElementById("minimum");
	maxText = document.getElementById("maximum");
	critChanceText = document.getElementById("critChance");
	incMinCostText = document.getElementById("incMinCost");
	incMaxCostText = document.getElementById("incMaxCost");
	incCritChanceCostText = document.getElementById("incCritChanceCost");
	setupButtons();
	setInterval(randomBoost, time);
	tick();
})

function setupButtons() {
	var incMin = document.getElementById("incMin");
	var incMax = document.getElementById("incMax");
	var incMax = document.getElementById("incCritChance");
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
		incMax.addEventListener("click", function(event) {
		if((total>incCritChanceCost))
		{
			critChance += 0.01;
			critChanceText.innerHTML = critChance.toFixed(2);
			total -= incCritChanceCost;
			incCritChanceCost = (critChance*100)+100;
			incCritChanceCostText.innerHTML = incCritChanceCost;
			totalText.innerHTML = total;
		}
	});
};

function randomBoost() {

	lastIncrement = Date.now();
	if((Math.random()*100)<critChance)
	{
		boost = (Math.ceil(Math.random()*(max - min)) + min)*critMulti;
	}
	else
	{
		boost = Math.ceil(Math.random()*(max - min)) + min;
	}
	total += boost;
	totalText.innerHTML = total;
	boostText.innerHTML = boost;
	
}

function tick() {
	// do stuff
	var difference = Date.now() - lastIncrement;
	var percentage = difference/time;
	var progressBar = document.getElementById("progressBar");
	
	progressBar.value = percentage;
	
	
	requestAnimationFrame(tick);
}