// symbol hashing algorithm

// takes a string and...
// if the algorithm has seen that string before, it returns whatever it returned the last time
// the same string was passed in

// if the algoritm has not seen that string before, it returns a unique id for it, and
// keeps track of what it returned for that string

// algorithm can also swap keys
// So I can tell the algorithm, hey, from now on, every time I pass you 'x' give me the
// value you used to give me for 'a' and return a new value for 'a' next time you are
// asked for it

import {expect} from 'chai';
import {hasher} from '../../src/utilities/Hasher';
import {matchesIdFormat} from '../../src/utilities/regex';

describe('symbol hash', () => {

    it('returns a uuid for a new key', () => {
        const hash1 = hasher.getHash('a');
        expect(matchesIdFormat(hash1)).to.equal(true);
    });

    it('returns same hash for same key', () => {
        const hash1 = hasher.getHash('a');
        const hash2 = hasher.getHash('a');
        expect(hash1).to.equal(hash2);
    });

    it('different hashes for different keys', () => {
        const hash1 = hasher.getHash('b');
        const hash2 = hasher.getHash('c');
        expect(hash1).not.to.equal(hash2);
    });

    it('can get a key for a hash', () => {
        const hash1 = hasher.getHash('b');
        const key = hasher.getKey(hash1);
        expect(key).to.equal('b');
    });

    it('can get a key for a hash after swap', () => {
        const hash1 = hasher.getHash('b');
        const key = hasher.getKey(hash1);
        expect(key).to.equal('b');

        hasher.swapKeys('b', 'g');
        const key2 = hasher.getKey(hash1);
        expect(key2).to.equal('g');
    });

    it('swaps keys', () => {
        const hash1 = hasher.getHash('foo');
        hasher.swapKeys('foo', 'bar');
        const hash2 = hasher.getHash('bar');
        expect(hash1).to.equal(hash2);
        const hash3 = hasher.getHash('foo');
        expect(hash3).not.to.equal(hash1);
    });
});