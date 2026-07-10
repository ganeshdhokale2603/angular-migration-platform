import { RecommendationPriority } from './recommendation-priority';

export interface AIRecommendation {

    title: string;

    description: string;

    severity: 'LOW' | 'MEDIUM' | 'HIGH';
    priority: RecommendationPriority;
    effort:

    | 'SMALL'

    | 'MEDIUM'

    | 'LARGE';

    category:
    | 'Standalone'
    | 'Routing'
    | 'Material'
    | 'RxJS'
    | 'Performance'
    | 'DependencyInjection'
    | 'General';

}