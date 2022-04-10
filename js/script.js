//div with profile info
const profileInfo = document.querySelector(".overview");
//list of repos
const repoList = document.querySelector(".repo-list");
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
    repos.forEach(function (repo) {
        const li = document.createElement("li");
        li.classList.add("repo");
        li.innerHTML = `<h3>${repo.name}</h3>`;
        repoList.append(li);
    })
}




gatherInfo();
