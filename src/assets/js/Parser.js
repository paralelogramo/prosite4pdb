import antlr4 from 'antlr4';
import ExprLexer from './ExprLexer.js';
import ExprParser from './ExprParser.js';
import ExprListener from './ExprListener.js';
import ExprErrorListener from './ExprErrorListener.js';
import { getError, setError } from './catchError.js';

export function Parser(pattern) {
    setError('');
    const input = pattern;
    const chars = new antlr4.InputStream(input);
    const lexer = new ExprLexer(chars);
    const tokens = new antlr4.CommonTokenStream(lexer);
    const parser = new ExprParser(tokens);
    
    parser.removeErrorListeners();
    parser.addErrorListener(new ExprErrorListener());
    parser.removeParseListeners();
    parser.addParseListener(new ExprListener());
    parser.buildParseTrees = true;

    const tree = parser.pattern();

    class Visitor {
    visitChildren(ctx) {
        if (!ctx) {
        return;
        }

        if (ctx.children) {
        return ctx.children.map(child => {
            if (child.children && child.children.length != 0) {
            return child.accept(this);
            } else {
            return child.getText();
            }
        });
        }
    }
    }

    tree.accept(new Visitor());
    var error = getError();

    return error;
}