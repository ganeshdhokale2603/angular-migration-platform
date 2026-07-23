import { Injectable } from '@nestjs/common';
import { Project } from 'ts-morph';

@Injectable()
export class BootstrapTransformerService {

    transform(project: Project): number {

        let transformed = 0;

        const sourceFiles = project.getSourceFiles();

        for (const sourceFile of sourceFiles) {

            if (sourceFile.getBaseName() !== 'main.ts') {
                continue;
            }

            const text = sourceFile.getFullText();

            if (!text.includes('bootstrapModule')) {
                continue;
            }

            let updated = text;

            updated = updated.replace(
                /platformBrowserDynamic\(\)\.bootstrapModule\(AppModule\)/g,
                'bootstrapApplication(AppComponent)'
            );

            updated = updated.replace(
                /platformBrowserDynamic\(\)\s*\.bootstrapModule\s*\(\s*AppModule\s*\)/g,
                'bootstrapApplication(AppComponent)'
            );

            if (updated !== text) {

                sourceFile.replaceWithText(updated);

                transformed++;
            }
        }

        return transformed;
    }

}