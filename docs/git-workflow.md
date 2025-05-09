# ExcaliForSofa Git Workflow

This document outlines the Git workflow we'll be using for the ExcaliForSofa project.

## Branching Strategy

We'll be using a simplified GitHub Flow for this project. This workflow is simple and effective for our team size and project requirements.

### Main Branches

- `main` - The production branch that always represents the latest release
- `develop` - The main development branch where features are integrated

### Supporting Branches

- `feature/*` - Feature branches for new functionality
- `bugfix/*` - Branches for fixing bugs
- `hotfix/*` - Urgent fixes that need to be applied directly to production
- `release/*` - Branches for preparing a new production release

## Workflow Process

### Feature Development

1. Create a feature branch from `develop`:
   ```
   git checkout develop
   git pull
   git checkout -b feature/feature-name
   ```

2. Develop the feature with regular commits, using meaningful commit messages.

3. Keep your feature branch updated with changes from `develop`:
   ```
   git checkout feature/feature-name
   git pull origin develop
   ```

4. When the feature is complete, create a pull request to merge into `develop`.

5. After code review and approval, merge the feature branch into `develop`:
   ```
   git checkout develop
   git merge --no-ff feature/feature-name
   git push origin develop
   ```

### Bug Fixes

1. Create a bugfix branch from `develop`:
   ```
   git checkout develop
   git pull
   git checkout -b bugfix/bug-description
   ```

2. Fix the bug and commit the changes with a clear message.

3. Create a pull request to merge into `develop`.

4. After code review and approval, merge the bugfix branch.

### Hotfixes

1. Create a hotfix branch from `main`:
   ```
   git checkout main
   git pull
   git checkout -b hotfix/issue-description
   ```

2. Fix the issue and commit the changes.

3. Create two pull requests: one to `main` and one to `develop`.

4. After code review and approval, merge the hotfix branch into both branches.

### Releases

1. Create a release branch from `develop` when preparing for a release:
   ```
   git checkout develop
   git pull
   git checkout -b release/v1.0.0
   ```

2. Make final adjustments, version bumps, and release preparations.

3. Create a pull request to merge into `main`.

4. After testing and approval, merge the release branch into `main` and tag the release:
   ```
   git checkout main
   git merge --no-ff release/v1.0.0
   git tag -a v1.0.0 -m "Release v1.0.0"
   git push origin main --tags
   ```

5. Also merge the release branch back into `develop` to include any changes made:
   ```
   git checkout develop
   git merge --no-ff release/v1.0.0
   git push origin develop
   ```

## Commit Message Guidelines

We follow the Conventional Commits specification for commit messages:

```
<type>[optional scope]: <description>

[optional body]

[optional footer(s)]
```

### Types

- `feat`: A new feature
- `fix`: A bug fix
- `docs`: Documentation changes
- `style`: Code style changes (formatting, etc.)
- `refactor`: Code refactoring without changing functionality
- `perf`: Performance improvements
- `test`: Adding or modifying tests
- `chore`: Changes to the build process, tools, etc.

### Examples

```
feat(measurement): Add imperial-to-metric conversion tool
fix(upload): Resolve image rotation issue during upload
docs(workflow): Update git workflow documentation
```

## Pull Request Guidelines

- Keep PRs focused on a single feature or fix
- Include a clear description of the changes
- Reference any related issues
- Make sure tests pass
- Update documentation if necessary
- Obtain at least one approval before merging

## Code Review Process

- Review for functionality
- Check for code quality and standards
- Verify tests are included
- Ensure documentation is updated
- Look for potential edge cases or optimizations

## Release Tagging

We use semantic versioning (MAJOR.MINOR.PATCH) for releases:

- MAJOR: Incompatible API changes
- MINOR: New functionality in a backward-compatible manner
- PATCH: Backward-compatible bug fixes

Tags should be created when merging to the `main` branch. 