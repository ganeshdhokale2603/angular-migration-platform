import { Injectable } from '@nestjs/common';
import {
    Project,
    SyntaxKind,
    SourceFile
} from 'ts-morph';

@Injectable()
export class RxjsTransformerService {

    transform(project: Project): number {

        let transformed = 0;

        for (const sourceFile of project.getSourceFiles()) {

            let modified = false;

            modified ||= this.transformToPromise(sourceFile);

            modified ||= this.cleanupInternalImports(sourceFile);

            if (modified) {

                transformed++;

            }

        }

        return transformed;

    }

    private transformToPromise(sourceFile: SourceFile): boolean {

        let changed = false;

        const calls = sourceFile.getDescendantsOfKind(
            SyntaxKind.CallExpression
        );

        for (const call of calls) {

            const expression = call.getExpression();

            if (
                expression.getKind() ===
                SyntaxKind.PropertyAccessExpression
            ) {

                const property = expression.asKindOrThrow(
                    SyntaxKind.PropertyAccessExpression
                );

                if (property.getName() === 'toPromise') {

                    const observable =
                        property.getExpression().getText();

                    call.replaceWithText(
                        `firstValueFrom(${observable})`
                    );

                    this.ensureFirstValueImport(sourceFile);

                    changed = true;

                }

            }

        }

        return changed;

    }

    private cleanupInternalImports(
        sourceFile: SourceFile
    ): boolean {

        let changed = false;

        sourceFile.getImportDeclarations().forEach(importDecl => {

            const module =
                importDecl.getModuleSpecifierValue();

            if (module.startsWith('rxjs/internal')) {

                importDecl.setModuleSpecifier('rxjs');

                changed = true;

            }

        });

        return changed;

    }

    private ensureFirstValueImport(
        sourceFile: SourceFile
    ) {

        const rxImport =
            sourceFile.getImportDeclaration(
                d => d.getModuleSpecifierValue() === 'rxjs'
            );

        if (rxImport) {

            if (
                !rxImport.getNamedImports()
                    .some(i => i.getName() === 'firstValueFrom')
            ) {

                rxImport.addNamedImport(
                    'firstValueFrom'
                );

            }

            return;

        }

        sourceFile.addImportDeclaration({

            moduleSpecifier: 'rxjs',

            namedImports: ['firstValueFrom']

        });

    }

}