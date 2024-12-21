async function getYearlyContributions(username) {
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
        Authorization: `Bearer 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`, // Replace with your GitHub token
      },
      body: JSON.stringify({ query, variables }),
    });

    const result = await response.json();

    if (result.errors) {
      console.error('GraphQL Errors:', result.errors);
      return;
    }

    const contributions =
      result.data.user.contributionsCollection;

    const totalContributions = contributions.contributionCalendar.totalContributions;
    const restrictedContributions = contributions.restrictedContributionsCount;

    console.log(`
      Public Contributions: ${totalContributions}
      Private Contributions: ${restrictedContributions}
      Total Contributions in the Past Year: ${totalContributions + restrictedContributions}
    `);
  } catch (error) {
    console.error('Failed to fetch contributions:', error);
  }
}

// Example usage:
getYearlyContributions('MaxNoddings');
