// Generated from java-escape by ANTLR 4.11.1
// jshint ignore: start
import antlr4 from 'antlr4';
import getQuery from './enumQueries';
import { amino_any_next_amino,
		 amino_any_next_amino_any,
		 amino_next_amino,
		 amino_next_amino_any
		} from './enumQueries';
import { setBigQuery } from './catchElements';

// This class defines a complete listener for a parse tree produced by ExprParser.
export default class ExprListener extends antlr4.tree.ParseTreeListener {
	lastAmino = "";
	index = 0;
	queries = [];

	// Enter a parse tree produced by ExprParser#pattern.
	enterPattern(ctx) {
	}

	// Exit a parse tree produced by ExprParser#pattern.
	exitPattern(ctx) {
		var bigQuery = getQuery(this.queries);
		var completeQuery = `
		SELECT id, title, classification, organism FROM (
			`+ bigQuery + `) AS Q NATURAL JOIN protein WHERE protein_id=id`;
		setBigQuery(completeQuery);
	}


	// Enter a parse tree produced by ExprParser#aminoexpression.
	enterAminoexpression(ctx) {
	}

	// Exit a parse tree produced by ExprParser#aminoexpression.
	exitAminoexpression(ctx) {
	}


	// Enter a parse tree produced by ExprParser#aminoclause.
	enterAminoclause(ctx) {
	}

	// Exit a parse tree produced by ExprParser#aminoclause.
	exitAminoclause(ctx) {
		// First check the type of amino acid: can be unique or group or except.
		if (this.lastAmino == "") {
			this.lastAmino = ctx.getText()
			this.index += 1;
		}
		else {
			// Check if the last amino is a Any amino
			if(this.lastAmino.toUpperCase() == 'X'){

				// Check if the current amino is a Any amino
				if(ctx.getText().toUpperCase() == 'X'){
					var query = amino_any_next_amino_any;
					query = query.replaceAll('<<amino_any 1 id>>', (this.index).toString())
					query = query.replaceAll("<<amino_any 2 id>>", (this.index + 1).toString())
					this.queries.push(query)
					this.lastAmino = ctx.getText()
					this.index += 1;
				}

				// Check if the current amino is a except
				else if(ctx.getText().includes('{') && ctx.getText().includes('}')){
					var query = amino_any_next_amino;
					query = query.replaceAll('<<amino_any id>>', (this.index).toString());
					query = query.replaceAll('<<amino id>>', (this.index + 1).toString());

					// remove the curly brackets and iterate over the amino acids
					var aminoAcids = ctx.getText().replace('{', '').replace('}', '').split('');
					var first = aminoAcids.shift();
					var condition = "(amino2_symbol !='"+first+"' ";
					aminoAcids.forEach(amino => {
						condition += "AND amino2_symbol !='"+amino+"' ";
					});
					condition += ")";
					query = query.replaceAll('<<condition>>', condition);
					this.queries.push(query)
					this.lastAmino = ctx.getText()
					this.index += 1;
				}

				// Check if the current amino is a group
				else if(ctx.getText().includes('[') && ctx.getText().includes(']')){
					var query = amino_any_next_amino;
					query = query.replaceAll('<<amino_any id>>', (this.index).toString());
					query = query.replaceAll('<<amino id>>', (this.index + 1).toString());

					// remove the square brackets and iterate over the amino acids
					var aminoAcids = ctx.getText().replace('[', '').replace(']', '').split('');
					var first = aminoAcids.shift();
					var condition = "(amino2_symbol ='"+first+"' ";
					aminoAcids.forEach(amino => {
						condition += "OR amino2_symbol ='"+amino+"' ";
					});
					condition += ")";
					query = query.replaceAll('<<condition>>', condition);
					this.queries.push(query)
					this.lastAmino = ctx.getText()
					this.index += 1;
				}

				// Check if the current amino is a unique amino
				else{
					var query = amino_any_next_amino;
					query = query.replaceAll('<<amino_any id>>', (this.index).toString());
					query = query.replaceAll('<<amino id>>', (this.index + 1).toString());
					query = query.replaceAll('<<condition>>', "amino2_symbol ='"+ctx.getText()+"'");
					this.queries.push(query)
					this.lastAmino = ctx.getText()
					this.index += 1;
				}
			}

			// Check if the last amino is a except
			else if (this.lastAmino.includes('{') && this.lastAmino.includes('}')){
				// Check if the current amino is a Any amino
				if(ctx.getText().toUpperCase() == 'X'){
					var query = amino_next_amino_any;
					query = query.replaceAll('<<amino id>>', (this.index).toString());
					query = query.replaceAll('<<amino_any id>>', (this.index + 1).toString());

					// remove the curly brackets and iterate over the amino acids
					var aminoAcids = this.lastAmino.replace('{', '').replace('}', '').split('');
					var first = aminoAcids.shift();
					var condition = "(amino1_symbol !='"+first+"' ";
					aminoAcids.forEach(amino => {
						condition += "AND amino1_symbol !='"+amino+"' ";
					});
					condition += ")";
					query = query.replaceAll('<<condition>>', condition);
					this.queries.push(query)
					this.lastAmino = ctx.getText()
					this.index += 1;
				}

				// Check if the current amino is a except
				else if(ctx.getText().includes('{') && ctx.getText().includes('}')){
					var query = amino_next_amino;
					query = query.replaceAll('<<amino 1 id>>', (this.index).toString());
					query = query.replaceAll('<<amino 2 id>>', (this.index + 1).toString());

					// remove the curly brackets and iterate over the amino acids
					var aminoAcids1 = this.lastAmino.replace('{', '').replace('}', '').split('');
					var first1 = aminoAcids1.shift();
					var condition1 = "(amino1_symbol !='"+first1+"' ";
					aminoAcids1.forEach(amino => {
						condition1 += "AND amino1_symbol !='"+amino+"' ";
					});
					condition1 += ")";
					var aminoAcids2 = this.lastAmino.replace('{', '').replace('}', '').split('');
					var first2 = aminoAcids2.shift();
					var condition2 = "(amino2_symbol !='"+first2+"' ";
					aminoAcids.forEach(amino => {
						condition2 += "AND amino2_symbol !='"+amino+"' ";
					});
					condition2 += ")";
					query = query.replaceAll('<<condition 1>>', condition1);
					query = query.replaceAll('<<condition 2>>', condition2);
					this.queries.push(query)
					this.lastAmino = ctx.getText()
					this.index += 1;
				}

				// Check if the current amino is a group
				else if(ctx.getText().includes('[') && ctx.getText().includes(']')){
					var query = amino_next_amino;
					query = query.replaceAll('<<amino 1 id>>', (this.index).toString());
					query = query.replaceAll('<<amino 2 id>>', (this.index + 1).toString());

					// remove the curly brackets and iterate over the amino acids
					var aminoAcids1 = this.lastAmino.replace('{', '').replace('}', '').split('');
					var first1 = aminoAcids1.shift();
					var condition1 = "(amino1_symbol !='"+first1+"' ";
					aminoAcids1.forEach(amino => {
						condition1 += "AND amino1_symbol !='"+amino+"' ";
					});
					var aminoAcids2 = this.lastAmino.replace('[', '').replace(']', '').split('');
					var first2 = aminoAcids2.shift();
					var condition2 = "(amino2_symbol ='"+first2+"' ";
					aminoAcids.forEach(amino => {
						condition2 += "OR amino2_symbol ='"+amino+"' ";
					});
					condition2 += ")";
					query = query.replaceAll('<<condition 1>>', condition1);
					query = query.replaceAll('<<condition 2>>', condition2);
					this.queries.push(query)
					this.lastAmino = ctx.getText()
					this.index += 1;
				}

				// Check if the current amino is a unique amino
				else{
					var query = amino_next_amino;
					query = query.replaceAll('<<amino 1 id>>', (this.index).toString());
					query = query.replaceAll('<<amino 2 id>>', (this.index + 1).toString());

					// remove the curly brackets and iterate over the amino acids
					var aminoAcids1 = this.lastAmino.replace('{', '').replace('}', '').split('');
					var first1 = aminoAcids1.shift();
					var condition1 = "(amino1_symbol !='"+first1+"' ";
					aminoAcids1.forEach(amino => {
						condition1 += "AND amino1_symbol !='"+amino+"' ";
					});
					condition1 += ")";
					
					query = query.replaceAll('<<condition 1>>', condition1);
					query = query.replaceAll('<<condition 2>>', "amino2_symbol ='"+ctx.getText()+"'")
					this.queries.push(query)
					this.lastAmino = ctx.getText()
					this.index += 1;
				}
			}

			// Check if the last amino is a group
			else if (this.lastAmino.includes('[') && this.lastAmino.includes(']')){
				// Check if the current amino is a Any amino
				if(ctx.getText().toUpperCase() == 'X'){
					var query = amino_next_amino_any;
					query = query.replaceAll('<<amino id>>', (this.index).toString());
					query = query.replaceAll('<<amino_any id>>', (this.index + 1).toString());

					// remove the square brackets and iterate over the amino acids
					var aminoAcids = this.lastAmino.replace('[', '').replace(']', '').split('');
					var first = aminoAcids.shift();
					var condition = "(amino1_symbol ='"+first+"' ";
					aminoAcids.forEach(amino => {
						condition += "OR amino1_symbol ='"+amino+"' ";
					});
					condition += ")";
					query = query.replaceAll('<<condition>>', condition);
					this.queries.push(query)
					this.lastAmino = ctx.getText()
					this.index += 1;
				}

				// Check if the current amino is a except
				else if(ctx.getText().includes('{') && ctx.getText().includes('}')){
					var query = amino_next_amino;
					query = query.replaceAll('<<amino 1 id>>', (this.index).toString());
					query = query.replaceAll('<<amino 2 id>>', (this.index + 1).toString());

					// remove the curly and square brackets and iterate over the amino acids
					var aminoAcids1 = this.lastAmino.replace('[', '').replace(']', '').split('');
					var first1 = aminoAcids1.shift();
					var condition1 = "(amino1_symbol ='"+first1+"' ";
					aminoAcids1.forEach(amino => {
						condition1 += "OR amino1_symbol ='"+amino+"' ";
					});
					condition1 += ")";
					var aminoAcids2 = this.lastAmino.replace('{', '').replace('}', '').split('');
					var first2 = aminoAcids2.shift();
					var condition2 = "(amino2_symbol !='"+first2+"' ";
					aminoAcids.forEach(amino => {
						condition2 += "AND amino2_symbol !='"+amino+"' ";
					});
					condition2 += ")";
					query = query.replaceAll('<<condition 1>>', condition1);
					query = query.replaceAll('<<condition 2>>', condition2);
					this.queries.push(query)
					this.lastAmino = ctx.getText()
					this.index += 1;
				}

				// Check if the current amino is a group
				else if(ctx.getText().includes('[') && ctx.getText().includes(']')){
					var query = amino_next_amino;
					query = query.replaceAll('<<amino 1 id>>', (this.index).toString());
					query = query.replaceAll('<<amino 2 id>>', (this.index + 1).toString());

					// remove the square brackets and iterate over the amino acids
					var aminoAcids1 = this.lastAmino.replace('[', '').replace(']', '').split('');
					var first1 = aminoAcids1.shift();
					var condition1 = "(amino1_symbol ='"+first1+"' ";
					aminoAcids1.forEach(amino => {
						condition1 += "OR amino1_symbol ='"+amino+"' ";
					});
					var aminoAcids2 = this.lastAmino.replace('[', '').replace(']', '').split('');
					var first2 = aminoAcids2.shift();
					var condition2 = "(amino2_symbol ='"+first2+"' ";
					aminoAcids.forEach(amino => {
						condition2 += "OR amino2_symbol ='"+amino+"' ";
					});
					condition2 += ")";
					query = query.replaceAll('<<condition 1>>', condition1);
					query = query.replaceAll('<<condition 2>>', condition2);
					this.queries.push(query)
					this.lastAmino = ctx.getText()
					this.index += 1;
				}

				// Check if the current amino is a unique amino
				else{
					var query = amino_next_amino;
					query = query.replaceAll('<<amino 1 id>>', (this.index).toString());
					query = query.replaceAll('<<amino 2 id>>', (this.index + 1).toString());

					// remove the square brackets and iterate over the amino acids
					var aminoAcids1 = this.lastAmino.replace('[', '').replace(']', '').split('');
					var first1 = aminoAcids1.shift();
					var condition1 = "(amino1_symbol ='"+first1+"' ";
					aminoAcids1.forEach(amino => {
						condition1 += "OR amino1_symbol ='"+amino+"' ";
					});
					condition1 += ")";
					
					query = query.replaceAll('<<condition 1>>', condition1);
					query = query.replaceAll('<<condition 2>>', "amino2_symbol ='"+ctx.getText()+"'")
					this.queries.push(query)
					this.lastAmino = ctx.getText()
					this.index += 1;
				}
			}

			// Check if the last amino is a unique amino
			else{
				// Check if the current amino is a Any amino
				if(ctx.getText().toUpperCase() == 'X'){
					var query = amino_next_amino_any;
					query = query.replaceAll('<<amino id>>', (this.index).toString())
					query = query.replaceAll('<<amino_any id>>', (this.index + 1).toString())
					query = query.replaceAll('<<condition>>', "amino1_symbol ='"+this.lastAmino+"'")
					this.queries.push(query)
					this.lastAmino = ctx.getText()
					this.index += 1;
				}

				// Check if the current amino is a except
				else if(ctx.getText().includes('{') && ctx.getText().includes('}')){
					var query = amino_next_amino;
					query = query.replaceAll('<<amino 1 id>>', (this.index).toString())
					query = query.replaceAll('<<amino 2 id>>', (this.index + 1).toString())

					// remove the curly brackets and iterate over the amino acids
					var aminoAcids2 = this.lastAmino.replace('{', '').replace('}', '').split('');
					var first2 = aminoAcids2.shift();
					var condition2 = "(amino2_symbol !='"+first2+"' ";
					aminoAcids.forEach(amino => {
						condition2 += "AND amino2_symbol !='"+amino+"' ";
					});
					condition2 += ")";
					query = query.replaceAll('<<condition 1>>', "amino1_symbol ='"+this.lastAmino+"'")
					query = query.replaceAll('<<condition 2>>', condition2)
					this.queries.push(query)
					this.lastAmino = ctx.getText()
					this.index += 1;
				}

				// Check if the current amino is a group
				else if(ctx.getText().includes('[') && ctx.getText().includes(']')){
					var query = amino_next_amino;
					query = query.replaceAll('<<amino 1 id>>', (this.index).toString())
					query = query.replaceAll('<<amino 2 id>>', (this.index + 1).toString())

					// remove the curly brackets and iterate over the amino acids
					var aminoAcids2 = this.lastAmino.replace('[', '').replace(']', '').split('');
					var first2 = aminoAcids2.shift();
					var condition2 = "(amino2_symbol ='"+first2+"' ";
					aminoAcids.forEach(amino => {
						condition2 += "OR amino2_symbol a='"+amino+"' ";
					});
					condition2 += ")";
					query = query.replaceAll('<<condition 1>>', "amino1_symbol ='"+this.lastAmino+"'")
					query = query.replaceAll('<<condition 2>>', condition2)
					this.queries.push(query)
					this.lastAmino = ctx.getText()
					this.index += 1;
				}

				// Check if the current amino is a unique amino
				else{
					var query = amino_next_amino;
					query = query.replaceAll('<<amino 1 id>>', (this.index).toString())
					query = query.replaceAll('<<amino 2 id>>', (this.index+1).toString())
					query = query.replaceAll('<<condition 1>>', "amino1_symbol ='"+this.lastAmino+"'")
					query = query.replaceAll('<<condition 2>>', "amino2_symbol ='"+ctx.getText()+"'")
					this.queries.push(query)
					this.lastAmino = ctx.getText()
					this.index += 1;
				}
			}
		}
	}


	// Enter a parse tree produced by ExprParser#aminoconditionor.
	enterAminoconditionor(ctx) {
	}

	// Exit a parse tree produced by ExprParser#aminoconditionor.
	exitAminoconditionor(ctx) {
	}


	// Enter a parse tree produced by ExprParser#aminoexclude.
	enterAminoexclude(ctx) {
	}

	// Exit a parse tree produced by ExprParser#aminoexclude.
	exitAminoexclude(ctx) {
	}


	// Enter a parse tree produced by ExprParser#aminorepetition.
	enterAminorepetition(ctx) {
	}

	// Exit a parse tree produced by ExprParser#aminorepetition.
	exitAminorepetition(ctx) {
		console.log("Repeticion: " + ctx.getText())
	}


	// Enter a parse tree produced by ExprParser#aminorepetitionextension.
	enterAminorepetitionextension(ctx) {
	}

	// Exit a parse tree produced by ExprParser#aminorepetitionextension.
	exitAminorepetitionextension(ctx) {
		console.log("Repeticion Extension: " + ctx.getText())
	}


	// Enter a parse tree produced by ExprParser#cterminusexpression.
	enterCterminusexpression(ctx) {
	}

	// Exit a parse tree produced by ExprParser#cterminusexpression.
	exitCterminusexpression(ctx) {
	}


	// Enter a parse tree produced by ExprParser#cterminusspecialclause.
	enterCterminusspecialclause(ctx) {
	}

	// Exit a parse tree produced by ExprParser#cterminusspecialclause.
	exitCterminusspecialclause(ctx) {
	}


	// Enter a parse tree produced by ExprParser#nterminus.
	enterNterminus(ctx) {
	}

	// Exit a parse tree produced by ExprParser#nterminus.
	exitNterminus(ctx) {
	}


	// Enter a parse tree produced by ExprParser#aminoacid.
	enterAminoacid(ctx) {
	}

	// Exit a parse tree produced by ExprParser#aminoacid.
	exitAminoacid(ctx) {
	}


	// Enter a parse tree produced by ExprParser#patternend.
	enterPatternend(ctx) {
	}

	// Exit a parse tree produced by ExprParser#patternend.
	exitPatternend(ctx) {
	}



}