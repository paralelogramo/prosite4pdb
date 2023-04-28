grammar Expr;		
pattern: ligandclause? nterminus? aminoexpression cterminusexpression? patternend EOF ;
ligandclause: (ligand | ligandextended) ':' ;
ligandextended: '[' ligand (',' ligand)* ']' ;
ligand: (character | INT) | (character | INT) (character | INT) | (character | INT) (character | INT) (character | INT)  ;
aminoexpression:    (aminoclause | aminorepetition | aminorepetitionextension) ('-' aminoexpression)* ;
aminoclause:    aminoacid | aminoconditionor | aminoexclude ;
aminoconditionor:   '{' aminoacid+ '}' ;
aminoexclude:   '[' aminoacid+ ']' ;
aminorepetition:    (aminoacid | aminoconditionor | aminoexclude) '(' INT+ ')' ;
aminorepetitionextension:    (aminoacid | aminoconditionor | aminoexclude) '(' INT+ ',' INT+ ')'  ;
cterminusexpression:    '>' | cterminusspecialclause ;
cterminusspecialclause: '[' aminoacid+ '>' ']' ;
nterminus:  '<' ;
aminoacid:  'A' | 'R' | 'N' | 'D' | 'C' | 'Q' | 'E' | 'G' | 'H' | 'I' | 'L' | 'K' | 'M' | 'F' | 'P' | 'S' | 'T' | 'W' | 'Y' | 'V' | 'X' ;
patternend: '.' ;
NEWLINE : [\r\n]+ -> skip;
INT : [0-9] ;
character : 'A' | 'B' | 'C' | 'D' | 'E' | 'F' | 'G' | 'H' | 'I' | 'J' | 'K' | 'L' | 'M' | 'N' | 'O' | 'P' | 'Q' | 'R' | 'S' | 'T' | 'U' | 'V' | 'W' | 'X' | 'Y' | 'Z';