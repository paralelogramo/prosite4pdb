const ce = require('./catchElements.js');

export const amino_next_amino = `SELECT protein_id,
                                amino1_id     AS amino<< amino 1 id >>_id,
                                amino1_symbol AS amino<< amino 1 id >>_symbol,
                                amino1_number AS amino<< amino 1 id >>_number,
                                amino2_id     AS amino<< amino 2 id >>_id,
                                amino2_symbol AS amino<< amino 2 id >>_symbol,
                                amino2_number AS amino<< amino 2 id >>_number
                                FROM   next_amino_amino
                                WHERE  amino1_symbol ='<< amino 1 code>>'
                                AND    amino2_symbol ='<< amino 2 code>>'`;

export const notamino_next_amino = `SELECT protein_id,
                                amino1_id     AS amino<< amino 1 id >>_id,
                                amino1_symbol AS amino<< amino 1 id >>_symbol,
                                amino1_number AS amino<< amino 1 id >>_number,
                                amino2_id     AS amino<< amino 2 id >>_id,
                                amino2_symbol AS amino<< amino 2 id >>_symbol,
                                amino2_number AS amino<< amino 2 id >>_number
                                FROM   next_amino_amino
                                WHERE  amino1_symbol !='<< amino 1 code>>'
                                AND    amino2_symbol ='<< amino 2 code>>'`;

export const amino_next_notamino = `SELECT protein_id,
                                amino1_id     AS amino<< amino 1 id >>_id,
                                amino1_symbol AS amino<< amino 1 id >>_symbol,
                                amino1_number AS amino<< amino 1 id >>_number,
                                amino2_id     AS amino<< amino 2 id >>_id,
                                amino2_symbol AS amino<< amino 2 id >>_symbol,
                                amino2_number AS amino<< amino 2 id >>_number
                                FROM   next_amino_amino
                                WHERE  amino1_symbol ='<< amino 1 code>>'
                                AND    amino2_symbol !='<< amino 2 code>>'`;

export const notamino_next_notamino = `SELECT protein_id,
                                amino1_id     AS amino<< amino 1 id >>_id,
                                amino1_symbol AS amino<< amino 1 id >>_symbol,
                                amino1_number AS amino<< amino 1 id >>_number,
                                amino2_id     AS amino<< amino 2 id >>_id,
                                amino2_symbol AS amino<< amino 2 id >>_symbol,
                                amino2_number AS amino<< amino 2 id >>_number
                                FROM   next_amino_amino
                                WHERE  amino1_symbol !='<< amino 1 code>>'
                                AND    amino2_symbol !='<< amino 2 code>>'`;

export const amino_next_amino_any = `SELECT protein_id,
                                amino1_id     AS amino<< amino id >>_id,
                                amino1_symbol AS amino<< amino id >>_symbol,
                                amino1_number AS amino<< amino id >>_number,
                                amino2_id     AS amino<< amino_any id >>_id,
                                amino2_symbol AS amino<< amino_any id >>_symbol,
                                amino2_number AS amino<< amino_any id >>_number
                                FROM   next_amino_amino
                                WHERE  amino1_symbol ='<< amino code>>'`;

export const amino_any_next_amino = `SELECT protein_id,
                                amino1_id     AS amino<< amino_any id >>_id,
                                amino1_symbol AS amino<< amino_any id >>_symbol,
                                amino1_number AS amino<< amino_any id >>_number,
                                amino2_id     AS amino<< amino id >>_id,
                                amino2_symbol AS amino<< amino id >>_symbol,
                                amino2_number AS amino<< amino id >>_number
                                FROM   next_amino_amino
                                WHERE  amino2_symbol ='<< amino code>>'`;

export const amino_any_next_amino_any = `SELECT protein_id,
                                amino1_id     AS amino<< amino_any 1 id >>_id,
                                amino1_symbol AS amino<< amino_any 1 id >>_symbol,
                                amino1_number AS amino<< amino_any 1 id >>_number,
                                amino2_id     AS amino<< amino_any 2 id >>_id,
                                amino2_symbol AS amino<< amino_any 2 id >>_symbol,
                                amino2_number AS amino<< amino_any 2 id >>_number
                                FROM   next_amino_amino`;


export default function getQuery(littleQueries) {
    var index = 1;
    if (littleQueries.length > 1){
        var lastQuery = littleQueries.pop();
        var init = ` SELECT protein_id
        FROM (
            (
        `;
        var end = `
        )
        WHERE
        `;
    
        littleQueries.forEach(query => {
            init = init + query + ` )
            AS
            Q` + index + ` NATURAL JOIN
                (
            `;
            index = index + 1;
        });
    
        init = init + lastQuery + ` )
        AS
        Q` + index + end;
    
        for (let i = 0; i <= littleQueries.length; i++) {
            init = init + `amino` + (i+1).toString() + `_id <> amino` + (i+2).toString() + `_id    AND\n`
        }
    
        var finalQuery = init.slice(0, init.length-4)
        return finalQuery;
    }
    if (littleQueries.length == 1){
        return littleQueries[0];
    }
    
}
  