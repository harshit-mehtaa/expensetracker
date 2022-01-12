export const DRAWER_WIDTH = 240;
export const SNACKBAR_AUTO_HIDE_DURATION = 3000;

export const EXPENSE_COLUMNS_TO_VIEW = [
    "date",
    "user",
    "category",
    "mode",
    "amount",
    "details",
];

export const formatDate = (date) => {
    const d = new Date(date);
    const formatedDate = `${d.getFullYear()}-${
        d.getMonth() + 1
    }-${d.getDate()}`;
    return formatedDate;
};