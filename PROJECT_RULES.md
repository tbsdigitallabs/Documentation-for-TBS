# Project Rules and Standards

## 1. Taxonomy & Directory Structure

### Root Directory
- `docs/`: General project documentation.
- `design_references/`: Design assets, Stitch exports, and reference images.
- `ai-training-platform/`: Next.js Frontend application.
- `ai-training-platform-laravel/`: Laravel Backend application.

### Documentation (`docs/`)
- All documentation files must be in **kebab-case** (e.g., `deployment-guide.md`, not `DEPLOYMENT.md`).
- Documentation should be categorized into subdirectories where appropriate (e.g., `docs/setup/`, `docs/api/`).

## 2. Metadata Standards

### Markdown Frontmatter
All markdown documentation files must include the following YAML frontmatter:

```yaml
---
title: [Human Readable Title]
description: [Brief description of the document's purpose]
last_updated: [YYYY-MM-DD]
author: TBS Digital Labs
category: [Setup | Deployment | Guide | Reference]
---
```

### Code File Headers

#### TypeScript/JavaScript Files
All `.ts`, `.tsx`, `.js`, `.jsx` files should include a header comment:

```typescript
/**
 * @file [filename.tsx]
 * @description [Brief description of file's purpose]
 * @module [ModuleName] (if applicable)
 * @category [Component | Page | Utility | Hook | API | Service]
 * @author TBS Digital Labs
 * @lastModified [YYYY-MM-DD]
 */
```

#### PHP Files
All `.php` files should include a header comment:

```php
<?php
/**
 * @file [FileName.php]
 * @description [Brief description of file's purpose]
 * @package [PackageName]
 * @category [Controller | Model | Service | Middleware | Helper]
 * @author TBS Digital Labs
 * @lastModified [YYYY-MM-DD]
 */
```

## 3. File Naming Conventions

- **Documentation**: `kebab-case.md`
- **Images**: `kebab-case.png` (or .jpg, .svg)
- **Code Files**: Follow framework conventions:
    - Next.js: `PascalCase.tsx` for components, `kebab-case` for directories/routes.
    - Laravel: `PascalCase.php` for classes, `snake_case` for config/views.

## 4. Codebase Taxonomy

### Component Organization (Next.js)

```
src/
├── components/          # Reusable UI components
│   ├── ui/             # Base UI elements (buttons, cards, etc.)
│   ├── layout/         # Layout components (nav, sidebar, etc.)
│   └── modules/        # Feature-specific components
├── app/                # Next.js app directory (routes)
├── lib/                # Utility functions and helpers
└── hooks/              # Custom React hooks
```

### Backend Organization (Laravel)

```
app/
├── Http/
│   ├── Controllers/    # Request handlers
│   ├── Middleware/     # Request/response filters
│   └── Requests/       # Form validation
├── Models/             # Database models
├── Services/           # Business logic
└── Helpers/            # Utility functions
```

## 5. Code Documentation Standards

### Component Documentation
Every React component should include:

```typescript
/**
 * ComponentName
 * 
 * @description [What this component does]
 * @category [UI | Layout | Module]
 * 
 * @example
 * ```tsx
 * <ComponentName prop1="value" />
 * ```
 * 
 * @param {Props} props - Component properties
 * @returns {JSX.Element}
 */
```

### Function Documentation
All exported functions should include JSDoc:

```typescript
/**
 * [Function description]
 * 
 * @param {Type} paramName - Parameter description
 * @returns {ReturnType} Description of return value
 * @throws {ErrorType} When error occurs
 * 
 * @example
 * ```typescript
 * functionName(param);
 * ```
 */
```

### Class Documentation (PHP)
All classes should include PHPDoc:

```php
/**
 * Class ClassName
 * 
 * @description [What this class does]
 * @category [Controller | Model | Service]
 * 
 * @package App\[Namespace]
 * @author TBS Digital Labs
 */
```

## 6. Searchability & Discoverability

### Tagging System
Use consistent tags in comments for easy searching:

- `@TODO`: Tasks to be completed
- `@FIXME`: Known issues that need fixing
- `@HACK`: Temporary solutions that need proper implementation
- `@NOTE`: Important information for future developers
- `@SECURITY`: Security-related code or considerations
- `@PERFORMANCE`: Performance-critical code

### Naming Conventions for Searchability

- **Constants**: `SCREAMING_SNAKE_CASE` (e.g., `MAX_UPLOAD_SIZE`)
- **Environment Variables**: `SCREAMING_SNAKE_CASE` (e.g., `GOOGLE_CLIENT_ID`)
- **Functions**: `camelCase` (e.g., `getUserData`)
- **Classes**: `PascalCase` (e.g., `AuthController`)
- **Interfaces/Types**: `PascalCase` with `I` prefix for interfaces (e.g., `IUserData`)

## 7. Code Quality

### Comments
- **What, not how**: Explain *why* code exists, not *what* it does (code should be self-documenting).
- **Complex logic**: Always comment non-obvious algorithms or business rules.
- **API integrations**: Document external service interactions.

### Formatting
- **JavaScript/TypeScript**: Follow Prettier configuration.
- **PHP**: Follow PSR-12 standards.
- **Indentation**: 2 spaces for JS/TS, 4 spaces for PHP.

## 8. Version Control

### Commit Messages
Follow conventional commits format:

```
<type>(<scope>): <description>

[optional body]

[optional footer]
```

Types: `feat`, `fix`, `docs`, `style`, `refactor`, `test`, `chore`

Example:
```
feat(auth): add domain restriction for Google OAuth

- Added allowed domains array
- Updated signIn callback
- Closes #123
```

## 9. Testing Standards

### Test File Naming
- **Unit tests**: `[filename].test.ts` or `[filename].spec.ts`
- **Integration tests**: `[feature].integration.test.ts`
- **E2E tests**: `[flow].e2e.test.ts`

### Test Documentation
```typescript
/**
 * @testSuite [ComponentName] Tests
 * @description Tests for [ComponentName] component
 */
describe('ComponentName', () => {
  /**
   * @test Should render correctly with default props
   */
  it('renders with default props', () => {
    // Test implementation
  });
});
```

## 10. Security & Secrets

- **Never commit secrets**: Use environment variables and Secret Manager.
- **Sensitive data**: Mark with `@SECURITY` tag in comments.
- **API keys**: Always use `.env` files (never hardcode).
- **Credentials**: Store in Google Cloud Secret Manager for production.

## 11. Accessibility

- All UI components must include ARIA labels where appropriate.
- Color contrast must meet WCAG AA standards.
- Keyboard navigation must be fully supported.
- Document accessibility considerations with `@a11y` tag.

## 12. Performance

- Mark performance-critical code with `@PERFORMANCE` tag.
- Document optimization decisions.
- Include benchmarks for critical paths where applicable.

