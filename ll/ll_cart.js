"use strict";

/*
M. Cook
4/10/2021
ll_cart.js

Script to update subtotal and make previous/next buttons work
*/


// Initialize array to hold cost of any add-ons
var add_ons = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0];

// Update and display subtotal
function update_price() {
	var price = 1200;
	// Add cost of any add-ons
	for (var i = 0; i < add_ons.length; i++) { 
		price += add_ons[i];
	}

	// Display new price on page
	var subtotal = document.getElementById('subtotal');
	subtotal.innerHTML = "$" + (price - .01);
}

/* Create variables for each form element that can alter price */
// General
var strings = document.getElementById("strings");
var construction = document.getElementById("construction");
// Body
var sunburst = document.getElementById("sunburst");
var body_type = document.getElementById("body_type");
var pickguard = document.getElementById("pickguard");
var whammy = document.getElementById("whammy");
// Neck
var wood = document.getElementById("neck_wood");
var fanned_frets = document.getElementById("fanned_frets");
var fret_inlay = document.getElementById("fret_inlay");
// Head
var tuners = document.getElementById("tuners");


/* Series of event listeners to update subtotal */
strings.addEventListener("change", update_strings);
function update_strings() {
	if (strings.value == "seven") { add_ons[0] = 100; }
	else if (strings.value == "eight") { add_ons[0] = 200; }
	else if (strings.value == "nine") { add_ons[0] = 300; }
	else if (strings.value == "ten") { add_ons[0] = 400; }
	else { add_ons[0] = 0; }

	update_price();
}
construction.addEventListener("change", update_construction);
function update_construction() {
	if (construction.value == "bolt_on") { add_ons[1] = 0; }
	else if (construction.value == "set_neck") { add_ons[1] = 100; }
	else if (construction.value == "neck_thru") { add_ons[1] = 300; }

	update_price();
}
sunburst.addEventListener("change", update_sunburst);
function update_sunburst() {
	if (sunburst.value == "yes") { add_ons[2] = 25; }
	else if (sunburst.value == "no") { add_ons[2] = 0; }
	
	update_price();
}
body_type.addEventListener("change", update_body_type);
function update_body_type() {
	if (body_type.value == "hollow") { add_ons[3] = 250; }
	else { add_ons[3] = 0; }

	update_price();
}
pickguard.addEventListener("change", update_pickguard);
function update_pickguard() {
	if (pickguard.value == "yes") { add_ons[4] = 25; }
	else { add_ons[4] = 0; }

	update_price();
}

whammy.addEventListener("change", update_whammy);
function update_whammy() {
	if (whammy.value == "yes") { add_ons[5] = 150; }
	else { add_ons[5] = 0; }

	update_price();
}
wood.addEventListener("change", update_wood);
function update_wood() {
	if (wood.value == "ebony") { add_ons[6] = 50; }
	else { add_ons[6] = 0; }

	update_price();
}
fanned_frets.addEventListener("change", update_frets);
function update_frets() {
	if (fanned_frets.value == "yes") { add_ons[7] = 100; }
	else { add_ons[7] = 0; }

	update_price();
}
fret_inlay.addEventListener("change", update_inlay);
function update_inlay() {
	if (fret_inlay.value == "none") { add_ons[8] = 0; }
	else { add_ons[8] = 20; }

	update_price();
}
tuners.addEventListener("change", update_tuners);
function update_tuners() {
	if (tuners.value == "yes") { add_ons[9] = 50; }
	else { add_ons[9] = 0; }

	update_price();
}

update_price();


/* And now for those pesky little buttons */
// Variable to hold which set of options is being shown
var page = 0;
// Variables for the buttons
var previous = document.getElementById("previous");
var next = document.getElementById("next");
var submit = document.getElementById("submit");
// Variables for easy access to display properties
var general = document.getElementById("general_options");
var body = document.getElementById("body_options");
var neck = document.getElementById("neck_options");
var head = document.getElementById("headstock_options");
var contact = document.getElementById("contact");
var thanks = document.getElementById("thanks");
var price_nav = document.getElementById("price_nav");
// Arrays to make it easier to toggle visibility
var set1 = [general, body];
var set2 = [neck, head];


// Functions for showing and hiding elements
function hide(set) {
	if (Array.isArray(set) == true) {
		for (var i = 0; i < set.length; i++) {
			set[i].style.display = "none";		
		}
	} else {
		set.style.display = "none"
	}
}

function show(set) {
	if (Array.isArray(set) == true) {
		for (var i = 0; i < set.length; i++) {
			set[i].style.display = "block";
		}
	} else {
		set.style.display = "block";
	}
}

// And now for our event listeners!

previous.addEventListener("click", go_back);
function go_back() {
	if (page === 1) {
		page -= 1;
		show(set1);
		hide(set2);
		hide(contact);
	} else if (page === 2) {
		page -= 1;
		hide(set1);
		show(set2);
		hide(contact);
		show(next);
	}
}

next.addEventListener("click", go_forward);
function go_forward() {
	if (page === 0) {
		page += 1;
		hide(set1);
		show(set2);
		hide(contact);
	} else if (page === 1) {
		page += 1;
		hide(set1);
		hide(set2);
		show(contact);
		hide(next);
		show(submit)
	}

}


/* And now to thank the user */
submit.addEventListener("click", submit_form)
function submit_form() {
	var name = document.getElementById("firstBox").value;
	var gracias = document.getElementById("gracias");
	hide(set1);
	hide(set2);
	hide(contact);
	hide(price_nav);
	show(thanks);

	gracias.innerHTML += name + "!";
}