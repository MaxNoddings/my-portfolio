async function getContributions(username) {
  try {
    const response = await fetch(`https://api.github.com/users/${username}/events`);
    if (!response.ok) {
      throw new Error(`Error: ${response.statusText}`);
    }
    const events = await response.json();

    // Count the number of events related to contributions (e.g., commits, pull requests)
    const contributionEvents = events.filter(event =>
      ['PushEvent', 'PullRequestEvent', 'IssuesEvent'].includes(event.type)
    );

    console.log(`Total Contributions for ${username}:`, contributionEvents.length);
  } catch (error) {
    console.error('Failed to fetch contributions:', error);
  }
}

// Example usage:
getContributions('jamezmca');
