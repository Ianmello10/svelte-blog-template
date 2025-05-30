# SvelteKit Blog Template

Welcome to the SvelteKit Blog Template! This project is designed to help you quickly set up a modern blog using SvelteKit and Markdown. It provides a clean and customizable foundation for creating and managing your blog posts.

## Features

- **SvelteKit Framework**: Leverage the power of SvelteKit for fast and reactive web applications.
- **Markdown Support**: Write your blog posts in Markdown for simplicity and flexibility.
- **Dynamic Routing**: Automatically generate routes for your blog posts based on their filenames.
- **Responsive Design**: Optimized for all screen sizes with a modern and clean UI.
- **Customizable Components**: Easily modify components to match your branding and style.

## Getting Started

### Prerequisites

Make sure you have the following installed:

- [Node.js](https://nodejs.org/) (version 16 or higher)
- [npm](https://www.npmjs.com/) or [pnpm](https://pnpm.io/) or [yarn](https://yarnpkg.com/)

### Installation

1. Clone this repository:

   ```bash
   git clone https://github.com/your-username/sveltekit-blog-template.git
   cd sveltekit-blog-template
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Start the development server:

   ```bash
   npm run dev
   ```

   Your blog will be available at `http://localhost:5173`.

## Writing Blog Posts

Blog posts are written in Markdown and stored in the `src/blog/posts` directory. Each Markdown file represents a blog post. For example:

```markdown
src/blog/posts/first.md
src/blog/posts/second.md
```

### Markdown Format

Each Markdown file can include frontmatter for metadata:

```markdown
---
title: 'My First Blog Post'
date: '2025-05-30'
---

This is the content of your blog post.
```

## Building for Production

To create a production build:

```bash
npm run build
```

You can preview the production build with:

```bash
npm run preview
```

## Contributing

Contributions are welcome! Feel free to open issues or submit pull requests to improve this template.

## Support

If you encounter any issues or have questions, feel free to reach out or open an issue on the repository.

---

Happy blogging!
