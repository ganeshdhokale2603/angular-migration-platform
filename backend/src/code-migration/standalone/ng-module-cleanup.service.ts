import { Injectable } from '@nestjs/common';

import * as ts from 'typescript';
import * as fs from 'fs-extra';

@Injectable()
export class NgModuleCleanupService {

    async cleanup(
        moduleFile: string,
        standaloneComponents: string[]
    ): Promise<boolean> {

        const source =
            await fs.readFile(
                moduleFile,
                'utf8'
            );

        const sourceFile =
            ts.createSourceFile(
                moduleFile,
                source,
                ts.ScriptTarget.Latest,
                true,
                ts.ScriptKind.TS
            );

        let modified = false;

        const transformer:
            ts.TransformerFactory<ts.SourceFile> =
            context => {

                const visit =
                    (node: ts.Node): ts.VisitResult<ts.Node> => {

                        if (
                            ts.isDecorator(node) &&
                            ts.isCallExpression(
                                node.expression
                            )
                        ) {

                            const call =
                                node.expression;

                            if (
                                ts.isIdentifier(
                                    call.expression
                                ) &&
                                call.expression.text ===
                                    'NgModule'
                            ) {

                                const argument =
                                    call.arguments[0];

                                if (
                                    argument &&
                                    ts.isObjectLiteralExpression(
                                        argument
                                    )
                                ) {

                                    const updatedProperties =
                                        argument.properties.map(
                                            property => {

                                                if (
                                                    !ts.isPropertyAssignment(
                                                        property
                                                    )
                                                ) {

                                                    return property;

                                                }

                                                if (
                                                    !ts.isIdentifier(
                                                        property.name
                                                    ) ||
                                                    property.name.text !==
                                                        'declarations'
                                                ) {

                                                    return property;

                                                }

                                                if (
                                                    !ts.isArrayLiteralExpression(
                                                        property.initializer
                                                    )
                                                ) {

                                                    return property;

                                                }

                                                const originalElements =
                                                    property.initializer.elements;

                                                const remainingElements =
                                                    originalElements.filter(
                                                        element => {

                                                            if (
                                                                !ts.isIdentifier(
                                                                    element
                                                                )
                                                            ) {

                                                                return true;

                                                            }

                                                            if (
                                                                standaloneComponents.includes(
                                                                    element.text
                                                                )
                                                            ) {

                                                                modified = true;

                                                                return false;

                                                            }

                                                            return true;

                                                        }
                                                    );

                                                const updatedArray =
                                                    ts.factory.updateArrayLiteralExpression(
                                                        property.initializer,
                                                        remainingElements
                                                    );

                                                return ts.factory.updatePropertyAssignment(
                                                    property,
                                                    property.name,
                                                    updatedArray
                                                );

                                            }
                                        );

                                    const updatedObject =
                                        ts.factory.updateObjectLiteralExpression(
                                            argument,
                                            updatedProperties
                                        );

                                    const updatedCall =
                                        ts.factory.updateCallExpression(
                                            call,
                                            call.expression,
                                            call.typeArguments,
                                            [
                                                updatedObject
                                            ]
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

        const transformedFile =
            result.transformed[0] as ts.SourceFile;

        if (modified) {

            const printer =
                ts.createPrinter({
                    newLine:
                        ts.NewLineKind.LineFeed
                });

            const output =
                printer.printFile(
                    transformedFile
                );

            await fs.writeFile(
                moduleFile,
                output,
                'utf8'
            );

        }

        result.dispose();

        return modified;

    }

}