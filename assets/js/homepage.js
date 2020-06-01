var getUserRepos = function(user) {
    //format the github api url
    var apiUrl = "https://api.github.com/users/" + user + "/repos";

    // make a request to the url
    fetch(apiUrl).then(function(response) {
        // this formats the response to a readable array
        response.json().then(function(data) {
            console.log(data);
        });
    });
};

getUserRepos();

var userFormEl = document.querySelector("#user-form");
var nameInputEl = document.querySelector("#username");

var formSubmitHandler = function(event) {
    event.preventDefault();
    // get value from input element
    var username = nameInputEl.value.trim();

    if (username) {
        getUserRepos(username);
        // this sets the value as whatever the user types into the form. Which gets stored in var username.
        nameInputEl.value = "";
    } else {
        alert("Please enter a GitHub username");
    }
};

userFormEl.addEventListener("submit", formSubmitHandler);