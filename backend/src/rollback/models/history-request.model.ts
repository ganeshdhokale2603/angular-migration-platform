export class HistoryRequest {

    project: string;

    status: 'SUCCESS' | 'FAILED' | 'ROLLED_BACK';

    checkpointId: string;

}