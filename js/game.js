var total = 0;
var totalText;
var min = 0;
var max = 100;
var time = 5000;
var lastIncrement = Date.now();
var boostText;
var minText;
var incMinCost = 0;
var incMinCostText;

window.addEventListener("load", function() {
	// call functions and make things happen here, and nowhere else
	totalText = document.getElementById("totalPoints");
	boostText = document.getElementById("lastAddition");
	minText = document.getElementById("minimum");
	incMinCostText = document.getElementById("incMinCost");
	setupButtons();
	setInterval(randomBoost, time);
	tick();
})

function setupButtons() {
	var pointIncrementer = document.getElementById("incLowVal");
	var totalText = document.getElementById("totalPoints");
	pointIncrementer.addEventListener("click", function(event) {
		if(total>incMinCost)
		{
			min += 1;
			minText.innerHTML = min;
			total -= incMinCost;
			incMinCost = min + 1;
			incMinCostText.innerHTML = incMinCost;
			totalText.innerHTML = total;
		}
	});
};

function randomBoost() {

	lastIncrement = Date.now();
	boost = Math.ceil(Math.random()*(max - min)) + min;
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