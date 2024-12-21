const username = "MaxNoddings";

async function fetchGitHubStats() {
    try {
        // Fetch repositories
        const reposResponse = await fetch(`https://api.github.com/users/${username}/repos`);
        const repos = await reposResponse.json();
        const repoCount = repos.length;

        // Fetch commits for all repositories
        let commitCount = 0;
        for (const repo of repos) {
            const commitsResponse = await fetch(`https://api.github.com/repos/${username}/${repo.name}/commits`);
            const commits = await commitsResponse.json();
            commitCount += commits.length;
        }

        // Update the stats on the webpage
        document.getElementById("repo-count").innerText = repoCount;
        document.getElementById("commit-count").innerText = commitCount;
    } catch (error) {
        console.error("Error fetching GitHub stats:", error);
        document.getElementById("repo-count").innerText = "Error";
        document.getElementById("commit-count").innerText = "Error";
    }
}

// Call the function when the script loads
fetchGitHubStats();
