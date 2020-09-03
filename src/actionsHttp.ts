import { HttpCall, HttpCallStatus } from "./state";

export const ADD_NEW_HTTP_CALL = "ADD_NEW_HTTP_CALL";
export const UPDATE_HTTP_CALL_STATUS = "UPDATE_HTTP_CALL_STATUS";

export const updateHttpCallStatus = (callId: number | string, newStatus: HttpCallStatus) => {
  return {
    type: UPDATE_HTTP_CALL_STATUS, payload: {
      callId: callId,
      status: newStatus
    }
  };
};

export const addNewHttpCall = (httpCall: HttpCall) => {
  return {
    type: ADD_NEW_HTTP_CALL, payload: httpCall
  };
};

export const sendHttpRequest = (httpCall: HttpCall,
                                nextAction: (response: Response) => void,
                                errorAction?: (response: Response) => void) => {
  doHttpCall(httpCall)
    .then((response: Response) => {
      if (!response.ok && errorAction) {
        throw(response);
      }
      return response;
    })
    .then(onSuccessful(nextAction))
    .catch(onFailed(errorAction));
};

const doHttpCall = (httpCall: HttpCall): Promise<Response> => {
  let configuration = {
    method: httpCall.method,
    credentials: httpCall.credentials ? httpCall.credentials : undefined
  };
  if (httpCall.headers) {
    configuration = Object.assign({}, configuration, {
      headers: httpCall.headers
    });
  }
  return fetch(httpCall.url, configuration);
};

const onSuccessful = (processResponse: (response: Response) => void) => {
  return (response: Response) => {
    processResponse(response);
  };
};

const onFailed = (failedAction?: (errorResponse: Response) => void) => {
  return (response: Response) => {
    if (failedAction) {
      failedAction(response);
    } else {
      throw(response);
    }
  };
};
