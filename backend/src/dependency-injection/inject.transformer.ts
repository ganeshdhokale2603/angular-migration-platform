import { Injectable } from '@nestjs/common';

@Injectable()
export class InjectTransformer {
  transform(source: string): string {
    if (!source.includes('constructor(')) {
      return source;
    }

    console.log('Migrating constructor injection...');

    const constructorRegex = /constructor\s*\(([\s\S]*?)\)\s*\{[\s\S]*?\}/m;

    const match = source.match(constructorRegex);

    if (!match) {
      return source;
    }

    const params = match[1]
      .split(',')
      .map((p) => p.trim())
      .filter(Boolean);

    const injectLines: string[] = [];

    params.forEach((param) => {
      const result = param.match(
        /(private|public|protected)\s+(\w+)\s*:\s*([\w<>]+)/,
      );

      if (!result) {
        return;
      }

      const [, , name, type] = result;

      injectLines.push(`private ${name} = inject(${type});`);
    });

    let updated = source.replace(constructorRegex, injectLines.join('\n\n'));

    if (updated.includes('inject(') && !updated.includes('inject }')) {
      updated = updated.replace(
        /from '@angular\/core';/,
        `, inject } from '@angular/core';`,
      );

      updated = updated.replace(
        'import { Component,',
        'import { Component, inject,',
      );

      updated = updated.replace(
        'import { Injectable,',
        'import { Injectable, inject,',
      );
    }

    return updated;
  }
}
