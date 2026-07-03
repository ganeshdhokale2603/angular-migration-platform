import { Injectable } from '@nestjs/common';
import * as fs from 'fs-extra';
import * as path from 'path';

@Injectable()
export class PackageUpgradeService {

  async upgrade(
    projectPath: string,
    targetVersion: string
  ) {

    const packageJsonPath = path.join(projectPath, 'package.json');

    const packageJson = await fs.readJson(packageJsonPath);

    this.upgradeDependencies(packageJson, targetVersion);

    this.upgradeDevDependencies(packageJson, targetVersion);

    await fs.writeJson(packageJsonPath, packageJson, {
      spaces: 2
    });

    return {

      status: 'SUCCESS',

      targetVersion,

      upgradedPackages: [

        '@angular/*',

        '@angular/material',

        '@angular/cdk',

        'typescript',

        'rxjs'

      ]

    };

  }

  /**
   * Upgrade dependencies
   */
  private upgradeDependencies(
    packageJson: any,
    targetVersion: string
  ) {

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

      '@angular/cdk'

    ];

    angularPackages.forEach(pkg => {

      if (dependencies[pkg]) {

        dependencies[pkg] = this.getAngularVersion(targetVersion);

      }

    });

    if (dependencies['rxjs']) {

      dependencies['rxjs'] = this.getRxjsVersion(targetVersion);

    }

  }

  /**
   * Upgrade devDependencies
   */
  private upgradeDevDependencies(
    packageJson: any,
    targetVersion: string
  ) {

    if (!packageJson.devDependencies) {
      return;
    }

    const devDependencies = packageJson.devDependencies;

    if (devDependencies['typescript']) {

      devDependencies['typescript'] =
        this.getTypescriptVersion(targetVersion);

    }

    if (devDependencies['@angular/cli']) {

      devDependencies['@angular/cli'] =
        this.getAngularVersion(targetVersion);

    }

    if (devDependencies['@angular/compiler-cli']) {

      devDependencies['@angular/compiler-cli'] =
        this.getAngularVersion(targetVersion);

    }

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

}