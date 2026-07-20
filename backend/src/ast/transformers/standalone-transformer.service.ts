import { Injectable } from '@nestjs/common';

import {

    Project,

    ObjectLiteralExpression,

    SyntaxKind

} from 'ts-morph';

@Injectable()
export class StandaloneTransformerService {

    transform(project: Project): number {

        let transformed = 0;

        project.getSourceFiles().forEach(sourceFile => {

            sourceFile.getClasses().forEach(componentClass => {

                const decorator = componentClass.getDecorator('Component');

                if (!decorator) return;

                const arg = decorator
                    .getArguments()[0]
                    ?.asKind(SyntaxKind.ObjectLiteralExpression);

                if (!arg) return;

                const changed = this.transformComponent(arg);

                if (changed) {

                    this.ensureCommonModuleImport(sourceFile);

                    transformed++;

                }

            });

        });

        return transformed;

    }

    private transformComponent(

        object: ObjectLiteralExpression

    ): boolean {

        let modified = false;

        const standalone = object.getProperty('standalone');

        if (!standalone) {

            object.addPropertyAssignment({

                name: 'standalone',

                initializer: 'true'

            });

            modified = true;

        }

        const imports = object.getProperty('imports');

        if (!imports) {

            object.addPropertyAssignment({

                name: 'imports',

                initializer: '[CommonModule]'

            });

            modified = true;

        }

        return modified;

    }

    private ensureCommonModuleImport(sourceFile: any) {

        const existing = sourceFile.getImportDeclaration(

            i => i.getModuleSpecifierValue() === '@angular/common'

        );

        if (existing) {

            if (

                !existing

                    .getNamedImports()

                    .some(i => i.getName() === 'CommonModule')

            ) {

                existing.addNamedImport('CommonModule');

            }

            return;

        }

        sourceFile.addImportDeclaration({

            moduleSpecifier: '@angular/common',

            namedImports: ['CommonModule']

        });

    }

}