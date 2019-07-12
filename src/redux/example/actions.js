export const SAVE_TEXT = 'save_text';

export const saveText = (text) => {
    return {
        type: SAVE_TEXT,
        payload: text
    }
}