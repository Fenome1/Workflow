import {FetchBaseQueryError} from '@reduxjs/toolkit/query/react';

export const getErrorMessageFormBaseQuery = (fetchError: FetchBaseQueryError): string => {
    if (fetchError && 'error' in fetchError) {
        const errorWithData = fetchError.error as { data?: string };
        return errorWithData.data || "Произошла ошибка";
    }
    return "Произошла ошибка";
}