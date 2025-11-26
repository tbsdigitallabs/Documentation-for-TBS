# Content Management Guide

This document explains how training module content and quiz questions are managed in the AI Training Platform.

## Overview

The platform uses **MDX files** (Markdown with JSX) to manage all training content. There is no admin dashboard or CMS - content is managed directly in the codebase.

## Content Location

All training content is stored in the `content/` directory:

```
content/
├── developers/           # Artificer (Developer) modules
│   ├── 01-foundation.mdx
│   ├── 02-automated-research-pipelines.mdx
│   └── ...
├── designers/            # Bard (Designer) modules
├── project-managers/     # Paladin (PM) modules
├── content-creators/     # Storyteller modules
├── sales/                # Rogue (Sales) modules
└── shared/               # Session 0 / shared modules
```

## MDX File Structure

Each module file has two parts:

### 1. Frontmatter (YAML metadata)

```yaml
---
title: "Module Title"
description: "Brief description of the module"
estimatedTime: "30 minutes"
difficulty: "Beginner"
questions:
  - id: "q1"
    question: "What is the question text?"
    options:
      - "Option A"
      - "Option B (correct)"
      - "Option C"
      - "Option D"
    correctAnswer: 1  # 0-indexed, so 1 = second option
  - id: "q2"
    question: "Second question?"
    options:
      - "Answer 1"
      - "Answer 2"
      - "Answer 3"
    correctAnswer: 0
---
```

### 2. Markdown Content

Standard markdown with support for:
- Headings, paragraphs, lists
- Code blocks with syntax highlighting
- Images (stored in `public/images/`)
- Links

## Adding a New Module

1. Create a new `.mdx` file in the appropriate role directory
2. Name it with a number prefix for ordering (e.g., `04-new-topic.mdx`)
3. Add frontmatter with title, description, and quiz questions
4. Write the module content in markdown
5. Commit and deploy

## Quiz Questions

### Structure

Each question requires:
- `id`: Unique identifier (e.g., "q1", "q2")
- `question`: The question text
- `options`: Array of possible answers (typically 3-4)
- `correctAnswer`: Zero-indexed position of the correct answer

### Important Notes

- **Option shuffling**: The platform automatically shuffles answer options at runtime, so users cannot predict the correct answer position
- **Vary correct answers**: While shuffling handles randomisation, it's good practice to vary `correctAnswer` values across questions for content clarity
- Quiz scores contribute to XP (50 base + up to 25 bonus based on score)

### Example

```yaml
questions:
  - id: "q1"
    question: "What is the primary benefit of AI-assisted coding?"
    options:
      - "It replaces developers entirely"
      - "It helps automate repetitive tasks and speeds up development"
      - "It only works for Python"
      - "It requires no human oversight"
    correctAnswer: 1
```

## Editing Existing Content

1. Locate the module file in `content/[role]/`
2. Edit the frontmatter (for metadata/questions) or markdown (for content)
3. Save and test locally with `npm run dev`
4. Commit and deploy

## Adding Images

1. Add images to `public/images/`
2. Reference in markdown: `![Alt text](/images/your-image.png)`
3. For placeholder images during development, use: `https://via.placeholder.com/800x600/02022B/D56EED?text=Image`

## Content Style Guidelines

- Use Australian English spelling (colour, organisation, optimise)
- Keep language clear and accessible
- Include practical examples and code snippets
- Add memes/humour where appropriate (TBS brand voice)
- Break complex topics into digestible sections
- Include a "Module Checklist" at the end

## File Naming Convention

```
XX-topic-name.mdx
```

- `XX`: Two-digit number for ordering (01, 02, 03...)
- `topic-name`: Kebab-case topic name
- `.mdx`: File extension

## Testing Changes

```bash
cd ai-training-platform
npm run dev
```

Navigate to the module at `http://localhost:3000/[role]/XX-topic-name`

## Deployment

Content changes deploy automatically via Cloud Build when pushed to the main branch.

