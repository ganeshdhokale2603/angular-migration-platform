import { Injectable } from '@nestjs/common';

import {
    Project,
    SyntaxKind,
    CallExpression
} from 'ts-morph';

@Injectable()
export class BootstrapTransformerService {

    transform(project: Project): number {

        let transformed = 0;

        const sourceFiles = project.getSourceFiles();

        for (const file of sourceFiles) {

            if (file.getBaseName() !== 'main.ts') {

                continue;

            }

            const calls =

                file.getDescendantsOfKind(

                    SyntaxKind.CallExpression

                );

            for (const call of calls) {

                if (this.transformBootstrap(file, call)) {

                    transformed++;

                }

            }

        }

        return transformed;

    }

    private transformBootstrap(

        sourceFile: any,

        call: CallExpression

    ): boolean {

        const text = call.getText();

        if (!text.includes('bootstrapModule')) {

            return false;

        }

        sourceFile.replaceWithText(

            sourceFile
                .getFullText()
                .replace(
                    /platformBrowserDynamic\(\)\s*\.bootstrapModule\s*\(\s*AppModule\s*\)/g,
                    'bootstrapApplication(AppComponent)'
                )
                .replace(
                    "platformBrowserDynamic",
                    "bootstrapApplication"
                )
        );

        return true;

    }

}