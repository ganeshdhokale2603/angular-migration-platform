export class LazyLoadingTransformer {
  transform(source: string): string {
    return source.replace(
      /loadChildren\s*:\s*\(\)\s*=>\s*import\((.*?)\)\.then\(\s*m\s*=>\s*m\.(.*?)Module\s*\)/gs,

      (_, path, moduleName) => {
        const componentName = moduleName.replace(/Module$/, '') + 'Component';

        const componentPath = path.replace('.module', '.component');

        return `loadComponent: () => import(${componentPath}).then(c => c.${componentName})`;
      },
    );
  }
}
