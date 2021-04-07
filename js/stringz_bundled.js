(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
(function (global){(function (){
global.window.toArray = require('stringz').toArray

}).call(this)}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{"stringz":3}],2:[function(require,module,exports){
"use strict"

// Based on: https://github.com/lodash/lodash/blob/6018350ac10d5ce6a5b7db625140b82aeab804df/.internal/unicodeSize.js

module.exports = () => {
	// Used to compose unicode character classes.
	const astralRange = "\\ud800-\\udfff"
	const comboMarksRange = "\\u0300-\\u036f"
	const comboHalfMarksRange = "\\ufe20-\\ufe2f"
	const comboSymbolsRange = "\\u20d0-\\u20ff"
	const comboMarksExtendedRange = "\\u1ab0-\\u1aff"
	const comboMarksSupplementRange = "\\u1dc0-\\u1dff"
	const comboRange = comboMarksRange + comboHalfMarksRange + comboSymbolsRange + comboMarksExtendedRange + comboMarksSupplementRange
	const varRange = "\\ufe0e\\ufe0f"
	const familyRange = "\\uD83D\\uDC69\\uD83C\\uDFFB\\u200D\\uD83C\\uDF93"

	// Used to compose unicode capture groups.
	const astral = `[${astralRange}]`
	const combo = `[${comboRange}]`
	const fitz = "\\ud83c[\\udffb-\\udfff]"
	const modifier = `(?:${combo}|${fitz})`
	const nonAstral = `[^${astralRange}]`
	const regional = "(?:\\uD83C[\\uDDE6-\\uDDFF]){2}"
	const surrogatePair = "[\\ud800-\\udbff][\\udc00-\\udfff]"
	const zwj = "\\u200d"
	const blackFlag = "(?:\\ud83c\\udff4\\udb40\\udc67\\udb40\\udc62\\udb40(?:\\udc65|\\udc73|\\udc77)\\udb40(?:\\udc6e|\\udc63|\\udc6c)\\udb40(?:\\udc67|\\udc74|\\udc73)\\udb40\\udc7f)"
	const family = `[${familyRange}]`

	// Used to compose unicode regexes.
	const optModifier = `${modifier}?`
	const optVar = `[${varRange}]?`
	const optJoin = `(?:${zwj}(?:${[nonAstral, regional, surrogatePair].join("|")})${optVar + optModifier})*`
	const seq = optVar + optModifier + optJoin
	const nonAstralCombo = `${nonAstral}${combo}?`
	const symbol = `(?:${[nonAstralCombo, combo, regional, surrogatePair, astral, family].join("|")})`

	// Used to match [String symbols](https://mathiasbynens.be/notes/javascript-unicode).
	return new RegExp(`${blackFlag}|${fitz}(?=${fitz})|${symbol + seq}`, "g")
}

},{}],3:[function(require,module,exports){
"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// @ts-ignore
var char_regex_1 = __importDefault(require("char-regex"));
/**
 * Converts a string to an array of string chars
 * @param {string} str The string to turn into array
 * @returns {string[]}
 */
function toArray(str) {
    if (typeof str !== 'string') {
        throw new Error('A string is expected as input');
    }
    return str.match(char_regex_1.default()) || [];
}
exports.toArray = toArray;
/**
 * Returns the length of a string
 *
 * @export
 * @param {string} str
 * @returns {number}
 */
function length(str) {
    // Check for input
    if (typeof str !== 'string') {
        throw new Error('Input must be a string');
    }
    var match = str.match(char_regex_1.default());
    return match === null ? 0 : match.length;
}
exports.length = length;
/**
 * Returns a substring by providing start and end position
 *
 * @export
 * @param {string} str
 * @param {number} [begin=0] Starting position
 * @param {number} end End position
 * @returns {string}
 */
function substring(str, begin, end) {
    if (begin === void 0) { begin = 0; }
    // Check for input
    if (typeof str !== 'string') {
        throw new Error('Input must be a string');
    }
    // Even though negative numbers work here, theyre not in the spec
    if (typeof begin !== 'number' || begin < 0) {
        begin = 0;
    }
    if (typeof end === 'number' && end < 0) {
        end = 0;
    }
    var match = str.match(char_regex_1.default());
    if (!match)
        return '';
    return match.slice(begin, end).join('');
}
exports.substring = substring;
/**
 * Returns a substring by providing start position and length
 *
 * @export
 * @param {string} str
 * @param {number} [begin=0] Starting position
 * @param {number} len Desired length
 * @returns {string}
 */
function substr(str, begin, len) {
    if (begin === void 0) { begin = 0; }
    // Check for input
    if (typeof str !== 'string') {
        throw new Error('Input must be a string');
    }
    var strLength = length(str);
    // Fix type
    if (typeof begin !== 'number') {
        begin = parseInt(begin, 10);
    }
    // Return zero-length string if got oversize number.
    if (begin >= strLength) {
        return '';
    }
    // Calculating postive version of negative value.
    if (begin < 0) {
        begin += strLength;
    }
    var end;
    if (typeof len === 'undefined') {
        end = strLength;
    }
    else {
        // Fix type
        if (typeof len !== 'number') {
            len = parseInt(len, 10);
        }
        end = len >= 0 ? len + begin : begin;
    }
    var match = str.match(char_regex_1.default());
    if (!match)
        return '';
    return match.slice(begin, end).join('');
}
exports.substr = substr;
/**
 * Enforces a string to be a certain length by
 * adding or removing characters
 *
 * @export
 * @param {string} str
 * @param {number} [limit=16] Limit
 * @param {string} [padString='#'] The Pad String
 * @param {string} [padPosition='right'] The Pad Position
 * @returns {string}
 */
function limit(str, limit, padString, padPosition) {
    if (limit === void 0) { limit = 16; }
    if (padString === void 0) { padString = '#'; }
    if (padPosition === void 0) { padPosition = 'right'; }
    // Input should be a string, limit should be a number
    if (typeof str !== 'string' || typeof limit !== 'number') {
        throw new Error('Invalid arguments specified');
    }
    // Pad position should be either left or right
    if (['left', 'right'].indexOf(padPosition) === -1) {
        throw new Error('Pad position should be either left or right');
    }
    // Pad string can be anything, we convert it to string
    if (typeof padString !== 'string') {
        padString = String(padString);
    }
    // Calculate string length considering astral code points
    var strLength = length(str);
    if (strLength > limit) {
        return substring(str, 0, limit);
    }
    else if (strLength < limit) {
        var padRepeats = padString.repeat(limit - strLength);
        return padPosition === 'left' ? padRepeats + str : str + padRepeats;
    }
    return str;
}
exports.limit = limit;
/**
 * Returns the index of the first occurrence of a given string
 *
 * @export
 * @param {string} str
 * @param {string} [searchStr] the string to search
 * @param {number} [pos] starting position
 * @returns {number}
 */
function indexOf(str, searchStr, pos) {
    if (pos === void 0) { pos = 0; }
    if (typeof str !== 'string') {
        throw new Error('Input must be a string');
    }
    if (str === '') {
        if (searchStr === '') {
            return 0;
        }
        return -1;
    }
    // fix type
    pos = Number(pos);
    pos = isNaN(pos) ? 0 : pos;
    searchStr = String(searchStr);
    var strArr = toArray(str);
    if (pos >= strArr.length) {
        if (searchStr === '') {
            return strArr.length;
        }
        return -1;
    }
    if (searchStr === '') {
        return pos;
    }
    var searchArr = toArray(searchStr);
    var finded = false;
    var index;
    for (index = pos; index < strArr.length; index += 1) {
        var searchIndex = 0;
        while (searchIndex < searchArr.length &&
            searchArr[searchIndex] === strArr[index + searchIndex]) {
            searchIndex += 1;
        }
        if (searchIndex === searchArr.length &&
            searchArr[searchIndex - 1] === strArr[index + searchIndex - 1]) {
            finded = true;
            break;
        }
    }
    return finded ? index : -1;
}
exports.indexOf = indexOf;

},{"char-regex":2}]},{},[1]);
