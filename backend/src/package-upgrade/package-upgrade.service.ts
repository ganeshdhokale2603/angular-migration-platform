import { Injectable } from '@nestjs/common';
import * as fs from 'fs-extra';
import * as path from 'path';
import { ANGULAR_VERSION_MATRIX } from './angular-version-matrix';

@Injectable()
export class PackageUpgradeService {
  async upgrade(projectPath: string, targetVersion: string) {

    const versionInfo = ANGULAR_VERSION_MATRIX[targetVersion];

    if (!versionInfo) {

        throw new Error(
            `Unsupported Angular version ${targetVersion}`
        );

    }

    const packageJsonPath = path.join(projectPath, 'package.json');

    const packageJson = await fs.readJson(packageJsonPath);

    this.upgradeDependencies(packageJson, versionInfo);

    this.upgradeDevDependencies(packageJson, versionInfo);

    this.removeDeprecatedPackages(packageJson);

    this.addModernPackages(packageJson, versionInfo);

    await fs.writeJson(packageJsonPath, packageJson, {
      spaces: 2,
    });

    return {

        status: 'SUCCESS',

        targetVersion,

        upgradedPackages: [

            '@angular/*',

            '@angular/material',

            '@angular/cdk',

            'rxjs',

            'zone.js',

            'typescript',

            '@angular/cli',

            '@angular/compiler-cli',

            '@angular-devkit/build-angular'

        ]

        };
  }

  /**
   * Upgrade dependencies
   */
  private upgradeDependencies(packageJson: any, versionInfo: any) {
    if (!packageJson.dependencies) {
      return;
    }

    const dependencies = packageJson.dependencies;

    const angularPackages = [
      '@angular/animations',

      '@angular/common',

      '@angular/compiler',

      '@angular/core',

      '@angular/forms',

      '@angular/platform-browser',

      '@angular/platform-browser-dynamic',

      '@angular/router',

      '@angular/material',

      '@angular/cdk',

      '@angular/platform-server',
        '@angular/elements',
        '@angular/localize',
        '@angular/service-worker',
        '@angular/ssr'
    ];

    angularPackages.forEach((pkg) => {
      if (dependencies[pkg]) {
        dependencies[pkg] = versionInfo.angular;
      }
    });
        // Angular Material
    if (dependencies['@angular/material']) {
        dependencies['@angular/material'] = versionInfo.material;
    }

    // Angular CDK
    if (dependencies['@angular/cdk']) {
        dependencies['@angular/cdk'] = versionInfo.cdk;
    }

    if (dependencies['rxjs']) {
      dependencies['rxjs'] = versionInfo.rxjs;
    }

    if (dependencies['zone.js']) {
      dependencies['zone.js'] = versionInfo.zone;
    }
  }

  /**
 * Upgrade devDependencies
 */
private upgradeDevDependencies(
  packageJson: any,
  versionInfo: any
) {

  if (!packageJson.devDependencies) {
    return;
  }

  const devDependencies = packageJson.devDependencies;

  if (devDependencies['typescript']) {
    devDependencies['typescript'] = versionInfo.typescript;
  }

  if (devDependencies['@angular/cli']) {
    devDependencies['@angular/cli'] = versionInfo.angular;
  }

  if (devDependencies['@angular/compiler-cli']) {
    devDependencies['@angular/compiler-cli'] = versionInfo.angular;
  }

  if (devDependencies['@angular-devkit/build-angular']) {
    devDependencies['@angular-devkit/build-angular'] = versionInfo.angular;
  }

}

private removeDeprecatedPackages(packageJson: any) {

  const deprecatedPackages = [
    'codelyzer',
    'tslint',
    'protractor',
    '@angular/http',
    'rxjs-compat'
  ];

  deprecatedPackages.forEach(pkg => {

    if (packageJson.dependencies?.[pkg]) {
      delete packageJson.dependencies[pkg];
    }

    if (packageJson.devDependencies?.[pkg]) {
      delete packageJson.devDependencies[pkg];
    }

  });

}

/**
 * Add Angular ESLint packages
 */
private addModernPackages(
  packageJson: any,
  versionInfo: any
) {

  if (!packageJson.devDependencies) {
    packageJson.devDependencies = {};
  }

  packageJson.devDependencies['@angular-eslint/builder'] =
    versionInfo.angular;

  packageJson.devDependencies['@angular-eslint/eslint-plugin'] =
    versionInfo.angular;

  packageJson.devDependencies['@angular-eslint/eslint-plugin-template'] =
    versionInfo.angular;

  packageJson.devDependencies['@angular-eslint/template-parser'] =
    versionInfo.angular;

  packageJson.devDependencies['eslint'] = '^9.0.0';

}


  /**
   * Angular Version
   */
  private getAngularVersion(version: string): string {
    return `^${version}.0.0`;
  }

  /**
   * TypeScript Version
   */
  private getTypescriptVersion(version: string): string {
    switch (version) {
      case '18':
        return '^5.5.0';

      case '19':
        return '^5.8.0';

      case '20':
        return '^5.9.3';

      default:
        return '^5.9.3';
    }
  }

  /**
   * RxJS Version
   */
  private getRxjsVersion(version: string): string {
    switch (version) {
      case '18':
      case '19':
      case '20':
        return '^7.8.1';

      default:
        return '^7.8.1';
    }
  }

  private getZoneJsVersion(version: string): string {
    switch (version) {
      case '16':
        return '~0.13.3';

      case '17':
        return '~0.14.10';

      case '18':
        return '~0.14.10';

      case '19':
        return '~0.15.0';

      case '20':
        return '~0.15.1';

      default:
        return '~0.15.1';
    }
  }
}
