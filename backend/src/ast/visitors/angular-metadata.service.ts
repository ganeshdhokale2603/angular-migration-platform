import { Injectable } from '@nestjs/common';
import { SourceFile } from 'ts-morph';
import { AngularMetadata } from '../models/angular-metadata.model';

@Injectable()
export class AngularMetadataService {

    analyze(sourceFile: SourceFile): AngularMetadata {

        const decorators = sourceFile
            .getDescendantsOfKind(193); // SyntaxKind.Decorator

        return {

            hasComponent: decorators.some(d => d.getText().startsWith('@Component')),

            hasModule: decorators.some(d => d.getText().startsWith('@NgModule')),

            hasInjectable: decorators.some(d => d.getText().startsWith('@Injectable')),

            hasDirective: decorators.some(d => d.getText().startsWith('@Directive')),

            hasPipe: decorators.some(d => d.getText().startsWith('@Pipe'))

        };

    }

}