// Generated from Expr.g4 by ANTLR 4.12.0
// jshint ignore: start
import antlr4 from 'antlr4';
import ExprListener from './ExprListener.js';
import ExprVisitor from './ExprVisitor.js';

const serializedATN = [4,1,40,175,2,0,7,0,2,1,7,1,2,2,7,2,2,3,7,3,2,4,7,
4,2,5,7,5,2,6,7,6,2,7,7,7,2,8,7,8,2,9,7,9,2,10,7,10,2,11,7,11,2,12,7,12,
2,13,7,13,2,14,7,14,2,15,7,15,1,0,3,0,34,8,0,1,0,3,0,37,8,0,1,0,1,0,3,0,
41,8,0,1,0,1,0,1,0,1,1,1,1,3,1,48,8,1,1,1,1,1,1,2,1,2,1,2,1,2,5,2,56,8,2,
10,2,12,2,59,9,2,1,2,1,2,1,3,1,3,3,3,65,8,3,1,3,1,3,3,3,69,8,3,1,3,1,3,3,
3,73,8,3,1,3,1,3,3,3,77,8,3,1,3,1,3,3,3,81,8,3,1,3,1,3,3,3,85,8,3,3,3,87,
8,3,1,4,1,4,1,4,3,4,92,8,4,1,4,1,4,5,4,96,8,4,10,4,12,4,99,9,4,1,5,1,5,1,
5,3,5,104,8,5,1,6,1,6,4,6,108,8,6,11,6,12,6,109,1,6,1,6,1,7,1,7,4,7,116,
8,7,11,7,12,7,117,1,7,1,7,1,8,1,8,1,8,3,8,125,8,8,1,8,1,8,4,8,129,8,8,11,
8,12,8,130,1,8,1,8,1,9,1,9,1,9,3,9,138,8,9,1,9,1,9,4,9,142,8,9,11,9,12,9,
143,1,9,1,9,4,9,148,8,9,11,9,12,9,149,1,9,1,9,1,10,1,10,3,10,156,8,10,1,
11,1,11,4,11,160,8,11,11,11,12,11,161,1,11,1,11,1,11,1,12,1,12,1,13,1,13,
1,14,1,14,1,15,1,15,1,15,0,0,16,0,2,4,6,8,10,12,14,16,18,20,22,24,26,28,
30,0,2,1,0,12,32,2,0,12,32,34,38,187,0,33,1,0,0,0,2,47,1,0,0,0,4,51,1,0,
0,0,6,86,1,0,0,0,8,91,1,0,0,0,10,103,1,0,0,0,12,105,1,0,0,0,14,113,1,0,0,
0,16,124,1,0,0,0,18,137,1,0,0,0,20,155,1,0,0,0,22,157,1,0,0,0,24,166,1,0,
0,0,26,168,1,0,0,0,28,170,1,0,0,0,30,172,1,0,0,0,32,34,3,2,1,0,33,32,1,0,
0,0,33,34,1,0,0,0,34,36,1,0,0,0,35,37,3,24,12,0,36,35,1,0,0,0,36,37,1,0,
0,0,37,38,1,0,0,0,38,40,3,8,4,0,39,41,3,20,10,0,40,39,1,0,0,0,40,41,1,0,
0,0,41,42,1,0,0,0,42,43,3,28,14,0,43,44,5,0,0,1,44,1,1,0,0,0,45,48,3,6,3,
0,46,48,3,4,2,0,47,45,1,0,0,0,47,46,1,0,0,0,48,49,1,0,0,0,49,50,5,1,0,0,
50,3,1,0,0,0,51,52,5,2,0,0,52,57,3,6,3,0,53,54,5,3,0,0,54,56,3,6,3,0,55,
53,1,0,0,0,56,59,1,0,0,0,57,55,1,0,0,0,57,58,1,0,0,0,58,60,1,0,0,0,59,57,
1,0,0,0,60,61,5,4,0,0,61,5,1,0,0,0,62,65,3,30,15,0,63,65,5,40,0,0,64,62,
1,0,0,0,64,63,1,0,0,0,65,87,1,0,0,0,66,69,3,30,15,0,67,69,5,40,0,0,68,66,
1,0,0,0,68,67,1,0,0,0,69,72,1,0,0,0,70,73,3,30,15,0,71,73,5,40,0,0,72,70,
1,0,0,0,72,71,1,0,0,0,73,87,1,0,0,0,74,77,3,30,15,0,75,77,5,40,0,0,76,74,
1,0,0,0,76,75,1,0,0,0,77,80,1,0,0,0,78,81,3,30,15,0,79,81,5,40,0,0,80,78,
1,0,0,0,80,79,1,0,0,0,81,84,1,0,0,0,82,85,3,30,15,0,83,85,5,40,0,0,84,82,
1,0,0,0,84,83,1,0,0,0,85,87,1,0,0,0,86,64,1,0,0,0,86,68,1,0,0,0,86,76,1,
0,0,0,87,7,1,0,0,0,88,92,3,10,5,0,89,92,3,16,8,0,90,92,3,18,9,0,91,88,1,
0,0,0,91,89,1,0,0,0,91,90,1,0,0,0,92,97,1,0,0,0,93,94,5,5,0,0,94,96,3,8,
4,0,95,93,1,0,0,0,96,99,1,0,0,0,97,95,1,0,0,0,97,98,1,0,0,0,98,9,1,0,0,0,
99,97,1,0,0,0,100,104,3,26,13,0,101,104,3,12,6,0,102,104,3,14,7,0,103,100,
1,0,0,0,103,101,1,0,0,0,103,102,1,0,0,0,104,11,1,0,0,0,105,107,5,6,0,0,106,
108,3,26,13,0,107,106,1,0,0,0,108,109,1,0,0,0,109,107,1,0,0,0,109,110,1,
0,0,0,110,111,1,0,0,0,111,112,5,7,0,0,112,13,1,0,0,0,113,115,5,2,0,0,114,
116,3,26,13,0,115,114,1,0,0,0,116,117,1,0,0,0,117,115,1,0,0,0,117,118,1,
0,0,0,118,119,1,0,0,0,119,120,5,4,0,0,120,15,1,0,0,0,121,125,3,26,13,0,122,
125,3,12,6,0,123,125,3,14,7,0,124,121,1,0,0,0,124,122,1,0,0,0,124,123,1,
0,0,0,125,126,1,0,0,0,126,128,5,8,0,0,127,129,5,40,0,0,128,127,1,0,0,0,129,
130,1,0,0,0,130,128,1,0,0,0,130,131,1,0,0,0,131,132,1,0,0,0,132,133,5,9,
0,0,133,17,1,0,0,0,134,138,3,26,13,0,135,138,3,12,6,0,136,138,3,14,7,0,137,
134,1,0,0,0,137,135,1,0,0,0,137,136,1,0,0,0,138,139,1,0,0,0,139,141,5,8,
0,0,140,142,5,40,0,0,141,140,1,0,0,0,142,143,1,0,0,0,143,141,1,0,0,0,143,
144,1,0,0,0,144,145,1,0,0,0,145,147,5,3,0,0,146,148,5,40,0,0,147,146,1,0,
0,0,148,149,1,0,0,0,149,147,1,0,0,0,149,150,1,0,0,0,150,151,1,0,0,0,151,
152,5,9,0,0,152,19,1,0,0,0,153,156,5,10,0,0,154,156,3,22,11,0,155,153,1,
0,0,0,155,154,1,0,0,0,156,21,1,0,0,0,157,159,5,2,0,0,158,160,3,26,13,0,159,
158,1,0,0,0,160,161,1,0,0,0,161,159,1,0,0,0,161,162,1,0,0,0,162,163,1,0,
0,0,163,164,5,10,0,0,164,165,5,4,0,0,165,23,1,0,0,0,166,167,5,11,0,0,167,
25,1,0,0,0,168,169,7,0,0,0,169,27,1,0,0,0,170,171,5,33,0,0,171,29,1,0,0,
0,172,173,7,1,0,0,173,31,1,0,0,0,24,33,36,40,47,57,64,68,72,76,80,84,86,
91,97,103,109,117,124,130,137,143,149,155,161];


const atn = new antlr4.atn.ATNDeserializer().deserialize(serializedATN);

const decisionsToDFA = atn.decisionToState.map( (ds, index) => new antlr4.dfa.DFA(ds, index) );

const sharedContextCache = new antlr4.atn.PredictionContextCache();

export default class ExprParser extends antlr4.Parser {

    static grammarFileName = "Expr.g4";
    static literalNames = [ null, "':'", "'['", "','", "']'", "'-'", "'{'", 
                            "'}'", "'('", "')'", "'>'", "'<'", "'A'", "'R'", 
                            "'N'", "'D'", "'C'", "'Q'", "'E'", "'G'", "'H'", 
                            "'I'", "'L'", "'K'", "'M'", "'F'", "'P'", "'S'", 
                            "'T'", "'W'", "'Y'", "'V'", "'X'", "'.'", "'B'", 
                            "'J'", "'O'", "'U'", "'Z'" ];
    static symbolicNames = [ null, null, null, null, null, null, null, null, 
                             null, null, null, null, null, null, null, null, 
                             null, null, null, null, null, null, null, null, 
                             null, null, null, null, null, null, null, null, 
                             null, null, null, null, null, null, null, "NEWLINE", 
                             "INT" ];
    static ruleNames = [ "pattern", "ligandclause", "ligandextended", "ligand", 
                         "aminoexpression", "aminoclause", "aminoconditionor", 
                         "aminoexclude", "aminorepetition", "aminorepetitionextension", 
                         "cterminusexpression", "cterminusspecialclause", 
                         "nterminus", "aminoacid", "patternend", "character" ];

    constructor(input) {
        super(input);
        this._interp = new antlr4.atn.ParserATNSimulator(this, atn, decisionsToDFA, sharedContextCache);
        this.ruleNames = ExprParser.ruleNames;
        this.literalNames = ExprParser.literalNames;
        this.symbolicNames = ExprParser.symbolicNames;
    }



	pattern() {
	    let localctx = new PatternContext(this, this._ctx, this.state);
	    this.enterRule(localctx, 0, ExprParser.RULE_pattern);
	    var _la = 0;
	    try {
	        this.enterOuterAlt(localctx, 1);
	        this.state = 33;
	        this._errHandler.sync(this);
	        var la_ = this._interp.adaptivePredict(this._input,0,this._ctx);
	        if(la_===1) {
	            this.state = 32;
	            this.ligandclause();

	        }
	        this.state = 36;
	        this._errHandler.sync(this);
	        _la = this._input.LA(1);
	        if(_la===11) {
	            this.state = 35;
	            this.nterminus();
	        }

	        this.state = 38;
	        this.aminoexpression();
	        this.state = 40;
	        this._errHandler.sync(this);
	        _la = this._input.LA(1);
	        if(_la===2 || _la===10) {
	            this.state = 39;
	            this.cterminusexpression();
	        }

	        this.state = 42;
	        this.patternend();
	        this.state = 43;
	        this.match(ExprParser.EOF);
	    } catch (re) {
	    	if(re instanceof antlr4.error.RecognitionException) {
		        localctx.exception = re;
		        this._errHandler.reportError(this, re);
		        this._errHandler.recover(this, re);
		    } else {
		    	throw re;
		    }
	    } finally {
	        this.exitRule();
	    }
	    return localctx;
	}



	ligandclause() {
	    let localctx = new LigandclauseContext(this, this._ctx, this.state);
	    this.enterRule(localctx, 2, ExprParser.RULE_ligandclause);
	    try {
	        this.enterOuterAlt(localctx, 1);
	        this.state = 47;
	        this._errHandler.sync(this);
	        switch(this._input.LA(1)) {
	        case 12:
	        case 13:
	        case 14:
	        case 15:
	        case 16:
	        case 17:
	        case 18:
	        case 19:
	        case 20:
	        case 21:
	        case 22:
	        case 23:
	        case 24:
	        case 25:
	        case 26:
	        case 27:
	        case 28:
	        case 29:
	        case 30:
	        case 31:
	        case 32:
	        case 34:
	        case 35:
	        case 36:
	        case 37:
	        case 38:
	        case 40:
	            this.state = 45;
	            this.ligand();
	            break;
	        case 2:
	            this.state = 46;
	            this.ligandextended();
	            break;
	        default:
	            throw new antlr4.error.NoViableAltException(this);
	        }
	        this.state = 49;
	        this.match(ExprParser.T__0);
	    } catch (re) {
	    	if(re instanceof antlr4.error.RecognitionException) {
		        localctx.exception = re;
		        this._errHandler.reportError(this, re);
		        this._errHandler.recover(this, re);
		    } else {
		    	throw re;
		    }
	    } finally {
	        this.exitRule();
	    }
	    return localctx;
	}



	ligandextended() {
	    let localctx = new LigandextendedContext(this, this._ctx, this.state);
	    this.enterRule(localctx, 4, ExprParser.RULE_ligandextended);
	    var _la = 0;
	    try {
	        this.enterOuterAlt(localctx, 1);
	        this.state = 51;
	        this.match(ExprParser.T__1);
	        this.state = 52;
	        this.ligand();
	        this.state = 57;
	        this._errHandler.sync(this);
	        _la = this._input.LA(1);
	        while(_la===3) {
	            this.state = 53;
	            this.match(ExprParser.T__2);
	            this.state = 54;
	            this.ligand();
	            this.state = 59;
	            this._errHandler.sync(this);
	            _la = this._input.LA(1);
	        }
	        this.state = 60;
	        this.match(ExprParser.T__3);
	    } catch (re) {
	    	if(re instanceof antlr4.error.RecognitionException) {
		        localctx.exception = re;
		        this._errHandler.reportError(this, re);
		        this._errHandler.recover(this, re);
		    } else {
		    	throw re;
		    }
	    } finally {
	        this.exitRule();
	    }
	    return localctx;
	}



	ligand() {
	    let localctx = new LigandContext(this, this._ctx, this.state);
	    this.enterRule(localctx, 6, ExprParser.RULE_ligand);
	    try {
	        this.state = 86;
	        this._errHandler.sync(this);
	        var la_ = this._interp.adaptivePredict(this._input,11,this._ctx);
	        switch(la_) {
	        case 1:
	            this.enterOuterAlt(localctx, 1);
	            this.state = 64;
	            this._errHandler.sync(this);
	            switch(this._input.LA(1)) {
	            case 12:
	            case 13:
	            case 14:
	            case 15:
	            case 16:
	            case 17:
	            case 18:
	            case 19:
	            case 20:
	            case 21:
	            case 22:
	            case 23:
	            case 24:
	            case 25:
	            case 26:
	            case 27:
	            case 28:
	            case 29:
	            case 30:
	            case 31:
	            case 32:
	            case 34:
	            case 35:
	            case 36:
	            case 37:
	            case 38:
	                this.state = 62;
	                this.character();
	                break;
	            case 40:
	                this.state = 63;
	                this.match(ExprParser.INT);
	                break;
	            default:
	                throw new antlr4.error.NoViableAltException(this);
	            }
	            break;

	        case 2:
	            this.enterOuterAlt(localctx, 2);
	            this.state = 68;
	            this._errHandler.sync(this);
	            switch(this._input.LA(1)) {
	            case 12:
	            case 13:
	            case 14:
	            case 15:
	            case 16:
	            case 17:
	            case 18:
	            case 19:
	            case 20:
	            case 21:
	            case 22:
	            case 23:
	            case 24:
	            case 25:
	            case 26:
	            case 27:
	            case 28:
	            case 29:
	            case 30:
	            case 31:
	            case 32:
	            case 34:
	            case 35:
	            case 36:
	            case 37:
	            case 38:
	                this.state = 66;
	                this.character();
	                break;
	            case 40:
	                this.state = 67;
	                this.match(ExprParser.INT);
	                break;
	            default:
	                throw new antlr4.error.NoViableAltException(this);
	            }
	            this.state = 72;
	            this._errHandler.sync(this);
	            switch(this._input.LA(1)) {
	            case 12:
	            case 13:
	            case 14:
	            case 15:
	            case 16:
	            case 17:
	            case 18:
	            case 19:
	            case 20:
	            case 21:
	            case 22:
	            case 23:
	            case 24:
	            case 25:
	            case 26:
	            case 27:
	            case 28:
	            case 29:
	            case 30:
	            case 31:
	            case 32:
	            case 34:
	            case 35:
	            case 36:
	            case 37:
	            case 38:
	                this.state = 70;
	                this.character();
	                break;
	            case 40:
	                this.state = 71;
	                this.match(ExprParser.INT);
	                break;
	            default:
	                throw new antlr4.error.NoViableAltException(this);
	            }
	            break;

	        case 3:
	            this.enterOuterAlt(localctx, 3);
	            this.state = 76;
	            this._errHandler.sync(this);
	            switch(this._input.LA(1)) {
	            case 12:
	            case 13:
	            case 14:
	            case 15:
	            case 16:
	            case 17:
	            case 18:
	            case 19:
	            case 20:
	            case 21:
	            case 22:
	            case 23:
	            case 24:
	            case 25:
	            case 26:
	            case 27:
	            case 28:
	            case 29:
	            case 30:
	            case 31:
	            case 32:
	            case 34:
	            case 35:
	            case 36:
	            case 37:
	            case 38:
	                this.state = 74;
	                this.character();
	                break;
	            case 40:
	                this.state = 75;
	                this.match(ExprParser.INT);
	                break;
	            default:
	                throw new antlr4.error.NoViableAltException(this);
	            }
	            this.state = 80;
	            this._errHandler.sync(this);
	            switch(this._input.LA(1)) {
	            case 12:
	            case 13:
	            case 14:
	            case 15:
	            case 16:
	            case 17:
	            case 18:
	            case 19:
	            case 20:
	            case 21:
	            case 22:
	            case 23:
	            case 24:
	            case 25:
	            case 26:
	            case 27:
	            case 28:
	            case 29:
	            case 30:
	            case 31:
	            case 32:
	            case 34:
	            case 35:
	            case 36:
	            case 37:
	            case 38:
	                this.state = 78;
	                this.character();
	                break;
	            case 40:
	                this.state = 79;
	                this.match(ExprParser.INT);
	                break;
	            default:
	                throw new antlr4.error.NoViableAltException(this);
	            }
	            this.state = 84;
	            this._errHandler.sync(this);
	            switch(this._input.LA(1)) {
	            case 12:
	            case 13:
	            case 14:
	            case 15:
	            case 16:
	            case 17:
	            case 18:
	            case 19:
	            case 20:
	            case 21:
	            case 22:
	            case 23:
	            case 24:
	            case 25:
	            case 26:
	            case 27:
	            case 28:
	            case 29:
	            case 30:
	            case 31:
	            case 32:
	            case 34:
	            case 35:
	            case 36:
	            case 37:
	            case 38:
	                this.state = 82;
	                this.character();
	                break;
	            case 40:
	                this.state = 83;
	                this.match(ExprParser.INT);
	                break;
	            default:
	                throw new antlr4.error.NoViableAltException(this);
	            }
	            break;

	        }
	    } catch (re) {
	    	if(re instanceof antlr4.error.RecognitionException) {
		        localctx.exception = re;
		        this._errHandler.reportError(this, re);
		        this._errHandler.recover(this, re);
		    } else {
		    	throw re;
		    }
	    } finally {
	        this.exitRule();
	    }
	    return localctx;
	}



	aminoexpression() {
	    let localctx = new AminoexpressionContext(this, this._ctx, this.state);
	    this.enterRule(localctx, 8, ExprParser.RULE_aminoexpression);
	    try {
	        this.enterOuterAlt(localctx, 1);
	        this.state = 91;
	        this._errHandler.sync(this);
	        var la_ = this._interp.adaptivePredict(this._input,12,this._ctx);
	        switch(la_) {
	        case 1:
	            this.state = 88;
	            this.aminoclause();
	            break;

	        case 2:
	            this.state = 89;
	            this.aminorepetition();
	            break;

	        case 3:
	            this.state = 90;
	            this.aminorepetitionextension();
	            break;

	        }
	        this.state = 97;
	        this._errHandler.sync(this);
	        var _alt = this._interp.adaptivePredict(this._input,13,this._ctx)
	        while(_alt!=2 && _alt!=antlr4.atn.ATN.INVALID_ALT_NUMBER) {
	            if(_alt===1) {
	                this.state = 93;
	                this.match(ExprParser.T__4);
	                this.state = 94;
	                this.aminoexpression(); 
	            }
	            this.state = 99;
	            this._errHandler.sync(this);
	            _alt = this._interp.adaptivePredict(this._input,13,this._ctx);
	        }

	    } catch (re) {
	    	if(re instanceof antlr4.error.RecognitionException) {
		        localctx.exception = re;
		        this._errHandler.reportError(this, re);
		        this._errHandler.recover(this, re);
		    } else {
		    	throw re;
		    }
	    } finally {
	        this.exitRule();
	    }
	    return localctx;
	}



	aminoclause() {
	    let localctx = new AminoclauseContext(this, this._ctx, this.state);
	    this.enterRule(localctx, 10, ExprParser.RULE_aminoclause);
	    try {
	        this.state = 103;
	        this._errHandler.sync(this);
	        switch(this._input.LA(1)) {
	        case 12:
	        case 13:
	        case 14:
	        case 15:
	        case 16:
	        case 17:
	        case 18:
	        case 19:
	        case 20:
	        case 21:
	        case 22:
	        case 23:
	        case 24:
	        case 25:
	        case 26:
	        case 27:
	        case 28:
	        case 29:
	        case 30:
	        case 31:
	        case 32:
	            this.enterOuterAlt(localctx, 1);
	            this.state = 100;
	            this.aminoacid();
	            break;
	        case 6:
	            this.enterOuterAlt(localctx, 2);
	            this.state = 101;
	            this.aminoconditionor();
	            break;
	        case 2:
	            this.enterOuterAlt(localctx, 3);
	            this.state = 102;
	            this.aminoexclude();
	            break;
	        default:
	            throw new antlr4.error.NoViableAltException(this);
	        }
	    } catch (re) {
	    	if(re instanceof antlr4.error.RecognitionException) {
		        localctx.exception = re;
		        this._errHandler.reportError(this, re);
		        this._errHandler.recover(this, re);
		    } else {
		    	throw re;
		    }
	    } finally {
	        this.exitRule();
	    }
	    return localctx;
	}



	aminoconditionor() {
	    let localctx = new AminoconditionorContext(this, this._ctx, this.state);
	    this.enterRule(localctx, 12, ExprParser.RULE_aminoconditionor);
	    var _la = 0;
	    try {
	        this.enterOuterAlt(localctx, 1);
	        this.state = 105;
	        this.match(ExprParser.T__5);
	        this.state = 107; 
	        this._errHandler.sync(this);
	        _la = this._input.LA(1);
	        do {
	            this.state = 106;
	            this.aminoacid();
	            this.state = 109; 
	            this._errHandler.sync(this);
	            _la = this._input.LA(1);
	        } while(((((_la - 12)) & ~0x1f) === 0 && ((1 << (_la - 12)) & 2097151) !== 0));
	        this.state = 111;
	        this.match(ExprParser.T__6);
	    } catch (re) {
	    	if(re instanceof antlr4.error.RecognitionException) {
		        localctx.exception = re;
		        this._errHandler.reportError(this, re);
		        this._errHandler.recover(this, re);
		    } else {
		    	throw re;
		    }
	    } finally {
	        this.exitRule();
	    }
	    return localctx;
	}



	aminoexclude() {
	    let localctx = new AminoexcludeContext(this, this._ctx, this.state);
	    this.enterRule(localctx, 14, ExprParser.RULE_aminoexclude);
	    var _la = 0;
	    try {
	        this.enterOuterAlt(localctx, 1);
	        this.state = 113;
	        this.match(ExprParser.T__1);
	        this.state = 115; 
	        this._errHandler.sync(this);
	        _la = this._input.LA(1);
	        do {
	            this.state = 114;
	            this.aminoacid();
	            this.state = 117; 
	            this._errHandler.sync(this);
	            _la = this._input.LA(1);
	        } while(((((_la - 12)) & ~0x1f) === 0 && ((1 << (_la - 12)) & 2097151) !== 0));
	        this.state = 119;
	        this.match(ExprParser.T__3);
	    } catch (re) {
	    	if(re instanceof antlr4.error.RecognitionException) {
		        localctx.exception = re;
		        this._errHandler.reportError(this, re);
		        this._errHandler.recover(this, re);
		    } else {
		    	throw re;
		    }
	    } finally {
	        this.exitRule();
	    }
	    return localctx;
	}



	aminorepetition() {
	    let localctx = new AminorepetitionContext(this, this._ctx, this.state);
	    this.enterRule(localctx, 16, ExprParser.RULE_aminorepetition);
	    var _la = 0;
	    try {
	        this.enterOuterAlt(localctx, 1);
	        this.state = 124;
	        this._errHandler.sync(this);
	        switch(this._input.LA(1)) {
	        case 12:
	        case 13:
	        case 14:
	        case 15:
	        case 16:
	        case 17:
	        case 18:
	        case 19:
	        case 20:
	        case 21:
	        case 22:
	        case 23:
	        case 24:
	        case 25:
	        case 26:
	        case 27:
	        case 28:
	        case 29:
	        case 30:
	        case 31:
	        case 32:
	            this.state = 121;
	            this.aminoacid();
	            break;
	        case 6:
	            this.state = 122;
	            this.aminoconditionor();
	            break;
	        case 2:
	            this.state = 123;
	            this.aminoexclude();
	            break;
	        default:
	            throw new antlr4.error.NoViableAltException(this);
	        }
	        this.state = 126;
	        this.match(ExprParser.T__7);
	        this.state = 128; 
	        this._errHandler.sync(this);
	        _la = this._input.LA(1);
	        do {
	            this.state = 127;
	            this.match(ExprParser.INT);
	            this.state = 130; 
	            this._errHandler.sync(this);
	            _la = this._input.LA(1);
	        } while(_la===40);
	        this.state = 132;
	        this.match(ExprParser.T__8);
	    } catch (re) {
	    	if(re instanceof antlr4.error.RecognitionException) {
		        localctx.exception = re;
		        this._errHandler.reportError(this, re);
		        this._errHandler.recover(this, re);
		    } else {
		    	throw re;
		    }
	    } finally {
	        this.exitRule();
	    }
	    return localctx;
	}



	aminorepetitionextension() {
	    let localctx = new AminorepetitionextensionContext(this, this._ctx, this.state);
	    this.enterRule(localctx, 18, ExprParser.RULE_aminorepetitionextension);
	    var _la = 0;
	    try {
	        this.enterOuterAlt(localctx, 1);
	        this.state = 137;
	        this._errHandler.sync(this);
	        switch(this._input.LA(1)) {
	        case 12:
	        case 13:
	        case 14:
	        case 15:
	        case 16:
	        case 17:
	        case 18:
	        case 19:
	        case 20:
	        case 21:
	        case 22:
	        case 23:
	        case 24:
	        case 25:
	        case 26:
	        case 27:
	        case 28:
	        case 29:
	        case 30:
	        case 31:
	        case 32:
	            this.state = 134;
	            this.aminoacid();
	            break;
	        case 6:
	            this.state = 135;
	            this.aminoconditionor();
	            break;
	        case 2:
	            this.state = 136;
	            this.aminoexclude();
	            break;
	        default:
	            throw new antlr4.error.NoViableAltException(this);
	        }
	        this.state = 139;
	        this.match(ExprParser.T__7);
	        this.state = 141; 
	        this._errHandler.sync(this);
	        _la = this._input.LA(1);
	        do {
	            this.state = 140;
	            this.match(ExprParser.INT);
	            this.state = 143; 
	            this._errHandler.sync(this);
	            _la = this._input.LA(1);
	        } while(_la===40);
	        this.state = 145;
	        this.match(ExprParser.T__2);
	        this.state = 147; 
	        this._errHandler.sync(this);
	        _la = this._input.LA(1);
	        do {
	            this.state = 146;
	            this.match(ExprParser.INT);
	            this.state = 149; 
	            this._errHandler.sync(this);
	            _la = this._input.LA(1);
	        } while(_la===40);
	        this.state = 151;
	        this.match(ExprParser.T__8);
	    } catch (re) {
	    	if(re instanceof antlr4.error.RecognitionException) {
		        localctx.exception = re;
		        this._errHandler.reportError(this, re);
		        this._errHandler.recover(this, re);
		    } else {
		    	throw re;
		    }
	    } finally {
	        this.exitRule();
	    }
	    return localctx;
	}



	cterminusexpression() {
	    let localctx = new CterminusexpressionContext(this, this._ctx, this.state);
	    this.enterRule(localctx, 20, ExprParser.RULE_cterminusexpression);
	    try {
	        this.state = 155;
	        this._errHandler.sync(this);
	        switch(this._input.LA(1)) {
	        case 10:
	            this.enterOuterAlt(localctx, 1);
	            this.state = 153;
	            this.match(ExprParser.T__9);
	            break;
	        case 2:
	            this.enterOuterAlt(localctx, 2);
	            this.state = 154;
	            this.cterminusspecialclause();
	            break;
	        default:
	            throw new antlr4.error.NoViableAltException(this);
	        }
	    } catch (re) {
	    	if(re instanceof antlr4.error.RecognitionException) {
		        localctx.exception = re;
		        this._errHandler.reportError(this, re);
		        this._errHandler.recover(this, re);
		    } else {
		    	throw re;
		    }
	    } finally {
	        this.exitRule();
	    }
	    return localctx;
	}



	cterminusspecialclause() {
	    let localctx = new CterminusspecialclauseContext(this, this._ctx, this.state);
	    this.enterRule(localctx, 22, ExprParser.RULE_cterminusspecialclause);
	    var _la = 0;
	    try {
	        this.enterOuterAlt(localctx, 1);
	        this.state = 157;
	        this.match(ExprParser.T__1);
	        this.state = 159; 
	        this._errHandler.sync(this);
	        _la = this._input.LA(1);
	        do {
	            this.state = 158;
	            this.aminoacid();
	            this.state = 161; 
	            this._errHandler.sync(this);
	            _la = this._input.LA(1);
	        } while(((((_la - 12)) & ~0x1f) === 0 && ((1 << (_la - 12)) & 2097151) !== 0));
	        this.state = 163;
	        this.match(ExprParser.T__9);
	        this.state = 164;
	        this.match(ExprParser.T__3);
	    } catch (re) {
	    	if(re instanceof antlr4.error.RecognitionException) {
		        localctx.exception = re;
		        this._errHandler.reportError(this, re);
		        this._errHandler.recover(this, re);
		    } else {
		    	throw re;
		    }
	    } finally {
	        this.exitRule();
	    }
	    return localctx;
	}



	nterminus() {
	    let localctx = new NterminusContext(this, this._ctx, this.state);
	    this.enterRule(localctx, 24, ExprParser.RULE_nterminus);
	    try {
	        this.enterOuterAlt(localctx, 1);
	        this.state = 166;
	        this.match(ExprParser.T__10);
	    } catch (re) {
	    	if(re instanceof antlr4.error.RecognitionException) {
		        localctx.exception = re;
		        this._errHandler.reportError(this, re);
		        this._errHandler.recover(this, re);
		    } else {
		    	throw re;
		    }
	    } finally {
	        this.exitRule();
	    }
	    return localctx;
	}



	aminoacid() {
	    let localctx = new AminoacidContext(this, this._ctx, this.state);
	    this.enterRule(localctx, 26, ExprParser.RULE_aminoacid);
	    var _la = 0;
	    try {
	        this.enterOuterAlt(localctx, 1);
	        this.state = 168;
	        _la = this._input.LA(1);
	        if(!(((((_la - 12)) & ~0x1f) === 0 && ((1 << (_la - 12)) & 2097151) !== 0))) {
	        this._errHandler.recoverInline(this);
	        }
	        else {
	        	this._errHandler.reportMatch(this);
	            this.consume();
	        }
	    } catch (re) {
	    	if(re instanceof antlr4.error.RecognitionException) {
		        localctx.exception = re;
		        this._errHandler.reportError(this, re);
		        this._errHandler.recover(this, re);
		    } else {
		    	throw re;
		    }
	    } finally {
	        this.exitRule();
	    }
	    return localctx;
	}



	patternend() {
	    let localctx = new PatternendContext(this, this._ctx, this.state);
	    this.enterRule(localctx, 28, ExprParser.RULE_patternend);
	    try {
	        this.enterOuterAlt(localctx, 1);
	        this.state = 170;
	        this.match(ExprParser.T__32);
	    } catch (re) {
	    	if(re instanceof antlr4.error.RecognitionException) {
		        localctx.exception = re;
		        this._errHandler.reportError(this, re);
		        this._errHandler.recover(this, re);
		    } else {
		    	throw re;
		    }
	    } finally {
	        this.exitRule();
	    }
	    return localctx;
	}



	character() {
	    let localctx = new CharacterContext(this, this._ctx, this.state);
	    this.enterRule(localctx, 30, ExprParser.RULE_character);
	    var _la = 0;
	    try {
	        this.enterOuterAlt(localctx, 1);
	        this.state = 172;
	        _la = this._input.LA(1);
	        if(!(((((_la - 12)) & ~0x1f) === 0 && ((1 << (_la - 12)) & 132120575) !== 0))) {
	        this._errHandler.recoverInline(this);
	        }
	        else {
	        	this._errHandler.reportMatch(this);
	            this.consume();
	        }
	    } catch (re) {
	    	if(re instanceof antlr4.error.RecognitionException) {
		        localctx.exception = re;
		        this._errHandler.reportError(this, re);
		        this._errHandler.recover(this, re);
		    } else {
		    	throw re;
		    }
	    } finally {
	        this.exitRule();
	    }
	    return localctx;
	}


}

ExprParser.EOF = antlr4.Token.EOF;
ExprParser.T__0 = 1;
ExprParser.T__1 = 2;
ExprParser.T__2 = 3;
ExprParser.T__3 = 4;
ExprParser.T__4 = 5;
ExprParser.T__5 = 6;
ExprParser.T__6 = 7;
ExprParser.T__7 = 8;
ExprParser.T__8 = 9;
ExprParser.T__9 = 10;
ExprParser.T__10 = 11;
ExprParser.T__11 = 12;
ExprParser.T__12 = 13;
ExprParser.T__13 = 14;
ExprParser.T__14 = 15;
ExprParser.T__15 = 16;
ExprParser.T__16 = 17;
ExprParser.T__17 = 18;
ExprParser.T__18 = 19;
ExprParser.T__19 = 20;
ExprParser.T__20 = 21;
ExprParser.T__21 = 22;
ExprParser.T__22 = 23;
ExprParser.T__23 = 24;
ExprParser.T__24 = 25;
ExprParser.T__25 = 26;
ExprParser.T__26 = 27;
ExprParser.T__27 = 28;
ExprParser.T__28 = 29;
ExprParser.T__29 = 30;
ExprParser.T__30 = 31;
ExprParser.T__31 = 32;
ExprParser.T__32 = 33;
ExprParser.T__33 = 34;
ExprParser.T__34 = 35;
ExprParser.T__35 = 36;
ExprParser.T__36 = 37;
ExprParser.T__37 = 38;
ExprParser.NEWLINE = 39;
ExprParser.INT = 40;

ExprParser.RULE_pattern = 0;
ExprParser.RULE_ligandclause = 1;
ExprParser.RULE_ligandextended = 2;
ExprParser.RULE_ligand = 3;
ExprParser.RULE_aminoexpression = 4;
ExprParser.RULE_aminoclause = 5;
ExprParser.RULE_aminoconditionor = 6;
ExprParser.RULE_aminoexclude = 7;
ExprParser.RULE_aminorepetition = 8;
ExprParser.RULE_aminorepetitionextension = 9;
ExprParser.RULE_cterminusexpression = 10;
ExprParser.RULE_cterminusspecialclause = 11;
ExprParser.RULE_nterminus = 12;
ExprParser.RULE_aminoacid = 13;
ExprParser.RULE_patternend = 14;
ExprParser.RULE_character = 15;

class PatternContext extends antlr4.ParserRuleContext {

    constructor(parser, parent, invokingState) {
        if(parent===undefined) {
            parent = null;
        }
        if(invokingState===undefined || invokingState===null) {
            invokingState = -1;
        }
        super(parent, invokingState);
        this.parser = parser;
        this.ruleIndex = ExprParser.RULE_pattern;
    }

	aminoexpression() {
	    return this.getTypedRuleContext(AminoexpressionContext,0);
	};

	patternend() {
	    return this.getTypedRuleContext(PatternendContext,0);
	};

	EOF() {
	    return this.getToken(ExprParser.EOF, 0);
	};

	ligandclause() {
	    return this.getTypedRuleContext(LigandclauseContext,0);
	};

	nterminus() {
	    return this.getTypedRuleContext(NterminusContext,0);
	};

	cterminusexpression() {
	    return this.getTypedRuleContext(CterminusexpressionContext,0);
	};

	enterRule(listener) {
	    if(listener instanceof ExprListener ) {
	        listener.enterPattern(this);
		}
	}

	exitRule(listener) {
	    if(listener instanceof ExprListener ) {
	        listener.exitPattern(this);
		}
	}

	accept(visitor) {
	    if ( visitor instanceof ExprVisitor ) {
	        return visitor.visitPattern(this);
	    } else {
	        return visitor.visitChildren(this);
	    }
	}


}



class LigandclauseContext extends antlr4.ParserRuleContext {

    constructor(parser, parent, invokingState) {
        if(parent===undefined) {
            parent = null;
        }
        if(invokingState===undefined || invokingState===null) {
            invokingState = -1;
        }
        super(parent, invokingState);
        this.parser = parser;
        this.ruleIndex = ExprParser.RULE_ligandclause;
    }

	ligand() {
	    return this.getTypedRuleContext(LigandContext,0);
	};

	ligandextended() {
	    return this.getTypedRuleContext(LigandextendedContext,0);
	};

	enterRule(listener) {
	    if(listener instanceof ExprListener ) {
	        listener.enterLigandclause(this);
		}
	}

	exitRule(listener) {
	    if(listener instanceof ExprListener ) {
	        listener.exitLigandclause(this);
		}
	}

	accept(visitor) {
	    if ( visitor instanceof ExprVisitor ) {
	        return visitor.visitLigandclause(this);
	    } else {
	        return visitor.visitChildren(this);
	    }
	}


}



class LigandextendedContext extends antlr4.ParserRuleContext {

    constructor(parser, parent, invokingState) {
        if(parent===undefined) {
            parent = null;
        }
        if(invokingState===undefined || invokingState===null) {
            invokingState = -1;
        }
        super(parent, invokingState);
        this.parser = parser;
        this.ruleIndex = ExprParser.RULE_ligandextended;
    }

	ligand = function(i) {
	    if(i===undefined) {
	        i = null;
	    }
	    if(i===null) {
	        return this.getTypedRuleContexts(LigandContext);
	    } else {
	        return this.getTypedRuleContext(LigandContext,i);
	    }
	};

	enterRule(listener) {
	    if(listener instanceof ExprListener ) {
	        listener.enterLigandextended(this);
		}
	}

	exitRule(listener) {
	    if(listener instanceof ExprListener ) {
	        listener.exitLigandextended(this);
		}
	}

	accept(visitor) {
	    if ( visitor instanceof ExprVisitor ) {
	        return visitor.visitLigandextended(this);
	    } else {
	        return visitor.visitChildren(this);
	    }
	}


}



class LigandContext extends antlr4.ParserRuleContext {

    constructor(parser, parent, invokingState) {
        if(parent===undefined) {
            parent = null;
        }
        if(invokingState===undefined || invokingState===null) {
            invokingState = -1;
        }
        super(parent, invokingState);
        this.parser = parser;
        this.ruleIndex = ExprParser.RULE_ligand;
    }

	character = function(i) {
	    if(i===undefined) {
	        i = null;
	    }
	    if(i===null) {
	        return this.getTypedRuleContexts(CharacterContext);
	    } else {
	        return this.getTypedRuleContext(CharacterContext,i);
	    }
	};

	INT = function(i) {
		if(i===undefined) {
			i = null;
		}
	    if(i===null) {
	        return this.getTokens(ExprParser.INT);
	    } else {
	        return this.getToken(ExprParser.INT, i);
	    }
	};


	enterRule(listener) {
	    if(listener instanceof ExprListener ) {
	        listener.enterLigand(this);
		}
	}

	exitRule(listener) {
	    if(listener instanceof ExprListener ) {
	        listener.exitLigand(this);
		}
	}

	accept(visitor) {
	    if ( visitor instanceof ExprVisitor ) {
	        return visitor.visitLigand(this);
	    } else {
	        return visitor.visitChildren(this);
	    }
	}


}



class AminoexpressionContext extends antlr4.ParserRuleContext {

    constructor(parser, parent, invokingState) {
        if(parent===undefined) {
            parent = null;
        }
        if(invokingState===undefined || invokingState===null) {
            invokingState = -1;
        }
        super(parent, invokingState);
        this.parser = parser;
        this.ruleIndex = ExprParser.RULE_aminoexpression;
    }

	aminoclause() {
	    return this.getTypedRuleContext(AminoclauseContext,0);
	};

	aminorepetition() {
	    return this.getTypedRuleContext(AminorepetitionContext,0);
	};

	aminorepetitionextension() {
	    return this.getTypedRuleContext(AminorepetitionextensionContext,0);
	};

	aminoexpression = function(i) {
	    if(i===undefined) {
	        i = null;
	    }
	    if(i===null) {
	        return this.getTypedRuleContexts(AminoexpressionContext);
	    } else {
	        return this.getTypedRuleContext(AminoexpressionContext,i);
	    }
	};

	enterRule(listener) {
	    if(listener instanceof ExprListener ) {
	        listener.enterAminoexpression(this);
		}
	}

	exitRule(listener) {
	    if(listener instanceof ExprListener ) {
	        listener.exitAminoexpression(this);
		}
	}

	accept(visitor) {
	    if ( visitor instanceof ExprVisitor ) {
	        return visitor.visitAminoexpression(this);
	    } else {
	        return visitor.visitChildren(this);
	    }
	}


}



class AminoclauseContext extends antlr4.ParserRuleContext {

    constructor(parser, parent, invokingState) {
        if(parent===undefined) {
            parent = null;
        }
        if(invokingState===undefined || invokingState===null) {
            invokingState = -1;
        }
        super(parent, invokingState);
        this.parser = parser;
        this.ruleIndex = ExprParser.RULE_aminoclause;
    }

	aminoacid() {
	    return this.getTypedRuleContext(AminoacidContext,0);
	};

	aminoconditionor() {
	    return this.getTypedRuleContext(AminoconditionorContext,0);
	};

	aminoexclude() {
	    return this.getTypedRuleContext(AminoexcludeContext,0);
	};

	enterRule(listener) {
	    if(listener instanceof ExprListener ) {
	        listener.enterAminoclause(this);
		}
	}

	exitRule(listener) {
	    if(listener instanceof ExprListener ) {
	        listener.exitAminoclause(this);
		}
	}

	accept(visitor) {
	    if ( visitor instanceof ExprVisitor ) {
	        return visitor.visitAminoclause(this);
	    } else {
	        return visitor.visitChildren(this);
	    }
	}


}



class AminoconditionorContext extends antlr4.ParserRuleContext {

    constructor(parser, parent, invokingState) {
        if(parent===undefined) {
            parent = null;
        }
        if(invokingState===undefined || invokingState===null) {
            invokingState = -1;
        }
        super(parent, invokingState);
        this.parser = parser;
        this.ruleIndex = ExprParser.RULE_aminoconditionor;
    }

	aminoacid = function(i) {
	    if(i===undefined) {
	        i = null;
	    }
	    if(i===null) {
	        return this.getTypedRuleContexts(AminoacidContext);
	    } else {
	        return this.getTypedRuleContext(AminoacidContext,i);
	    }
	};

	enterRule(listener) {
	    if(listener instanceof ExprListener ) {
	        listener.enterAminoconditionor(this);
		}
	}

	exitRule(listener) {
	    if(listener instanceof ExprListener ) {
	        listener.exitAminoconditionor(this);
		}
	}

	accept(visitor) {
	    if ( visitor instanceof ExprVisitor ) {
	        return visitor.visitAminoconditionor(this);
	    } else {
	        return visitor.visitChildren(this);
	    }
	}


}



class AminoexcludeContext extends antlr4.ParserRuleContext {

    constructor(parser, parent, invokingState) {
        if(parent===undefined) {
            parent = null;
        }
        if(invokingState===undefined || invokingState===null) {
            invokingState = -1;
        }
        super(parent, invokingState);
        this.parser = parser;
        this.ruleIndex = ExprParser.RULE_aminoexclude;
    }

	aminoacid = function(i) {
	    if(i===undefined) {
	        i = null;
	    }
	    if(i===null) {
	        return this.getTypedRuleContexts(AminoacidContext);
	    } else {
	        return this.getTypedRuleContext(AminoacidContext,i);
	    }
	};

	enterRule(listener) {
	    if(listener instanceof ExprListener ) {
	        listener.enterAminoexclude(this);
		}
	}

	exitRule(listener) {
	    if(listener instanceof ExprListener ) {
	        listener.exitAminoexclude(this);
		}
	}

	accept(visitor) {
	    if ( visitor instanceof ExprVisitor ) {
	        return visitor.visitAminoexclude(this);
	    } else {
	        return visitor.visitChildren(this);
	    }
	}


}



class AminorepetitionContext extends antlr4.ParserRuleContext {

    constructor(parser, parent, invokingState) {
        if(parent===undefined) {
            parent = null;
        }
        if(invokingState===undefined || invokingState===null) {
            invokingState = -1;
        }
        super(parent, invokingState);
        this.parser = parser;
        this.ruleIndex = ExprParser.RULE_aminorepetition;
    }

	aminoacid() {
	    return this.getTypedRuleContext(AminoacidContext,0);
	};

	aminoconditionor() {
	    return this.getTypedRuleContext(AminoconditionorContext,0);
	};

	aminoexclude() {
	    return this.getTypedRuleContext(AminoexcludeContext,0);
	};

	INT = function(i) {
		if(i===undefined) {
			i = null;
		}
	    if(i===null) {
	        return this.getTokens(ExprParser.INT);
	    } else {
	        return this.getToken(ExprParser.INT, i);
	    }
	};


	enterRule(listener) {
	    if(listener instanceof ExprListener ) {
	        listener.enterAminorepetition(this);
		}
	}

	exitRule(listener) {
	    if(listener instanceof ExprListener ) {
	        listener.exitAminorepetition(this);
		}
	}

	accept(visitor) {
	    if ( visitor instanceof ExprVisitor ) {
	        return visitor.visitAminorepetition(this);
	    } else {
	        return visitor.visitChildren(this);
	    }
	}


}



class AminorepetitionextensionContext extends antlr4.ParserRuleContext {

    constructor(parser, parent, invokingState) {
        if(parent===undefined) {
            parent = null;
        }
        if(invokingState===undefined || invokingState===null) {
            invokingState = -1;
        }
        super(parent, invokingState);
        this.parser = parser;
        this.ruleIndex = ExprParser.RULE_aminorepetitionextension;
    }

	aminoacid() {
	    return this.getTypedRuleContext(AminoacidContext,0);
	};

	aminoconditionor() {
	    return this.getTypedRuleContext(AminoconditionorContext,0);
	};

	aminoexclude() {
	    return this.getTypedRuleContext(AminoexcludeContext,0);
	};

	INT = function(i) {
		if(i===undefined) {
			i = null;
		}
	    if(i===null) {
	        return this.getTokens(ExprParser.INT);
	    } else {
	        return this.getToken(ExprParser.INT, i);
	    }
	};


	enterRule(listener) {
	    if(listener instanceof ExprListener ) {
	        listener.enterAminorepetitionextension(this);
		}
	}

	exitRule(listener) {
	    if(listener instanceof ExprListener ) {
	        listener.exitAminorepetitionextension(this);
		}
	}

	accept(visitor) {
	    if ( visitor instanceof ExprVisitor ) {
	        return visitor.visitAminorepetitionextension(this);
	    } else {
	        return visitor.visitChildren(this);
	    }
	}


}



class CterminusexpressionContext extends antlr4.ParserRuleContext {

    constructor(parser, parent, invokingState) {
        if(parent===undefined) {
            parent = null;
        }
        if(invokingState===undefined || invokingState===null) {
            invokingState = -1;
        }
        super(parent, invokingState);
        this.parser = parser;
        this.ruleIndex = ExprParser.RULE_cterminusexpression;
    }

	cterminusspecialclause() {
	    return this.getTypedRuleContext(CterminusspecialclauseContext,0);
	};

	enterRule(listener) {
	    if(listener instanceof ExprListener ) {
	        listener.enterCterminusexpression(this);
		}
	}

	exitRule(listener) {
	    if(listener instanceof ExprListener ) {
	        listener.exitCterminusexpression(this);
		}
	}

	accept(visitor) {
	    if ( visitor instanceof ExprVisitor ) {
	        return visitor.visitCterminusexpression(this);
	    } else {
	        return visitor.visitChildren(this);
	    }
	}


}



class CterminusspecialclauseContext extends antlr4.ParserRuleContext {

    constructor(parser, parent, invokingState) {
        if(parent===undefined) {
            parent = null;
        }
        if(invokingState===undefined || invokingState===null) {
            invokingState = -1;
        }
        super(parent, invokingState);
        this.parser = parser;
        this.ruleIndex = ExprParser.RULE_cterminusspecialclause;
    }

	aminoacid = function(i) {
	    if(i===undefined) {
	        i = null;
	    }
	    if(i===null) {
	        return this.getTypedRuleContexts(AminoacidContext);
	    } else {
	        return this.getTypedRuleContext(AminoacidContext,i);
	    }
	};

	enterRule(listener) {
	    if(listener instanceof ExprListener ) {
	        listener.enterCterminusspecialclause(this);
		}
	}

	exitRule(listener) {
	    if(listener instanceof ExprListener ) {
	        listener.exitCterminusspecialclause(this);
		}
	}

	accept(visitor) {
	    if ( visitor instanceof ExprVisitor ) {
	        return visitor.visitCterminusspecialclause(this);
	    } else {
	        return visitor.visitChildren(this);
	    }
	}


}



class NterminusContext extends antlr4.ParserRuleContext {

    constructor(parser, parent, invokingState) {
        if(parent===undefined) {
            parent = null;
        }
        if(invokingState===undefined || invokingState===null) {
            invokingState = -1;
        }
        super(parent, invokingState);
        this.parser = parser;
        this.ruleIndex = ExprParser.RULE_nterminus;
    }


	enterRule(listener) {
	    if(listener instanceof ExprListener ) {
	        listener.enterNterminus(this);
		}
	}

	exitRule(listener) {
	    if(listener instanceof ExprListener ) {
	        listener.exitNterminus(this);
		}
	}

	accept(visitor) {
	    if ( visitor instanceof ExprVisitor ) {
	        return visitor.visitNterminus(this);
	    } else {
	        return visitor.visitChildren(this);
	    }
	}


}



class AminoacidContext extends antlr4.ParserRuleContext {

    constructor(parser, parent, invokingState) {
        if(parent===undefined) {
            parent = null;
        }
        if(invokingState===undefined || invokingState===null) {
            invokingState = -1;
        }
        super(parent, invokingState);
        this.parser = parser;
        this.ruleIndex = ExprParser.RULE_aminoacid;
    }


	enterRule(listener) {
	    if(listener instanceof ExprListener ) {
	        listener.enterAminoacid(this);
		}
	}

	exitRule(listener) {
	    if(listener instanceof ExprListener ) {
	        listener.exitAminoacid(this);
		}
	}

	accept(visitor) {
	    if ( visitor instanceof ExprVisitor ) {
	        return visitor.visitAminoacid(this);
	    } else {
	        return visitor.visitChildren(this);
	    }
	}


}



class PatternendContext extends antlr4.ParserRuleContext {

    constructor(parser, parent, invokingState) {
        if(parent===undefined) {
            parent = null;
        }
        if(invokingState===undefined || invokingState===null) {
            invokingState = -1;
        }
        super(parent, invokingState);
        this.parser = parser;
        this.ruleIndex = ExprParser.RULE_patternend;
    }


	enterRule(listener) {
	    if(listener instanceof ExprListener ) {
	        listener.enterPatternend(this);
		}
	}

	exitRule(listener) {
	    if(listener instanceof ExprListener ) {
	        listener.exitPatternend(this);
		}
	}

	accept(visitor) {
	    if ( visitor instanceof ExprVisitor ) {
	        return visitor.visitPatternend(this);
	    } else {
	        return visitor.visitChildren(this);
	    }
	}


}



class CharacterContext extends antlr4.ParserRuleContext {

    constructor(parser, parent, invokingState) {
        if(parent===undefined) {
            parent = null;
        }
        if(invokingState===undefined || invokingState===null) {
            invokingState = -1;
        }
        super(parent, invokingState);
        this.parser = parser;
        this.ruleIndex = ExprParser.RULE_character;
    }


	enterRule(listener) {
	    if(listener instanceof ExprListener ) {
	        listener.enterCharacter(this);
		}
	}

	exitRule(listener) {
	    if(listener instanceof ExprListener ) {
	        listener.exitCharacter(this);
		}
	}

	accept(visitor) {
	    if ( visitor instanceof ExprVisitor ) {
	        return visitor.visitCharacter(this);
	    } else {
	        return visitor.visitChildren(this);
	    }
	}


}




ExprParser.PatternContext = PatternContext; 
ExprParser.LigandclauseContext = LigandclauseContext; 
ExprParser.LigandextendedContext = LigandextendedContext; 
ExprParser.LigandContext = LigandContext; 
ExprParser.AminoexpressionContext = AminoexpressionContext; 
ExprParser.AminoclauseContext = AminoclauseContext; 
ExprParser.AminoconditionorContext = AminoconditionorContext; 
ExprParser.AminoexcludeContext = AminoexcludeContext; 
ExprParser.AminorepetitionContext = AminorepetitionContext; 
ExprParser.AminorepetitionextensionContext = AminorepetitionextensionContext; 
ExprParser.CterminusexpressionContext = CterminusexpressionContext; 
ExprParser.CterminusspecialclauseContext = CterminusspecialclauseContext; 
ExprParser.NterminusContext = NterminusContext; 
ExprParser.AminoacidContext = AminoacidContext; 
ExprParser.PatternendContext = PatternendContext; 
ExprParser.CharacterContext = CharacterContext; 
