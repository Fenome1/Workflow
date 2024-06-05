export const getFileNameFromHeaders = (headers: Headers | null): string => {
    const contentDisposition = headers?.get('content-disposition');

    if (!contentDisposition) return 'Задачи.xlsx';

    const utf8FilenameMatch = contentDisposition.match(/filename\*=UTF-8''(.+)$/);
    if (utf8FilenameMatch?.[1]) {
        return decodeURIComponent(utf8FilenameMatch[1]);
    }

    const regularFilenameMatch = contentDisposition.match(/filename="(.+)"$/);
    if (regularFilenameMatch?.[1]) {
        return regularFilenameMatch[1];
    }

    return 'Задачи.xlsx';
}