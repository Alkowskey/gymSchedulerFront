import { Id, toast, ToastOptions, TypeOptions } from "react-toastify";

const toastOptions: ToastOptions<{}> = {
    position: "top-right",
    autoClose: 3000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "dark",
}

export class Toast {
    static success(message: string) {
        toast.success(message, toastOptions)
    }

    static error(message: string) {
        toast.error(message, toastOptions)
    }

    static loading(message: string) {
        return toast.loading(message, toastOptions)
    }

    static update(id: Id, { render, type, isLoading}: {render: string, type: TypeOptions, isLoading: boolean}) {
        toast.update(id, {
            render,
            type,
            isLoading,
            ...toastOptions
        })
    }
}