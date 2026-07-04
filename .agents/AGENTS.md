# Project Rules

- **Performance First**: DO NOT use `backdrop-blur` or similar heavy CSS filter effects (like `backdrop-blur-sm`, `backdrop-blur-md`, etc.) anywhere in this project. They cause severe scrolling lag, especially when combined with Framer Motion, parallax effects, or horizontal scrolling containers. Always use solid colors or semi-transparent solid colors (e.g., `bg-white/90` or `bg-black/80`) instead of blurring.
