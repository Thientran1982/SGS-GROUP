import { spawn } from "node:child_process";

const children = [
  spawn(process.execPath, ["server.mjs"], { stdio: "inherit", env: process.env }),
  spawn("vite", [], { stdio: "inherit", shell: true, env: process.env }),
];

let shuttingDown = false;

function shutdown(signal) {
  if (shuttingDown) return;
  shuttingDown = true;
  for (const child of children) child.kill(signal);
}

for (const signal of ["SIGINT", "SIGTERM"]) {
  process.on(signal, () => shutdown(signal));
}

for (const child of children) {
  child.on("exit", (code, signal) => {
    if (!shuttingDown) {
      shutdown("SIGTERM");
      process.exit(code ?? (signal ? 1 : 0));
    }
  });
}