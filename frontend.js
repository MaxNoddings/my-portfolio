async function fetchGitHubStats() {
    try {
        // Call the serverless function
        const response = await fetch('/.netlify/functions/github-stats-secure');
        const data = await response.json();

        // Update the stats section
        document.getElementById("repo-count").innerText = data.repoCount;
        document.getElementById("commit-count").innerText = data.commitCount;
    } catch (error) {
        console.error("Error fetching GitHub stats:", error);
        document.getElementById("repo-count").innerText = "Error";
        document.getElementById("commit-count").innerText = "Error";
    }
}

// Fetch stats when the page loads
fetchGitHubStats();
