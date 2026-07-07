export class StandaloneTransformer {

  transform(source: string): string {

    if (!source.includes('@Component')) {
      return source;
    }

    // Already standalone
    if (source.includes('standalone: true')) {
      return source;
    }

    const componentRegex = /@Component\s*\(\s*\{/;

    if (!componentRegex.test(source)) {
      return source;
    }

    return source.replace(
      componentRegex,
      `@Component({
  standalone: true,
  imports: [],`
    );
  }

}