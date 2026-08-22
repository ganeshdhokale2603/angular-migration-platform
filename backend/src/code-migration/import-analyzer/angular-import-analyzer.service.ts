import {
    Injectable,
    InternalServerErrorException
} from '@nestjs/common';

import * as ts from 'typescript';

import { AngularImport } from './models/angular-import.model';

@Injectable()
export class AngularImportAnalyzerService {

    analyze(source: string): AngularImport[] {

        if (typeof source !== 'string') {
            throw new Error(
                'Source code must be provided as a string.'
            );
        }

        if (!source.trim()) {
            return [];
        }

        try {

            const sourceFile = ts.createSourceFile(
                'migration.ts',
                source,
                ts.ScriptTarget.Latest,
                true,
                ts.ScriptKind.TS
            );

            const imports: AngularImport[] = [];

            for (const statement of sourceFile.statements) {

                if (!ts.isImportDeclaration(statement)) {
                    continue;
                }

                const moduleSpecifier =
                    statement.moduleSpecifier;

                if (!ts.isStringLiteral(moduleSpecifier)) {
                    continue;
                }

                const module =
                    moduleSpecifier.text;

                const importClause =
                    statement.importClause;

                if (!importClause) {
                    continue;
                }

                const namedImports: string[] = [];

                let defaultImport:
                    string | undefined;

                let namespaceImport:
                    string | undefined;

                /*
                 * Default import
                 *
                 * import Angular from '@angular/core';
                 */
                if (importClause.name) {

                    defaultImport =
                        importClause.name.text;

                }

                const bindings =
                    importClause.namedBindings;

                /*
                 * Named imports
                 *
                 * import {
                 *   Component,
                 *   Injectable
                 * } from '@angular/core';
                 */
                if (
                    bindings &&
                    ts.isNamedImports(bindings)
                ) {

                    for (
                        const element
                        of bindings.elements
                    ) {

                        namedImports.push(
                            element.name.text
                        );

                    }

                }

                /*
                 * Namespace import
                 *
                 * import * as ng from '@angular/core';
                 */
                if (
                    bindings &&
                    ts.isNamespaceImport(bindings)
                ) {

                    namespaceImport =
                        bindings.name.text;

                }

                const isAngularImport =
                    module.startsWith('@angular/');

                const isCoreImport =
                    module === '@angular/core';

                imports.push({

                    module,

                    imports:
                        namedImports,

                    defaultImport,

                    namespaceImport,

                    isAngularImport,

                    isCoreImport

                });

            }

            return imports;

        } catch (error) {

            console.error(
                'Angular import analysis failed:',
                error
            );

            throw new InternalServerErrorException(
                'Failed to analyze Angular imports.'
            );

        }

    }

    getAngularImports(
        source: string
    ): AngularImport[] {

        return this.analyze(source)
            .filter(
                item =>
                    item.isAngularImport
            );

    }

    getCoreImports(
        source: string
    ): AngularImport[] {

        return this.analyze(source)
            .filter(
                item =>
                    item.isCoreImport
            );

    }

    hasImport(
        source: string,
        module: string,
        importName?: string
    ): boolean {

        const imports =
            this.analyze(source);

        const moduleImport =
            imports.find(
                item =>
                    item.module === module
            );

        if (!moduleImport) {
            return false;
        }

        if (!importName) {
            return true;
        }

        return moduleImport.imports.includes(
            importName
        );

    }

}