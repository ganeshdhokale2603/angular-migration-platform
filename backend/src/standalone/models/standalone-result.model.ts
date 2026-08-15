import { StandaloneCandidate } from './standalone-candidate.model';

export interface StandaloneResult {

    totalModules: number;

    totalComponents: number;

    candidates: StandaloneCandidate[];

}