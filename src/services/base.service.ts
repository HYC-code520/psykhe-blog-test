// Base service for Astro (no Nuxt dependencies)
export abstract class ApiService<T> {
    protected baseURL: string;

    constructor(baseURL: string = "") {
        this.baseURL = baseURL;
    }

    protected async request<R = unknown>(url: string, options: RequestInit = {}): Promise<R> {
        console.log("Making API request to:", url);
        console.log("Request options:", options);

        try {
            const response = await fetch(url, {
                headers: {
                    "Content-Type": "application/json",
                    ...options.headers,
                },
                ...options,
            });

            console.log("Response status:", response.status);
            console.log("Response ok:", response.ok);

            if (!response.ok) {
                const errorText = await response.text();
                console.error("API Error Response:", errorText);
                throw new Error(`HTTP error! status: ${response.status}, message: ${errorText}`);
            }

            const responseData = await response.json();
            console.log("Response data:", responseData);
            return responseData;
        } catch (error) {
            console.error("Network/API Error:", error);
            throw error;
        }
    }

    // Abstract methods that can be implemented by subclasses
    all?(): Promise<T[]>;
    get?(params: RequestParams): Promise<T>;
    create?(entry: T): Promise<boolean | T>;
    update?(params: RequestParams, entry: T): Promise<boolean | T>;
    delete?(params: RequestParams): Promise<boolean>;
}

export type RequestParams = Record<string, unknown>;
