import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'customTextLigand'
})
export class customTextLigandPipe implements PipeTransform {

    transform(value: string[], ...args: unknown[]): string {
        try {
            if (value.length == 0) {
                return "ANY"
            }
            else if (value.length == 1) {
                return value[0]
            }
            return "LIGANDS"
        } catch (error) {
            return "ANY"
        }
    }
}
