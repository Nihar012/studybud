import * as actionTypes from './actions';

export const uiSelectingItem = (itemType) => {
    return {
        type: actionTypes.UI_SELECTING_ITEM,
        itemType: itemType
    }
}

export const uiTogglePattern = (pattern) => {
    return {
        type: actionTypes.UI_TOGGLE_PATTERN,
        pattern: pattern
    }
}

export const uiCloseSelectItems = () => {
    return {
        type: actionTypes.UI_CLOSE_SELECT_ITEMS
    }
}