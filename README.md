## 🚀 Project Structure
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

## 🔧 Development

### [DevContainer](https://code.visualstudio.com/docs/devcontainers/containers)
This project has a devcontainer to assist in developer setup. You can open this project in vscode and run `cmd/ctrl+P => Rebuild and reopen in Container`

### Standalone
Vscode and devcontainers are both optional but you will need to [install mise](https://mise.jdx.dev/getting-started.html).

### Setup

```bash
# 1. Install mise tooling
mise install

# 2. Setup/Update workspace
mise initilaize
```

### Tasks
```bash
# Print available tasks
$ mise tasks ls

# Print task info (help, arguments, etc r)
$ mise tasks info [task]

# Examples
mise build     # Build Project
mise serve     # Run dev server
mise lint:fix  # Fix lint errors
```

### Tooling
- [astro](https://github.com/withastro/astro) - web framework
- [biome](https://github.com/biomejs/biome) - js/ts linter/formatter
- [bun](https://github.com/oven-sh/bun) - javascript runtime.
- [lefthook](https://github.com/evilmartians/lefthook) - git hook runner
- [mise](https://github.com/jdx/mise) - tooling management and task runner
- [tombi](https://github.com/tombi-toml/tombi) - toml formatting


## Deployment
Reqires you be logged into gcp. `gcloud auth login`
```bash
# Build
mise build:production

#Deploy
mise deploy gs://psykhe.com
```


## Resources

[Building Astro sites with AI tools](https://docs.astro.build/en/guides/build-with-ai/)

