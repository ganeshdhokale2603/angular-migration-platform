export interface AstComponent {

    className: string;

    selector?: string;

    standalone: boolean;

    templateUrl?: string;

    template?: string;

    styleUrls: string[];

    styles: string[];

    changeDetection?: string;

    filePath: string;

}