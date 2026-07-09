export interface TypographyMigrationResult {

    source: string;

    migrated: boolean;

    typographyConfigs: number;

}

export class TypographyTransformer {

    transform(source: string): TypographyMigrationResult {

        let updated = source;

        let migrated = false;

        let typographyConfigs = 0;

        if (updated.includes("mat-typography-config")) {

            updated = updated.replaceAll(

                "mat-typography-config",

                "mat.define-typography-config"

            );

            migrated = true;

            typographyConfigs++;

        }

        if (updated.includes("angular-material-typography")) {

            updated = updated.replaceAll(

                "angular-material-typography",

                "mat.typography-hierarchy"

            );

            migrated = true;

            typographyConfigs++;

        }

        return {

            source: updated,

            migrated,

            typographyConfigs

        };

    }

}