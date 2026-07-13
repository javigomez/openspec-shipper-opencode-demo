export function greeting(name) {
  const trimmed = name?.trim();
  if (trimmed) {
    return `Hello, ${trimmed}!`;
  }
  return "Hello, world!";
}

if (import.meta.url === `file://${process.argv[1]}`) {
  console.log(greeting(process.argv[2]));
}
