// Data structure to store repositories, pull requests, and issues
let repositories = [];

// DOM elements
const repoForm = document.getElementById('repo-form');
const repoNameInput = document.getElementById('repo-name');
const repoDescriptionInput = document.getElementById('repo-description');
const repoList = document.getElementById('repo-list');

const pullRequestSection = document.getElementById('pull-requests-section');
const pullRequestForm = document.getElementById('pull-request-form');
const pullRequestList = document.getElementById('pull-request-list');
const repoPullRequestTitle = document.getElementById('repo-pull-request-title');

const issueSection = document.getElementById('issues-section');
const issueForm = document.getElementById('issue-form');
const issueList = document.getElementById('issue-list');
const repoIssuesTitle = document.getElementById('repo-issues-title');

const pullRequestsLink = document.getElementById('pull-requests-link');
const issuesLink = document.getElementById('issues-link');
const backToReposPull = document.getElementById('back-to-repos-pull');
const backToReposIssues = document.getElementById('back-to-repos-issues');

// Create repository
repoForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const repoName = repoNameInput.value;
    const repoDescription = repoDescriptionInput.value;

    if (repoName && repoDescription) {
        const newRepo = {
            name: repoName,
            description: repoDescription,
            pullRequests: [],
            issues: []
        };
        repositories.push(newRepo);
        repoNameInput.value = '';
        repoDescriptionInput.value = '';
        updateRepoList();
    }
});

// Update repository list
function updateRepoList() {
    repoList.innerHTML = '';
    repositories.forEach((repo, index) => {
        const li = document.createElement('li');
        li.textContent = `${repo.name}: ${repo.description}`;
        li.addEventListener('click', () => selectRepo(index));
        repoList.appendChild(li);
    });
}

// Select a repository to manage pull requests and issues
function selectRepo(index) {
    const repo = repositories[index];
    repoPullRequestTitle.textContent = repo.name;
    repoIssuesTitle.textContent = repo.name;
    updatePullRequestList(repo);
    updateIssueList(repo);
    pullRequestSection.style.display = 'none';
    issueSection.style.display = 'none';
}

// Update pull request list
function updatePullRequestList(repo) {
    pullRequestList.innerHTML = '';
    repo.pullRequests.forEach(pr => {
        const li = document.createElement('li');
        li.textContent = pr.title;
        pullRequestList.appendChild(li);
    });
}

// Update issue list
function updateIssueList(repo) {
    issueList.innerHTML = '';
    repo.issues.forEach(issue => {
        const li = document.createElement('li');
        li.textContent = issue.title;
        issueList.appendChild(li);
    });
}

// Handle pull request submission
pullRequestForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const title = document.getElementById('pull-request-title').value;
    const currentRepo = repositories.find(repo => repo.name === repoPullRequestTitle.textContent);

    if (title && currentRepo) {
        currentRepo.pullRequests.push({ title });
        document.getElementById('pull-request-title').value = '';
        updatePullRequestList(currentRepo);
    }
});

// Handle issue submission
issueForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const title = document.getElementById('issue-title').value;
    const currentRepo = repositories.find(repo => repo.name === repoIssuesTitle.textContent);

    if (title && currentRepo) {
        currentRepo.issues.push({ title });
        document.getElementById('issue-title').value = '';
        updateIssueList(currentRepo);
    }
});

// Navigation links
pullRequestsLink.addEventListener('click', (e) => {
    e.preventDefault();
    pullRequestSection.style.display = 'block';
    issueSection.style.display = 'none';
});

issuesLink.addEventListener('click', (e) => {
    e.preventDefault();
    issueSection.style.display = 'block';
    pullRequestSection.style.display = 'none';
});

// Back button functionality
backToReposPull.addEventListener('click', () => {
    pullRequestSection.style.display = 'none';
});

backToReposIssues.addEventListener('click', () => {
    issueSection.style.display = 'none';
});

// Preventing default behavior for explore and marketplace links
document.getElementById('explore-link').addEventListener('click', (e) => {
    e.preventDefault();
    alert('Explore feature coming soon!');
});

document.getElementById('marketplace-link').addEventListener('click', (e) => {
    e.preventDefault();
    alert('Marketplace feature coming soon!');
});
