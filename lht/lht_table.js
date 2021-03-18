"use strict";

/*
   New Perspectives on HTML5 and CSS3, 7th Edition
   Tutorial 10
   Review Assignment

   Author: M. Cook
   Date:   3/17/2021

	
*/

// Set starting date for calendar
var thisDay = new Date("August 30, 2018");
// Set end date two weeks after start date
var endDate = new Date(thisDay.getTime() + 14 * 24*  60 * 60 * 1000);

// Create table
var tableHTML = "<table id='eventTable'><caption>Upcoming Events</caption><tr><th>Date</th><th>Event</th><th>Price</th></tr>";


for (var i = 0; i < eventDates.length; i++) {
  // Store event date, day, and time
  var eventDate = new Date(eventDates[i])
  var eventDay = eventDate.toDateString();
  var eventTime = eventDate.toLocaleTimeString();
  
  // Store details of current day's events
  var description = eventDescriptions[i];
  var price = eventPrices[i];

  // Add event details to table
  if (thisDay <= eventDate && eventDate <= endDate) {
    tableHTML += "<tr>\
      <td> " + eventDay + " @ " + eventTime + " </td>\
      <td>" + " description " + "</td>\
      <td> " + price + " </td>\
      </tr>";
  }
}

tableHTML += "</table>";
document.getElementById("eventList").innerHTML = tableHTML;
