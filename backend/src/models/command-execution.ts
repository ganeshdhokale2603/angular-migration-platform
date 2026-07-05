export interface CommandExecution {
  status: string;

  startedAt: Date;

  finishedAt: Date;

  duration: string;

  commands: CommandResult[];
}

export interface CommandResult {
  command: string;

  exitCode: number;

  status: string;

  logs: string[];
}
