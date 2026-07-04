# OpenSpec Orchester Demo

Tiny Node.js hello world project prepared to show Orchester in action.

```bash
npm run start
npm run check
```

The repository includes one active OpenSpec change:

```text
openspec/changes/add-name-greeting
```

From the Orchester repository, point `.env` at this demo and use:

```bash
bun run target:doctor /Users/javigomez/Documents/projects/openspec-demo
bun run queue:dry-run
```

The demo keeps push and archive safety disabled in `.orchester/config.json` by
default, so first runs stop before mutating remotes.
