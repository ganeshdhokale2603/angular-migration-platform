import { Injectable } from '@nestjs/common';
import * as fs from 'fs-extra';

@Injectable()
export class TemplateControlFlowTransformerService {

    async transform(projectPath: string): Promise<number> {

        const glob = require('glob');

        const files: string[] = glob.sync(

            `${projectPath}/src/**/*.html`

        );

        let transformed = 0;

        for (const file of files) {

            let html =

                await fs.readFile(file, 'utf8');

            const original = html;

            html = this.transformNgIf(html);

            html = this.transformNgFor(html);

            if (html !== original) {

                await fs.writeFile(file, html);

                transformed++;

            }

        }

        return transformed;

    }

    private transformNgIf(html: string): string {

        return html.replace(

            /<([^>\s]+)([^>]*)\*ngIf="([^"]+)"([^>]*)>([\s\S]*?)<\/\1>/g,

            (_,

                tag,

                before,

                condition,

                after,

                content

            ) => {

                return `@if (${condition}) {\n<${tag}${before}${after}>${content}</${tag}>\n}`;

            }

        );

    }

    private transformNgFor(html: string): string {

        return html.replace(

            /<([^>\s]+)([^>]*)\*ngFor="let\s+(\w+)\s+of\s+([^"]+)"([^>]*)>([\s\S]*?)<\/\1>/g,

            (_,

                tag,

                before,

                item,

                collection,

                after,

                content

            ) => {

                return `@for (${item} of ${collection}; track $index) {\n<${tag}${before}${after}>${content}</${tag}>\n}`;

            }

        );

    }

}