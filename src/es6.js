/*
 * This is simple class providing Wifi Hotspot interaction.
 *
 * Dependencies:
 *
 * - axios (github:mzabriskie/axios) AJAX library
 *
 * - eventemitter2 (github:asyncly/EventEmitter2)
 */

;!function(global) {
  'use strict';

  // Event name space
  const namespace = 'myhotspot';

  // URL to check for Ineternet connectivity
  // Here, we use Google's generate_204 page.
  const checkUrl = 'http://connectivitycheck.gstatic.com/generate_204';

  // Expected HTTP response from visiting checkUrl
  const checkUrlResponse = 204;

  // Log tag
  const logTag = 'MyHotspot';


  class MyHotspot extends EventEmitter2 {

    constructor(options) {
      super(options);
      this.ssid = options.ssid;
      this.authUrl = options.authUrl;
      this.checkUrl = (options.checkUrl || checkUrl);
      this.checkUrlResponse = (options.checkUrlResponse || checkUrlResponse);
      this.debug = (options.debug ? true : false);

      this._initialize();
    }

    _initialize() {
      // debug ajax requests and responses
      if (this.debug) {
        this._debugRequests();
        this._debugResponses();
      }

      this._DEBUG('MyHotspot is initialized.');
    }

    _DEBUG(...args) {
      if (this.debug)
        console.log([`${logTag}:`, ...args].join(' '));
    }

    _debugRequests() {
      axios.interceptors.request.use(
        (config) => {
          this._logRequest(config);
          return config;
        },
        (error) => {
          console.log(`${logTag}: AJAX request error: ${error}`);
          return Promise.reject(error);
        }
      );
    }

    _debugResponses() {
      axios.interceptors.response.use(
        (response) => {
          this._logResponse(response);
          return response;
        },
        (error) => {
          console.log(`${logTag}: AJAX response error: ${error}`);
          return Promise.reject(error);
        }
      );
    }

    _logRequest(req) {
      console.log(`${logTag}: AJAX request:\n{\n` +
        `\turl: '${req.url}'\n` +
        `\tmethod: '${req.method}'\n` +
        `\tbaseURL: '${req.baseURL}'\n` +
        `\tresponseType: '${req.responseType}'\n}` +
        `\theaders: ${JSON.stringify(req.headers, null, 2)}\n` +
        `\tparams : ${JSON.stringify(req.params, null, 2)}\n` +
        `\tdata: ${JSON.stringify(req.data, null, 2)}\n` +
        '}');
    }

    _logResponse(res) {
      console.log(`${logTag}: AJAX response:\n{\n` +
        `\tstatus: ${res.status}\n` +
        `\tstatusText: '${res.statusText}'\n` +
        `\theaders: ${JSON.stringify(res.headers, null, 2)}\n` +
        `\tdata: ${JSON.stringify(res.data)}\n` +
        '}');
    }

    /**
     * Connected to wifi network. Returns promise object.
     *
     * Events emitted:
     *   'wifiConnected' - Connected to the wifi network successfully
     */
    connect() {
      return new Promise((resolve, reject) => {
        WifiConnector.connectSSID(
          this.ssid,
          // success
          () => {
            this.emit('wifiConnected');
            resolve();
          },
          // fail
          (msg) => { reject(msg) }
        );
      });
    }

    isConnected() {
      return WifiConnector.isConnectedToSSID(this.ssid);
    }

    /**
     * Authrize access with hotspot using provided credential `auth`.
     * If omitted, use previously provided one if any.
     * Return promise object.
     *
     * Events emitted:
     *   'authSuccess'  - Hotspot authorization successful
     *   'authFailed'   - Hotspot authorization failed (no Internet)
     *   'authError'    - An error occured during authorization request
     */
    authorize(authData) {
      if (!authData || authData == {})
        authData = this.authData;

      this._DEBUG(`start authorize() with data: ${JSON.stringify(authData)}`);
      return new Promise((resolve, reject) => {
        // convert object to x-url-form-encoded
        let params = new URLSearchParams();
        for (var i in authData) {
          params.append(i, authData[i]);
        }
        axios.post(this.authUrl, params.toString())
        .then(() => {
          // No clue if the auth page would return something meaningful,
          // just try to visit known place and check for specific response.
          this._DEBUG(`check connection with ${this.checkUrl}`);
          axios.get(this.checkUrl)
          .then(res  => {
            this._DEBUG(`response code = ${res.status} (expect ${this.checkUrlResponse}`);
            if (res.status == this.checkUrlResponse) {
              this.emit('authSuccess');
              // Save the correct authData fo later
              this.authData = authData;
              resolve();
            } else {
              this.emit('authFailed');
              reject();
            }
          });
        })
        .catch(err => {
          this._DEBUG(`error=${err}`);
          this.emit('authError', err);
          reject();
        });
      });

    }

    // Override EvenEmitter2 methos prepending namespace to event name

    emit(event, ...args) {
      super.emit(`${namespace}.${event}`, ...args);
    }

    emitAsync(event, ...args) {
      super.emit(`${namespace}.${event}`, ...args);
    }
  }

  global.MyHotspot = MyHotspot;

}(window);
// vim: ts=2 sw=2 et: