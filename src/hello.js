export function greeting() {
  return "Hello, world!";
}

if (import.meta.url === `file://${process.argv[1]}`) {
  console.log(greeting());
}
