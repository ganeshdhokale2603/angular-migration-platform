export interface Recommendation {

    id: string;

    title: string;

    description: string;

    priority: 'Low' | 'Medium' | 'High' | 'Critical';

    category: string;

    effort: number;

}