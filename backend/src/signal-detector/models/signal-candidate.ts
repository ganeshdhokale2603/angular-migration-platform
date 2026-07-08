export interface SignalCandidate {
  file: string;

  className: string;

  property: string;

  type:
    | 'BehaviorSubject'
    | 'Subject'
    | 'ReplaySubject'
    | 'AsyncSubject'
    | 'EventEmitter'
    | 'WritableState';

  line: number;

  recommendation: string;
}
