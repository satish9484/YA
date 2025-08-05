export type ApiActionPayload<T = unknown, S = unknown, E = unknown> = {
    url: string;
    method?: string;
    data?: T;
    hideLoader?: boolean;
    success?: (data: S) => { type: string; payload: S };
    error?: (error: E) => { type: string; payload: E };
};

export interface ApiAction<T = unknown, S = unknown, E = unknown> {
    type: 'API';
    payload: ApiActionPayload<T, S, E>;
}
