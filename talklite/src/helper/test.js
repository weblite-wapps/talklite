const DetectRTC = require('detectrtc')
export const runTests = () => {
  console.log('test is running')

  // const gatherButton = document.querySelector('button#runTurnTest')
  // const accessibilityTestButton = document.querySelector(
  //   'button#runAccessibilityTest',
  // )
  // const connectButton = document.querySelector('button#connect')

  // const candidateTBody = document.querySelector('tbody#candidatesBody')
  const servers = {
    urls: ['turn:193.176.241.198:3478'],
    username: 'test',
    credential: 'test',
  }
  const iceCandidatePoolInput = 0

  let begin
  let pc
  let candidates
  let result

  async function start() {
    // Read the values from the input boxes.
    const iceServers = [
      {
        urls: ['turn:193.176.241.198:3478'], // coTURN 7788+8877
        username: 'test',
        credential: 'test',
        // 'username': 'bahrami.ehssan@gmail.com',
        // 'credential': '0210511373'
      },
    ]
    // for (let i = 0; i < servers.length; ++i) {
    //   iceServers.push(JSON.parse(servers[i].value));
    // }
    const transports = document.getElementsByName('transports')
    let iceTransports = 'all'
    //   for (let i = 0; i < transports.length; ++i) {
    //     if (transports[i].checked) {
    //       iceTransports = transports[i].value;
    //       break;
    //     }
    //   }

    // Create a PeerConnection with no streams, but force a m=audio line.
    const config = {
      iceServers: iceServers,
      iceTransportPolicy: iceTransports,
      iceCandidatePoolSize: 0,
    }
    console.log(config)
    const offerOptions = {
      offerToReceiveAudio: 1,
    }
    // Whether we gather IPv6 candidates.
    // Whether we only gather a single set of candidates for RTP and RTCP.

    console.log(
      `Creating new PeerConnection with config=${JSON.stringify(config)}`,
    )
    //   document.getElementById('error').innerText = '';
    pc = new RTCPeerConnection(config)
    pc.onicecandidate = iceCallback
    pc.onicegatheringstatechange = gatheringStateChange
    pc.onicecandidateerror = iceCandidateError
    pc.createOffer(offerOptions).then(gotDescription, noDescription)
  }

  function gotDescription(desc) {
    begin = window.performance.now()
    candidates = []
    pc.setLocalDescription(desc)
  }

  function noDescription(error) {
    console.log('Error creating offer: ', error)
  }

  // Parse the uint32 PRIORITY field into its constituent parts from RFC 5245,
  // type preference, local preference, and (256 - component ID).
  // ex: 126 | 32252 | 255 (126 is host preference, 255 is component ID 1)
  function formatPriority(priority) {
    return [priority >> 24, (priority >> 8) & 0xffff, priority & 0xff].join(
      ' | ',
    )
  }

  function appendCell(row, val, span) {
    const cell = document.createElement('td')
    cell.textContent = val
    if (span) {
      cell.setAttribute('colspan', span)
    }
    row.appendChild(cell)
  }

  // Try to determine authentication failures and unreachable TURN
  // servers by using heuristics on the candidate types gathered.
  function getFinalResult() {
    let result = 'Done'

    // if more than one server is used, it can not be determined
    // which server failed.

    // get the candidates types (host, srflx, relay)
    const types = candidates.map(function(cand) {
      return cand.type
    })

    // If the server is a TURN server we should have a relay candidate.
    // If we did not get a relay candidate but a srflx candidate
    // authentication might have failed.
    // If we did not get  a relay candidate or a srflx candidate
    // we could not reach the TURN server. Either it is not running at
    // the target address or the clients access to the port is blocked.
    //
    // This only works for TURN/UDP since we do not get
    // srflx candidates from TURN/TCP.
    if (
      servers.urls[0].indexOf('turn:') === 0 &&
      servers.urls[0].indexOf('?transport=tcp') === -1
    ) {
      if (types.indexOf('relay') === -1) {
        if (types.indexOf('srflx') > -1) {
          // a binding response but no relay candidate suggests auth failure.
          result = 'Authentication failed?'
        } else {
          // either the TURN servers is down or the clients access is blocked.
          result = 'Not reachable?'
        }
      }
    }

    return result
  }

  function iceCallback(event) {
    const elapsed = ((window.performance.now() - begin) / 1000).toFixed(3)
    const row = document.createElement('tr')
    appendCell(row, elapsed)
    if (event.candidate) {
      if (event.candidate.candidate === '') {
        return
      }
      const { candidate } = event
      appendCell(row, candidate.component)
      appendCell(row, candidate.type)
      appendCell(row, candidate.foundation)
      appendCell(row, candidate.protocol)
      appendCell(row, candidate.address)
      appendCell(row, candidate.port)
      appendCell(row, formatPriority(candidate.priority))
      candidates.push(candidate)
    } else if (!('onicegatheringstatechange' in RTCPeerConnection.prototype)) {
      // should not be done if its done in the icegatheringstatechange callback.
      appendCell(row, (result = getFinalResult()), 7)
      pc.close()
      pc = null
    }
    candidateTBody.appendChild(row)
  }

  function gatheringStateChange() {
    if (pc.iceGatheringState !== 'complete') {
      return
    }
    const elapsed = ((window.performance.now() - begin) / 1000).toFixed(3)
    const row = document.createElement('tr')
    appendCell(row, elapsed)
    appendCell(row, (result = getFinalResult()), 7)
    console.log(result)
    pc.close()
    pc = null
    candidateTBody.appendChild(row)
  }

  function iceCandidateError(e) {
    // The interesting attributes of the error are
    // * the url (which allows looking up the server)
    // * the errorCode and errorText
    document.getElementById('error').innerText +=
      'The server ' +
      e.url +
      ' returned an error with code=' +
      e.errorCode +
      ':\n' +
      e.errorText +
      '\n'
  }
  var hasMicrophone = false
  var hasSpeakers = false

  function hasMicAndSpeakers() {
    DetectRTC.load(function() {
      hasMicrophone = DetectRTC.hasMicrophone
      hasSpeakers = DetectRTC.hasSpeakers
      if (DetectRTC.hasSpeakers) {
        document.querySelector('#hasSpeakers').innerHTML = 'has Speakers'
        document.querySelector('#hasSpeakers').classList.add('text-success')
      } else {
        document.querySelector('#hasSpeakers').innerHTML = 'No Speakers'
        document.querySelector('#hasSpeakers').classList.add('text-danger')
      }
      if (DetectRTC.hasMicrophone) {
        document.querySelector('#hasMic').innerHTML = 'has Microphone'
        document.querySelector('#hasMic').classList.add('text-success')
      } else {
        document.querySelector('#hasMic').innerHTML = 'No Microphone'
        document.querySelector('#hasMic').classList.add('text-danger')
      }
      // DetectRTC.hasWebcam; // (has webcam device!)
      // DetectRTC.hasMicrophone; // (has microphone device!)
      // DetectRTC.hasSpeakers; // (has speakers!)
      // DetectRTC.isScreenCapturingSupported; // Chrome, Firefox, Opera, Edge and Android
      // DetectRTC.isSctpDataChannelsSupported;
      // DetectRTC.isRtpDataChannelsSupported;
      // DetectRTC.isAudioContextSupported;
      // DetectRTC.isWebRTCSupported;
      // DetectRTC.isDesktopCapturingSupported;
      // DetectRTC.isMobileDevice;

      // DetectRTC.isWebSocketsSupported;
      // DetectRTC.isWebSocketsBlocked;
      // DetectRTC.checkWebSocketsSupport(callback);

      // DetectRTC.isWebsiteHasWebcamPermissions;        // getUserMedia allowed for HTTPs domain in Chrome?
      // DetectRTC.isWebsiteHasMicrophonePermissions;    // getUserMedia allowed for HTTPs domain in Chrome?

      // DetectRTC.audioInputDevices;    // microphones
      // DetectRTC.audioOutputDevices;   // speakers
      // DetectRTC.videoInputDevices;    // cameras

      // DetectRTC.osName;
      // DetectRTC.osVersion;

      // DetectRTC.browser.name === 'Edge' || 'Chrome' || 'Firefox';
      // DetectRTC.browser.version;
      // DetectRTC.browser.isChrome;
      // DetectRTC.browser.isFirefox;
      // DetectRTC.browser.isOpera;
      // DetectRTC.browser.isIE;
      // DetectRTC.browser.isSafari;
      // DetectRTC.browser.isEdge;

      // DetectRTC.browser.isPrivateBrowsing; // incognito or private modes

      // DetectRTC.isCanvasSupportsStreamCapturing;
      // DetectRTC.isVideoSupportsStreamCapturing;

      // DetectRTC.DetectLocalIPAddress(callback);
    })
  }
  hasMicAndSpeakers()

  if (navigator.mediaDevices && navigator.mediaDevices.enumerateDevices) {
    // Firefox 38+ seems having support of enumerateDevicesx
    navigator.enumerateDevices = function(callback) {
      navigator.mediaDevices.enumerateDevices().then(callback)
    }
  }

  var canAccessMic = false
  var isMicrophoneAlreadyCaptured = false
  var isWebcamAlreadyCaptured = false
  var MediaDevices = []
  var isHTTPs = location.protocol === 'https:'
  var canEnumerate = false
  if (
    typeof MediaStreamTrack !== 'undefined' &&
    'getSources' in MediaStreamTrack
  ) {
    canEnumerate = true
  } else if (
    navigator.mediaDevices &&
    !!navigator.mediaDevices.enumerateDevices
  ) {
    canEnumerate = true
  }

  function checkDeviceSupport(callback) {
    if (!canEnumerate) {
      canAccessMic = false
      document.querySelector('#canAccess').innerHTML =
        'cannot Access to Microphone'
      document.querySelector('#canAccess').classList.add('text-danger')
      return
    }

    if (
      !navigator.enumerateDevices &&
      window.MediaStreamTrack &&
      window.MediaStreamTrack.getSources
    ) {
      navigator.enumerateDevices = window.MediaStreamTrack.getSources.bind(
        window.MediaStreamTrack,
      )
    }

    if (!navigator.enumerateDevices && navigator.enumerateDevices) {
      navigator.enumerateDevices = navigator.enumerateDevices.bind(navigator)
    }

    if (!navigator.enumerateDevices) {
      if (callback) {
        callback()
      }
      return
    }

    MediaDevices = []
    navigator.enumerateDevices(function(devices) {
      devices.forEach(function(_device) {
        var device = {}
        for (var d in _device) {
          device[d] = _device[d]
        }

        if (device.kind === 'audio') {
          device.kind = 'audioinput'
        }

        if (device.kind === 'video') {
          device.kind = 'videoinput'
        }

        var skip
        MediaDevices.forEach(function(d) {
          if (d.id === device.id && d.kind === device.kind) {
            skip = true
          }
        })

        if (skip) {
          return
        }

        if (!device.deviceId) {
          device.deviceId = device.id
        }

        if (!device.id) {
          device.id = device.deviceId
        }

        if (!device.label) {
          device.label = 'Please invoke getUserMedia once.'
          if (!isHTTPs) {
            device.label =
              'HTTPs is required to get label of this ' +
              device.kind +
              ' device.'
          }
        } else {
          if (device.kind === 'videoinput' && !isWebcamAlreadyCaptured) {
            isWebcamAlreadyCaptured = true
          }

          if (device.kind === 'audioinput' && !isMicrophoneAlreadyCaptured) {
            isMicrophoneAlreadyCaptured = true
          }
        }

        if (device.kind === 'audioinput') {
          hasMicrophone = true
        }

        if (device.kind === 'audiooutput') {
          hasSpeakers = true
        }

        if (device.kind === 'videoinput') {
          hasWebcam = true
        }

        // there is no 'videoouput' in the spec.

        MediaDevices.push(device)
      })

      if (callback) {
        callback()
      }
    })
  }

  // check for microphone/camera support!
  accessibilityTestButton.onclick = function() {
    checkDeviceSupport(function() {
      // if (hasWebcam === true && hasMicrophone == true) {
      if (hasMicrophone == true) {
        let constraints = {
          audio: true,
          // video: true
        }
        navigator.mediaDevices
          .getUserMedia(constraints)
          .then(function(stream) {
            var MediaStream = window.MediaStream
            if (
              typeof MediaStream === 'undefined' &&
              typeof webkitMediaStream !== 'undefined'
            ) {
              MediaStream = webkitMediaStream
            }
            /*global MediaStream:true */
            if (
              typeof MediaStream !== 'undefined' &&
              !('stop' in MediaStream.prototype)
            ) {
              MediaStream.prototype.stop = function() {
                this.getTracks().forEach(function(track) {
                  track.stop()
                })
              }
            }
            // successful accessing to microphone
            canAccessMic = true
            document.querySelector('#canAccess').innerHTML =
              'Access to Microphone is successful'
            document.querySelector('#canAccess').classList.add('text-success')
          })
          .catch(function(err) {
            if (err.name == 'NotAllowedError') {
              canAccessMic = false
              document.querySelector('#canAccess').innerHTML =
                'User Denied to Grant Access to Microphone'
              document.querySelector('#canAccess').classList.add('text-danger')
            }
          })
      } else {
        // system has no microphone
        canAccessMic = false
        document.querySelector('#canAccess').innerHTML =
          'There is no Mic to access.'
        document.querySelector('#canAccess').classList.add('text-danger')
      }
    })
  }
  connectButton.onclick = startingCall
  console.log('3333')

  function startingCall() {
    console.log(result, hasMicrophone, hasSpeakers, canAccessMic)
    if (
      result !== 'Done' ||
      hasMicrophone !== true ||
      hasSpeakers !== true ||
      canAccessMic !== true
    ) {
      alert('something is wrong due to tests. Please check the results.')
    }
  }
}
