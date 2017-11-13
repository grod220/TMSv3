/**
 * @fileoverview Options page for gnubby.
 * Note this page should not talk to devices directly, but
 * instead use messaging to the background page.
 */

'use strict';

/**
* @typedef {{
* platform: string,
* version: string,
* needsUpdate: boolean
* }}
*/
var FirmwareState;

/**
* @typedef {{
* version: string,
* badApplet: boolean,
* needsUpdate: boolean,
* isPilotVersion: boolean
* }}
*/
var U2fAppletState;

/**
* @typedef {{
* version: string,
* needsUpdate: boolean,
* hasPin: boolean
* }}
*/
var SshAppletState;

/**
* @typedef {{
* firmware: (FirmwareState|undefined),
* u2f: (U2fAppletState|undefined),
* ssh: (SshAppletState|undefined),
* hideAll: (boolean|undefined)
* }}
*/
var GnubbyState;

/**
 * DOM element that had focus before setBusy.
 */
var lastActive;

/**
 * Mark entire UI as busy or not, using blocking overlay.
 * Clears all content areas if set as busy.
 * Leaves content areas alone when set as not busy.
 * @param {boolean} v to mark as busy.
 */
function setBusy(v) {
  var busy = document.getElementById('busy');
  var wait = document.getElementById('wait');
  if (v) {
    lastActive = document.activeElement;

    // Clear content areas.
    document.getElementById('u2f-text').innerHTML = '';
    document.getElementById('u2f-warn').innerText = '';

    document.getElementById('ssh-text').innerHTML = '';
    document.getElementById('ssh-warn').innerText = '';

    // Hide buttons.
    enableButtons({ 'hideAll' : true });

    // Start animation.
    document.getElementById('u2f-ico').setAttribute('class', 'slideRight');
    document.getElementById('ssh-ico').setAttribute('class', 'rotatingCC');

    // Enable busy overlay.
    busy.style.cursor = 'wait';
    busy.style.visibility = 'visible';

    // Show something for text reader.
    wait.style.visibility = 'visible';
    wait.focus();
  } else {
    // Stop animation.
    document.getElementById('u2f-ico').setAttribute('class', '');
    document.getElementById('ssh-ico').setAttribute('class', '');

    // Disable busy overlay.
    busy.style.cursor = 'pointer';
    busy.style.visibility = 'hidden';

    wait.style.visibility = 'hidden';
    if (lastActive) lastActive.focus();
  }
}

function showMessage(applet, msg) {
  document.getElementById(applet + '-text').innerHTML = msg;
  // Arm firmware selector, if present.
  var fw = document.getElementById('firmware-selector');
  if (fw) {
    fw.onchange = fwAction.bind(fw);
  }
}

function showWarning(applet, msg, talk) {
  document.getElementById(applet + '-warn').innerHTML = msg;
  if (talk && msg != '') {
    // If we have a message worthy of screen reader, focus on it.
    var s = document.getElementById('fff');
    s.focus();
  }
}

function blurWarning(applet) {
  document.getElementById(applet + '-warn').innerHTML = '';
  delete this.onblur;
}

function showRc(applet, rc) {
  var current = chrome.app.window.current();
  var x = 844 * zoomFactor;
  var y = 360 * zoomFactor;
  if (rc == 401) {
    // Authorization error
    showWarning(applet, '<a href="" id="fff">(low level error: ' + rc +
        ')</a><br/>1. Navigate to chrome://settings/clearBrowserData on' +
        ' your Chrome browser.<br/>' + '2. Clear the cache & cookies.<br/>' +
        '3. Restart Chrome at chrome://restart', true);
    current.resizeTo(x, y);
  } else if (rc == -6) {
    // Fail to renew corp SSO creds
    showWarning(applet, '<a href="" id="fff">(low level error: ' + rc +
        ')</a><br/>If reloading did not help, try this:<br/>' +
        '1. Navigate to chrome://settings/clearBrowserData on' +
        ' your Chrome browser.<br/>' + '2. Clear the cache & cookies.<br/>' +
        '3. Restart Chrome at chrome://restart', true);
    current.resizeTo(x, y);
  } else if (rc == -8) {
    // Faulty SK
    showWarning(applet, '<a href="" id="fff">(low level error: ' + rc +
        ')</a><br/>Try:<br/>' +
        '1. Reinserting the security key and reload.<br/>' +
        '2. Inserting the security key into a working USB port.<br/><br/>' +
        'Otherwise, get a new security key on' +
        '<a href="http://go/stuff/" target="_blank" id="fff">(go/stuff)</a>',
        true);
    current.resizeTo(x, y);
  } else if (rc == 200) {
    // Steps to update Chrome
    showWarning(applet, '<a href="" id="fff">(low level error: ' + rc +
        ')</a><br/>1. Navigate to chrome://help on your Chrome browser.<br/>' +
        '2. Install any pending update.<br/>' +
        '3. Restart Chrome at chrome://restart', true);
  } else if (rc == 403) {
    // Steps to obtain a valid machine certificate
    showWarning(applet, '<a href="" id="fff">(low level error: ' +
          rc + ')</a><br/>Follow the steps on ' +
        '<a href="http://go/certinstall/" target="_blank" ' +
        'id="fff">go/certinstall</a>' + ' to install a certificate.<br/>' +
        'Otherwise, restart Chrome at chrome://restart', true);
    current.resizeTo(x, y);
  } else if (rc == -512) {
    // Restart Chrome
    showWarning(applet, '<a href="" id="fff">(low level error: ' + rc +
        ')</a><br/>Restart Chrome at chrome://restart', true);
  } else if (rc < 0x1000) {
    // Communication layer errors, including HTTP response codes.
    showWarning(applet, '<a href="" id="fff">(low level error: ' +
          rc + ', reload to retry)</a>', true);
  } else {
    // APDU layer errors, from applet.
    showWarning(applet, '<a href="" id="fff">(low level error: 0x' +
          Number(rc).toString(16) + ', reload to retry)</a>', true);
  }
}

/**
 * Given a message from the lower-level,
 * parse it into an object with useful traits.
 * @param {Object} response message to interpret.
 * @return {!GnubbyState} parsed state object.
 */
function parseStateFromResponse(response) {
  var state = {};

  state.firmware = {};
  state.firmware.platform = response.platformId;
  state.firmware.version = response.firmwareVersion;
  state.firmware.needsUpdate =
      firmware_needsUpdate(response.platformId, response.firmwareVersion);

  if (response.gnubbyVersion && response.gnubbyVersion != '0.0.0') {
    state.u2f = {};
    state.u2f.version = response.gnubbyVersion;
    state.u2f.badApplet = (response.gnubbyVersion == '0.4.0');
    state.u2f.needsUpdate = gnubby_needsUpdate(response.gnubbyVersion);
    state.u2f.isPilotVersion = gnubby_isPilotVersion(response.gnubbyVersion);
  }

  if (response.sshVersion && response.sshVersion != '0.0.0') {
    state.ssh = {};
    state.ssh.version = response.sshVersion;
    state.ssh.needsUpdate = ssh_needsUpdate(response.sshVersion);
    state.ssh.hasPin = response.sshHasPin;
    state.ssh.emergencyMode = response.emergencyMode;
  }

  return state;
}

/**
 * @param {Object} errorStatus Error status to show.
 * @return {string} html
 */
function errorStatusHtml(errorStatus) {
  if (errorStatus.enumeratedBy) {
    if (gnubby_isFeitianDeviceWithOutdatedUsbFirmware(
        errorStatus.enumeratedBy)) {
      return 'This Feitian device is running out of date USB firmware.<br/>' +
          'Please contact gnubby-team@ to request an updated one.';
    }
    // The enumeratedBy value isn't interesting to show.
    delete errorStatus.enumeratedBy;
  }
  return JSON.stringify(errorStatus);
}

/**
 * @param {!GnubbyState} state to show.
 * @return {string} html
 */
function u2fStatusHtml(state) {
  var msg = '<table border=0><tr>';

  msg += '<td>Platform</td>';
  if (state.firmware.platform) {
    msg += '<td>' + state.firmware.platform + '</td>';
  } else {
    msg += '<td>(unknown)</td>';
    msg += '<td><img src="exclamation_yellow.png" alt="status warn"></td>';
  }

  msg += '</tr><tr>';

  if (state.firmware) {
    msg += '<td colspan=2><select id="firmware-selector">';
    msg += firmware_options(state.firmware.platform, state.firmware.version);
    msg += '</select></td>';

    if (state.firmware.needsUpdate) {
      msg += '<td><img src="exclamation_yellow.png" alt="status warn"></td>';
    } else {
      msg += '<td><img src="check.png" alt="status ok"></td>';
    }
    msg += '<td>No auto-update</td><td><input type="checkbox" id="noautoupdate"></input></td>';
  } else {
    msg += '<td>USB firmware</td>';
    msg += '<td>(not detected)</td>';
    msg += '<td><img src="exclamation_red.png" alt="status bad"></td>';
  }

  msg += '</tr><tr>';

  msg += '<td>U2F applet</td>';

  if (state.u2f) {
    msg += '<td>' + state.u2f.version + '</td>';

    if (state.u2f.needsUpdate) {
      msg += '<td><img src="exclamation_yellow.png" alt="status warn"></td>';
    } else {
      msg += '<td><img src="check.png" alt="status ok"></td>';
    }
  } else {
    msg += '<td>(not detected)</td>';
    msg += '<td><img src="exclamation_yellow.png" alt="status warn"></td>';
  }

  msg += '</tr></table>';
  return msg;
}

/**
 * @param {!GnubbyState} state to show.
 * @return {string} html
 */
function sshStatusHtml(state) {
  var msg = '<table><tr><td>SSH applet</td>';

  if (state.ssh) {
    msg += '<td>' + state.ssh.version + '</td>';

    if (state.ssh.needsUpdate) {
      msg += '<td><img src="exclamation_yellow.png" alt="status warn">' +
             '</td></tr>';
    } else {
      msg += '<td><img src="check.png" alt="status ok"></td></tr>';
    }

    if (state.ssh.hasPin !== undefined) {
      if (state.ssh.hasPin === true) {
        msg += '<tr><td>SSH Security Key password status</td>';
        msg += '<td></td><td><img src="check.png" alt="status ok"></td></tr>';
      } else {
        msg += '<tr><td>SSH Security Key password status</td>';
        msg += '<td></td><td><img src="exclamation_red.png" alt="status bad">' +
               '</td></tr>';
      }
    }

    if (state.ssh.emergencyMode !== undefined) {
      if (state.ssh.emergencyMode) {
        msg += '<tr><td colspan=2><label for="emergencyMode">';
        msg += 'Use emergency keys</label></td>';
        msg += '<td><input type="checkbox" id="emergencyMode"';
        msg += ' checked disabled></td>';
      } else {
        msg += '<tr><td colspan=2><label for="emergencyMode">';
        msg += 'Use emergency keys</label></td>';
        msg += '<td><input type="checkbox" id="emergencyMode"';
        msg += ' disabled></td>';
      }
    }
  } else {
    msg += '<td>(not detected)</td>';
    msg += '<td><img src="exclamation_yellow.png" alt="status warn">' +
           '</td></tr>';
  }

  msg += '</table>';
  return msg;
}

/**
 * @param {!GnubbyState} state to hint on.
 * @return {boolean} whether hint was shown.
 */
function showOneHint(state) {
  var hinted = false;

  // u2f hint first.
  if (!state.u2f) {
    showWarning('u2f',
        'Hit &lt;enter&gt; to install the U2F applet.');
    var d = document.getElementById('u2f-install');
    d.onblur = blurWarning.bind(d, 'u2f');
    d.focus();
    hinted = true;
  } else if (state.u2f.needsUpdate) {
    showWarning('u2f',
        'Hit &lt;enter&gt; to update the U2F applet.');
    var d = document.getElementById('u2f-reinstall');
    d.onblur = blurWarning.bind(d, 'u2f');
    d.focus();
    hinted = true;
  }

  if (hinted) return hinted;

  // ssh hint next.
  if (state.ssh && state.ssh.hasPin !== true) {
    showWarning('ssh',
        'Hit &lt;enter&gt; to set up your SSH Security Key password.');
    var d = document.getElementById('ssh-settings');
    d.onblur = blurWarning.bind(d, 'ssh');
    d.focus();
    hinted = true;
  } else if (!state.ssh) {
    showWarning('ssh',
                'Hit &lt;enter&gt; to install the SSH applet.');
    var d = document.getElementById('ssh-install');
    d.onblur = blurWarning.bind(d, 'ssh');
    d.focus();
    hinted = true;
  } else if (state.ssh.needsUpdate) {
    showWarning('ssh',
        'Hit &lt;enter&gt; to update the SSH applet.');
    var d = document.getElementById('ssh-reinstall');
    d.onblur = blurWarning.bind(d, 'ssh');
    d.focus();
    hinted = true;
  }
  return hinted;
}

/**
 * Show only relevant buttons.
 * @param {!GnubbyState} state to work with.
 */
function enableButtons(state) {
  // First hide all buttons.
  document.getElementById('u2f-install').style.visibility = 'hidden';
  document.getElementById('u2f-reinstall').style.visibility = 'hidden';
  document.getElementById('u2f-delete').style.visibility = 'hidden';

  document.getElementById('ssh-install').style.visibility = 'hidden';
  document.getElementById('ssh-reinstall').style.visibility = 'hidden';
  document.getElementById('ssh-delete').style.visibility = 'hidden';
  document.getElementById('ssh-settings').style.visibility = 'hidden';

  if (state.hideAll) return;  // done

  if (state.u2f) {
    // u2f buttons.
    if (state.u2f.needsUpdate) {
      document.getElementById('u2f-reinstall').style.visibility = 'visible';
    }
    if (firmware_hasDelete(state.firmware.platform))
      document.getElementById('u2f-delete').style.visibility = 'visible';
  } else {
    document.getElementById('u2f-install').style.visibility = 'visible';
  }

  if (state.ssh) {
    // ssh buttons.
    if (state.ssh.needsUpdate && !(!state.u2f || state.u2f.needsUpdate)) {
      // Allow re-install of ssh applet.
      document.getElementById('ssh-reinstall').style.visibility = 'visible';
    }
    document.getElementById('ssh-delete').style.visibility = 'visible';
    document.getElementById('ssh-settings').style.visibility = 'visible';
  } else {
    if (!(!state.u2f || state.u2f.needsUpdate)) {
      // Allow ssh install if u2f is there and up to date.
      document.getElementById('ssh-install').style.visibility = 'visible';
    }
  }
}

var ACTION_NONE = 0;
var ACTION_HINT = 1;
var ACTION_DELETE_SSH = 2;
var ACTION_DELETE_U2F = 3;
var ACTION_INSTALL_SSH = 4;
var ACTION_INSTALL_U2F = 5;
var ACTION_DELETED_SSH = 6;
var ACTION_DELETED_U2F = 7;
var ACTION_INSTALLED_SSH = 8;
var ACTION_INSTALLED_U2F = 9;
var ACTION_CANCEL = 10;

function determineAction(followupAction) {
  if (!followupAction) {
    // When there is no followup action, we are clear to hint.
    return ACTION_HINT;
  }

  var action = ACTION_NONE;

  switch (followupAction.type) {
    case 'APPLET_INSTALL':
      if (followupAction.action.indexOf('&delete') != -1) {
        if (followupAction.action.indexOf('&ssh') != -1) {
          action = ACTION_DELETE_SSH;
        } else {
          action = ACTION_DELETE_U2F;
        }
      } else {
        if (followupAction.action.indexOf('&ssh') != -1) {
          action = ACTION_INSTALL_SSH;
        } else {
          action = ACTION_INSTALL_U2F;
        }
      }
      break;
    case 'APPLET_INSTALLED':
      if (followupAction.action.indexOf('&delete') != -1) {
        if (followupAction.action.indexOf('&ssh') != -1) {
          action = ACTION_DELETED_SSH;
        } else {
          action = ACTION_DELETED_U2F;
        }
      } else {
        if (followupAction.action.indexOf('&ssh') != -1) {
          action = ACTION_INSTALLED_SSH;
        } else {
          action = ACTION_INSTALLED_U2F;
        }
      }
      break;
  }

  return action;
}

/**
 * Get value and monitor changes to no autoupdate checkbox
 */
function armNoAutoUpdateCheckbox() {
  var noautoupdate = document.getElementById('noautoupdate');
  if (noautoupdate) {
    // Track user action.
    noautoupdate.onchange = function() {
      // We use app version as value to default to auto-update after app update.
      chrome.storage.local.set(
          {
            'no-autoupdate' :
                (noautoupdate.checked ? chrome.runtime.getManifest().version : 'false')
          },
          function() {
            console.log(UTIL_fmt('no-autoupdate: ' + noautoupdate.checked));
          }
      );
    };
    // Show current state.
    chrome.storage.local.get('no-autoupdate', function(items) {
      console.log(items);
      noautoupdate.checked =
         (items['no-autoupdate'] == chrome.runtime.getManifest().version);
      console.log(UTIL_fmt('no-autoupdate: ' + noautoupdate.checked));
    });
  }
}

function processActionResponse(followupAction, rsp) {
  setBusy(false);

  console.log(UTIL_fmt('followupAction'));
  console.log(UTIL_fmt(JSON.stringify(followupAction)));
  console.log('rsp');
  console.log(UTIL_fmt(JSON.stringify(rsp)));

  if (rsp.rc != 0) {
    // Got some error. Display in the u2f content area.
    showMessage('u2f', errorStatusHtml(rsp.message));
    showRc('u2f', rsp.rc);
    return;
  }

  var action = determineAction(followupAction);
  var interstitial = (followupAction && followupAction.interstitial);

  var state = /** @type {!GnubbyState} */ (parseStateFromResponse(rsp.message));

  // Show relevant buttons.
  enableButtons(state);

  // Populate main content areas.
  showMessage('u2f', u2fStatusHtml(state));
  showWarning('u2f', '');
  armNoAutoUpdateCheckbox();

  showMessage('ssh', sshStatusHtml(state));
  showWarning('ssh', '');

  // Business logic on what actions need to precede others.
  // Show messages relevant to action.
  switch (action) {
    case ACTION_HINT:
      showOneHint(state);
      break;

    case ACTION_INSTALL_U2F:
      if (state.ssh) {
        showWarning('u2f',
            '<a href="" id="fff">' +
            'Remove the SSH applet before installing the U2F applet.</a>',
            true);
        showWarning('ssh', '');
        action = ACTION_CANCEL;
      }
      break;

    case ACTION_INSTALLED_U2F:
      showWarning('u2f',
          '<a target="_blank" id="fff" href=' +
          '"https://security.google.com/settings/security/securitykey/list"' +
          '>Register your Security Key here</a>', true);
      action = ACTION_CANCEL;
      break;

    case ACTION_DELETED_U2F:
      if (showOneHint(state)) {
        action = ACTION_CANCEL;
      }
      break;

    case ACTION_INSTALL_SSH:
      if (state.u2f && state.u2f.isPilotVersion) {
        showWarning('ssh',
            '<a href="" id="fff">Your gnubby is too old for SSH.</a>' +
            ' <a target="_blank" href=' +
            '"https://goto.google.com/woyuq">Follow up here</a>.', true);
        action = ACTION_CANCEL;
      } else if (!state.u2f) {
        showWarning('ssh',
            '<a href="" id="fff">Install the U2F applet first.</a>', true);
        showWarning('u2f', '');
        action = ACTION_CANCEL;
      } else if (state.u2f.needsUpdate) {
        showWarning('ssh',
            '<a href="" id="fff">Update the U2F applet first.</a>', true);
        showWarning('u2f', '');
        action = ACTION_CANCEL;
      }
      break;

    case ACTION_INSTALLED_SSH:
      showWarning('ssh',
          'Hit &lt;enter&gt; to set up your SSH Security Key password.');
      var d = document.getElementById('ssh-settings');
      d.onblur = blurWarning.bind(d, 'ssh');
      d.focus();
      action = ACTION_CANCEL;
      break;

    case ACTION_DELETED_SSH:
      if (showOneHint(state)) {
        action = ACTION_CANCEL;
      }
      break;
  }

  // Try optimize interstitial away, given certain action and state combos.
  if (interstitial) {
    if (action == ACTION_INSTALL_SSH || action == ACTION_DELETE_SSH) {
      if (!state.ssh || state.ssh.hasPin !== true) {
        // Ssh not installed or does not have working PIN. Go ahead.
        interstitial = false;
      }
    }
    if (action == ACTION_INSTALL_U2F || action == ACTION_DELETE_U2F) {
      if (!state.u2f || state.u2f.badApplet) {
        // U2f not installed or bad. Go ahead.
        interstitial = false;
      }
    }
  }

  // Take remaining action.
  if (action == ACTION_INSTALL_SSH || action == ACTION_DELETE_SSH ||
      action == ACTION_INSTALL_U2F || action == ACTION_DELETE_U2F) {
    if (interstitial) {
      showInterstitial(action);
      return;
    } else {
      // No interstitial; execute.
      var newFollowupAction = {
        'type': 'APPLET_INSTALLED',
        'action': followupAction.action
      };
      executeAction(followupAction, newFollowupAction);
      return;
    }
  }

  // Nothing todo, arm checkbox(es), if any.
  var emergencyMode = document.getElementById('emergencyMode');
  if (emergencyMode) {
    emergencyMode.onchange = emergencyAction.bind(emergencyMode);
    emergencyMode.disabled = false;
  }
}

function executeAction(action, followupAction) {
  setBusy(true);

  chrome.runtime.sendMessage(
      chrome.runtime.id,  // self
      action,
      processActionResponse.bind(null, followupAction)
    );
}

function showInterstitial(action) {
  switch (action) {
    case ACTION_DELETE_SSH:
      showSshInterstitial(true);
      break;
    case ACTION_INSTALL_SSH:
      showSshInterstitial(false);
      break;
    case ACTION_DELETE_U2F:
      showU2fInterstitial(true);
      break;
    case ACTION_INSTALL_U2F:
      showU2fInterstitial(false);
      break;
  }
}

function showU2fInterstitial(appletDelete) {
  showWarning('u2f',
        '<a href="" id="fff">Security Key registration data will be lost</a>' +
        ' <button id="u2f-ok">OK</button> ' +
        '<button id="u2f-cancel">Cancel</button>', true);

  var ok = document.getElementById('u2f-ok');
  ok.onclick = u2fAction.bind(null, true, appletDelete, false);

  var cancel = document.getElementById('u2f-cancel');
  cancel.onclick = showWarning.bind(null, 'u2f', '');
}

function u2fAction(force, deleteApplet, interstitial) {
  showSshSettingsDialog(false);
  executeAction(
      { 'type': 'STATUS' },
      {
        'type': 'APPLET_INSTALL',
        'action': 'v2' +
            (force ? '&force' : '') +
            (deleteApplet ? '&delete' : ''),
        'interstitial': interstitial
      }
    );
}

function fwAction() {
  showSshSettingsDialog(false);
  var platformAndVersion = this.value.split('-');
  executeAction(
      {
        'type': 'APPLET_INSTALL',
        'action': 'fwSelect',
        'platformId': platformAndVersion[0],
        'version': platformAndVersion[1]
      },
      { 'type': 'STATUS' }
    );
}

function showSshInterstitial(appletDelete) {
  showWarning('ssh',
      '<a href="" id="fff">This will wipe your existing SSH data</a>' +
      ' <button id="ssh-ok">OK</button> ' +
      '<button id="ssh-cancel">Cancel</button>', true);

  var ok = document.getElementById('ssh-ok');
  ok.onclick = sshAction.bind(null, true, appletDelete, false);

  var cancel = document.getElementById('ssh-cancel');
  cancel.onclick = showWarning.bind(null, 'ssh', '');
}

function sshAction(force, deleteApplet, interstitial) {
  showSshSettingsDialog(false);
  executeAction(
      { 'type': 'STATUS' },
      {
        'type': 'APPLET_INSTALL',
        'action': 'v2&ssh' +
          (force ? '&force' : '') +
          (deleteApplet ? '&delete' : ''),
        'interstitial': interstitial
      }
    );
}

function emergencyAction() {
  var value = this.checked;
  showSshSettingsDialog(false);
  executeAction(
      { 'type': 'APPLET_INSTALL',
        'action': (value ? 'setEmergency' : 'clearEmergency') },
      { 'type': 'STATUS' }
      );
}

/**
 * Show or hide parts of SSH settings dialog.
 * @param {Object} options indicating which elements to show.
 */
function enableSshSettings(options) {
  document.getElementById('sshsetpinoptions-row').style.display =
      (options.setPin ? '' : 'none');
  document.getElementById('sshsetpin-row').style.display =
      (options.setLiteralPin ? '' : 'none');
  document.getElementById('sshchangepin-row').style.display =
      (options.changePin ? '' : 'none');
  document.getElementById('sshhasdevicepin-row').style.display =
      (options.hasDevicePin ? '' : 'none');
  document.getElementById('sshkey-row').style.visibility =
      (options.hasPk ? 'visible' : 'hidden');

  // screen reader assistance
  if (options.setPin) document.getElementById('setdevicepin').focus();
  else if (options.setLiteralPin) document.getElementById('setpin').focus();
  else if (options.changePin) document.getElementById('oldpin').focus();
  else document.getElementById('ssh-settings').focus();
}

var zoomFactor = 1.0;

/**
 * @param {boolean=} v true/false
 */
function showSshSettingsDialog(v) {
  showWarning('ssh', '');

  var current = chrome.app.window.current();
  if (v) {
    current.resizeTo(844 * zoomFactor, 378 * zoomFactor);

    sshGetKey(SshAgent.NON_ROTATING, sshGotKeyCallback.bind(null, true));
  } else {
    // Hide all SSH settings dialogs.
    enableSshSettings({});

    current.resizeTo(844 * zoomFactor, 306 * zoomFactor);
  }
}

function sshGetKey(which, cb) {
  showWarning('ssh', '');
  setBusy(true);

  var challenge = UTIL_getRandom(16);

  chrome.runtime.sendMessage(
      chrome.runtime.id,  // to self
      {
        'type': 'SSH_PUBKEY',
        'which': which,
        'challenge': UTIL_BytesToHex(challenge)
      },
      function(reply) {
        console.log(UTIL_fmt(JSON.stringify(reply)));

        setBusy(false);

        if (reply.publickey && reply.publickey.length == 65 * 2) {
          // Construct authorized_keys2 compatible line
          var type = 'ecdsa-sha2-nistp256';
          var b = new SshBlob();
          b.appendString(type);
          b.appendString('nistp256');
          b.appendSize(65);
          b.appendBytes(UTIL_HexToBytes(reply.publickey));
          console.log(UTIL_BytesToHex(b.data()));
          var fmt = type + ' ' + base64_encode(b.data()) + ' you@gnubby.key';
          console.log(UTIL_fmt(JSON.stringify(fmt)));
          if (cb) cb(0, b, fmt);
        } else {
          if (cb) cb(reply ? 1 : -1);
        }
      }
  );
}

function sshGotKeyCallback(enableChange, rc, b, key) {
  if (rc == 0) {
    var n = document.getElementById('sshpk');
    n.value = key;
    var c = document.getElementById('sshcopy');
    c.onclick = function() {
        n.select();
        document.execCommand('copy');
      };

    var loadSsh = function(sshOptions) {
      // Got ssh key already; show it.
      enableSshSettings(sshOptions);

      // Refresh rest of UI.
      executeAction({ 'type': 'STATUS' }, null);
    };
    var o = {'changePin': enableChange, 'hasDevicePin': false, 'hasPk': true};
    checkDevicePinSupport(function(supportsDp) {
      if (!supportsDp) {
        loadSsh(o);
        return;
      }
      chrome.runtime.sendMessage(
          chrome.runtime.id,  // to self
          {'type': 'SSH_HAS_DEVICEPIN', 'pk': b.data()}, function(rsp) {
            if (!rsp || !rsp.data) {
              loadSsh(o);
              return;
            }
            var has_device_pin = rsp.data[0] == SSH2_AGENT_SUCCESS;
            o.changePin = enableChange && !has_device_pin;
            o.hasDevicePin = has_device_pin;
            loadSsh(o);
          });
    });
  } else {
    console.log(UTIL_fmt('rc=' + rc));

    if (rc == 0x6a86 /* ISO7816.SW_INCORRECT_P1P2 */) {
      // Bad slot. Probably old applet?
      showWarning('ssh',
          '<a href="" id="fff">(Update the SSH applet)</a>', true);
    } else {
      // No SSH key available or locked out.
      // Enable set only PIN dialog.
      checkDevicePinSupport(function(hasDp) {
        if (hasDp) {
          enableSshSettings({ 'setPin' : true });
        } else {
          enableSshSettings({ 'setLiteralPin' : true });
        }
      });

      showWarning('ssh',
          '<a href="" id="fff">(Security Key password not set)</a>', true);
    }
  }
}

/**
 * Send the command to ssh-agent to create and set a device bound pin
 */
function sshSetDevicePin() {
  showWarning('ssh', '');
  setBusy(true);

  chrome.runtime.sendMessage(
      chrome.runtime.id,  // to self
      {
        'type': 'SSH_DEVICEPIN',
      },
      function(reply) {
        if (reply.data && reply.data.length == 1 &&
            reply.data[0] == SSH2_AGENT_SUCCESS) {
          sshGetKey(SshAgent.NON_ROTATING, sshGotKeyCallback.bind(null, true));
        } else {
          setBusy(false);
          showWarning('ssh',
              '<a href="" id="fff">(Failed to set device pin)</a>', true);
        }
      });
}

function sshSetPIN(binaryPin) {
  showWarning('ssh', '');
  setBusy(true);

  chrome.runtime.sendMessage(
      chrome.runtime.id,  // to self
      {
        'type': 'SSH_KEYGEN',
        'pin': UTIL_BytesToHex(binaryPin)
      },
      function(reply) {
        UTIL_clear(binaryPin);

        var rc = reply.rc;
        if (rc != 0) {
          setBusy(false);
          showRc('ssh', rc);
        } else {
          sshGetKey(SshAgent.NON_ROTATING, sshGotKeyCallback.bind(null, true));
        }
      }
  );
}

function sshChangePin(binaryPin, newPin) {
  showWarning('ssh', '');
  setBusy(true);

  var challenge = UTIL_getRandom(16);

  chrome.runtime.sendMessage(
      chrome.runtime.id,
      {
        'type': 'SSH_PUBKEY',
        'challenge': UTIL_BytesToHex(challenge)
      },
      function(reply) {
        console.log(UTIL_fmt(JSON.stringify(reply)));

        var rc = reply.rc;
        if (rc != 0) {
          setBusy(false);
          showRc('ssh', rc);
          return;
        }

        var pk = UTIL_HexToArray(reply.publickey);
        var ecdh = UTIL_HexToArray(reply.ecdh);

        // Verify attestation.
        var deviceKey = UTIL_HexToArray(reply.devicekey);
        var ecdsa = new crypto_custom.gnubbyd.ecdsa(deviceKey);

        // Signature is in ASN1 format.
        var signature =
            UTIL_Asn1SignatureToJson(UTIL_HexToArray(reply.signature));

        // Attestation is over concatenation of {challenge, publickey, ecdh}
        var message = challenge.slice(0);
        message = message.concat(pk);
        message = message.concat(ecdh);

        var verified =
            pk && pk.length == 65 &&
            ecdh && ecdh.length == 65 &&
            signature && ecdsa.verify(message, signature);
        if (!verified) {
          showWarning('ssh', '<a href="" id="fff">(attestation failure!)</a>',
              true);
          debugger;
          setBusy(false);
          return;
        }

        // TODO: check validity / familiarity of reply.devicekey
        // and reply.fingerprint
        // TODO: this should all move to background page so we can
        // cache the tokens etc.

        var dh = new crypto_custom.gnubbyd.ecdh();
        var key = dh.computeSecret(ecdh);

        var r = UTIL_getRandom(16);

        var isPinChange = false;

        // PIN to be presented in bytes 0..6
        for (var i = 0; i < binaryPin.length; ++i) {
          r[i] = binaryPin[i];
        }

        if (newPin) {
          isPinChange = true;
          // New PIN to be presented in bytes 10..16
          for (var i = 0; i < newPin.length; ++i) {
            r[10 + i] = newPin[i];
          }
        }

        var aes_enc = new AES_ECB(key.slice(0, 16));
        UTIL_clear(key);

        var encrypted_pin = aes_enc.encryptBlock(r);
        aes_enc.clear();

        // Try clear heap of secrets.
        UTIL_clear(binaryPin);
        if (newPin) UTIL_clear(newPin);
        UTIL_clear(r);

        chrome.runtime.sendMessage(
            chrome.runtime.id,
            {
              'type': 'SSH_UNLOCK',
              'ecdh': dh.getPublicKey(),
              'pin': encrypted_pin,
              'which': (isPinChange ? 2 /*Gnubby.UNLOCK_CHANGE*/ : 0)
            },
            function(reply) {
              console.log(UTIL_fmt(JSON.stringify(reply)));

              var rc = reply.rc;
              if (rc != 0) {
                setBusy(false);

                // Pretty print couple of specific codes.
                if (rc > 0x63c0 && rc < 0x63cb) {
                  var nLeft = (rc - 0x63c0);
                  showWarning('ssh', '<a href="" id="fff">(wrong ' +
                        'Security Key password, ' +
                        nLeft + ' tries left)</a>',
                      true);
                } else if (rc == 0x63c0) {
                  // Setting a fresh is only option.
                  checkDevicePinSupport(function(rsp) {
                    if (rsp) {
                      enableSshSettings({ 'setPin' : true });
                    } else {
                      enableSshSettings({ 'setLiteralPin' : true });
                    }
                  });

                  showWarning('ssh', '<a href="" id="fff">(locked out)</a>',
                      true);
                } else {
                  showRc('ssh', rc);
                }
              } else {
                // Refesh UI.
                executeAction({ 'type': 'STATUS' }, null);
              }
            }
        );
      }
  );
}

/**
 * Returns the map of ssh agent commands to their version
 * @param {Array<number>} resp The response from ssh-agent
 * @return {Object} The mapping from ssh-agent extension to it's version
 */
function getSshAgentExtensions(resp) {
  var extensions = {rc: 0};
  var blob = new SshBlob(resp);
  var rsp = blob.readByte();
  if (rsp == SSH2_AGENTC_GET_EXTENSIONS_RESPONSE) {
    var size = blob.readSize();
    for (var i = 0; i < size; i++) {
      var cmd = blob.readByte();
      var version = blob.readByte();
      extensions[cmd] = version;
    }
  } else {
    extensions.rc = -1;
  }
  return extensions;
}

/**
 * Checks if ssh-agent supports device pins, calling cb with the result
 * @param {function(boolean)} cb The callback to call with the result
 */
function checkDevicePinSupport(cb) {
  chrome.runtime.sendMessage(
      chrome.runtime.id,  // to self
      {
        'type': 'SSH_GETEXTENSIONS',
      },
      function(reply) {
        if (!reply || !reply.data) {
          cb(false);
          return;
        }
        var extensions = getSshAgentExtensions(reply.data);
        if (extensions.rc !== 0) {
          console.log('ssh-agent does not yet support extensions');
          cb(false);
          return;
        }
        if (extensions[SSH2_AGENTC_SET_DEVICE_PIN] < 1) {
          console.log(UTIL_fmt(
              'unsupported device pin version: ' +
              extensions[SSH2_AGENTC_SET_DEVICE_PIN]));
          cb(false);
          return;
        }
        cb(true);
      });
}

window.onkeydown = function(e) {
  if (e.keyCode == 27 /* ESC */) {
    window.close();
  }
};

window.onload = function() {
  // Enable close.
  document.getElementById('close').onclick = function() { window.close(); };

  // Enable reload.
  document.getElementById('refresh').onclick = function() {
    chrome.runtime.sendMessage(chrome.runtime.id, {'type': 'OPTIONS'});
  };

  // Enable debug.
  document.getElementById('debug').onclick = function() {
    chrome.runtime.sendMessage(chrome.runtime.id, {'type': 'GET_LOG'},
        function(rsp) {
          if (rsp && rsp.logs) {
            var debuglog = document.getElementById('debuglog');
            if (debuglog) debuglog.style.visibility = 'visible';
            var logs = document.getElementById('logs');
            var value = '';
            for (var i = 0; i < rsp.logs.length; ++i) {
              value += rsp.logs[i] + '\r\n';
            }
            logs.innerText = value;
            logs.select();
            document.execCommand('copy');
            w.resizeTo(844 * zoomFactor, 1044 * zoomFactor);
          }
        });
  };

  // Decorate gnubby handlers.
  var u2finstall = document.getElementById('u2f-install');
  u2finstall.onclick = u2fAction.bind(null, false, false, false);

  var u2freinstall = document.getElementById('u2f-reinstall');
  u2freinstall.onclick = u2fAction.bind(null, true, false, true);

  var u2fdelete = document.getElementById('u2f-delete');
  u2fdelete.onclick = u2fAction.bind(null, true, true, true);

  // Decorate SSH handlers.
  var sshinstall = document.getElementById('ssh-install');
  sshinstall.onclick = sshAction.bind(null, false, false, false);

  var sshreinstall = document.getElementById('ssh-reinstall');
  sshreinstall.onclick = sshAction.bind(null, true, false, true);

  var sshdelete = document.getElementById('ssh-delete');
  sshdelete.onclick = sshAction.bind(null, true, true, true);

  var sshsettings = document.getElementById('ssh-settings');
  sshsettings.onclick = showSshSettingsDialog.bind(null, true);

  var setliteralpin = document.getElementById('setliteralpin');
  setliteralpin.onclick = enableSshSettings.bind(null, {setLiteralPin: true});

  var setdevicepin = document.getElementById('setdevicepin');
  setdevicepin.onclick = sshSetDevicePin.bind(null);

  // Helper to get PIN value.
  function getBinaryPin(fieldName) {
    var elem = document.getElementById(fieldName);
    var binaryPin = UTIL_StringToBytes(elem.value);
    elem.value = '';

    if (binaryPin.length < 6) {
      showWarning('ssh',
          '<a href="" id="fff">(Security Key password needs ' +
            'to be at least 6 characters)</a>', true);
      return null;
    }

    if (binaryPin.length != 6) {
      // If the provided value is not 6 bytes,
      // hash it and use first 6 bytes of the digest.
      var sha = new SHA256();
      sha.update(binaryPin);
      var digest = sha.digest();
      UTIL_clear(binaryPin);
      binaryPin = digest.slice(0, 6);
      UTIL_clear(digest);
    }

    return binaryPin;
  }

  // Helper to get new PINs.
  function getNewPin(baseName) {
    var newPin = getBinaryPin(baseName);
    var newPin2 = getBinaryPin(baseName + '2');

    // Check consistency.
    if (newPin && !UTIL_equalArrays(newPin, newPin2)) {
      UTIL_clear(newPin);
      UTIL_clear(newPin2);
      showWarning('ssh',
          '<a href="" id="fff">(new Security Key passwords mismatch, ' +
            'try again)</a>', true);
      return null;
    }

    UTIL_clear(newPin2);

    return newPin;
  }

  // SSH PIN setter.
  var pinset = document.getElementById('pinset');
  pinset.onclick = function() {
    var newPin = getNewPin('setpin');
    if (!newPin) return;
    sshSetPIN.call(this, newPin);
  };

  var setpin = document.getElementById('setpin');
  setpin.onchange = function() {
    document.getElementById('setpin2').focus();
  };

  var setpin2 = document.getElementById('setpin2');
  setpin2.onchange = function() {
    document.getElementById('pinset').focus();
  };

  // SSH PIN changer.
  var pinchange = document.getElementById('pinchange');
  pinchange.onclick = function() {
    var newPin = getNewPin('changepin');
    if (!newPin) return;
    var oldPin = getBinaryPin('oldpin');
    if (!oldPin) return;
    sshChangePin.call(this, oldPin, newPin);
  };

  var oldpin = document.getElementById('oldpin');
  oldpin.onchange = function() {
    document.getElementById('changepin').focus();
  };

  var changepin = document.getElementById('changepin');
  changepin.onchange = function() {
    document.getElementById('changepin2').focus();
  };

  var changepin2 = document.getElementById('changepin2');
  changepin2.onchange = function() {
    document.getElementById('pinchange').focus();
  };

  // Start with ssh settings dialog closed.
  showSshSettingsDialog(false);

  // Refresh UI.
  executeAction({ 'type': 'STATUS' }, null);

  // Compute our window sizing factor, as related to zoom setting.
  var w = chrome.app.window.current();
  zoomFactor = w.innerBounds.width / window.innerWidth;
  w.resizeTo(844 * zoomFactor, 306 * zoomFactor);
};
