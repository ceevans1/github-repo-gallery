//div with profile info
const profileInfo = document.querySelector(".overview");
//list of repos
const repoList = document.querySelector(".repo-list");
//full section of repos
const repoSection = document.querySelector(".repos");
//display area for repo information
const repoData = document.querySelector(".repo-data");
//back to repo button
const repoButton = document.querySelector(".view-repos");
//repo input area
const filterInput = document.querySelector(".filter-repos");
const username = "ceevans1"
//fetch info from GitHub API
const gatherInfo = async function () {
    const info = await fetch(`https://api.github.com/users/${username}`);
    const results = await info.json();


    displayContent(results);
}

const displayContent = function (data) {
    const displayDiv = document.createElement("div");
    displayDiv.classList.add("user-info");
    displayDiv.innerHTML = `
        <figure>
            <img alt="user avatar" src=${data.avatar_url} />
        </figure >
    <div>
        <p><strong>Name:</strong> ${data.name}</p>
        <p><strong>Bio:</strong> ${data.bio}</p>
        <p><strong>Location:</strong> ${data.location}</p>
        <p><strong>Number of public repos:</strong> ${data.public_repos}</p>
    </div>`;
    profileInfo.append(displayDiv);
    gatherRepos();
}

const gatherRepos = async function () {
    const repos = await fetch(`https://api.github.com/users/${username}/repos?sort=updated&per_page=50`);
    const repoArray = await repos.json();
    displayRepos(repoArray);
}

const displayRepos = function (repos) {
    filterInput.classList.remove("hide");
    repos.forEach(function (repo) {
        const li = document.createElement("li");
        li.classList.add("repo");
        li.innerHTML = `<h3>${repo.name}</h3>`;
        repoList.append(li);
    })
}

repoList.addEventListener("click", function (e) {
    if (e.target.matches("h3")) {
        const repoName = e.target.innerText;
        repoPull(repoName);
    }
})

const repoPull = async function (repoName) {
    const repo = await fetch(`https://api.github.com/repos/${username}/${repoName}`)
    const repoInfo = await repo.json();
    const fetchLanguages = await fetch(repoInfo.languages_url);
    const languageData = await fetchLanguages.json();
    const languages = [];
    for (const property in languageData) {
        languages.push(property)
    }
    displayRepoInfo(repoInfo, languages);
}

const displayRepoInfo = function (repoInfo, languages) {
    repoData.innerHTML = "";
    const div = document.createElement("div");
    div.innerHTML = `<h3>Name: ${repoInfo.name}</h3>
    <p>Description: ${repoInfo.description}</p>
    <p>Default Branch: ${repoInfo.default_branch}</p>
    <p>Languages: ${languages.join(", ")}</p>
    <a class="visit" href="${repoInfo.html_url}" target="_blank" rel="noreferrer noopener">View Repo on GitHub!</a>`
    repoData.append(div);
    repoData.classList.remove("hide");
    repoSection.classList.add("hide");
    repoButton.classList.remove("hide");
}

repoButton.addEventListener("click", function () {
    repoSection.classList.remove("hide");
    repoData.classList.add("hide");
    repoButton.classList.add("hide");
    filterInput.value = "";
    resetRepos();
})

filterInput.addEventListener("input", function (e) {
    const search = e.target.value;
    const repos = document.querySelectorAll(".repo");
    const lilSearch = search.toLowerCase();
    for (let item of repos) {
        const lilRepo = item.innerText.toLowerCase();
        if (lilRepo.includes(lilSearch)) {
            item.classList.remove("hide");
        } else {
            item.classList.add("hide");
        }
    }

    console.log(repos);
})

const resetRepos = function () {
    const repos = document.querySelectorAll(".repo");
    for (let item of repos) {
        item.classList.remove("hide");
    }
}
gatherInfo();
