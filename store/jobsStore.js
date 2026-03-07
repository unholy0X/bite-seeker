import { create } from "zustand";

export const ACTIVE_STATUSES = ["pending", "downloading", "processing", "extracting"];
export const TERMINAL_STATUSES = new Set(["completed", "failed", "cancelled"]);

// Auto-expire completed jobs from the sheet after this many ms
const COMPLETED_JOB_TTL = 5 * 60_000; // 5 minutes

export const useJobsStore = create((set) => ({
  // Currently in-progress jobs (drives the badge count)
  activeJobs: [],

  // Recently finished jobs shown briefly in the sheet
  completedJobs: [],

  setActiveJobs: (jobs) => set({ activeJobs: jobs }),

  // Optimistically add a just-created job so the notification center shows it
  // immediately and the polling interval starts without waiting for the first poll.
  addActiveJob: (job) =>
    set((state) => {
      const id = job.id ?? job.jobId;
      if (id && state.activeJobs.some((j) => (j.id ?? j.jobId) === id)) {
        return state; // already tracked
      }
      return { activeJobs: [...state.activeJobs, job] };
    }),

  addCompletedJob: (job) =>
    set((state) => {
      const id = job.id ?? job.jobId;
      // Guard against duplicate additions (e.g. component re-mount resets notifiedRef)
      if (id && state.completedJobs.some((j) => (j.id ?? j.jobId) === id)) {
        return state;
      }
      return {
        completedJobs: [
          { ...job, _completedAt: Date.now() },
          ...state.completedJobs,
        ].slice(0, 5), // keep last 5 only
      };
    }),

  removeCompletedJob: (id) =>
    set((state) => ({
      completedJobs: state.completedJobs.filter(
        (j) => (j.id ?? j.jobId) !== id
      ),
    })),

  clearExpiredCompleted: () =>
    set((state) => ({
      completedJobs: state.completedJobs.filter(
        // Guard: jobs without _completedAt (e.g. rehydrated from storage) are
        // kept rather than silently dropped via NaN comparison.
        (j) => !j._completedAt || Date.now() - j._completedAt < COMPLETED_JOB_TTL
      ),
    })),
}));
