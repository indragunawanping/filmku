import { combineReducers } from "redux";
import { CommunicationState, ControlState, SessionState, State } from "./state";
import * as actionsHttp from "./actionsHttp";
import { initialCommunicationState, initialControlState, initialSessionState } from "./initialStates";
import * as actionsMovie from "./actionsMovie";
import * as actions from "./actions";

export const controlReducer = (state: ControlState = initialControlState, action: any) => {
  switch (action.type) {
    case actions.UPDATE_ERROR_MODAL:
      return Object.assign({}, state, {
        errorModal: action.payload
      });
    case actionsMovie.UPDATE_CURRENT_TOTAL_RESULTS:
      return Object.assign({}, state, {
        currentTotalResults: action.payload
      });
    case actionsMovie.UPDATE_CURRENT_MOVIE_LIST:
      return Object.assign({}, state, {
        currentMovieList: action.payload
      });
    case actionsMovie.UPDATE_CURRENT_MOVIE_DETAIL:
      return Object.assign({}, state, {
        currentMovieDetail: action.payload
      });
    default:
      return state;
  }
};

export const sessionReducer = (state: SessionState = initialSessionState, action: any) => {
  switch (action.type) {
    case actionsMovie.UPDATE_FETCHING_MOVIE_LIST_STATUS:
      return Object.assign({}, state, {
        isFetchingMovieList: action.payload
      });
    default:
      return state;
  }
};

export const communicationReducer = (state: CommunicationState = initialCommunicationState, action: any) => {
  switch (action.type) {
    case actionsHttp.ADD_NEW_HTTP_CALL: {
      return Object.assign({}, state, {
        httpCalls: [
          ...state.httpCalls,
          action.payload
        ]
      });
    }
    case actionsHttp.UPDATE_HTTP_CALL_STATUS: {
      const httpCallIndex = state.httpCalls.findIndex((x) => x.id === action.payload.callId);
      const newHttpCall = Object.assign({}, state.httpCalls[httpCallIndex], {
        status: action.payload.status
      });
      if (httpCallIndex >= 0) {
        return Object.assign({}, state, {
          httpCalls: [
            ...state.httpCalls.slice(0, httpCallIndex),
            newHttpCall,
            ...state.httpCalls.slice(httpCallIndex + 1)
          ]
        });
      } else {
        return state;
      }
    }
    default: {
      return state;
    }
  }
};

export const reducers = combineReducers<State>({
  control: controlReducer,
  session: sessionReducer,
  communication: communicationReducer
});
