const { spawn } = require('child_process');
const net = require('net');

function checkPort(port) {
  return new Promise((resolve) => {
    const server = net.createServer();
    server.listen(port, () => {
      server.once('close', () => resolve(true));
      server.close();
    });
    server.on('error', () => resolve(false));
  });
}

async function getAvailablePort() {
  for (let port = 3000; port <= 3010; port++) {
    if (await checkPort(port)) {
      return port;
    }
  }
  return 3000;
}

(async () => {
  const port = await getAvailablePort();
  // Use --webpack to disable Turbopack (fixes jsx-dev-runtime HMR issue)
  // Use pnpm exec to ensure next is found in node_modules/.bin
  const isWindows = process.platform === 'win32';
  const command = isWindows ? 'pnpm' : 'next';
  const args = isWindows ? ['exec', 'next', 'dev', '--webpack', '-p', port.toString()] : ['dev', '--webpack', '-p', port.toString()];
  
  const proc = spawn(command, args, {
    stdio: 'inherit',
    shell: true,
    env: process.env
  });

  proc.on('exit', (code) => process.exit(code || 0));
  process.on('SIGINT', () => proc.kill('SIGINT'));
  process.on('SIGTERM', () => proc.kill('SIGTERM'));
})();

