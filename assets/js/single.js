var issueContainerEl = document.querySelector("#issues-container");
var limitWarningEl = document.querySelector("#limit-warning");
var repoNameEl = document.querySelector("#repo-name");

var getRepoName = function() {
    // these two lines will break up the url. the equals sign is the break point 
    //and the [1] select the second element in the newly created array.
    var queryString = document.location.search;
    var repoName = queryString.split("=")[1];

    // if repoName is true
    if(repoName) {
        // then display repo name in the header
        repoNameEl.textContent = repoName;
        
        getRepoIssues(repoName);
    }
    else {
        // if repoName doesn't exist redirect to homepage
        document.location.replace("./index.html");
    }
};

var getRepoIssues = function(repo) {
    // after the next line and a fetch command check the network tab in dev tools to see if the fetch request is working.
    var apiUrl = "https://api.github.com/repos/" + repo + "/issues?direction=asc";
    fetch(apiUrl).then(function(response){
        // request was successful
        if (response.ok) {
            response.json().then(function(data) {
                // pass response data to dom function (before this is where a console log goes to check data)
                displayIssues(data);

                // check if api has paginated issues
                if (response.headers.get("Link")) {
                    displayWarning(repo);
                }
            });
        }
        else {
            // if not successful, redirect to homepage
            document.location.replace("./index.html");
        }
    });
};


var displayIssues = function(issues) {
    if (issues.length === 0) {
        issueContainerEl.textContent = "This repo has no open issues!";
        return;
    }
    // created a for loop to go over the the response data and create an a for each one
    for (i = 0; i < issues.length; i++){
        // create a link element to take users to the issue on github
        var issueEl = document.createElement("a");
        //add styles to the dynamically created attribute
        issueEl.classList = "list-item flex-row justify-space-between align-center";
        // html_url links the a to the full issue on Github
        issueEl.setAttribute("href", issues[i].html_url);
        // "_blank" opens a new tab when clicked.
        issueEl.setAttribute("target", "_blank");

        // the next lines will add acutal content to the dynamically created attributes
        // create span to hold issue title
        var titleEl = document.createElement("span");
        titleEl.textContent = issues[i].title;

        // append to container
        issueEl.appendChild(titleEl);

        // create a type element
        var typeEl = document.createElement("span");

        // chack if issue is an actual issue or a pull request
        if (issues[i].pull_request) {
            typeEl.textContent = "(Pull request)";
        } else {
            typeEl.textContent = "(Issue)";
        }

        //append to container
        issueEl.appendChild(typeEl);

        issueContainerEl.appendChild(issueEl);
    }
};

var displayWarning = function(repo) {
    // add text to warning container
    limitWarningEl.textContent = "To see more than 30 issues, visit ";

    var linkEl = document.createElement("a");
    linkEl.textContent = "See more issues on GitHub.com";
    linkEl.setAttribute("href", "https://github.com/" + repo + "/issues");
    linkEl.setAttribute("target", "_blank");

    // append to warning container
    limitWarningEl.appendChild(linkEl);
};

getRepoName();
