async function fetchGitHubStats() {
    const username = "MaxNoddings";
    
    try {
        // Call the repo serverless function
        const repoResponse = await fetch('/.netlify/functions/get-repo-count');
        const repoData = await repoResponse.json();

        // Update num repositories
        document.getElementById("repo-count").innerText = repoData.totalRepositories;

        // Call the contributions serverless function
        const contributionsResponse = await fetch('/.netlify/functions/get-yearly-contributions');
        const contributionsData = await contributionsResponse.json();

        // Update num repositories
        document.getElementById("contribution-count").innerText = contributionsData.totalContributions;

    } catch (error) {
        console.error("Error fetching GitHub stats:", error);
        document.getElementById("repo-count").innerText = "Error";
        document.getElementById("contribution-count").innerText = "Error";
    }
}

// Fetch stats when the page loads
fetchGitHubStats();
