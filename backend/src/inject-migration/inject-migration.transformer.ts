import * as ts from 'typescript';

export interface ConstructorDependency {

    parameterName: string;

    typeName: string;

}

export interface ConstructorAnalysis {

    found: boolean;

    dependencies: ConstructorDependency[];

}

export class InjectMigrationTransformer {

    analyze(source: string): ConstructorAnalysis {

        const sourceFile = ts.createSourceFile(
            'migration.ts',
            source,
            ts.ScriptTarget.Latest,
            true,
            ts.ScriptKind.TS
        );

        let result: ConstructorAnalysis = {

            found: false,

            dependencies: []

        };

        const visit = (node: ts.Node) => {

            if (
                ts.isConstructorDeclaration(node)
            ) {

                result.found = true;

                for (
                    const parameter
                    of node.parameters
                ) {

                    if (
                        parameter.modifiers?.some(
                            modifier =>
                                modifier.kind ===
                                ts.SyntaxKind.PrivateKeyword ||
                                modifier.kind ===
                                ts.SyntaxKind.PublicKeyword ||
                                modifier.kind ===
                                ts.SyntaxKind.ProtectedKeyword ||
                                modifier.kind ===
                                ts.SyntaxKind.ReadonlyKeyword
                        )
                    ) {

                        const parameterName =
                            parameter.name.getText(
                                sourceFile
                            );

                        const typeName =
                            parameter.type?.getText(
                                sourceFile
                            );

                        if (
                            typeName
                        ) {

                            result.dependencies.push({

                                parameterName,

                                typeName

                            });

                        }

                    }

                }

            }

            ts.forEachChild(
                node,
                visit
            );

        };

        visit(sourceFile);

        return result;

    }

}