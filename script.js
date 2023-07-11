// Header
var header = $('#currentDay');
// Today using dayjs()
var today = dayjs();
// The main div
var main = $(".container-lg");
$(function () {
  // Setting up the schedule
  // IDs for each div
  var id = ["hour-0", "hour-1", "hour-2", "hour-3", "hour-4", "hour-5", "hour-6", "hour-7",
  "hour-8", "hour-9", "hour-10", "hour-11", "hour-12", "hour-13", "hour-14", "hour-15", "hour-16",
  "hour-17", "hour-18", "hour-19", "hour-20", "hour-21", "hour-22", "hour-23", "hour-24"];
  // Time for the div textcontent
  var hr = ["12AM", "1AM", "2AM", "3AM", "4AM", "5AM", "6AM", "7AM", "8AM", "9AM", "10AM", "11AM", "12PM",
  "1PM", "2PM", "3PM", "4PM", "5PM", "6PM", "7PM", "8PM", "9PM", "10PM", "11PM", "12PM"];
  // Loop that runs 24 times 
  for (i = 0; i < 24; i ++) {
    // First div
    var divOne = $("<div>");
    // Set up main div id attr
    divOne.attr("id", id[i]);
    // Check if less than current hour
    if (i < today.hour()) {
      divOne.attr("class", "row time-block past");
    // Check if equal to current hour
    } else if (i === today.hour()) {
      divOne.attr("class", "row time-block present");
    // Check if greater than current hour
    } else {
      divOne.attr("class", "row time-block future");
    }
    // Second div
    var divTwo = $("<div>");
    divTwo.attr("class", "col-2 col-md-1 hour text-center py-3");
    divTwo.text(hr[i]);

    // Textarea
    var textarea = $("<textarea>");
    textarea.attr("class", "col-8 col-md-10 description");
    textarea.attr("rows", "3");

    // Save button
    var button = $("<button>");
    button.attr("class", "btn saveBtn col-2 col-md-1");
    button.attr("aria-label", "save");

    // Icon of the save button
    var italic = $("<i>");
    italic.attr("class", "fas fa-save")
    italic.attr("aria-hidden", "true")

    // Childs 

    // First div appends second div
    divOne.append(divTwo);
    // First div appends textarea
    divOne.append(textarea);
    // First div appends button
    divOne.append(button);
    // Button appends the icon
    button.append(italic);
    // Main appends first div
    main.append(divOne);
  };

  // Save Button
  var saveButton = $(".saveBtn");
  // Function for onclick
  function handleFormSubmit(event) {
    event.preventDefault();
    // Gets the current targetted button
    let currentSave = $(event.currentTarget);
    // Gets the sibling textare to that button
    let currentText = currentSave.siblings("textarea");
    // Get the sibling div with the class .hour
    let currentDiv = currentSave.siblings(".hour");
    // Set local storage to time : content "EX. 10PM : Sleep"
    localStorage.setItem(currentDiv.text(), currentText.val());
  };
  // Onclick function
  saveButton.on("click", handleFormSubmit);

  // Get all the textarea 
  var textbox = $("textarea");
  // Loop through all textarea
  for (j = 0; j < 24; j ++) {
    // Getting the current textbox and the hour
    let current = $(textbox[j]);
    let currentTime = current.siblings(".hour").text();
    // Load with local storage
    current.text(localStorage.getItem(currentTime));
    // textbox[j].val(localStorage.getItem(currentTime.text()));
  }


  // display the current date in the header of the page.
  header.text(today.format("MMM D, YYYY"));

});
