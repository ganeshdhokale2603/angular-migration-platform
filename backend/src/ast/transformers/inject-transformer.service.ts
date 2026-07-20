import { Injectable } from '@nestjs/common';

import {
    Project,
    SyntaxKind,
    Scope
} from 'ts-morph';

@Injectable()
export class InjectTransformerService {

    transform(project: Project): number {

        let transformed = 0;

        for (const sourceFile of project.getSourceFiles()) {

            let modified = false;

            for (const cls of sourceFile.getClasses()) {

                const ctor = cls.getConstructors()[0];

                if (!ctor) {
                    continue;
                }

                const parameters = ctor.getParameters();

                if (parameters.length === 0) {
                    continue;
                }

                for (const parameter of parameters) {

                    const type = parameter.getTypeNode()?.getText();

                    if (!type) {
                        continue;
                    }

                    cls.insertProperty(0, {

                        name: parameter.getName(),

                        scope: Scope.Private,

                        initializer: `inject(${type})`

                    });

                }

                ctor.remove();

                modified = true;

            }

            if (modified) {

                this.ensureInjectImport(sourceFile);

                transformed++;

            }

        }

        return transformed;

    }

    private ensureInjectImport(sourceFile: any) {

        const angularCore =

            sourceFile.getImportDeclaration(

                d => d.getModuleSpecifierValue() === '@angular/core'

            );

        if (angularCore) {

            if (

                !angularCore

                    .getNamedImports()

                    .some(i => i.getName() === 'inject')

            ) {

                angularCore.addNamedImport('inject');

            }

            return;

        }

        sourceFile.addImportDeclaration({

            moduleSpecifier: '@angular/core',

            namedImports: ['inject']

        });

    }

}