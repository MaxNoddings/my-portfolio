async function fetchGitHubStats() {
    const username = "MaxNoddings";
    
    try {
        // Call the serverless function
        const response = await fetch('/.netlify/functions/github-stats-secure');
        const data = await response.json();

        // Get the amount of contributions
        const response2 = await fetch(`https://api.github.com/users/${username}/events`);
        if (!response2.ok) {
        throw new Error(`Error: ${response2.statusText}`);
        }
        const events = await response2.json();

        // Count the number of events related to contributions (e.g., commits, pull requests)
        const contributionEvents = events.filter(event =>
            ['PushEvent', 'PullRequestEvent', 'IssuesEvent'].includes(event.type)
        );

        // Update the stats section
        document.getElementById("repo-count").innerText = data.totalRepos;
        // document.getElementById("commit-count").innerText = data.commitCount;
        document.getElementById("commit-count").innerText = contributionEvents.length;
    } catch (error) {
        console.error("Error fetching GitHub stats:", error);
        document.getElementById("repo-count").innerText = "Error";
        document.getElementById("commit-count").innerText = "Failed to fetch contributions:";
    }
}

// Fetch stats when the page loads
fetchGitHubStats();
