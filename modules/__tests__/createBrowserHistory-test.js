import expect from 'expect';
import { createBrowserHistory } from 'history';

import InitialLocationDefaultKey from './TestSequences/InitialLocationDefaultKey.js';
import Listen from './TestSequences/Listen.js';
import PushNewLocation from './TestSequences/PushNewLocation.js';
import PushSamePath from './TestSequences/PushSamePath.js';
import PushState from './TestSequences/PushState.js';
import PushMissingPathname from './TestSequences/PushMissingPathname.js';
import PushRelativePathname from './TestSequences/PushRelativePathname.js';
import PushUnicodeLocation from './TestSequences/PushUnicodeLocation.js';
import PushEncodedLocation from './TestSequences/PushEncodedLocation.js';
import ReplaceNewLocation from './TestSequences/ReplaceNewLocation.js';
import ReplaceSamePath from './TestSequences/ReplaceSamePath.js';
import ReplaceState from './TestSequences/ReplaceState.js';
import LocationPathnameAlwaysSame from './TestSequences/LocationPathnameAlwaysSame.js';
import EncodedReservedCharacters from './TestSequences/EncodedReservedCharacters.js';
import GoBack from './TestSequences/GoBack.js';
import GoForward from './TestSequences/GoForward.js';
import BlockEverything from './TestSequences/BlockEverything.js';
import BlockPopWithoutListening from './TestSequences/BlockPopWithoutListening.js';

describe('a browser history', () => {
  let history;
  beforeEach(() => {
    window.history.replaceState(null, null, '/');
    history = createBrowserHistory();
  });

  it('knows how to create hrefs', () => {
    const href = history.createHref({
      pathname: '/the/path',
      search: '?the=query',
      hash: '#the-hash'
    });

    expect(href).toEqual('/the/path?the=query#the-hash');
  });

  it('does not encode the generated path', () => {
    // encoded
    const encodedHref = history.createHref({
      pathname: '/%23abc'
    });
    // unencoded
    const unencodedHref = history.createHref({
      pathname: '/#abc'
    });

    expect(encodedHref).toEqual('/%23abc');
    expect(unencodedHref).toEqual('/#abc');
  });

  describe('listen', () => {
    it('does not immediately call listeners', done => {
      Listen(history, done);
    });
  });

  describe('the initial location', () => {
    it('has the "default" key', done => {
      InitialLocationDefaultKey(history, done);
    });
  });

  describe('push a new path', () => {
    it('calls change listeners with the new location', done => {
      PushNewLocation(history, done);
    });
  });

  describe('push the same path', () => {
    it('calls change listeners with the new location', done => {
      PushSamePath(history, done);
    });
  });

  describe('push state', () => {
    it('calls change listeners with the new location', done => {
      PushState(history, done);
    });
  });

  describe.skip('push with no pathname', () => {
    it('calls change listeners with the normalized location', done => {
      PushMissingPathname(history, done);
    });
  });

  describe('push with a relative pathname', () => {
    it('calls change listeners with the normalized location', done => {
      PushRelativePathname(history, done);
    });
  });

  // Currently broken in IE 11 and Edge
  describe.skip('push with a unicode path string', () => {
    it('creates a location with encoded properties', done => {
      PushUnicodeLocation(history, done);
    });
  });

  // Currently broken in IE 11 and Edge
  describe.skip('push with an encoded path string', () => {
    it('creates a location with encoded pathname', done => {
      PushEncodedLocation(history, done);
    });
  });

  describe('replace a new path', () => {
    it('calls change listeners with the new location', done => {
      ReplaceNewLocation(history, done);
    });
  });

  describe('replace the same path', () => {
    it('calls change listeners with the new location', done => {
      ReplaceSamePath(history, done);
    });
  });

  describe('replace state', () => {
    it('calls change listeners with the new location', done => {
      ReplaceState(history, done);
    });
  });

  // Currently broken in IE 11 and Edge
  describe.skip('location created by encoded and unencoded pathname', () => {
    it('produces the same location.pathname', done => {
      LocationPathnameAlwaysSame(history, done);
    });
  });

  describe('location created with encoded/unencoded reserved characters', () => {
    it('produces different location objects', done => {
      EncodedReservedCharacters(history, done);
    });
  });

  describe('back', () => {
    it('calls change listeners with the previous location', done => {
      GoBack(history, done);
    });
  });

  describe('forward', () => {
    it('calls change listeners with the next location', done => {
      GoForward(history, done);
    });
  });

  describe('block', () => {
    it('blocks all transitions', done => {
      BlockEverything(history, done);
    });
  });

  describe('block a POP without listening', () => {
    it('receives the next ({ action, location })', done => {
      BlockPopWithoutListening(history, done);
    });
  });
});