exports.handler = async () => {
  const username = "MaxNoddings";
  const token = process.env.GITHUB_TOKEN; // Securely access your token
  
  const query = `
      query($username: String!) {
        user(login: $username) {
          repositories(ownerAffiliations: OWNER) {
            totalCount
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
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ query, variables }),
      });

      const result = await response.json();

      if (result.errors) {
        console.error('GraphQL Errors:', result.errors);
        return;
      }

      const totalRepositories = result.data.user.repositories.totalCount;

      return {
        statusCode: 200,
        body: JSON.stringify({ totalRepositories }),
      };
    } catch (error) {
      console.error("Error fetching GitHub repositories:", error);
      return {
          statusCode: 500,
          body: JSON.stringify({ error: "Failed to fetch GitHub repositories" }),
      };
    }
};