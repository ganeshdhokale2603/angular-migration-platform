import { Injectable } from '@nestjs/common';

import { LLMResponse } from './llm.response';

@Injectable()
export class LLMService {

    async analyze(
        prompt: string
    ): Promise<LLMResponse> {

        // Future:
        // OpenAI
        // Ollama
        // Azure OpenAI

        console.log('Prompt sent to LLM');

        console.log(prompt);

        return {

            summary:
                'Project is ready for Angular modernization.',

            migrationStrategy:
                'Migrate incrementally module-by-module.',

            recommendations: [

                'Complete Material migration',

                'Replace constructor injection',

                'Adopt Signals',

                'Use standalone components'

            ]

        };

    }

}