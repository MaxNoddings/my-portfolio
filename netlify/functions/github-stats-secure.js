import fetch from 'node-fetch';

exports.handler = async () => {
    const username = "MaxNoddings";
    const token = process.env.GITHUB_TOKEN; // Securely access your token

    try {
        // Fetch user data including private repo count
        const userResponse = await fetch(`https://api.github.com/users/${username}/repos?visibility=all`, {
            headers: { Authorization: `token ${token}` }
        });
        const userData = await userResponse.json();
        if (userResponse.status !== 200) {
            throw new Error(userData.message || "Failed to fetch user data");
        }

        // Count the total repositories (public and private)
        const totalRepos = userData.length;

        // Fetch commits for all repositories
        let commitCount = 0;
        for (const repo of userData) {
            const commitsResponse = await fetch(`https://api.github.com/repos/${username}/${repo.name}/commits`, {
                headers: { Authorization: `token ${token}` }
            });
            const commits = await commitsResponse.json();
            commitCount += commits.length;
        }

        return {
            statusCode: 200,
            body: JSON.stringify({ totalRepos, commitCount }),
        };
    } catch (error) {
        console.error("Error fetching GitHub stats:", error);
        return {
            statusCode: 500,
            body: JSON.stringify({ error: "Failed to fetch GitHub stats" }),
        };
    }
};
