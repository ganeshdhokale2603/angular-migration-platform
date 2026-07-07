export class RouteTransformer {
  transform(source: string): string {
    if (!source.includes('loadChildren')) {
      return source;
    }

    console.log('Migrating lazy routes...');

    return source.replace(
      /loadChildren\s*:\s*\(\)\s*=>\s*import\((.*?)\)\.then\((.*?)=>\s*(.*?)Module\)/g,
      (_match, path, _arg, moduleName) => {
        const component = moduleName.replace('Module', 'Component');

        return `loadComponent: () => import(${path}).then(m => m.${component})`;
      },
    );
  }
}
