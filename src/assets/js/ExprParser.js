// Generated from java-escape by ANTLR 4.11.1
// jshint ignore: start
import antlr4 from 'antlr4';
import ExprListener from './ExprListener.js';
import ExprVisitor from './ExprVisitor.js';

const serializedATN = [4,1,34,107,2,0,7,0,2,1,7,1,2,2,7,2,2,3,7,3,2,4,7,
4,2,5,7,5,2,6,7,6,2,7,7,7,2,8,7,8,2,9,7,9,2,10,7,10,2,11,7,11,1,0,3,0,26,
8,0,1,0,1,0,3,0,30,8,0,1,0,1,0,1,0,1,1,1,1,1,1,3,1,38,8,1,1,1,1,1,5,1,42,
8,1,10,1,12,1,45,9,1,1,2,1,2,1,2,3,2,50,8,2,1,3,1,3,4,3,54,8,3,11,3,12,3,
55,1,3,1,3,1,4,1,4,4,4,62,8,4,11,4,12,4,63,1,4,1,4,1,5,1,5,1,5,3,5,71,8,
5,1,5,1,5,1,5,1,5,1,6,1,6,1,6,3,6,80,8,6,1,6,1,6,1,6,1,6,1,6,1,6,1,7,1,7,
3,7,90,8,7,1,8,1,8,4,8,94,8,8,11,8,12,8,95,1,8,1,8,1,8,1,9,1,9,1,10,1,10,
1,11,1,11,1,11,0,0,12,0,2,4,6,8,10,12,14,16,18,20,22,0,1,1,0,11,31,109,0,
25,1,0,0,0,2,37,1,0,0,0,4,49,1,0,0,0,6,51,1,0,0,0,8,59,1,0,0,0,10,70,1,0,
0,0,12,79,1,0,0,0,14,89,1,0,0,0,16,91,1,0,0,0,18,100,1,0,0,0,20,102,1,0,
0,0,22,104,1,0,0,0,24,26,3,18,9,0,25,24,1,0,0,0,25,26,1,0,0,0,26,27,1,0,
0,0,27,29,3,2,1,0,28,30,3,14,7,0,29,28,1,0,0,0,29,30,1,0,0,0,30,31,1,0,0,
0,31,32,3,22,11,0,32,33,5,0,0,1,33,1,1,0,0,0,34,38,3,4,2,0,35,38,3,10,5,
0,36,38,3,12,6,0,37,34,1,0,0,0,37,35,1,0,0,0,37,36,1,0,0,0,38,43,1,0,0,0,
39,40,5,1,0,0,40,42,3,2,1,0,41,39,1,0,0,0,42,45,1,0,0,0,43,41,1,0,0,0,43,
44,1,0,0,0,44,3,1,0,0,0,45,43,1,0,0,0,46,50,3,20,10,0,47,50,3,6,3,0,48,50,
3,8,4,0,49,46,1,0,0,0,49,47,1,0,0,0,49,48,1,0,0,0,50,5,1,0,0,0,51,53,5,2,
0,0,52,54,3,20,10,0,53,52,1,0,0,0,54,55,1,0,0,0,55,53,1,0,0,0,55,56,1,0,
0,0,56,57,1,0,0,0,57,58,5,3,0,0,58,7,1,0,0,0,59,61,5,4,0,0,60,62,3,20,10,
0,61,60,1,0,0,0,62,63,1,0,0,0,63,61,1,0,0,0,63,64,1,0,0,0,64,65,1,0,0,0,
65,66,5,5,0,0,66,9,1,0,0,0,67,71,3,20,10,0,68,71,3,6,3,0,69,71,3,8,4,0,70,
67,1,0,0,0,70,68,1,0,0,0,70,69,1,0,0,0,71,72,1,0,0,0,72,73,5,6,0,0,73,74,
5,34,0,0,74,75,5,7,0,0,75,11,1,0,0,0,76,80,3,20,10,0,77,80,3,6,3,0,78,80,
3,8,4,0,79,76,1,0,0,0,79,77,1,0,0,0,79,78,1,0,0,0,80,81,1,0,0,0,81,82,5,
6,0,0,82,83,5,34,0,0,83,84,5,8,0,0,84,85,5,34,0,0,85,86,5,7,0,0,86,13,1,
0,0,0,87,90,5,9,0,0,88,90,3,16,8,0,89,87,1,0,0,0,89,88,1,0,0,0,90,15,1,0,
0,0,91,93,5,4,0,0,92,94,3,20,10,0,93,92,1,0,0,0,94,95,1,0,0,0,95,93,1,0,
0,0,95,96,1,0,0,0,96,97,1,0,0,0,97,98,5,9,0,0,98,99,5,5,0,0,99,17,1,0,0,
0,100,101,5,10,0,0,101,19,1,0,0,0,102,103,7,0,0,0,103,21,1,0,0,0,104,105,
5,32,0,0,105,23,1,0,0,0,11,25,29,37,43,49,55,63,70,79,89,95];


const atn = new antlr4.atn.ATNDeserializer().deserialize(serializedATN);

const decisionsToDFA = atn.decisionToState.map( (ds, index) => new antlr4.dfa.DFA(ds, index) );

const sharedContextCache = new antlr4.atn.PredictionContextCache();

export default class ExprParser extends antlr4.Parser {

    static grammarFileName = "java-escape";
    static literalNames = [ null, "'-'", "'{'", "'}'", "'['", "']'", "'('", 
                            "')'", "','", "'>'", "'<'", "'A'", "'R'", "'N'", 
                            "'D'", "'C'", "'Q'", "'E'", "'G'", "'H'", "'I'", 
                            "'L'", "'K'", "'M'", "'F'", "'P'", "'S'", "'T'", 
                            "'W'", "'Y'", "'V'", "'X'", "'.'" ];
    static symbolicNames = [ null, null, null, null, null, null, null, null, 
                             null, null, null, null, null, null, null, null, 
                             null, null, null, null, null, null, null, null, 
                             null, null, null, null, null, null, null, null, 
                             null, "NEWLINE", "INT" ];
    static ruleNames = [ "pattern", "aminoexpression", "aminoclause", "aminoconditionor", 
                         "aminoexclude", "aminorepetition", "aminorepetitionextension", 
                         "cterminusexpression", "cterminusspecialclause", 
                         "nterminus", "aminoacid", "patternend" ];

    constructor(input) {
        super(input);
        this._interp = new antlr4.atn.ParserATNSimulator(this, atn, decisionsToDFA, sharedContextCache);
        this.ruleNames = ExprParser.ruleNames;
        this.literalNames = ExprParser.literalNames;
        this.symbolicNames = ExprParser.symbolicNames;
    }

    get atn() {
        return atn;
    }



	pattern() {
	    let localctx = new PatternContext(this, this._ctx, this.state);
	    this.enterRule(localctx, 0, ExprParser.RULE_pattern);
	    var _la = 0; // Token type
	    try {
	        this.enterOuterAlt(localctx, 1);
	        this.state = 25;
	        this._errHandler.sync(this);
	        _la = this._input.LA(1);
	        if(_la===10) {
	            this.state = 24;
	            this.nterminus();
	        }

	        this.state = 27;
	        this.aminoexpression();
	        this.state = 29;
	        this._errHandler.sync(this);
	        _la = this._input.LA(1);
	        if(_la===4 || _la===9) {
	            this.state = 28;
	            this.cterminusexpression();
	        }

	        this.state = 31;
	        this.patternend();
	        this.state = 32;
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



	aminoexpression() {
	    let localctx = new AminoexpressionContext(this, this._ctx, this.state);
	    this.enterRule(localctx, 2, ExprParser.RULE_aminoexpression);
	    try {
	        this.enterOuterAlt(localctx, 1);
	        this.state = 37;
	        this._errHandler.sync(this);
	        var la_ = this._interp.adaptivePredict(this._input,2,this._ctx);
	        switch(la_) {
	        case 1:
	            this.state = 34;
	            this.aminoclause();
	            break;

	        case 2:
	            this.state = 35;
	            this.aminorepetition();
	            break;

	        case 3:
	            this.state = 36;
	            this.aminorepetitionextension();
	            break;

	        }
	        this.state = 43;
	        this._errHandler.sync(this);
	        var _alt = this._interp.adaptivePredict(this._input,3,this._ctx)
	        while(_alt!=2 && _alt!=antlr4.atn.ATN.INVALID_ALT_NUMBER) {
	            if(_alt===1) {
	                this.state = 39;
	                this.match(ExprParser.T__0);
	                this.state = 40;
	                this.aminoexpression(); 
	            }
	            this.state = 45;
	            this._errHandler.sync(this);
	            _alt = this._interp.adaptivePredict(this._input,3,this._ctx);
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
	    this.enterRule(localctx, 4, ExprParser.RULE_aminoclause);
	    try {
	        this.state = 49;
	        this._errHandler.sync(this);
	        switch(this._input.LA(1)) {
	        case 11:
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
	            this.enterOuterAlt(localctx, 1);
	            this.state = 46;
	            this.aminoacid();
	            break;
	        case 2:
	            this.enterOuterAlt(localctx, 2);
	            this.state = 47;
	            this.aminoconditionor();
	            break;
	        case 4:
	            this.enterOuterAlt(localctx, 3);
	            this.state = 48;
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
	    this.enterRule(localctx, 6, ExprParser.RULE_aminoconditionor);
	    var _la = 0; // Token type
	    try {
	        this.enterOuterAlt(localctx, 1);
	        this.state = 51;
	        this.match(ExprParser.T__1);
	        this.state = 53; 
	        this._errHandler.sync(this);
	        _la = this._input.LA(1);
	        do {
	            this.state = 52;
	            this.aminoacid();
	            this.state = 55; 
	            this._errHandler.sync(this);
	            _la = this._input.LA(1);
	        } while((((_la) & ~0x1f) == 0 && ((1 << _la) & 4294965248) !== 0));
	        this.state = 57;
	        this.match(ExprParser.T__2);
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
	    this.enterRule(localctx, 8, ExprParser.RULE_aminoexclude);
	    var _la = 0; // Token type
	    try {
	        this.enterOuterAlt(localctx, 1);
	        this.state = 59;
	        this.match(ExprParser.T__3);
	        this.state = 61; 
	        this._errHandler.sync(this);
	        _la = this._input.LA(1);
	        do {
	            this.state = 60;
	            this.aminoacid();
	            this.state = 63; 
	            this._errHandler.sync(this);
	            _la = this._input.LA(1);
	        } while((((_la) & ~0x1f) == 0 && ((1 << _la) & 4294965248) !== 0));
	        this.state = 65;
	        this.match(ExprParser.T__4);
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
	    this.enterRule(localctx, 10, ExprParser.RULE_aminorepetition);
	    try {
	        this.enterOuterAlt(localctx, 1);
	        this.state = 70;
	        this._errHandler.sync(this);
	        switch(this._input.LA(1)) {
	        case 11:
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
	            this.state = 67;
	            this.aminoacid();
	            break;
	        case 2:
	            this.state = 68;
	            this.aminoconditionor();
	            break;
	        case 4:
	            this.state = 69;
	            this.aminoexclude();
	            break;
	        default:
	            throw new antlr4.error.NoViableAltException(this);
	        }
	        this.state = 72;
	        this.match(ExprParser.T__5);
	        this.state = 73;
	        this.match(ExprParser.INT);
	        this.state = 74;
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



	aminorepetitionextension() {
	    let localctx = new AminorepetitionextensionContext(this, this._ctx, this.state);
	    this.enterRule(localctx, 12, ExprParser.RULE_aminorepetitionextension);
	    try {
	        this.enterOuterAlt(localctx, 1);
	        this.state = 79;
	        this._errHandler.sync(this);
	        switch(this._input.LA(1)) {
	        case 11:
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
	            this.state = 76;
	            this.aminoacid();
	            break;
	        case 2:
	            this.state = 77;
	            this.aminoconditionor();
	            break;
	        case 4:
	            this.state = 78;
	            this.aminoexclude();
	            break;
	        default:
	            throw new antlr4.error.NoViableAltException(this);
	        }
	        this.state = 81;
	        this.match(ExprParser.T__5);
	        this.state = 82;
	        this.match(ExprParser.INT);
	        this.state = 83;
	        this.match(ExprParser.T__7);
	        this.state = 84;
	        this.match(ExprParser.INT);
	        this.state = 85;
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



	cterminusexpression() {
	    let localctx = new CterminusexpressionContext(this, this._ctx, this.state);
	    this.enterRule(localctx, 14, ExprParser.RULE_cterminusexpression);
	    try {
	        this.state = 89;
	        this._errHandler.sync(this);
	        switch(this._input.LA(1)) {
	        case 9:
	            this.enterOuterAlt(localctx, 1);
	            this.state = 87;
	            this.match(ExprParser.T__8);
	            break;
	        case 4:
	            this.enterOuterAlt(localctx, 2);
	            this.state = 88;
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
	    this.enterRule(localctx, 16, ExprParser.RULE_cterminusspecialclause);
	    var _la = 0; // Token type
	    try {
	        this.enterOuterAlt(localctx, 1);
	        this.state = 91;
	        this.match(ExprParser.T__3);
	        this.state = 93; 
	        this._errHandler.sync(this);
	        _la = this._input.LA(1);
	        do {
	            this.state = 92;
	            this.aminoacid();
	            this.state = 95; 
	            this._errHandler.sync(this);
	            _la = this._input.LA(1);
	        } while((((_la) & ~0x1f) == 0 && ((1 << _la) & 4294965248) !== 0));
	        this.state = 97;
	        this.match(ExprParser.T__8);
	        this.state = 98;
	        this.match(ExprParser.T__4);
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
	    this.enterRule(localctx, 18, ExprParser.RULE_nterminus);
	    try {
	        this.enterOuterAlt(localctx, 1);
	        this.state = 100;
	        this.match(ExprParser.T__9);
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
	    this.enterRule(localctx, 20, ExprParser.RULE_aminoacid);
	    var _la = 0; // Token type
	    try {
	        this.enterOuterAlt(localctx, 1);
	        this.state = 102;
	        _la = this._input.LA(1);
	        if(!((((_la) & ~0x1f) == 0 && ((1 << _la) & 4294965248) !== 0))) {
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
	    this.enterRule(localctx, 22, ExprParser.RULE_patternend);
	    try {
	        this.enterOuterAlt(localctx, 1);
	        this.state = 104;
	        this.match(ExprParser.T__31);
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
ExprParser.NEWLINE = 33;
ExprParser.INT = 34;

ExprParser.RULE_pattern = 0;
ExprParser.RULE_aminoexpression = 1;
ExprParser.RULE_aminoclause = 2;
ExprParser.RULE_aminoconditionor = 3;
ExprParser.RULE_aminoexclude = 4;
ExprParser.RULE_aminorepetition = 5;
ExprParser.RULE_aminorepetitionextension = 6;
ExprParser.RULE_cterminusexpression = 7;
ExprParser.RULE_cterminusspecialclause = 8;
ExprParser.RULE_nterminus = 9;
ExprParser.RULE_aminoacid = 10;
ExprParser.RULE_patternend = 11;

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

	INT() {
	    return this.getToken(ExprParser.INT, 0);
	};

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




ExprParser.PatternContext = PatternContext; 
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
