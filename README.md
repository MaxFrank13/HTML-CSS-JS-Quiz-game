# HTML-CSS-JS-Quiz-game

## Description

This is a multiple-choice quiz game focused on testing your skills in web development. You are allotted 60 seconds to complete a set of 10 questions. You will lose points and time for answering incorrectly. Each correct answer earns 5 points and adds a second to the clock. Any time remaining at the end of the quiz is added on to your final score. Each score can be saved into a highscores interface that stores its data in your local storage. If you're embarrassed by your performance you can easily clear your scores with the click of a button!

[Quiz game](https://maxfrank13.github.io/HTML-CSS-JS-Quiz-game/)

![Picture of Quiz Game](https://github.com/MaxFrank13/Test-Your-Web-Dev-Skills-game/tree/main/assets/app-photo.jpg)

## What's happening in the code 

### HTML

Structure of quiz game is established with HTML. Only the `textContent` and `display` property are being modified to create the quiz. Dataset attributes are provided for each multiple choice question that correspond with that question's letter in the quiz. This is referenced by the JavaScript so the browser knows where the user has clicked.

### CSS

Using a hide class that modifies an element's `display` property to none is provided by the CSS file to control what is shown to the user. `:hover` pseudo-class is used to provide a higher degree of interactivity. Media queries give the application a level of responsiveness as well.

### JavaScript

A questions array is provided by the JavaScript file. Each item in the array is an object with key-value pairs to be referenced and set as `textContent` for each corresponding question in the quiz. `setInterval` is used to set up a simple 60 second timer. 

  1. The list of multiple choice questions is given a click listener
      - if the user clicks on one of the choices then the JS accesses its dataset value
      - that dataset value is checked with the answer value of the corresponding object in the questions array
      - if they match, a correct answer is found, score and time are added
        - else if they don't match and the dataset value from the click is not undefined, then an incorrect answer is found, score and time are subtracted
        - the function checks for undefined because it is possible to click the list and not select a choice (typically from padding or other styles)
      
  2. The same click listener uses a count variable to reference which question to present to the user
      - the count increments if there are more questions, and then sets their key-pairs to the corresponding elements

  3. When there are no questions left, the user is prompted to enter their initials
      - these initials are taken in with the score and saved into an object
      - that object is added to an array and saved to local storage on the user's browser

  4. Scores are rendered to the page each time a new one is added
      - each time a score is added to the array, it is sorted by it's score property using the `splice` method
      - if a score is equal to another, it is place underneath