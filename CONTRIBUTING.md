# Contributing to RiderGuy

Thank you for your interest in contributing to RiderGuy! This document provides guidelines and instructions for contributing to the project.

## Table of Contents

- [Code of Conduct](#code-of-conduct)
- [Getting Started](#getting-started)
- [Development Workflow](#development-workflow)
- [Coding Standards](#coding-standards)
- [Commit Guidelines](#commit-guidelines)
- [Pull Request Process](#pull-request-process)
- [Testing Guidelines](#testing-guidelines)
- [Documentation](#documentation)

## Code of Conduct

### Our Pledge

We are committed to providing a welcoming and inspiring community for all. Please be respectful and constructive in your interactions.

### Our Standards

**Positive behaviors:**
- Using welcoming and inclusive language
- Being respectful of differing viewpoints
- Gracefully accepting constructive criticism
- Focusing on what is best for the community
- Showing empathy towards others

**Unacceptable behaviors:**
- Harassment, trolling, or discriminatory comments
- Publishing others' private information
- Other conduct which could reasonably be considered inappropriate

## Getting Started

1. **Fork the repository** on GitHub
2. **Clone your fork** locally:
   ```bash
   git clone https://github.com/YOUR_USERNAME/riderguy.git
   cd riderguy
   ```
3. **Add upstream remote**:
   ```bash
   git remote add upstream https://github.com/riderguy/riderguy.git
   ```
4. **Install dependencies**:
   ```bash
   npm install
   ```
5. **Create a branch**:
   ```bash
   git checkout -b feature/your-feature-name
   ```

## Development Workflow

### 1. Keep Your Fork Updated

```bash
git fetch upstream
git checkout main
git merge upstream/main
```

### 2. Create a Feature Branch

```bash
git checkout -b feature/amazing-feature
# or
git checkout -b fix/bug-fix
```

Branch naming conventions:
- `feature/` - New features
- `fix/` - Bug fixes
- `docs/` - Documentation changes
- `refactor/` - Code refactoring
- `test/` - Adding tests
- `chore/` - Maintenance tasks

### 3. Make Your Changes

- Write clean, readable code
- Follow our coding standards
- Add tests for new features
- Update documentation as needed
- Ensure all tests pass

### 4. Commit Your Changes

```bash
git add .
git commit -m "feat: add amazing feature"
```

See [Commit Guidelines](#commit-guidelines) below.

### 5. Push to Your Fork

```bash
git push origin feature/amazing-feature
```

### 6. Open a Pull Request

Go to the repository on GitHub and click "New Pull Request".

## Coding Standards

### TypeScript/JavaScript

**General Rules:**
- Use TypeScript for all new code
- Use `const` by default, `let` when needed, never `var`
- Prefer functional programming patterns
- Use async/await over callbacks
- Handle errors explicitly

**Example:**
```typescript
// Good ✅
const getUserById = async (id: string): Promise<User> => {
  try {
    const user = await db.users.findById(id);
    if (!user) {
      throw new ApiError(404, 'User not found');
    }
    return user;
  } catch (error) {
    logger.error('Failed to get user', { id, error });
    throw error;
  }
};

// Bad ❌
function getUserById(id, callback) {
  db.users.findById(id, function(err, user) {
    if (err) return callback(err);
    callback(null, user);
  });
}
```

### React Components

**Rules:**
- Use functional components with hooks
- Extract complex logic into custom hooks
- Keep components small and focused
- Use TypeScript for props

**Example:**
```typescript
// Good ✅
interface ButtonProps {
  label: string;
  onClick: () => void;
  disabled?: boolean;
}

export function Button({ label, onClick, disabled = false }: ButtonProps) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className="px-4 py-2 rounded bg-primary text-white"
    >
      {label}
    </button>
  );
}

// Bad ❌
export function Button(props) {
  return <button onClick={props.onClick}>{props.label}</button>;
}
```

### Naming Conventions

- **Files**: `kebab-case.ts` (e.g., `auth-service.ts`)
- **Components**: `PascalCase.tsx` (e.g., `UserProfile.tsx`)
- **Functions**: `camelCase` (e.g., `getUserById`)
- **Constants**: `UPPER_SNAKE_CASE` (e.g., `MAX_RETRY_ATTEMPTS`)
- **Interfaces**: `PascalCase` (e.g., `UserProfile`)
- **Types**: `PascalCase` (e.g., `RequestStatus`)

### Code Formatting

We use Prettier for consistent formatting:

```bash
npm run format
```

**Settings:**
- Indent: 2 spaces
- Max line length: 100 characters
- Trailing commas: ES5
- Single quotes: Yes
- Semicolons: Yes

## Commit Guidelines

We follow [Conventional Commits](https://www.conventionalcommits.org/):

### Format

```
<type>(<scope>): <subject>

<body>

<footer>
```

### Types

- `feat`: New feature
- `fix`: Bug fix
- `docs`: Documentation changes
- `style`: Code style changes (formatting, etc.)
- `refactor`: Code refactoring
- `test`: Adding or updating tests
- `chore`: Maintenance tasks
- `perf`: Performance improvements
- `ci`: CI/CD changes

### Examples

```bash
feat(auth): add 2FA support

Implement two-factor authentication using TOTP.
Users can now enable 2FA from their profile settings.

Closes #123
```

```bash
fix(wallet): prevent negative balance

Add validation to ensure wallet balance cannot go negative.
Includes comprehensive test coverage.

Fixes #456
```

### Rules

- Use present tense ("add feature" not "added feature")
- Use imperative mood ("move cursor" not "moves cursor")
- First line should be 72 characters or less
- Reference issues and PRs when applicable

## Pull Request Process

### Before Submitting

1. **Update your branch** with latest main:
   ```bash
   git fetch upstream
   git rebase upstream/main
   ```

2. **Run tests**:
   ```bash
   npm test
   ```

3. **Run linting**:
   ```bash
   npm run lint
   ```

4. **Check types**:
   ```bash
   npm run type-check
   ```

5. **Build successfully**:
   ```bash
   npm run build
   ```

### PR Title

Follow the same format as commit messages:
```
feat(auth): add OAuth2 support
```

### PR Description

Use this template:

```markdown
## Description
Brief description of the changes.

## Type of Change
- [ ] Bug fix
- [ ] New feature
- [ ] Breaking change
- [ ] Documentation update

## Related Issues
Closes #123
Related to #456

## Testing
Describe how you tested your changes.

## Screenshots (if applicable)
Add screenshots here.

## Checklist
- [ ] Code follows style guidelines
- [ ] Self-reviewed my code
- [ ] Commented complex code
- [ ] Updated documentation
- [ ] Added tests
- [ ] All tests pass
- [ ] No new warnings
```

### Review Process

- At least **2 approvals** required
- All **CI checks must pass**
- No **merge conflicts**
- **Squash and merge** is preferred

## Testing Guidelines

### Unit Tests

Place unit tests next to the code they test:
```
src/
  services/
    auth.service.ts
    auth.service.test.ts
```

### Test Structure

```typescript
describe('AuthService', () => {
  describe('login', () => {
    it('should return tokens for valid credentials', async () => {
      // Arrange
      const email = 'test@example.com';
      const password = 'password123';

      // Act
      const result = await authService.login(email, password);

      // Assert
      expect(result).toHaveProperty('accessToken');
      expect(result).toHaveProperty('refreshToken');
    });

    it('should throw error for invalid credentials', async () => {
      // Arrange
      const email = 'test@example.com';
      const password = 'wrong-password';

      // Act & Assert
      await expect(
        authService.login(email, password)
      ).rejects.toThrow('Invalid credentials');
    });
  });
});
```

### Test Coverage

- **Minimum**: 80% coverage
- **Goal**: 90%+ coverage
- All new features must include tests
- All bug fixes must include regression tests

### Running Tests

```bash
# All tests
npm test

# Watch mode
npm test -- --watch

# Coverage
npm test -- --coverage

# Specific service
npm test --workspace=auth-service
```

## Documentation

### Code Documentation

**Functions:**
```typescript
/**
 * Authenticates a user and returns JWT tokens.
 *
 * @param email - User's email address
 * @param password - User's password
 * @returns Access and refresh tokens
 * @throws {ApiError} When credentials are invalid
 */
async function login(email: string, password: string): Promise<Tokens> {
  // Implementation
}
```

**Complex Logic:**
```typescript
// Calculate XP bonus based on delivery streak
// Streak bonus increases by 10% every 5 days
const streakBonus = Math.floor(streak / 5) * 0.1;
const xpEarned = baseXP * (1 + streakBonus);
```

### README Updates

Update relevant READMEs when:
- Adding new features
- Changing configuration
- Modifying architecture
- Adding new dependencies

### API Documentation

Update `docs/api/README.md` when:
- Adding new endpoints
- Changing request/response formats
- Updating authentication requirements
- Modifying error codes

## Questions?

- **Slack**: #riderguy-dev
- **Email**: dev@riderguy.io
- **GitHub Issues**: For bugs and feature requests

## License

By contributing, you agree that your contributions will be licensed under the same license as the project.

---

Thank you for contributing to RiderGuy! 🚀
