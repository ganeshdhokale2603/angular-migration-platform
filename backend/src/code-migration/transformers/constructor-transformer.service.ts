import { Injectable } from '@nestjs/common';

import * as ts from 'typescript';

@Injectable()
export class ConstructorTransformerService {

    transform(source: string): string {

        const sourceFile =
            ts.createSourceFile(
                'migration.ts',
                source,
                ts.ScriptTarget.Latest,
                true,
                ts.ScriptKind.TS
            );

        const transformerFactory:
            ts.TransformerFactory<ts.SourceFile> =
            context => {

                const visit =
                    (node: ts.Node): ts.VisitResult<ts.Node> => {

                        if (
                            ts.isClassDeclaration(node)
                        ) {

                            return this.transformClass(
                                node,
                                context
                            );

                        }

                        return ts.visitEachChild(
                            node,
                            visit,
                            context
                        );
                    };

                return (
                    node: ts.SourceFile
                ) => {

                    return ts.visitNode(
                        node,
                        visit
                    ) as ts.SourceFile;

                };
            };


        const result =
            ts.transform(
                sourceFile,
                [
                    transformerFactory
                ]
            );


        const transformedFile =
            result.transformed[0] as ts.SourceFile;


        const printer =
            ts.createPrinter({
                newLine:
                    ts.NewLineKind.LineFeed
            });


        let output =
            printer.printFile(
                transformedFile
            );


        result.dispose();


        output =
            this.ensureInjectImport(
                output
            );


        return output;
    }


    private transformClass(
        node: ts.ClassDeclaration,
        context: ts.TransformationContext
    ): ts.ClassDeclaration {

        const constructor =
            node.members.find(
                member =>
                    ts.isConstructorDeclaration(
                        member
                    )
            ) as
                | ts.ConstructorDeclaration
                | undefined;


        if (!constructor) {

            return node;

        }


        if (
            constructor.parameters.length === 0
        ) {

            return node;

        }


        const injectedProperties:
            ts.PropertyDeclaration[] = [];


        const remainingParameters:
            ts.ParameterDeclaration[] = [];


        for (
            const parameter
                of constructor.parameters
        ) {

            const property =
                this.createInjectedProperty(
                    parameter,
                    context
                );


            if (property) {

                injectedProperties.push(
                    property
                );

            }
            else {

                remainingParameters.push(
                    parameter
                );

            }

        }


        /*
         * Nothing to transform.
         */

        if (
            injectedProperties.length === 0
        ) {

            return node;

        }


        const members:
            ts.ClassElement[] = [];


        /*
         * Add generated inject()
         * properties first.
         */

        for (
            const property
                of injectedProperties
        ) {

            members.push(
                property
            );

        }


        /*
         * Preserve constructor only
         * when non-DI parameters remain.
         */

        if (
            remainingParameters.length > 0
        ) {

            const newConstructor =
                context.factory.updateConstructorDeclaration(

                    constructor,

                    constructor.modifiers,

                    remainingParameters,

                    constructor.body

                );


            members.push(
                newConstructor
            );

        }


        /*
         * Preserve all other class members.
         */

        for (
            const member of node.members
        ) {

            if (
                member === constructor
            ) {

                continue;

            }


            members.push(
                member
            );

        }


        return context.factory.updateClassDeclaration(

            node,

            node.modifiers,

            node.name,

            node.typeParameters,

            node.heritageClauses,

            members

        );
    }


    private createInjectedProperty(
        parameter: ts.ParameterDeclaration,
        context: ts.TransformationContext
    ): ts.PropertyDeclaration | null {

        /*
         * Check for:
         *
         * private
         * public
         * protected
         */

        const modifiers =
            parameter.modifiers;


        const hasVisibilityModifier =
            modifiers?.some(
                modifier =>

                    modifier.kind ===
                        ts.SyntaxKind.PrivateKeyword ||

                    modifier.kind ===
                        ts.SyntaxKind.PublicKeyword ||

                    modifier.kind ===
                        ts.SyntaxKind.ProtectedKeyword

            );


        if (
            !hasVisibilityModifier
        ) {

            return null;

        }


        /*
         * Parameter must have a type.
         */

        if (
            !parameter.type
        ) {

            return null;

        }


        /*
         * Only simple identifiers.
         *
         * Example:
         *
         * private service: UserService
         */

        if (
            !ts.isIdentifier(
                parameter.name
            )
        ) {

            return null;

        }


        const propertyName =
            parameter.name;


        const typeNode =
            parameter.type;


        /*
         * Convert TypeNode into an Expression.
         *
         * Example:
         *
         * UserService
         *
         * becomes:
         *
         * inject(UserService)
         */

        const typeExpression =
            this.typeNodeToExpression(
                typeNode
            );


        if (!typeExpression) {

            return null;

        }


        const injectCall =
            context.factory.createCallExpression(

                context.factory.createIdentifier(
                    'inject'
                ),

                undefined,

                [
                    typeExpression
                ]

            );


        /*
         * Preserve:
         *
         * private
         * public
         * protected
         * readonly
         */

        const propertyModifiers =
            modifiers?.filter(
                modifier =>

                    modifier.kind ===
                        ts.SyntaxKind.PrivateKeyword ||

                    modifier.kind ===
                        ts.SyntaxKind.PublicKeyword ||

                    modifier.kind ===
                        ts.SyntaxKind.ProtectedKeyword ||

                    modifier.kind ===
                        ts.SyntaxKind.ReadonlyKeyword

            );


        return context.factory.createPropertyDeclaration(

            propertyModifiers,

            propertyName,

            undefined,

            undefined,

            injectCall

        );
    }


    private typeNodeToExpression(
        typeNode: ts.TypeNode
    ): ts.Expression | null {

        /*
         * UserService
         */

        if (
            ts.isTypeReferenceNode(
                typeNode
            )
        ) {

            if (
                ts.isIdentifier(
                    typeNode.typeName
                )
            ) {

                return ts.factory.createIdentifier(
                    typeNode.typeName.text
                );

            }


            /*
             * Handles:
             *
             * Some.Namespace.Service
             */

            if (
                ts.isQualifiedName(
                    typeNode.typeName
                )
            ) {

                return this.qualifiedNameToExpression(
                    typeNode.typeName
                );

            }

        }


        return null;
    }


    private qualifiedNameToExpression(
        name: ts.QualifiedName
    ): ts.Expression {

        const left =
            ts.isIdentifier(
                name.left
            )
                ? ts.factory.createIdentifier(
                    name.left.text
                )
                : this.qualifiedNameToExpression(
                    name.left
                );


        return ts.factory.createPropertyAccessExpression(

            left,

            name.right.text

        );
    }


    private ensureInjectImport(
        source: string
    ): string {

        /*
         * No inject() generated.
         */

        if (
            !source.includes(
                'inject('
            )
        ) {

            return source;

        }


        /*
         * Already imported.
         */

        const existingInjectImport =
            /import\s*\{([^}]*)\}\s*from\s*['"]@angular\/core['"]/
                .exec(source);


        if (
            existingInjectImport
        ) {

            const imports =
                existingInjectImport[1];


            if (
                /\binject\b/.test(
                    imports
                )
            ) {

                return source;

            }


            const updatedImports =
                imports.trim()
                    ? `${imports.trim()}, inject`
                    : 'inject';


            return source.replace(

                existingInjectImport[0],

                `import { ${updatedImports} } from '@angular/core'`

            );

        }


        /*
         * No @angular/core import.
         */

        return (
            `import { inject } from '@angular/core';\n\n` +
            source
        );
    }
}