//div with profile info
const profileInfo = document.querySelector(".overview");
const username = "ceevans1"

//fetch info from GitHub API
const gatherInfo = async function () {
    const info = await fetch(`https://api.github.com/users/${username}`);
    const results = await info.json();
    console.log(results)

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
}

gatherInfo();