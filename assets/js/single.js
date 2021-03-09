var issueContainerEl = document.querySelector("#issues-container");
var limitWarningEl = document.querySelector("#limit-warning");
var repoNameEl = document.querySelector("#repo-name");

let getRepoIssues = function (repo) {
    var apiUrl = "https://api.github.com/repos/" + repo + "/issues?direction=asc";
    fetch(apiUrl).then(function (response) {
        if (response.ok) {
            response.json().then(function (data) {
                displayIssues(data);

                // check if api has paginated issues
                if (response.headers.get("Link")) {
                    // console.log("repo has more than 30 issues");
                    displayWarning(repo);
                }
            });
        }

        else {
            console.log(response);
            alert('There was a problem with your Request');
        }
    });

};

var displayIssues = function (issues) {
    if (issues.length === 0) {
        issueContainerEl.textContent = "This repo has no open issues!";
        return;
    }
    for (let i = 0; i < issues.length; i++) {
        //create a link element to take users to the issue on github
        let issuesEl = document.createElement("a");
        issuesEl.classList = "list-item flex-row justify-space-between align-center";
        issuesEl.setAttribute("href", issues[i].html_url);
        issuesEl.setAttribute("target", "_blank");


        //create a span to hold the issues title
        var titleEl = document.createElement("span");
        titleEl.textContent = issues[i].title;

        //append a container
        issuesEl.appendChild(titleEl);

        //create a type element
        let typeEl = document.createElement("span");

        // check if issue is an actual issue or pull request
        if (issues[i].pull_request) {
            typeEl.textContent = "(Pull request)";
        }
        else {
            typeEl.textContent = "(Issue)";
        }
        //Append to container
        issuesEl.appendChild(typeEl);

        issueContainerEl.appendChild(issuesEl);
    }
};
var displayWarning = function (repo) {
    //add text to warning container
    limitWarningEl.textContent = "To see more than 30 issues,visit";

    var linkEl = document.createElement("a");
    linkEl.textContent = "See More Issues on GitHub.com";
    linkEl.setAttribute("href", "https://github.com/" + repo + "/issues");
    linkEl.setAttribute("target", "_blank");

    //append to warning container
    limitWarningEl.appendChild(linkEl);
};

var getRepoName = function () {
    var queryString = document.location.search;
    var repoName = queryString.split("=")[1];
    if (repoName) {
        repoNameEl.textContent = repoName;
        getRepoIssues(repoName);
    }
    else {
        document.location.replace("./index.html");
    }
    repoNameEl.textContent = repoName;
    console.log(repoName);
};
getRepoName();