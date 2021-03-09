var userFormEl = document.querySelector("#user-form");
var nameInputEl = document.querySelector("#username");
var repoContainerEl = document.querySelector("#repos-container");
var repoSearchTerm = document.querySelector("#repo-search-term");
var languageButtonsEl = document.querySelector("#language-buttons");


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
                alert('Error:' + response.statusText);
            }
        })
        .catch(function (error) {
            alert('Unable to connect to GitHub');
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
    if (repos.length === 0) {
        console.log(repos.length);
        repoContainerEl.textContent = 'No repositories found';
        return;
    }
    repoSearchTerm.textContent = searchTerm;
    //check if the api returned any repos

    for (let i = 0; i < repos.length; i++) {

        //format the repo name
        var repoName = repos[i].owner.login + "/" + repos[i].name;
        var repo = repos[i].owner.login + "/" + repos[i].name;

        //create a container for each repo 
        var repoEl = document.createElement("a");
        repoEl.classList = "list-item flex-row justify-space-between align-center";
        repoEl.setAttribute("href", "./single-repo.html?repo=" + repoName);

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

var getFeaturedRepos = function (language) {
    var apiUrl = "https://api.github.com/search/repositories?q=" + language + "+is:featured&sort=help-wanted-issues";

    fetch(apiUrl).then(function (response) {
        if (response.ok) {
            response.json().then(function (data) {
                displayRepos(data.items, language);
            });

        } else {
            alert("Error: " + response.statusText);
        }
    });
};

var buttonClickHandler = function (event) {
    var language = event.target.getAttribute("data-language");
    console.log(language);
    if (language) {
        getFeaturedRepos(language);

        // clear old content
        repoContainerEl.textContent = "";
    }
};
userFormEl.addEventListener("submit", formSubmitHandler);
languageButtonsEl.addEventListener("click", buttonClickHandler);