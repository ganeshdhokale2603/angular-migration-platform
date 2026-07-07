import * as ts from 'typescript';
import { context } from './transformation-context';

export class ComponentTransformer {
  transform(sourceFile: ts.SourceFile): ts.SourceFile {

    const visit = (node: ts.Node) => {

        if (ts.isClassDeclaration(node)) {

            this.transformComponent(node);

        }

        ts.forEachChild(node, visit);

    };

    visit(sourceFile);

    return sourceFile;

}

  /**
   * Transform Component
   */
  private transformComponent(node: ts.ClassDeclaration): ts.ClassDeclaration {
    const decorators = ts.getDecorators(node) ?? [];

    if (decorators.length === 0) {
      return node;
    }

    decorators.map((d) => {
      if (!ts.isCallExpression(d.expression)) {
        return d;
      }

      const call = d.expression;

      if (call.expression.getText() !== 'Component') {
        return d;
      }

      const metadata = call.arguments[0];

      if (!metadata || !ts.isObjectLiteralExpression(metadata)) {
        return d;
      }

      const alreadyStandalone = metadata.properties.some(
        (p) => ts.isPropertyAssignment(p) && p.name.getText() === 'standalone',
      );

      if (alreadyStandalone) {
        console.log('Already standalone');
        return d;
      }

      console.log(`Found Component : ${node.name?.text}`);

      const updatedMetadata = ts.factory.updateObjectLiteralExpression(
        metadata,
        [
          ...metadata.properties,
          ts.factory.createPropertyAssignment(
            'standalone',
            ts.factory.createTrue(),
          ),
        ],
      );

      return ts.factory.updateDecorator(
        d,
        ts.factory.updateCallExpression(call, call.expression, undefined, [
          updatedMetadata,
        ]),
      );
    });

    // TS 5.x doesn't store decorators on ClassDeclaration.
    // Keep the updated decorators for future printing if needed,
    // but updateClassDeclaration now takes only 6 arguments.
    return ts.factory.updateClassDeclaration(
      node,
      node.modifiers,
      node.name,
      node.typeParameters,
      node.heritageClauses,
      node.members,
    );
  }
}
