import { Injectable } from '@nestjs/common';

import {
    SourceFile,
    ObjectLiteralExpression,
    SyntaxKind
} from 'ts-morph';

import { AstComponent } from '../models/ast-component.model';

@Injectable()
export class ComponentAnalyzerService {

    analyze(

        sourceFile: SourceFile

    ): AstComponent | null {

        const componentClass =

            sourceFile

                .getClasses()

                .find(cls =>

                    cls

                        .getDecorator('Component')

                );

        if (!componentClass) {

            return null;

        }

        const decorator =

            componentClass.getDecorator(

                'Component'

            );

        if (!decorator) {

            return null;

        }

        const object = decorator
                .getArguments()[0]
                ?.asKind(SyntaxKind.ObjectLiteralExpression);

            if (!object) {
                return null;
            }

        return {

            className:

                componentClass.getName() ?? '',

            selector:

                this.getStringValue(

                    object,

                    'selector'

                ),

            standalone:

                this.getBooleanValue(

                    object,

                    'standalone'

                ),

            templateUrl:

                this.getStringValue(

                    object,

                    'templateUrl'

                ),

            template:

                this.getStringValue(

                    object,

                    'template'

                ),

            styleUrls:

                this.getArray(

                    object,

                    'styleUrls'

                ),

            styles:

                this.getArray(

                    object,

                    'styles'

                ),

            changeDetection:

                this.getPropertyText(

                    object,

                    'changeDetection'

                ),

            filePath:

                sourceFile.getFilePath()

        };

    }

    private getStringValue(

        object: ObjectLiteralExpression,

        property: string

    ): string | undefined {

        const prop =

            object.getProperty(property);

        if (!prop) {

            return undefined;

        }

        return prop

            .getText()

            .split(':')[1]

            ?.trim()

            ?.replace(/'/g, '')

            ?.replace(/"/g, '');

    }

    private getBooleanValue(

        object: ObjectLiteralExpression,

        property: string

    ): boolean {

        const prop =

            object.getProperty(property);

        if (!prop) {

            return false;

        }

        return prop.getText().includes('true');

    }

    private getArray(

        object: ObjectLiteralExpression,

        property: string

    ): string[] {

        const prop =

            object.getProperty(property);

        if (!prop) {

            return [];

        }

        return prop

            .getText()

            .replace(`${property}:`, '')

            .replace('[', '')

            .replace(']', '')

            .split(',')

            .map(v =>

                v.trim()

                    .replace(/'/g, '')

                    .replace(/"/g, '')

            )

            .filter(Boolean);

    }

    private getPropertyText(

        object: ObjectLiteralExpression,

        property: string

    ): string | undefined {

        const prop =

            object.getProperty(property);

        return prop?.getText();

    }

}