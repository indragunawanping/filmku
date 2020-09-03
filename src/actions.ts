import { ErrorModalProps } from "./state";

export const UPDATE_ERROR_MODAL = "UPDATE_ERROR_MODAL";

export const updateErrorModalStatus = (errorModal: ErrorModalProps) => {
  return { type: UPDATE_ERROR_MODAL, payload: errorModal };
};
