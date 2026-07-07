export class BootstrapTransformer {

  transform(source: string): string {

    if (!source.includes('platformBrowserDynamic')) {
      return source;
    }

    console.log('Migrating bootstrap...');

    let updated = source;

    updated = updated.replace(
      /import\s*\{\s*platformBrowserDynamic\s*\}\s*from\s*['"]@angular\/platform-browser-dynamic['"];/,
      `import { bootstrapApplication } from '@angular/platform-browser';`
    );

    updated = updated.replace(
      /import\s*\{\s*AppModule\s*\}\s*from\s*['"].*app\.module['"];/,
      ``
    );

    updated = updated.replace(
      /\.bootstrapModule\s*\(\s*AppModule\s*\)/,
      `.bootstrapApplication(AppComponent)`
    );

    updated = updated.replace(
      /platformBrowserDynamic\(\)/,
      `bootstrapApplication`
    );

    return updated;

  }

}