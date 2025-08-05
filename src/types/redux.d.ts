// src/types/api-action.ts

export type ApiActionPayload<T = object, S = object, E = object> = {
    url: string;
    method?: string;
    data?: T;
    hideLoader?: boolean;
    success?: (data: S) => { type: string; payload: S };
    error?: (error: E) => { type: string; payload: E };
};

export interface ApiAction<T = object, S = object, E = object> {
    type: 'API_CALL';
    payload: ApiActionPayload<T, S, E>;
}
