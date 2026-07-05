# OpenSpec Shipper Demo

Tiny Node.js hello world project prepared to show `openspec-shipper` in action.

```bash
npm install
npm run start
npm run check
```

The repository includes three active OpenSpec changes for a queue demo:

```text
openspec/changes/add-name-greeting
openspec/changes/add-spanish-greeting
openspec/changes/add-shouting-greeting
```

From this repository, after installing the package:

```bash
npx openspec-shipper doctor
npx openspec-shipper queue add add-name-greeting
npx openspec-shipper queue add add-spanish-greeting --depends-on add-name-greeting
npx openspec-shipper queue add add-shouting-greeting --depends-on add-spanish-greeting
npx openspec-shipper queue dry-run
```

For the GIF, start from `queue.example.md` or rebuild the queue with the commands
above. The demo keeps push and archive safety disabled in
`.openspec-shipper/config.json` by default, so first runs stop before mutating
remotes.
