"use strict";

const server = require("./server");
const Queue = require("./Queue");

const queue = new Queue();

async function getDependencies(pkgName, callback) {
  let deps = [];
  queue.enqueue(pkgName);

  while (queue.length > 0) {
    let item = queue.dequeue();

    const { dependencies } = await server(item);
    if (dependencies) {
      Object.keys(dependencies)
        .filter((i) => deps.findIndex((it) => it === i) === -1)
        .forEach((i) => queue.enqueue(i));
    }
    deps.push(item);
  }
  callback(deps);
}

getDependencies("forever", (res) => console.log(res));
