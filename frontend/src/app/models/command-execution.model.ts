export interface CommandResult {

  command: string;

  status: string;

  exitCode: number;

  logs: string[];

}

export interface CommandExecution {

  status: string;

  startedAt: string;

  finishedAt: string;

  duration: string;

  commands: CommandResult[];

}