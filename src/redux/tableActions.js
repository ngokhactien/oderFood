// redux/tableActions.js

import {
  transferDraftTable,
} from "./orderUiSlice";

import {
  transferOrderTable,
} from "./orderSlice";

export const handleTransferTable =
  ({
    fromTableId,
    toTableId,
  }) =>
  (dispatch, getState) => {
    const state = getState();

    const draft =
      state.orderUI.draftItems[fromTableId];

    const confirmed =
      state.order.orders.find(
        (o) =>
          o.tableId === fromTableId,
      );

    // draft
    if (draft) {
      dispatch(
        transferDraftTable({
          fromTableId,
          toTableId,
        }),
      );
    }

    // confirmed
    if (confirmed) {
      dispatch(
        transferOrderTable({
          fromTableId,
          toTableId,
        }),
      );
    }
  };