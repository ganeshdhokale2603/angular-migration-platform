import { Injectable } from '@nestjs/common';
import fg from 'fast-glob';
import * as fs from 'fs-extra';
import { FileUtils } from './utils/file-utils';

@Injectable()
export class ScannerService {
  /**
   * Main method called by MigrationService
   */
  async scan(projectPath: string) {
    console.log('Scanning project:', projectPath);

    // Find all Angular components
    const components = await fg('**/*.component.ts', {
      cwd: projectPath,
      absolute: true,
    });

    // Find all Angular modules
    const modules = await fg('**/*.module.ts', {
      cwd: projectPath,
      absolute: true,
    });

    // Find all services
    const services = await fg('**/*.service.ts', {
      cwd: projectPath,
      absolute: true,
    });

    // Find all directives
    const directives = await fg('**/*.directive.ts', {
      cwd: projectPath,
      absolute: true,
    });

    // Find all pipes
    const pipes = await fg('**/*.pipe.ts', {
      cwd: projectPath,
      absolute: true,
    });

    // Find routing files
    const routing = await fg('**/*routing*.ts', {
      cwd: projectPath,
      absolute: true,
    });

    /**
     * Detect Standalone Components
     */
    const standaloneComponents: string[] = [];

    for (const component of components) {
      const isStandalone = await this.isStandaloneComponent(component);

      if (isStandalone) {
        standaloneComponents.push(component);
      }
    }

    /**
     * Return complete project metadata
     */
    return {
      statistics: {
        componentCount: components.length,

        moduleCount: modules.length,

        serviceCount: services.length,

        directiveCount: directives.length,

        pipeCount: pipes.length,

        routingCount: routing.length,

        standaloneComponentCount: standaloneComponents.length,
      },

      files: {
        components,

        modules,

        services,

        directives,

        pipes,

        routing,

        standaloneComponents,
      },
    };
  }

  /**
   * Detect whether a component is standalone
   */
  private async isStandaloneComponent(componentPath: string): Promise<boolean> {
    const content = await fs.readFile(componentPath, 'utf8');

    return content.includes('standalone: true');
  }
}
