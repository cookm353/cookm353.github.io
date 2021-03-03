"use strict";

/*
   New Perspectives on HTML5 and CSS3, 7th Edition
   Tutorial 9
   Review Assignment

   Event Timer
   Author: M. Cook
   Date:   3/3/2021

*/



function showClock() {
  // Create new date object then store date and time in separate vars
  var thisDay = new Date()
  var localDate = thisDay.toLocaleDateString();
  var localTime = thisDay.toLocaleTimeString();

  // Update displayed date and time
  document.getElementById("currentTime").innerHTML = "<span>" + localDate +     "</span><span>" + localTime + "</span>"
  
  // Find date of next 4th of July
  var j4Date = nextJuly4(thisDay);

  // Update countdown clock
  j4Date.setHours("21");

  // Calculate days, hours, mins, and secs until 9 pm on July 4th
  var days = (j4Date - thisDay) / (1000 * 60 * 60 * 24);
  var hrs = (days - Math.floor(days)) * 24;
  var mins = (hrs - Math.floor(hrs)) * 60;
  var secs = (mins - Math.floor(mins)) * 60;

  // Update timer
  document.getElementById("dLeft").textContent = Math.floor(days);
  document.getElementById("hLeft").textContent = Math.floor(hrs);
  document.getElementById("mLeft").textContent = Math.floor(mins);
  document.getElementById("sLeft").textContent = Math.floor(secs);
}

function nextJuly4(currentDate) {
   var cYear = currentDate.getFullYear();
   var jDate = new Date("July 4, 2018");
   jDate.setFullYear(cYear);
   if ((jDate - currentDate) < 0) jDate.setFullYear(cYear + 1);
   return jDate;
}

// Display and update time left
showClock();
setInterval("showClock()", 1000);
