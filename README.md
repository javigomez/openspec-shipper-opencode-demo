# OpenSpec Shipper Demo

Tiny Node.js Hello World project prepared to show `openspec-shipper` in action with OpenSpec.

```bash
npm install -D openspec-shipper
npx openspec-shipper init
```

From this repository, after installing and initializing the package:

```bash
npx openspec-shipper doctor
```

Now you are ready to create a small batch of changes to implement through the queue.

The repository includes three active OpenSpec changes for a queue demo:

```text
openspec/changes/add-name-greeting
openspec/changes/add-spanish-greeting
openspec/changes/add-shouting-greeting
```

Either copy the change names into `.openspec-shipper/queue.md` like:

```md
- [ ] deliver add-name-greeting
- [ ] deliver add-spanish-greeting
- [ ] deliver add-shouting-greeting
```

Or use the CLI commands:

```bash
npx openspec-shipper queue add add-name-greeting
npx openspec-shipper queue add add-spanish-greeting --depends-on add-name-greeting
npx openspec-shipper queue add add-shouting-greeting --depends-on add-spanish-greeting
npx openspec-shipper queue dry-run
```

When the dry-run looks right, run one queue step:

```bash
npx openspec-shipper queue next
```

The default `deliver` flow is:

```text
apply -> ship -> waiting_for_merge -> sync -> archive
```

`ship` pushes the implementation branch, and `archive` archives the merged OpenSpec change and cleans up the local implementation worktree when it is safe.
