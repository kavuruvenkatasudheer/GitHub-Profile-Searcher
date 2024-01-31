async function getUserData() {
    const username = document.getElementById('usernameInput').value;

    try {
        const userData = await fetchUserData(username);
        const repoData = await fetchUserRepositories(username);

        displayUserData(userData);
        displayRepositories(repoData);
    } catch (error) {
        console.error('Error fetching data:', error);
    }
}

async function fetchUserData(username) {
   
    const apiUrl = `https://api.github.com/users/${username}`;
    
    const response = await fetch(apiUrl);
    if (!response.ok) {
        throw new Error(`GitHub API request failed with status ${response.status}`);
    }

    return response.json();
}

async function fetchUserRepositories(username) {
    const apiUrl = `https://api.github.com/users/${username}/repos`;
    
    const response = await fetch(apiUrl);
    if (!response.ok) {
        throw new Error(`GitHub API request failed with status ${response.status}`);
    }

    return response.json();
}

function displayUserData(userData) {
    const userDataDiv = document.getElementById('userData');
    userDataDiv.innerHTML = `
        <h2>${userData.name}</h2>
        <p><strong>Username:</strong> ${userData.login}</p>
        <p><strong>Location:</strong> ${userData.location}</p>
        <p><strong>Followers:</strong> ${userData.followers}</p>
        <p><strong>Following:</strong> ${userData.following}</p>
        <img src="${userData.avatar_url}" alt="Profile Image" style="width: 100px; height: 100px; border-radius: 50%;">
    `;
}

function displayRepositories(repoData) {
    const repoListDiv = document.getElementById('repoList');
    repoListDiv.innerHTML = `<h2>Repositories:</h2>`;
    
    if (repoData.length === 0) {
        repoListDiv.innerHTML += `<p>No repositories found.</p>`;
    } else {
        repoData.forEach(repo => {
            repoListDiv.innerHTML += `
                <div>
                    <p><strong>${repo.name}</strong></p>
                    <p>${repo.description || 'No description available.'}</p>
                    <p><strong>Language:</strong> ${repo.language || 'Not specified'}</p>
                    <p><strong>Stars:</strong> ${repo.stargazers_count}</p>
                    <hr>
                </div>
            `;
        });
    }
}
