import * as ts from 'typescript';

export class ComponentAnalyzer {
  static getComponentDecorator(
    sourceFile: ts.SourceFile,
  ): ts.Decorator | undefined {
    let decorator: ts.Decorator | undefined;

    ts.forEachChild(sourceFile, (node) => {
      if (ts.isClassDeclaration(node)) {
        if (ts.canHaveDecorators(node)) {
          const decorators = ts.getDecorators(node);

          decorator = decorators?.find((d) => {
            const expr = d.expression;

            return (
              ts.isCallExpression(expr) &&
              expr.expression.getText() === 'Component'
            );
          });
        }
      }
    });

    return decorator;
  }
}
