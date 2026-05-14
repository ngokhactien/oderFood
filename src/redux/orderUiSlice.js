import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  tabs: [
    {
      id: "Giao đi",
      name: "Giao đi",
      fixed: true,
    },
  ],

  activeTab: "Giao đi",

  activeTable: {
    id: "Giao đi",
    name: "Giao đi",
    tabName: "Giao đi",
    fixed: true,
  },
  draftItems: {},
};

const orderUiSlice = createSlice({
  name: "orderUI",

  initialState,

  reducers: {
    // =========================
    // OPEN TAB
    // =========================
    openTab: (state, action) => {
      const table = action.payload;

      const existed = state.tabs.find((t) => t.id === table.id);

      if (!existed) {
        state.tabs.push({
          ...table,
          name: table.tabName || table.name,
          fixed: table.fixed || false,
        });
      }

      state.activeTab = table.id;

      state.activeTable = table;
    },

    // =========================
    // CLOSE TAB
    // =========================
    closeTab: (state, action) => {
      const id = action.payload;

      const tab = state.tabs.find((t) => t.id === id);

      if (tab?.fixed) return;

      state.tabs = state.tabs.filter((t) => t.id !== id);

      if (state.activeTab === id) {
        state.activeTab = "Giao đi";

        const giaoDi = state.tabs.find((t) => t.id === "Giao đi");

        state.activeTable = giaoDi || null;
      }
    },

    // =========================
    // SET ACTIVE TAB
    // =========================
    setActiveTab: (state, action) => {
      const id = action.payload;

      state.activeTab = id;

      const found = state.tabs.find((t) => t.id === id);

      if (found) {
        state.activeTable = found;
      }
    },

    // =========================
    // ADD DRAFT ITEM
    // =========================
    addDraftItem: (state, action) => {
      const { tableId, product, tableInfo } = action.payload;

      // create draft
      if (!state.draftItems[tableId]) {
        state.draftItems[tableId] = {
          items: [],
          createdAt: Date.now(),
          updatedAt: Date.now(),

          tableInfo: tableInfo || {
            id: tableId,
            name: tableId,
          },
        };
      }

      const draft = state.draftItems[tableId];

      // update table info
      if (tableInfo) {
        draft.tableInfo = tableInfo;
      }

      const existed = draft.items.find((i) => i._id === product._id);

      if (existed) {
        existed.qty += 1;
      } else {
        draft.items.push({
          ...product,
          qty: 1,
        });
      }

      draft.updatedAt = Date.now();
    },
    // =========================
    // UPDATE DRAFT QTY
    // =========================
    updateDraftQty: (state, action) => {
      const { tableId, productId, delta } = action.payload;

      const draft = state.draftItems[tableId];

      if (!draft) return;

      const item = draft.items.find((i) => i._id === productId);

      if (!item) return;

      item.qty = Math.max(1, item.qty + delta);

      draft.updatedAt = Date.now();
    },

    // =========================
    // REMOVE DRAFT ITEM
    // =========================
    removeDraftItem: (state, action) => {
      const { tableId, productId } = action.payload;

      const draft = state.draftItems[tableId];

      if (!draft) return;

      draft.items = draft.items.filter((i) => i._id !== productId);

      draft.updatedAt = Date.now();
    },

    // =========================
    // CLEAR DRAFT
    // =========================
    clearDraft: (state, action) => {
      delete state.draftItems[action.payload];
    },

    // =========================
    // AUTO REMOVE EMPTY DRAFT
    // =========================
    removeExpiredDrafts: (state) => {
      const now = Date.now();

      Object.keys(state.draftItems).forEach((tableId) => {
        const draft = state.draftItems[tableId];

        if (!draft) return;

        // còn món thì không xoá
        if (draft.items.length > 0) return;

        const diff = now - draft.updatedAt;

        // 2 phút
        if (diff >= 2 * 60 * 1000) {
          delete state.draftItems[tableId];
        }
      });
    },

    transferDraftTable: (state, action) => {
      const { fromTableId, toTableId } = action.payload;

      const draft = state.draftItems[fromTableId];

      if (!draft) {
        return;
      }

      state.draftItems[toTableId] = draft;

      delete state.draftItems[fromTableId];
    },
  },
});

export const {
  openTab,
  closeTab,
  setActiveTab,
  addDraftItem,
  updateDraftQty,
  removeDraftItem,
  clearDraft,
  removeExpiredDrafts,
  transferDraftTable,
} = orderUiSlice.actions;

export default orderUiSlice.reducer;
