export interface IconMigrationResult {

    source: string;

    migrated: boolean;

    legacyIcons: number;

}

export class IconTransformer {

    transform(source: string): IconMigrationResult {

        let updated = source;

        let legacyIcons = 0;

        const matches =
            updated.match(/<mat-icon>/g);

        if (matches) {

            legacyIcons = matches.length;

        }

        return {

            source: updated,

            migrated: legacyIcons > 0,

            legacyIcons

        };

    }

}