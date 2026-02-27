export interface GithubRepo {
  name: string;
  description: string;
  html_url: string;
  homepage: string;
  topics: string[];
  language: string;
  stargazers_count: number;
  forks_count: number;
  updated_at: string;
}

export async function getGithubProjects() {
  const username = process.env.NEXT_PUBLIC_GITHUB_USERNAME;
  const token = process.env.GITHUB_TOKEN;

  if (!username) {
    console.error("GITHUB_USERNAME is not defined");
    return [];
  }

  try {
    const response = await fetch(
      `https://api.github.com/users/${username}/repos?sort=updated&per_page=100`,
      {
        headers: {
          Authorization: token ? `token ${token}` : "",
          Accept: "application/vnd.github.v3+json",
        },
        next: { revalidate: 3600 }, // Cache for 1 hour
      }
    );

    if (!response.ok) {
      throw new Error(`GitHub API error: ${response.statusText}`);
    }

    const repos: GithubRepo[] = await response.json();

    return repos
      .filter((repo) => !repo.name.startsWith("."))
      .map((repo) => {
        const imageId = `https://raw.githubusercontent.com/${username}/${repo.name}/main/preview.png`;

        return {
          title: repo.name.replace(/-/g, " ").replace(/_/g, " "),
          description: repo.description || "No description provided.",
          imageId: imageId,
          repo: repo.html_url,
          link: repo.homepage || undefined,
          badges: [repo.language, ...repo.topics].filter(Boolean),
          updatedAt: repo.updated_at,
        };
      });
  } catch (error) {
    console.error("Error fetching GitHub projects:", error);
    return [];
  }
}
