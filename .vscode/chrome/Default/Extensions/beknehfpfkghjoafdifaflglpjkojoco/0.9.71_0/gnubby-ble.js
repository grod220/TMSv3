/**
 * @fileoverview Yubico-specific Gnubby methods related to BLE controller
 *     commands.
 */
'use strict';

// BLE command section

/**
 * Read fob BLE UID (name).
 * @param {Function=} opt_cb Callback.
 */
Gnubby.prototype.getBleUid = function(opt_cb) {
  var cb = opt_cb || Gnubby.defaultCallback;

  // The BLE_UID command reads the UID value, and sets it when the input
  // length > 0.
  this.exchange(GnubbyDevice.CMD_BLE_UID, new ArrayBuffer(0),
      Gnubby.NORMAL_TIMEOUT, cb);
};

/**
 * Update fob BLE UID (name).
 * @param {Uint8Array} uid New UID (ASCII bytes of name).
 * @param {Function=} opt_cb Callback.
 */
Gnubby.prototype.setBleUid = function(uid, opt_cb) {
  var cb = opt_cb || Gnubby.defaultCallback;

  // The BLE_UID command reads the UID value, and sets it when the input
  // length > 0.
  this.exchange(GnubbyDevice.CMD_BLE_UID, uid, Gnubby.NORMAL_TIMEOUT, cb);
};
