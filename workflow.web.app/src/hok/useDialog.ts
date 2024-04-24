import {useCallback, useState} from "react";

export const useDialog = (initial = false) => {
    const [open, setOpen] = useState(() => initial)
    const show = useCallback(() => setOpen(true), [])
    const close = useCallback(() => setOpen(false), [])
    return {open, show, close}
}