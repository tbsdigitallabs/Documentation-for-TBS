# Cursor IDE Setup Guide

## Overview

This project includes Cursor AI configuration to ensure consistent code generation, documentation, and adherence to TBS Digital Labs standards.

## Configuration Files

### `.cursorrules`
The main configuration file for Cursor AI in this project. Located in the repository root.

**What it covers**:
- Project context and structure
- Brand guidelines enforcement
- Australian English requirements
- Code style preferences (composition over inline styles)
- Technical standards (Next.js, TypeScript, Tailwind)
- Accessibility requirements
- Development workflow

**Key Rules**:
- ❌ Never use inline styles
- ✅ Always use semantic tokens and composition
- ✅ Use Australian English spelling
- ✅ Follow brand colour palette
- ✅ Maintain WCAG 2.1 AA accessibility

### `.cursor/worktrees.json`
Configuration for Cursor worktrees (git worktree support).

**Current setup**:
- Runs `npm install` when setting up worktrees

## Using Cursor with This Project

### Automatic Configuration
Cursor will automatically read `.cursorrules` when you open this repository. No additional setup required.

### What Cursor Will Do
1. **Enforce brand guidelines** - Suggest brand tokens instead of hardcoded colours
2. **Use Australian English** - Correct spelling to Australian English
3. **Follow code patterns** - Use existing component primitives
4. **Maintain accessibility** - Ensure WCAG compliance
5. **Respect project structure** - Follow file organisation patterns

### Best Practices

**When asking Cursor to generate code**:
- Reference existing components: "Use the `Section` component like in `page.tsx`"
- Specify brand tokens: "Use semantic tokens from `globals.css`"
- Request composition: "Create a component using composition, no inline styles"

**When asking Cursor to create documentation**:
- Specify Australian English: "Write in Australian English"
- Reference style guide: "Follow the Australian English guide"
- Use proper formatting: "Use DD/MM/YYYY date format"

## Customising Configuration

### Adding Project-Specific Rules
Edit `.cursorrules` to add:
- New component patterns
- Additional technical standards
- Project-specific conventions

### Updating Worktree Setup
Edit `.cursor/worktrees.json` to add:
- Additional setup commands
- Environment variable setup
- Database migrations

## Troubleshooting

### Cursor Not Following Rules
1. Ensure `.cursorrules` is in repository root
2. Restart Cursor IDE
3. Check file is not corrupted
4. Verify rules are properly formatted

### Rules Not Applying
- Check Cursor version (latest recommended)
- Ensure project is opened as workspace root
- Verify `.cursorrules` file is tracked in git (if using team settings)

## Integration with Other Tools

### ESLint
Cursor respects ESLint configuration in `ai-training-platform/eslint.config.mjs`

### TypeScript
Cursor uses TypeScript config from `ai-training-platform/tsconfig.json`

### Prettier
If using Prettier, ensure it's configured to work with Cursor's suggestions

## Team Collaboration

### Sharing Configuration
- `.cursorrules` should be committed to repository
- All team members get same Cursor behaviour
- Ensures consistent code generation across team

### Updating Rules
1. Update `.cursorrules` file
2. Commit changes
3. Team members pull latest changes
4. Cursor automatically uses new rules

## Resources

- [Cursor Documentation](https://cursor.sh/docs)
- [Project Cursor Rules](.cursorrules)
- [Brand Guidelines](../brand-guidelines/README.md)
- [Australian English Guide](australian-english-guide.md)

---

**Note**: Cursor AI configuration is project-specific. Each repository can have its own `.cursorrules` file.

