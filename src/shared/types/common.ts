export type FetchData<T> = {
    success: boolean,
    data?: T,
    message?: string
}