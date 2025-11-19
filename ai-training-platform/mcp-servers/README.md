# MCP Server for AI Training Platform

## Current Status

This MCP (Model Context Protocol) server configuration is a **template/example** for training purposes. It defines the structure and schema for a unified training server but is **not currently implemented**.

## Purpose

This JSON configuration file serves as:
1. **Training example** - Shows how MCP servers are structured
2. **Reference template** - Provides schema for future implementation
3. **Documentation** - Demonstrates MCP server tool definitions

## Available Server

### AI Training Server (`ai-training-server.json`)
Unified server combining essential training tools for TBS Digital Labs:

**Tools** (15 total):

**Development Training**:
- `cursor_ide_demo` - Demonstrates Cursor IDE features (autocomplete, chat, codebase, refactor, debug)
- `github_workflow_demo` - Demonstrates GitHub workflows (pull_request, code_review, branching, ci_cd)
- `project_structure_guide` - Provides guidance on project structure (web_app, api, monorepo)

**Content & Assessment Management**:
- `create_quiz` - Creates quizzes/questionnaires with multiple question types
- `grade_assessment` - Grades assessments and calculates scores/XP
- `create_content_module` - Creates training modules with lessons and metadata

**Progress & Gamification**:
- `track_progress` - Tracks user progress for modules and lessons
- `award_achievement` - Awards achievements/badges to users
- `calculate_xp` - Calculates and awards XP for activities
- `update_user_level` - Updates user level based on XP thresholds
- `get_leaderboard` - Retrieves leaderboards (XP, level, completion, streaks)

**Analytics & Insights**:
- `get_user_analytics` - Comprehensive user analytics (progress, achievements, XP history)
- `get_module_analytics` - Module analytics (completion rates, scores, engagement)

**User Management**:
- `manage_user_enrollment` - Manages user enrollment in roles/classes
- `generate_learning_path` - Generates personalised learning paths

## Implementation Status

**Current**: Configuration schema only (JSON file)
**Missing**: 
- `index.js` implementation file
- Runtime server code
- Package dependencies
- Connection to MCP SDK

## Future Implementation

If you want to implement this server:

1. **Install dependencies**:
```bash
cd ai-training-platform/mcp-servers
npm init -y
npm install @modelcontextprotocol/sdk@^1.20.1
```

2. **Create `index.js`** for the server:
```javascript
import { Server } from '@modelcontextprotocol/sdk/server/index.js';
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js';

const server = new Server({
  name: 'ai-training-server',
  version: '1.0.0',
}, {
  capabilities: {
    tools: {},
  },
});

// Implement tool handlers for all 15 tools:
// Development: cursor_ide_demo, github_workflow_demo, project_structure_guide
// Content: create_quiz, grade_assessment, create_content_module
// Gamification: track_progress, award_achievement, calculate_xp, update_user_level, get_leaderboard
// Analytics: get_user_analytics, get_module_analytics
// User Management: manage_user_enrollment, generate_learning_path
// See MCP SDK documentation for details

const transport = new StdioServerTransport();
await server.connect(transport);
```

3. **Configure in Cursor**:
   - Add server to Cursor's MCP configuration
   - Set up environment variables if needed
   - Test tool execution

## Design Decisions

**Comprehensive LMS Tools**: Expanded from 3 basic tools to 15 comprehensive LMS tools
- **Development Training**: Cursor IDE, GitHub workflows, project structure (3 tools)
- **Content Management**: Quiz creation, assessment grading, module creation (3 tools)
- **Gamification**: Progress tracking, achievements, XP system, levels, leaderboards (5 tools)
- **Analytics**: User analytics, module analytics (2 tools)
- **User Management**: Enrollment management, learning path generation (2 tools)
- **Focused**: Complete LMS functionality for training platform with questionnaires and gamification

## Alternative: Use Existing MCP Servers

Instead of implementing a custom server, consider using:
- Official MCP servers from npm
- Community-maintained servers (GitHub, filesystem, etc.)
- Cursor's built-in MCP integrations

## Training Use Case

These configurations are suitable for:
- Teaching MCP server structure
- Demonstrating tool schema design
- Training on MCP protocol concepts
- Reference for building custom servers

## Notes

- This file is **not functional** without implementation code
- Follows MCP protocol specifications
- Tool schemas are well-defined and ready for implementation
- Consider this as a **blueprint** rather than a working server
- Comprehensive LMS toolset (15 tools) covering all aspects of learning management

---

**Last Updated**: Expanded to comprehensive LMS server with 15 tools covering content management, assessments, gamification, progress tracking, analytics, and user management.

