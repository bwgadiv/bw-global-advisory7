import { v4 as uuidv4 } from "uuid";

type Job = { id: string; name: string; payload: any; createdAt: number };

const jobs: Job[] = [];

export function enqueue(job: Partial<Job> & { payload: any }) {
  const fullJob: Job = {
      id: job.id || uuidv4(),
      name: job.name || "default-job",
      payload: job.payload,
      createdAt: Date.now()
  };
  jobs.push(fullJob);
  // naive immediate processing simulation
  setTimeout(() => processJob(fullJob), 50);
}

async function processJob(job: Job) {
  console.log(`[Queue] Processing job: ${job.name} (${job.id})`);
  // In a real system, this would trigger multi-agent workflows
  // For now, we just acknowledge it.
}
