import antlr4 from 'antlr4';
import { getError, setError } from './catchError.js';

export default class ExprErrorListener extends antlr4.error.ErrorListener {
    syntaxError(recognizer, offendingSymbol, line, column, msg, err) {
        setError(
            {
                message: msg,
                line: line,
                column: column
            }
        );
    }
}