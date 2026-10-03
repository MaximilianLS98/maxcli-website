import { useQuery } from '@tanstack/react-query';
import { GITHUB_REPO } from '@/lib/site';

interface GitHubRepo {
	stargazers_count: number;
	forks_count: number;
	open_issues_count: number;
}

/**
 * Basic repository stats (stars, forks) for display in the UI.
 */
export const useGitHubRepo = () => {
	return useQuery({
		queryKey: ['github-repo', GITHUB_REPO],
		queryFn: async (): Promise<GitHubRepo> => {
			const response = await fetch(`https://api.github.com/repos/${GITHUB_REPO}`);
			if (!response.ok) {
				throw new Error(`Failed to fetch repository: ${response.status}`);
			}
			return response.json();
		},
		staleTime: 10 * 60 * 1000,
		retry: 1,
	});
};
