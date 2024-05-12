export const formatDateTime = (dateTimeString: string): string => {
    const date = new Date(dateTimeString);
    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();

    const formattedDateTime = `${day < 10 ? '0' + day : day}.${month < 10 ? '0' + month : month}.${year}`;

    return formattedDateTime;
};