// Generated from Expr.g4 by ANTLR 4.12.0
// jshint ignore: start
import antlr4 from 'antlr4';

// This class defines a complete generic visitor for a parse tree produced by ExprParser.

export default class ExprVisitor extends antlr4.tree.ParseTreeVisitor {

	// Visit a parse tree produced by ExprParser#pattern.
	visitPattern(ctx) {
	  return this.visitChildren(ctx);
	}


	// Visit a parse tree produced by ExprParser#ligandclause.
	visitLigandclause(ctx) {
	  return this.visitChildren(ctx);
	}


	// Visit a parse tree produced by ExprParser#ligandextended.
	visitLigandextended(ctx) {
	  return this.visitChildren(ctx);
	}


	// Visit a parse tree produced by ExprParser#ligand.
	visitLigand(ctx) {
	  return this.visitChildren(ctx);
	}


	// Visit a parse tree produced by ExprParser#aminoexpression.
	visitAminoexpression(ctx) {
	  return this.visitChildren(ctx);
	}


	// Visit a parse tree produced by ExprParser#aminoclause.
	visitAminoclause(ctx) {
	  return this.visitChildren(ctx);
	}


	// Visit a parse tree produced by ExprParser#aminoconditionor.
	visitAminoconditionor(ctx) {
	  return this.visitChildren(ctx);
	}


	// Visit a parse tree produced by ExprParser#aminoexclude.
	visitAminoexclude(ctx) {
	  return this.visitChildren(ctx);
	}


	// Visit a parse tree produced by ExprParser#aminorepetition.
	visitAminorepetition(ctx) {
	  return this.visitChildren(ctx);
	}


	// Visit a parse tree produced by ExprParser#aminorepetitionextension.
	visitAminorepetitionextension(ctx) {
	  return this.visitChildren(ctx);
	}


	// Visit a parse tree produced by ExprParser#cterminusexpression.
	visitCterminusexpression(ctx) {
	  return this.visitChildren(ctx);
	}


	// Visit a parse tree produced by ExprParser#cterminusspecialclause.
	visitCterminusspecialclause(ctx) {
	  return this.visitChildren(ctx);
	}


	// Visit a parse tree produced by ExprParser#nterminus.
	visitNterminus(ctx) {
	  return this.visitChildren(ctx);
	}


	// Visit a parse tree produced by ExprParser#aminoacid.
	visitAminoacid(ctx) {
	  return this.visitChildren(ctx);
	}


	// Visit a parse tree produced by ExprParser#patternend.
	visitPatternend(ctx) {
	  return this.visitChildren(ctx);
	}


	// Visit a parse tree produced by ExprParser#character.
	visitCharacter(ctx) {
	  return this.visitChildren(ctx);
	}



}