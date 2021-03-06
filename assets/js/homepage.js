var userFormEl = document.querySelector("#user-form");
var nameInputEl = document.querySelector("#username");
var repoContainerEl = document.querySelector("#repos-container");
var repoSearchTerm = document.querySelector("#repo-search-term");
var getUserRepos = function (user) {

    //format the github api url
    var apiUrl = "https://api.github.com/users/" + user + "/repos";

    //make a request to the url
    fetch(apiUrl)//if fulfilled 
        .then(function (response) {
            if (response.ok) {
                response.json().then(function (data) {
                    displayRepos(data, user);
                });
            }
            else {
                alert(`Error:${response.statusText}`);
            }
        })
        .catch(function (error) {
            alert(`Unable to connect to GitHub`);
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
    if (repoContainerEl.length === 0) {
        console.log(repoContainerEl.length);
        repoContainerEl.textContent = "No repositories found";
    }
    repoContainerEl.textContent = ' ';
    repoSearchTerm.textContent = searchTerm;
    //check if the api returned any repos

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

        //create a status element
        var statusEl = document.createElement("span");
        statusEl.classList = "flex-row align-center";

        //check if current repo has issues or not
        if (repos[i].open_issues_count > 0) {
            statusEl.innerHTML = "<i class=' fas fa-times status-icon icon-danger'></i>" + repos[i].open_issues_count + "issues(s)";
        }
        else {
            statusEl.innerHTML = "<i class='fas fa-check-square status-iconicon-success'></i>";
        }
        //append status to the container
        repoEl.appendChild(statusEl);

        //append container to DOM
        repoContainerEl.appendChild(repoEl);
    }
    console.log(repos);
    console.log(searchTerm);
};
userFormEl.addEventListener("submit", formSubmitHandler);