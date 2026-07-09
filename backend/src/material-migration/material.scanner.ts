import * as ts from 'typescript';
import { MaterialReport } from './material.report';

export class MaterialScanner {

  scan(source: ts.SourceFile): MaterialReport {

    let totalMaterialImports = 0;

    let legacyImports = 0;

    let mdcImports = 0;

    const modules = new Set<string>();

    ts.forEachChild(source, node => {

      if (!ts.isImportDeclaration(node)) {

        return;

      }

      const moduleName =
        node.moduleSpecifier
          .getText()
          .replace(/'/g, '')
          .replace(/"/g, '');

      if (!moduleName.startsWith('@angular/material')) {

        return;

      }

      totalMaterialImports++;

      if (moduleName.includes('legacy')) {

        legacyImports++;

      } else {

        mdcImports++;

      }

      modules.add(moduleName);

    });

    return {

      materialVersion: 'Unknown',

      totalMaterialImports,

      legacyImports,

      mdcImports,

      componentsUsingMaterial:
        totalMaterialImports > 0 ? 1 : 0,

      materialModules:
        [...modules]

    };

  }

}