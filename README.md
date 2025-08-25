## 🚀 Project Structure

Inside of your Astro project, you'll see the following folders and files:

```text
/
├── public/
│   └── favicon.svg
├── src
│   ├── assets
│   │   └── astro.svg
│   ├── components
│   │   └── Welcome.astro
│   ├── layouts
│   │   └── Layout.astro
│   └── pages
│       └── index.astro
└── package.json
```

To learn more about the folder structure of an Astro project, refer to [our guide on project structure](https://docs.astro.build/en/basics/project-structure/).

## 🧞 Commands

All commands are run from the root of the project, from a terminal:

| Command                   | Action                                           |
|:--------------------------|:-------------------------------------------------|
| `npm install`             | Installs dependencies                            |
| `npm run lint`            | Project linting                                  |
| `npm run lint:fix`        | Fix automatically lint errors                    |
| `npm run dev`             | Starts local dev server at `localhost:4321`      |
| `npm run build`           | Build your production site to `./dist/`          |
| `npm run preview`         | Preview your build locally, before deploying     |
| `npm run astro ...`       | Run CLI commands like `astro add`, `astro check` |
| `npm run astro -- --help` | Get help using the Astro CLI                     |

## 🔧 Development Setup

This project uses [Lefthook](https://github.com/evilmartians/lefthook) for git hooks to maintain code quality.

### Git Hooks
- **Pre-commit**: Automatically runs `npm run lint` before each commit
- Hooks are installed automatically when you run `npm install`
- If linting fails, the commit will be blocked

### Manual Hook Commands
```sh
npx lefthook install    # Install git hooks
npx lefthook run pre-commit  # Test pre-commit hook manually
```

