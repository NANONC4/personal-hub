# Project Rules

- **Performance First**: DO NOT use `backdrop-blur` or similar heavy CSS filter effects (like `backdrop-blur-sm`, `backdrop-blur-md`, etc.) anywhere in this project. They cause severe scrolling lag, especially when combined with Framer Motion, parallax effects, or horizontal scrolling containers. Always use solid colors or semi-transparent solid colors (e.g., `bg-white/90` or `bg-black/80`) instead of blurring.
## Project Vision & Audience
- This website is a personal playground and blog, NOT a corporate portfolio for HR.
- Prioritize pure self-expression, crazy interactive ideas, and hidden easter eggs.
- It is okay to hide information behind games or puzzles. It is for people who are genuinely interested enough to interact with it.

## AI Assistant Behavior (Workflow)
- **Fast Execution / Less Approval**: The user prefers fast execution and is too lazy to approve every implementation plan. DO NOT set `RequestFeedback: true` in artifacts and DO NOT stop and wait for approval for typical tasks (e.g., UI tweaks, features, refactors). Only ask for explicit approval if the change is highly destructive, irreversibly impacts production data, or if you are completely blocked by ambiguity. Proceed directly to execution for 95% of tasks.
