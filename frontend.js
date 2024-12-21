async function fetchGitHubStats() {
    const username = "MaxNoddings";
    
    try {
        // Call the serverless function
        const response = await fetch('/.netlify/functions/getRepoCount');
        const data = await response.json();

        // Update the stats section
        document.getElementById("repo-count").innerText = data.totalRepositories;
        // document.getElementById("commit-count").innerText = data.commitCount;
        // document.getElementById("commit-count").innerText = contributionEvents.length;
    } catch (error) {
        console.error("Error fetching GitHub stats:", error);
        document.getElementById("repo-count").innerText = "Error";
        // document.getElementById("commit-count").innerText = "Failed to fetch contributions:";
    }
}

// Fetch stats when the page loads
fetchGitHubStats();
