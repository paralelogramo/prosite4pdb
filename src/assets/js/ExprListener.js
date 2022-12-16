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
			// Si el actual es un grupo.
			if(ctx.getText().includes("[") && ctx.getText().includes("]")) {

				// Si el anterior es un grupo.
				if (this.lastAmino.includes("[") && this.lastAmino.includes("]")) {
					
				}

				// Si el anterior es un excepcion.
				else if (this.lastAmino.includes("{") && this.lastAmino.includes("}")){
					
				}

				// Si el anterior es un amino unico.
				else {

				}

			}

			// Si el actual es un excepcion.
			else if(ctx.getText().includes("{") && ctx.getText().includes("}")) {
				
				// Si el anterior es un grupo.
				if (this.lastAmino.includes("[") && this.lastAmino.includes("]")) {
					
				}

				// Si el anterior es un excepcion.
				else if (this.lastAmino.includes("{") && this.lastAmino.includes("}")){
					
				}

				// Si el anterior es un amino unico.
				else {

				}
			}

			// Si el actual es un amino unico.
			else{

				// Si el anterior es un grupo.
				if (this.lastAmino.includes("[") && this.lastAmino.includes("]")) {
					var sequence = this.lastAmino.replace("[", "").replace("]", "").replace("X", "").split("");
				}

				// Si el anterior es un excepcion.
				else if (this.lastAmino.includes("{") && this.lastAmino.includes("}")){
					
				}

				// Si el anterior es un amino unico.
				else {
					var query = amino_next_amino;
					query = query.replaceAll('<< amino 1 id >>', (this.index).toString())
					query = query.replaceAll("<< amino 2 id >>", (this.index+1).toString())
					query = query.replaceAll("<< amino 1 code>>", this.lastAmino)
					query = query.replace("<< amino 2 code>>", ctx.getText())
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
	}


	// Enter a parse tree produced by ExprParser#aminorepetitionextension.
	enterAminorepetitionextension(ctx) {
	}

	// Exit a parse tree produced by ExprParser#aminorepetitionextension.
	exitAminorepetitionextension(ctx) {
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