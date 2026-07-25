export interface RoadmapStep {

    phase: number;

    title: string;

    description: string;

    estimatedHours: number;

}

export interface MigrationRoadmap {

    totalPhases: number;

    totalEstimatedHours: number;

    steps: RoadmapStep[];

}