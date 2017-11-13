/**
 * @fileoverview Map of gnubby pk slot to the pin
 */

'use strict';


/**
 * Maps the pk of the non-rotating slot to the pin of the gnubby, and syncs
 * entries between the two instances of gnubbyd.  Since the syncing can fail for
 * several expected reasons (eg. gnubbyd-dev not installed, gnubbyd doesn't have
 * DPM), all syncing errors are ignored.
 */
var DevicePinMap = {};


/**
 * Error code indicating local storage is not defined
 * @const {number}
 */
DevicePinMap.LOCAL_STORAGE_UNAVAILABLE = -11;


/**
 * Error code indicating there was a failure accessing local storage
 * @const {number}
 */
DevicePinMap.LOCAL_STORAGE_FAILURE = -12;


/**
 * Error code indicating there was a failure during a chrome sendMessage
 * @const {number}
 */
DevicePinMap.SEND_MESSAGE_FAILURE = -13;


/**
 * Error code indicating an invalid parameter passed to the DPM
 * @const {number}
 */
DevicePinMap.INVALID_USAGE = -14;


/**
 * App ids of the gnubbyd versions
 * @const {Object<string,string>}
 */
DevicePinMap.APP_IDS = {
  'STABLE': "beknehfpfkghjoafdifaflglpjkojoco",
  'DEV': "dlfcjilkjfhdnfiecknlnddkmmiofjbg"
};


/**
 * @typedef{{
 *   pin: Array,
 *   timestamp: number
 * }}
 * @private
 */
var MapEntry;


/**
 * Returns whether or not local storage is available in chrome
 * @returns {boolean} Whether local storage api is available
 */
DevicePinMap.hasLocalStorage = function() {
  return typeof(chrome) !== undefined && chrome.hasOwnProperty('storage') &&
      chrome.storage.hasOwnProperty('local');
};


/**
 * Adds the pin to the dpm
 * @param {!string} pk Non-rotating slot's public key as a hex string
 * @param {!Array} pin The gnubby's pin
 * @param {!Function} cb The callback called when complete
 */
DevicePinMap.set = function(pk, pin, cb) {
  if (!DevicePinMap.hasLocalStorage()) {
    cb(DevicePinMap.LOCAL_STORAGE_UNAVAILABLE);
    return;
  }
  if (pin.length != 6) {
    cb(DevicePinMap.INVALID_USAGE);
    return;
  }
  var sendSuccess = function() { cb(0); };
  var timestamp = Math.floor(Date.now() / 1000);
  var entry = {'pin': pin, 'timestamp': timestamp};
  DevicePinMap.sync_(pk, entry)
      // Ignore errors during sync
      .catch(() => entry)
      .then(DevicePinMap.updateMap_.bind(null, pk, null))
      .then(sendSuccess)
      .catch(cb);
};


/**
 * Get the pin from local storage of either gnubbyd app
 * @param {!string} pk Non-rotating slot's public key as a hex string
 * @param {!Function} cb The callback called with the pin
 */
DevicePinMap.get = function(pk, cb) {
  if (!DevicePinMap.hasLocalStorage()) {
    cb(DevicePinMap.LOCAL_STORAGE_UNAVAILABLE);
    return;
  }
  var sendFailure = function(rc) {
    cb({'rc': rc});
  };
  var sendSuccess = function(opt_entry) {
    var rsp = { 'rc': 0 };
    if (opt_entry && opt_entry.pin) {
      rsp['pin'] = opt_entry.pin;
    }
    cb(rsp);
  };
  DevicePinMap.storagePromiseGet_(pk)
      .then(function(entry) {
        DevicePinMap.sync_(pk, entry)
            .catch(() => entry)
            .then(DevicePinMap.updateMap_.bind(null, pk, entry))
            .then(sendSuccess)
            .catch(sendFailure);
      })
      .catch(sendFailure);
};


/**
 * Handles a sync request. Updates map, or returns it's value depending on the
 * relative values
 * @param {!string} pk Non-rotating slot's public key as a hex string
 * @param {?MapEntry} otherEntry The other map's entry for the pk
 * @param {!Function} cb The callback to call when done, with an updated entry
 *   if applicable
 */
DevicePinMap.handleSync = function(pk, otherEntry, cb) {
  var sendSuccess = function(entry) {
    cb({'rc': 0, 'pk': pk, 'entry': entry});
  };
  var sendFailure = function(rc) {
    cb({'rc': rc});
  };
  DevicePinMap.storagePromiseGet_(pk)
      .then(entry => DevicePinMap.updateMap_(pk, entry, otherEntry))
      .then(sendSuccess)
      .catch(sendFailure);
};


/**
 * Syncs the given entry with the other gnubbyd's dpm.
 * @param {!string} pk Non-rotating slot's public key as a hex string
 * @param {?MapEntry} entry The map's pin entry
 * @return {Promise<Object>} A promise resolved with the most up to date entry
 * @private
 */
DevicePinMap.sync_ = function(pk, entry) {
  var otherAppId = chrome.runtime.id == DevicePinMap.APP_IDS['STABLE'] ?
      DevicePinMap.APP_IDS['DEV'] : DevicePinMap.APP_IDS['STABLE'];
  var message = {'type': 'DPM_SYNC', 'pk': pk, 'entry': entry};
  return DevicePinMap.promiseSendMessage_(otherAppId, message)
      .then(rsp => rsp.entry)
      .catch(() => entry);
};


/**
 * Compares the new entry with the current entry in the map, updates the map if
 * necessary, and then returns the newest value
 * @param {!string} pk Non-rotating slot's public key as a hex string
 * @param {?MapEntry} entry The local gnubbyd's entry for the pk
 * @param {?MapEntry} otherEntry The other gnubbyd's entry for the pk
 * @return {Promise<?MapEntry>} A promise resolved with the latest map entry
 * @private
 */
DevicePinMap.updateMap_ = function(pk, entry, otherEntry) {
  if (!entry && !otherEntry) {
    return Promise.resolve();
  }
  if (otherEntry && (!entry || otherEntry.timestamp > entry.timestamp)) {
    return DevicePinMap.storagePromiseSet_(pk, otherEntry)
        .then(() => otherEntry);
  } else {
    return Promise.resolve(entry);
  }
};


/**
 * Set a single value in chrome local storage.
 * @param {string} key A single key
 * @param {MapEntry} value A single value
 * @return {Promise<undefined>} A promise to set the value in local storage
 * @private
 */
DevicePinMap.storagePromiseSet_ = function(key, value) {
  return new Promise(function(resolve, reject) {
    if (!DevicePinMap.hasLocalStorage()) {
      reject(DevicePinMap.LOCAL_STORAGE_UNAVAILABLE);
      return;
    }
    chrome.storage.local.set({[key]: value}, function() {
      if (chrome.runtime.lastError) {
        console.warn(UTIL_fmt(chrome.runtime.lastError.message));
        reject(DevicePinMap.LOCAL_STORAGE_FAILURE);
        return;
      }
      resolve();
    });
  });
};


/**
 * Get a single value from chrome local storage
 * @param {string} key A single key
 * @return {Promise<?MapEntry>} A promise resolved with the result
 * @private
 */
DevicePinMap.storagePromiseGet_ = function(key) {
  return new Promise(function(resolve, reject) {
    if (!DevicePinMap.hasLocalStorage()) {
      reject(DevicePinMap.LOCAL_STORAGE_UNAVAILABLE);
      return;
    }
    chrome.storage.local.get(key, function(data) {
      if (chrome.runtime.lastError) {
        console.warn(UTIL_fmt(chrome.runtime.lastError.message));
        reject(DevicePinMap.LOCAL_STORAGE_FAILURE);
        return;
      }
      resolve(data[key]);
    });
  });
};


/**
 * Promise wrapper for chrome sendmessage
 * @param {string} appId The appid of the extension to send to
 * @param {Object} message The message to send
 * @return {Promise<Object>} A promise resolved with the result
 * @private
 */
DevicePinMap.promiseSendMessage_ = function(appId, message) {
  return new Promise(function(resolve, reject) {
    chrome.runtime.sendMessage(appId, message, function(reply) {
      if (chrome.runtime.lastError) {
        console.warn(UTIL_fmt(chrome.runtime.lastError.message));
        reject(DevicePinMap.SEND_MESSAGE_FAILURE);
        return;
      }
      if (reply.rc !== 0) {
        console.warn(UTIL_fmt('sendMessage failed: ' + JSON.stringify(reply)));
        reject(reply.rc);
        return;
      }
      resolve(reply);
    });
  });
};
