import {
  callEnded,
  connecting,
  Ringing,
  callCanceled,
  callRejected,
  readyToCall,
  accept,
  reject,
  inCall,
} from './stateTypes'

export const getNewCallStatus = (creator, callStatus, clickedType) => {
  if (creator) {
    const callerState = callStatus.callerState
    if (callerState === readyToCall) {
      if (clickedType === accept) {
        return {
          ...callStatus,
          callerState: Ringing,
          calleeState: Ringing,
        }
      }
    } else if (callerState === connecting) {
      if (clickedType === reject) {
        return {
          ...callStatus,
          callerState: callCanceled,
          calleeState: callCanceled,
        }
      }
    } else if (callerState === Ringing) {
      if (clickedType === reject) {
        return {
          ...callStatus,
          callerState: callCanceled,
          calleeState: callCanceled,
        }
      }
    } else if (callerState === inCall) {
      if (clickedType === reject) {
        return {
          ...callStatus,
          callerState: callCanceled,
          calleeState: callCanceled,
        }
      }
    } else if (callerState === callCanceled) {
      if (clickedType === accept) {
        return
      }
    } else if (callerState === callRejected) {
      if (clickedType === accept) {
        return
      }
    } else if (callerState === callEnded) {
      if (clickedType === accept) {
        return
      }
    }
  } else {
    const calleeState = callStatus.calleeState
    if (calleeState === Ringing) {
      if (clickedType === accept) {
        return {
          ...callStatus,
          callerState: inCall,
          calleeState: inCall,
        }
      } else {
        return {
          ...callStatus,
          callerState: callRejected,
          calleeState: callRejected,
        }
      }
    } else if (calleeState === inCall) {
      if (clickedType === reject) {
        return {
          ...callStatus,
          callerState: callCanceled,
          calleeState: callCanceled,
        }
      }
    } else if (calleeState === callCanceled) {
      if (clickedType === accept) {
        return
      }
    } else if (calleeState === callRejected) {
      if (clickedType === accept) {
        return
      }
    } else if (calleeState === callEnded) {
      if (clickedType === accept) {
        return
      }
    }
  }
}

export const noNeedToNewWis = (callStatus, clickType) => {
  if (callStatus.calleeState === Ringing) {
    if (clickType === accept) {
      return false
    }
  }
  if (
    (callStatus.callerState === callCanceled ||
      callStatus.calleeState === callCanceled) &&
    clickType === accept
  ) {
    return false
  }
  return true
}

export const needToRecall = (callStatus, clickType, creator) => {
  if (
    ((callStatus.callerState === callCanceled && creator) ||
      (callStatus.calleeState === callCanceled && !creator)) &&
    clickType === accept
  )
    return true

  if (
    ((callStatus.callerState === callRejected && creator) ||
      (callStatus.calleeState === callRejected && !creator)) &&
    clickType === accept
  )
    return true
  return false
}
export const needToCallPage = (callStatus, clickType, creator) => {
  if (callStatus.callerState === inCall && creator) {
    return true
  }
  if (callStatus.callerState === Ringing && !creator) {
    if (clickType === accept) {
      return true
    }
  }
  return false
}
