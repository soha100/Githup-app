let userFormEl = document.querySelector("#user-form");
let userInputEl = document.querySelector("#username");
let languagesEl = document.querySelector(".languages");
let SearchTermEl = document.querySelector("#search-term");
let reposEl = document.querySelector(".repos");

userFormEl.addEventListener("submit", formSubmitHandler);
languagesEl.addEventListener("click", handelClick);

function handelClick(e) {
  let lng = e.target.getAttribute("data-lng");

  if (lng) {
    reposEl.innerHTML = "";
    getLngRepos(lng);
  }
}

function getLngRepos(lng) {
  let apiUrl = "https://api.github.com/search/repositories?q=" + lng;

  fetch(apiUrl)
    .then((res) => res.json())
    .then((data) => displayRepos(data.items, lng))
    .catch((err) => alert("somthing went wrong!"));
}

function formSubmitHandler(e) {
  e.preventDefault();

  let user = userInputEl.value.trim();
  if (user) {
    reposEl.innerHTML = "";
    getUserRepos(user);
  } else {
    alert("Please Enter User");
  }
}
function getUserRepos(user) {
  let apiUrl = "https://api.github.com/users/" + user + "/repos";

  fetch(apiUrl)
    .then((res) => res.json())
    .then((data) => displayRepos(data, user))
    .catch((err) => alert("somthing went wrong!"));
}

function displayRepos(repos, searchTerm) {
  if (repos.length == 0) {
    reposEl.innerHTML = "No Repos..!";
    return;
  }
  SearchTermEl.innerHTML = searchTerm;
  repos.forEach((repo) => {
    let name = repo.owner.login + "/" + repo.name;
    reposEl.innerHTML += `
           <a href="./repos.html?repo=${name}" class="repo-item">
              <span>${repo.owner.login} / ${repo.name}</span>
              <span>${
                repo.open_issues_count > 0
                  ? '<i class="fas fa-times"></i>'
                  : '<i class="fas fa-check-square"></i>'
              } </span>
            </a>
        `;
  });
}
