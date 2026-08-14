# Project Rules

- **Performance First**: DO NOT use `backdrop-blur` or similar heavy CSS filter effects (like `backdrop-blur-sm`, `backdrop-blur-md`, etc.) anywhere in this project. They cause severe scrolling lag, especially when combined with Framer Motion, parallax effects, or horizontal scrolling containers. Always use solid colors or semi-transparent solid colors (e.g., `bg-white/90` or `bg-black/80`) instead of blurring.
## Project Vision & Audience
- This website is a personal playground and blog, NOT a corporate portfolio for HR.
- Prioritize pure self-expression, crazy interactive ideas, and hidden easter eggs.
## AI Assistant Behavior (Workflow)
- **Fast Execution / Less Approval**: If the user gives a direct instruction to build or fix something, execute it directly without stopping for an `implementation_plan` (unless it is highly destructive). DO NOT set `RequestFeedback: true` for direct tasks.
- **Brainstorming / Ideas First**: If the user explicitly asks for "ideas", "opinions", or "how should we do this?", you MUST STOP, present the ideas clearly, and wait for the user to choose or discuss. DO NOT write code or execute changes when the user is just asking for ideas.
