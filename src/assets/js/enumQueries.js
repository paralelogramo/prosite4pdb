const queries = {
    AMINO_NEXT_AMINO: `SELECT protein_id,
    amino1_id     AS amino<< amino 1 id >>_id,
    amino1_symbol AS amino<< amino 1 id >>_symbol,
    amino1_number AS amino<< amino 1 id >>_number,
    amino2_id     AS amino<< amino 2 id >>_id,
    amino2_symbol AS amino<< amino 2 id >>_symbol,
    amino2_number AS amino<< amino 2 id >>_number
    FROM   next_amino_amino
    WHERE  amino1_symbol ='<< amino 1 code>>'
    AND    amino2_symbol ='<< amino 2 code>>'`,

    AMINO_NEXT_AMINO_ANY: `SELECT protein_id,
        amino1_id     AS amino<< amino id >>_id,
        amino1_symbol AS amino<< amino id >>_symbol,
        amino1_number AS amino<< amino id >>_number,
        amino2_id     AS amino<< amino_any id >>_id,
        amino2_symbol AS amino<< amino_any id >>_symbol,
        amino2_number AS amino<< amino_any id >>_number
        FROM   next_amino_amino
        WHERE  amino1_symbol ='<< amino code>>'`,

    AMINO_ANY_NEXT_AMINO: `SELECT protein_id,
        amino1_id     AS amino<< amino_any id >>_id,
        amino1_symbol AS amino<< amino_any id >>_symbol,
        amino1_number AS amino<< amino_any id >>_number,
        amino2_id     AS amino<< amino id >>_id,
        amino2_symbol AS amino<< amino id >>_symbol,
        amino2_number AS amino<< amino id >>_number
        FROM   next_amino_amino
        WHERE  amino2_symbol ='<< amino code>>'`,

    AMINO_ANY_NEXT_AMINO_ANY: `SELECT protein_id,
        amino1_id     AS amino<< amino_any 1 id >>_id,
        amino1_symbol AS amino<< amino_any 1 id >>_symbol,
        amino1_number AS amino<< amino_any 1 id >>_number,
        amino2_id     AS amino<< amino_any 2 id >>_id,
        amino2_symbol AS amino<< amino_any 2 id >>_symbol,
        amino2_number AS amino<< amino_any 2 id >>_number
        FROM   next_amino_amino`
} 

export function getQuery(littleQueries) {
    var end, index, init, lastQuery;
    index = 1;
    lastQuery = littleQueries.pop();
    init = "SELECT *\n        FROM (\n            (\n        ";
    end = "\n        )\n        WHERE\n        ";
  
    for (var query, _pj_c = 0, _pj_a = littleQueries, _pj_b = _pj_a.length; _pj_c < _pj_b; _pj_c += 1) {
      query = _pj_a[_pj_c];
      init = init + query + "    )\n            AS\n            Q" + index.toString() + " NATURAL JOIN\n                (\n            ";
      index += 1;
    }
  
    init = init + lastQuery + "    )\n        AS\n        Q" + index.toString() + end;
  
    for (var i = 0, _pj_a = littleQueries.length + 1; i < _pj_a; i += 1) {
      init = init + "amino" + (i + 1).toString() + "_id <> amino" + (i + 2).toString() + "_id    AND\n";
    }
  
    return init.slice(0, init.length - 4);
  }
  