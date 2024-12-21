const fetch = require('node-fetch');

exports.handler = async () => {
    const username = "MaxNoddings";
    const token = process.env.GITHUB_TOKEN; // Securely access your token

    try {
        // Fetch repositories
        const reposResponse = await fetch(`https://api.github.com/users/${username}/repos`, {
            headers: { Authorization: `token ${token}` }
        });
        const repos = await reposResponse.json();
        const repoCount = repos.length;

        // Fetch commits for all repositories
        let commitCount = 0;
        for (const repo of repos) {
            const commitsResponse = await fetch(`https://api.github.com/repos/${username}/${repo.name}/commits`, {
                headers: { Authorization: `token ${token}` }
            });
            const commits = await commitsResponse.json();
            commitCount += commits.length;
        }

        return {
            statusCode: 200,
            body: JSON.stringify({ repoCount, commitCount }),
        };
    } catch (error) {
        console.error("Error fetching GitHub stats:", error);
        return {
            statusCode: 500,
            body: JSON.stringify({ error: "Failed to fetch GitHub stats" }),
        };
    }
};
