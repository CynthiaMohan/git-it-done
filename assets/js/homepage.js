var userFormEl = document.querySelector("#user-form");
var nameInputEl = document.querySelector("#username");
var repoContainerEl = document.querySelector("#repos-container");
var repoSearchTerm = document.querySelector("#repo-search-term");
var getUserRepos = function (user) {

    //format the github api url
    var apiUrl = "https://api.github.com/users/" + user + "/repos";

    //make a request to the url
    fetch(apiUrl).then(function (response) {
        response.json().then(function (data) {
            displayRepos(data, user);
        });
    });
};
var formSubmitHandler = function (event) {
    event.preventDefault();
    console.log(event);
    //get the value of the input
    var username = nameInputEl.value.trim();

    if (username) {
        getUserRepos(username);
        nameInputEl.value = ' ';
    }
    else {
        alert("Please enter a GitHub username");
    }
};

var displayRepos = function (repos, searchTerm) {
    repoContainerEl.textContent = ' ';
    repoSearchTerm.textContent = searchTerm;
    for (let i = 0; i < repos.length; i++) {
        //format the repo name
        var repoName = repos[i].owner.login + "/" + repos[i].name;

        //create a container for each repo 
        var repoEl = document.createElement("div");
        repoEl.classList = "list-item flex-row justify-space-between align-center";

        //create a span element to hold the repository name
        var titleEl = document.createElement("span");
        titleEl.textContent = repoName;

        //append to container
        repoEl.appendChild(titleEl);

        //append container to DOM
        repoContainerEl.appendChild(repoEl);
    }
    console.log(repos);
    console.log(searchTerm);
};
userFormEl.addEventListener("submit", formSubmitHandler);