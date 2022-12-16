var error = {};
var bigQuery = "";
var completeQuery = "";

export function getError() {
    return error;
}

export function setError(err) {
    error = err;
}

export function getBigQuery() {
    return bigQuery;
}

export function setBigQuery(q) {
    bigQuery = q;
}

export function getCompleteQuery() {
    return bigQuery;
}

export function setCompleteQuery(q) {
    bigQuery = q;
}