# Contributing to maya

Thank you for taking an interest in our project! The following guide will walk you through the process of creating an issue, forking and cloning the repository, and submitting a pull request. Please make sure you follow any conventions or style guidelines listed in this document. If you have any questions or concerns, please open an issue or join us on Discord.

## How to Contribute

First time contributing to an open-source project? Here are some resources to get started:
* [How to Contribute to Open Source](https://opensource.guide/how-to-contribute/)
* [Git Handbook](https://guides.github.com/introduction/git-handbook/)
* [GitHub/Git Cheatsheet](https://training.github.com/downloads/github-git-cheat-sheet/)
* [Visual Git Command Cheatsheet](https://ndpsoftware.com/git-cheatsheet.html)

### Open an Issue

Contributions are made to this repository via Issues and Pull Requests.

* Search for existing Issues and PRs before creating your own.
* If you want to suggest or implement a new feature, open an Issue using the Feature Request template.
* If you encounter a bug while using the bot, open an Issue using the Bug Report template.

### Fork the Repo

Before contributing any code, you should fork this repo to create your own copy and then clone that to your computer using `git clone`. After cloning, make sure to create a new branch with a useful title (ex: `feat/moderation`). Commit your changes to this branch.

### Submit a Pull Request

After committing and pushing your changes to your own fork, you can submit a [pull request](https://github.com/cnnor/Maya/pulls). Make sure to use the pull request template.

## Style & Conventions
### Commit Messages
Commit messages should follow the [Conventional Commits](https://www.conventionalcommits.org/en/v1.0.0/) specifications, such as the examples below.

```
feat: add temporary ban command
refactor!: change config to flat file
fix: correct minor typos in code
```

* Valid types are `build, chore, ci, docs, feat, fix, perf, refactor, revert, style, test`.
* Keep your commit messages under 100 characters.

### Code Style
We use the [Airbnb JavaScript Style Guide](https://github.com/airbnb/javascript), enforced through ESLint. Make sure you run `npm lint` before committing any changes.
