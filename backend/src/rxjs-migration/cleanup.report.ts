export interface CleanupReport {
  destroySubjects: number;

  takeUntilDestroyedCandidates: number;

  destroyRefDetected: boolean;

  migrated: number;
}
