export class Protein {
    id: string;
    title: string;
    classification: string;
    organism: string;
    deposited: Date;
    released: Date;
    authors: string;
    method: string;
    resolution: string;
    rvaluefree: number;
    rvaluework: number;
    clashscore: number;
    ramachandran: number;
    sidechain: number;

    constructor() {
        this.id = "";
        this.title = "";
        this.classification = "";
        this.organism = "";
        this.deposited = new Date();
        this.released = new Date();
        this.authors = "";
        this.method = "";
        this.resolution = "";
        this.rvaluefree = 0;
        this.rvaluework = 0;
        this.clashscore = 0;
        this.ramachandran = 0;
        this.sidechain = 0;
    }
}