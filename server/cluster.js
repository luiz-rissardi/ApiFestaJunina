import cluster from "cluster";
import os from "os";

async function primaryWorker(){
    const processCount = os.cpus().length *2;
    for(let i=0;i<processCount;i++){
        cluster.fork();
    }
}

async function processWorker(){
    await import("./index.js");
}



cluster.isPrimary ? primaryWorker() : processWorker();
