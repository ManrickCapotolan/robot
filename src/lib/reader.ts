import readline from 'readline';

const commandReader = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  terminal: false,
});

export const askCommand = async () => {
  return await new Promise<string>(resolve => {
    commandReader.question("> ", resolve)
  });
}
