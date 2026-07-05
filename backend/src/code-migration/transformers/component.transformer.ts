import * as ts from 'typescript';
import { context } from './transformation-context';

export class ComponentTransformer {
  transform(sourceFile: ts.SourceFile): ts.SourceFile {
    const visitor: ts.Visitor = (node) => {
      if (ts.isClassDeclaration(node)) {
        return this.transformComponent(node);
      }

      return ts.visitEachChild(node, visitor, context);
    };

    const result = ts.visitNode(sourceFile, visitor);

    return result as ts.SourceFile;
  }

  /**
   * Transform Component
   */
  private transformComponent(node: ts.ClassDeclaration): ts.ClassDeclaration {
    if (!node.decorators) {
      return node;
    }

    const decorators = node.decorators.map((d) => {
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

    console.log(
        'Already standalone'
    );

    return d;

}

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

        ts.factory.updateCallExpression(
          call,

          call.expression,

          undefined,

          [updatedMetadata],
        ),
      );
    });
    console.log(
`Found Component : ${node.name?.text}`
);

    return ts.factory.updateClassDeclaration(
      node,

      decorators,

      node.modifiers,

      node.name,

      node.typeParameters,

      node.heritageClauses,

      node.members,
    );
  }
}
