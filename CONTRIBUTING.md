# Contributing to Pong Game

Thank you for your interest in contributing to the Pong Game project! We welcome contributions from developers of all skill levels.

## 🌟 Ways to Contribute

- 🐛 Report bugs and issues
- 💡 Suggest new features or enhancements
- 📝 Improve documentation
- 🎨 Enhance UI/UX design
- 🔧 Fix bugs and implement features
- 🧪 Write tests
- 🌍 Translate the game to other languages

## 🚀 Getting Started

### 1. Fork the Repository

Click the "Fork" button at the top right of the repository page to create your own copy.

### 2. Clone Your Fork

```bash
git clone https://github.com/YOUR-USERNAME/pong-game.git
cd pong-game
```

### 3. Create a Branch

Create a new branch for your feature or bugfix:

```bash
git checkout -b feature/your-feature-name
# or
git checkout -b fix/your-bugfix-name
```

Use descriptive branch names:
- `feature/two-player-mode`
- `fix/ball-collision-bug`
- `docs/update-readme`
- `style/improve-mobile-layout`

### 4. Make Your Changes

- Write clean, readable code
- Follow the existing code style and conventions
- Test your changes thoroughly
- Ensure the game works in multiple browsers

### 5. Test Your Changes

Before submitting:
- Open `index.html` in multiple browsers (Chrome, Firefox, Safari)
- Test on different screen sizes
- Verify all controls work (mouse and keyboard)
- Check that audio plays correctly
- Ensure no console errors appear

### 6. Commit Your Changes

Write clear, concise commit messages:

```bash
git add .
git commit -m "Add feature: two-player local multiplayer mode"
```

Good commit message examples:
- `Fix: Ball collision detection on fast speeds`
- `Feature: Add power-up system`
- `Docs: Update installation instructions`
- `Style: Improve mobile responsiveness`
- `Refactor: Simplify paddle collision logic`

### 7. Push to Your Fork

```bash
git push origin feature/your-feature-name
```

### 8. Submit a Pull Request

1. Go to the original repository on GitHub
2. Click "New Pull Request"
3. Select your fork and branch
4. Fill out the pull request template
5. Submit for review

## 📋 Pull Request Guidelines

### PR Title Format

Use conventional commit format:
- `feat: Add feature description`
- `fix: Fix bug description`
- `docs: Documentation changes`
- `style: Code style improvements`
- `refactor: Code refactoring`
- `perf: Performance improvements`
- `test: Add or update tests`

### PR Description Should Include

- **What**: Brief description of changes
- **Why**: Reason for the changes
- **How**: Technical approach taken
- **Testing**: How you tested the changes
- **Screenshots**: For visual changes (if applicable)
- **Related Issues**: Link to related issues using `Fixes #123`

### Example PR Description

```markdown
## Description
Adds two-player local multiplayer mode where both players control paddles using keyboard.

## Changes
- Added second player controls (Arrow Up/Down keys)
- Modified game state to support two-player mode
- Added mode selector in UI (AI vs 2-Player)
- Updated documentation

## Testing
- Tested in Chrome, Firefox, and Safari
- Verified both players can control paddles simultaneously
- Confirmed score tracking works correctly for both players

## Screenshots
[Include screenshots if UI changed]

Fixes #42
```

## 💻 Code Style Guidelines

### JavaScript

- Use `const` and `let` instead of `var`
- Use meaningful variable names
- Add comments for complex logic
- Keep functions small and focused
- Use semicolons consistently

```javascript
// Good
const gameWidth = 800;
const paddleHeight = 100;

function updateBallPosition() {
  ballX += ballSpeedX;
  ballY += ballSpeedY;
}

// Avoid
var w = 800;
var h = 100;

function doStuff() {
  // 50 lines of code
}
```

### CSS

- Use meaningful class names
- Group related properties
- Add comments for sections
- Maintain consistent indentation

```css
/* Good */
.paddle {
  position: absolute;
  width: 10px;
  height: 100px;
  background: white;
}

.paddle.left {
  left: 0;
}

/* Avoid */
.p {
  position: absolute; width: 10px; height: 100px; background: white;
}
```

### HTML

- Use semantic HTML5 elements
- Maintain proper indentation
- Add alt text for images
- Use lowercase for tags and attributes

## 🐛 Reporting Bugs

### Before Reporting

1. Check if the bug has already been reported in [Issues](../../issues)
2. Try to reproduce the bug in multiple browsers
3. Note your browser version and operating system

### Bug Report Template

```markdown
## Bug Description
Clear description of the bug

## Steps to Reproduce
1. Go to '...'
2. Click on '...'
3. See error

## Expected Behavior
What should happen

## Actual Behavior
What actually happens

## Environment
- Browser: Chrome 120
- OS: Windows 11
- Screen Resolution: 1920x1080

## Screenshots
[If applicable]

## Additional Context
Any other relevant information
```

## 💡 Suggesting Features

### Feature Request Template

```markdown
## Feature Description
Clear description of the proposed feature

## Problem it Solves
What problem does this feature address?

## Proposed Solution
How should this feature work?

## Alternatives Considered
What other approaches did you consider?

## Additional Context
Mockups, examples, or related features from other games
```

## 🔍 Code Review Process

1. **Automated Checks**: Ensure code passes any automated checks
2. **Peer Review**: At least one maintainer will review your code
3. **Feedback**: Address any requested changes
4. **Approval**: Once approved, your PR will be merged
5. **Recognition**: Your contribution will be acknowledged!

## 🎯 Priority Areas

We're especially interested in contributions for:

1. **Mobile Support**: Touch controls and responsive design improvements
2. **Accessibility**: ARIA labels, keyboard navigation, screen reader support
3. **Performance**: Optimization for smoother gameplay
4. **Testing**: Unit tests and integration tests
5. **Documentation**: Tutorials, code comments, and examples

## 📚 Resources

- [MDN Web Docs](https://developer.mozilla.org/) - Web development reference
- [Web Audio API Guide](https://developer.mozilla.org/en-US/docs/Web/API/Web_Audio_API)
- [Canvas API Tutorial](https://developer.mozilla.org/en-US/docs/Web/API/Canvas_API)
- [Git Tutorial](https://git-scm.com/docs/gittutorial)

## ❓ Questions?

- Open an issue for discussion
- Tag maintainers for urgent questions
- Be patient and respectful

## 🏆 Recognition

Contributors will be:
- Listed in the project README
- Credited in release notes
- Given maintainer status for sustained contributions

## 📜 Code of Conduct

### Our Pledge

We are committed to providing a welcoming and inclusive environment for everyone, regardless of:
- Age, body size, disability, ethnicity, gender identity and expression
- Level of experience, education, socio-economic status
- Nationality, personal appearance, race, religion
- Sexual identity and orientation

### Our Standards

**Positive behavior includes:**
- Using welcoming and inclusive language
- Being respectful of differing viewpoints
- Accepting constructive criticism gracefully
- Focusing on what's best for the community
- Showing empathy towards others

**Unacceptable behavior includes:**
- Harassment, trolling, or discriminatory comments
- Personal or political attacks
- Public or private harassment
- Publishing others' private information
- Other conduct inappropriate in a professional setting

### Enforcement

Violations may result in:
1. Warning
2. Temporary ban
3. Permanent ban

Report issues to project maintainers.

## 🙏 Thank You!

Every contribution, no matter how small, makes a difference. Thank you for helping make Pong Game better!

---

**Happy Coding! 🎮**