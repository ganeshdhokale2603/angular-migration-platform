import { Injectable } from '@nestjs/common';

import { MigrationPlan } from './models/migration-plan.model';

@Injectable()
export class AIPlannerService {

    async generate(

        projectPath: string,

        sourceVersion: number,

        targetVersion: number

    ): Promise<MigrationPlan> {

        let overallRisk: 'LOW' | 'MEDIUM' | 'HIGH' = 'LOW';
const versionGap = targetVersion - sourceVersion;

        const complexity =

            versionGap  > 6

                ? 'HIGH'

                : versionGap  > 3

                ? 'MEDIUM'

                : 'LOW';

            const recommendedRules = [

    'Standalone Components',

    'Inject Function',

    'Bootstrap API',

    'Control Flow',

    'Signals'

];

const recommendations =

    this.buildRecommendations(

        complexity

    );

const preMigrationChecklist =

    this.buildPreMigrationChecklist();

const postMigrationChecklist =

    this.buildPostMigrationChecklist();

               const ruleRisks = recommendedRules.map(rule => ({

    rule,

    ...this.calculateRuleRisk(rule)

}));

if (ruleRisks.some(r => r.risk === 'HIGH')) {

    overallRisk = 'HIGH';

} else if (ruleRisks.some(r => r.risk === 'MEDIUM')) {

    overallRisk = 'MEDIUM';

}


const rulePriority = recommendedRules

    .map(rule => ({

        rule,

        ...this.getRulePriority(rule)

    }))

    .sort(

        (a, b) => a.priority - b.priority

    );

const executionPhases =

    this.buildExecutionPhases();

const totalEstimatedMinutes =

    executionPhases.reduce(

        (sum, phase) =>

            sum + phase.estimatedMinutes,

        0

    );



        return {

    project: projectPath,

    sourceVersion,

    targetVersion,

    estimatedComplexity: complexity,

    overallRisk,

    estimatedDuration:

        complexity === 'HIGH'
            ? '45 minutes'
            : complexity === 'MEDIUM'
            ? '20 minutes'
            : '10 minutes',

    recommendedStrategy:

        complexity === 'HIGH'
            ? 'Incremental Migration'
            : 'Direct Migration',

    recommendedRules:

    rulePriority.map(

        r => r.rule

    ),
    rulePriority,

    ruleRisks,
    executionPhases,

totalEstimatedMinutes,
recommendations,

preMigrationChecklist,

postMigrationChecklist,

    warnings:

        complexity === 'HIGH'
            ? [
                'Review third-party libraries',
                'Upgrade Angular incrementally',
                'Backup project before migration'
            ]
            : []

};

    }

    private calculateRuleRisk(rule: string) {

    switch (rule) {

        case 'Standalone Components':

            return {
                risk: 'HIGH' as const,
                reason:
                    'Requires component architecture refactoring.'
            };

        case 'Bootstrap API':

            return {
                risk: 'HIGH' as const,
                reason:
                    'Changes application bootstrap process.'
            };

        case 'Signals':

            return {
                risk: 'MEDIUM' as const,
                reason:
                    'Requires state management changes.'
            };

        case 'Control Flow':

            return {
                risk: 'LOW' as const,
                reason:
                    'Mostly template syntax updates.'
            };

        case 'Inject Function':

            return {
                risk: 'LOW' as const,
                reason:
                    'Simple dependency injection modernization.'
            };

        default:

            return {
                risk: 'MEDIUM' as const,
                reason:
                    'General migration rule.'
            };

    }

}

private getRulePriority(rule: string) {

    switch (rule) {

        case 'Bootstrap API':

            return {
                priority: 1,
                phase: 'Application Bootstrap'
            };

        case 'Inject Function':

            return {
                priority: 2,
                phase: 'Dependency Injection'
            };

        case 'Control Flow':

            return {
                priority: 3,
                phase: 'Template Migration'
            };

        case 'Signals':

            return {
                priority: 4,
                phase: 'State Management'
            };

        case 'Standalone Components':

            return {
                priority: 5,
                phase: 'Architecture Migration'
            };

        default:

            return {
                priority: 99,
                phase: 'General'
            };

    }

}

private buildExecutionPhases() {

    return [

        {

            phase: 'Phase 1',

            description: 'Bootstrap Migration',

            estimatedMinutes: 5,

            rules: [

                'Bootstrap API'

            ]

        },

        {

            phase: 'Phase 2',

            description: 'Dependency Injection',

            estimatedMinutes: 10,

            rules: [

                'Inject Function'

            ]

        },

        {

            phase: 'Phase 3',

            description: 'Template Modernization',

            estimatedMinutes: 15,

            rules: [

                'Control Flow'

            ]

        },

        {

            phase: 'Phase 4',

            description: 'Reactive State',

            estimatedMinutes: 20,

            rules: [

                'Signals'

            ]

        },

        {

            phase: 'Phase 5',

            description: 'Architecture Migration',

            estimatedMinutes: 30,

            rules: [

                'Standalone Components'

            ]

        }

    ];

}

private buildRecommendations(
    complexity: 'LOW' | 'MEDIUM' | 'HIGH'
) {

    const recommendations = [

        {

            category: 'Migration Strategy',

            recommendations: [

                complexity === 'HIGH'

                    ? 'Perform incremental migration.'

                    : 'Direct migration is acceptable.',

                'Create a full project backup.',

                'Validate every migration step.'

            ]

        },

        {

            category: 'Code Quality',

            recommendations: [

                'Remove deprecated Angular APIs.',

                'Use Standalone Components.',

                'Adopt Signals where appropriate.',

                'Replace constructor injection with inject().'

            ]

        },

        {

            category: 'Testing',

            recommendations: [

                'Execute unit tests.',

                'Execute integration tests.',

                'Perform manual UI verification.'

            ]

        }

    ];

    return recommendations;

}

private buildPreMigrationChecklist() {

    return [

        'Backup project',

        'Commit latest source code',

        'Install latest Node.js LTS',

        'Verify Angular CLI',

        'Run npm install',

        'Resolve existing build errors'

    ];

}

private buildPostMigrationChecklist() {

    return [

        'Run npm install',

        'Run Angular build',

        'Execute unit tests',

        'Execute lint',

        'Verify routing',

        'Verify lazy loading',

        'Test application manually',

        'Deploy to staging'

    ];

}

}