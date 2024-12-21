exports.handler = async () => {
  const username = "MaxNoddings";
  const token = process.env.GITHUB_TOKEN; // Securely access your token

  const query = `
    query($username: String!) {
      user(login: $username) {
        contributionsCollection {
          contributionCalendar {
            totalContributions
          }
          totalCommitContributions
          totalPullRequestContributions
          totalPullRequestReviewContributions
          totalIssueContributions
          restrictedContributionsCount # Includes private contributions
        }
      }
    }
  `;

  const variables = { username };

  try {
    const response = await fetch('https://api.github.com/graphql', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`, // Replace with your GitHub token
      },
      body: JSON.stringify({ query, variables }),
    });

    const result = await response.json();

    if (result.errors) {
      console.error('GraphQL Errors:', result.errors);
      return;
    }

    const contributions = result.data.user.contributionsCollection;

    const publicContributions = contributions.contributionCalendar.totalContributions;
    const restrictedContributions = contributions.restrictedContributionsCount;

    const totalContributions = publicContributions + restrictedContributions;

    return {
      statusCode: 200,
      body: JSON.stringify({ totalContributions }),
    };
  } catch (error) {
    console.error("Error fetching GitHub contributions:", error);
    return {
        statusCode: 500,
        body: JSON.stringify({ error: "Failed to fetch GitHub contributions" }),
    };
  }
};