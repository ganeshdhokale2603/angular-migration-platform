import * as ts from 'typescript';

export class StandaloneTransformer {

    transform(source: string): string {

        const sourceFile =
            ts.createSourceFile(
                'component.ts',
                source,
                ts.ScriptTarget.Latest,
                true,
                ts.ScriptKind.TS
            );

        const transformer:
            ts.TransformerFactory<ts.SourceFile> =
            context => {

                const visit =
                    (node: ts.Node): ts.VisitResult<ts.Node> => {

                        if (
                            ts.isDecorator(node) &&
                            ts.isCallExpression(node.expression)
                        ) {

                            const call =
                                node.expression;

                            if (
                                ts.isIdentifier(
                                    call.expression
                                ) &&
                                call.expression.text ===
                                    'Component'
                            ) {

                                const argument =
                                    call.arguments[0];

                                if (
                                    argument &&
                                    ts.isObjectLiteralExpression(
                                        argument
                                    )
                                ) {

                                    const properties =
                                        [...argument.properties];

                                    const hasStandalone =
                                        properties.some(
                                            property =>
                                                ts.isPropertyAssignment(
                                                    property
                                                ) &&
                                                ts.isIdentifier(
                                                    property.name
                                                ) &&
                                                property.name.text ===
                                                    'standalone'
                                        );

                                    if (!hasStandalone) {

                                        properties.push(

                                            ts.factory.createPropertyAssignment(

                                                'standalone',

                                                ts.factory.createTrue()

                                            )

                                        );

                                    }

                                    const updatedObject =
                                        ts.factory.updateObjectLiteralExpression(
                                            argument,
                                            properties
                                        );

                                    const updatedCall =
                                        ts.factory.updateCallExpression(
                                            call,
                                            call.expression,
                                            call.typeArguments,
                                            [updatedObject]
                                        );

                                    return ts.factory.updateDecorator(
                                        node,
                                        updatedCall
                                    );

                                }

                            }

                        }

                        return ts.visitEachChild(
                            node,
                            visit,
                            context
                        );

                    };

                return node =>
                    ts.visitNode(
                        node,
                        visit
                    ) as ts.SourceFile;

            };

        const result =
            ts.transform(
                sourceFile,
                [transformer]
            );

        const transformed =
            result.transformed[0] as ts.SourceFile;

        const printer =
            ts.createPrinter({
                newLine:
                    ts.NewLineKind.LineFeed
            });

        const output =
            printer.printFile(
                transformed
            );

        result.dispose();

        return output;
    }


    /**
     * Add Angular imports required by
     * the component template.
     */
    addImports(
        source: string,
        imports: string[]
    ): string {

        if (
            imports.length === 0
        ) {

            return source;

        }

        const sourceFile =
            ts.createSourceFile(
                'component.ts',
                source,
                ts.ScriptTarget.Latest,
                true,
                ts.ScriptKind.TS
            );

        const statements =
            [...sourceFile.statements];

        /*
         * --------------------------------------------------
         * Find existing imports
         * --------------------------------------------------
         */

        const existingImports =
            new Set<string>();

        for (
            const statement
            of statements
        ) {

            if (
                !ts.isImportDeclaration(
                    statement
                )
            ) {

                continue;

            }

            const moduleSpecifier =
                statement.moduleSpecifier;

            if (
                !ts.isStringLiteral(
                    moduleSpecifier
                )
            ) {

                continue;

            }

            if (
                moduleSpecifier.text ===
                    '@angular/common'
            ) {

                const clause =
                    statement.importClause;

                if (
                    clause &&
                    clause.namedBindings &&
                    ts.isNamedImports(
                        clause.namedBindings
                    )
                ) {

                    for (
                        const element
                        of clause.namedBindings.elements
                    ) {

                        existingImports.add(
                            element.name.text
                        );

                    }

                }

            }

        }

        /*
         * --------------------------------------------------
         * Add imports
         * --------------------------------------------------
         */

        const requiredImports =
            imports.filter(
                item =>
                    !existingImports.has(
                        item
                    )
            );

        if (
            requiredImports.length === 0
        ) {

            return source;

        }

        /*
         * Find @angular/common import.
         */
        let commonImportIndex = -1;

        for (
            let i = 0;
            i < statements.length;
            i++
        ) {

            const statement =
                statements[i];

            if (
                !ts.isImportDeclaration(
                    statement
                )
            ) {

                continue;

            }

            if (
                ts.isStringLiteral(
                    statement.moduleSpecifier
                ) &&
                statement.moduleSpecifier.text ===
                    '@angular/common'
            ) {

                commonImportIndex = i;

                break;

            }

        }

        if (
            commonImportIndex >= 0
        ) {

            const statement =
                statements[
                    commonImportIndex
                ] as ts.ImportDeclaration;

            const clause =
                statement.importClause;

            if (
                clause &&
                clause.namedBindings &&
                ts.isNamedImports(
                    clause.namedBindings
                )
            ) {

                const elements =
                    [
                        ...clause.namedBindings.elements
                    ];

                for (
                    const name
                    of requiredImports
                ) {

                    elements.push(

                        ts.factory.createImportSpecifier(
                            false,
                            undefined,
                            ts.factory.createIdentifier(
                                name
                            )
                        )

                    );

                }

                const updatedNamedImports =
                    ts.factory.createNamedImports(
                        elements
                    );

                const updatedClause =
                    ts.factory.updateImportClause(
                        clause,
                        clause.isTypeOnly,
                        clause.name,
                        updatedNamedImports
                    );

                statements[
                    commonImportIndex
                ] =
                    ts.factory.updateImportDeclaration(
                        statement,
                        statement.modifiers,
                        updatedClause,
                        statement.moduleSpecifier,
                        statement.attributes
                    );

            }

        }
        else {

            const importSpecifiers =
                requiredImports.map(
                    name =>
                        ts.factory.createImportSpecifier(
                            false,
                            undefined,
                            ts.factory.createIdentifier(
                                name
                            )
                        )
                );

            const importDeclaration =
                ts.factory.createImportDeclaration(
                    undefined,
                    ts.factory.createImportClause(
                        false,
                        undefined,
                        ts.factory.createNamedImports(
                            importSpecifiers
                        )
                    ),
                    ts.factory.createStringLiteral(
                        '@angular/common'
                    ),
                    undefined
                );

            statements.unshift(
                importDeclaration
            );

        }

        /*
         * --------------------------------------------------
         * Update Component imports array
         * --------------------------------------------------
         */

        const updatedStatements =
            statements.map(
                statement => {

                    if (
                        !ts.isImportDeclaration(
                            statement
                        )
                    ) {

                        return statement;

                    }

                    return statement;

                }
            );

        const printer =
            ts.createPrinter({
                newLine:
                    ts.NewLineKind.LineFeed
            });

        const updatedSourceFile =
            ts.factory.updateSourceFile(
                sourceFile,
                updatedStatements
            );

        return printer.printFile(
            updatedSourceFile
        );

    }
}