import { ApiService } from "./base.service";

export class SubscriptionService extends ApiService<unknown> {
    private readonly apiEndpoint = "https://xhw9j7sggg.execute-api.eu-west-1.amazonaws.com/default/b2b-subscribe";

    /**
     * Subscribes the provided contact details to the B2B mailing list.
     */
    async store(firstName: string, lastName: string, businessType: string, email: string) {
        const response = await this.request(this.apiEndpoint, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                // Add headers that might help with CORS
                Origin: window.location.origin,
            },
            body: JSON.stringify({
                firstName,
                lastName,
                businessType,
                email,
            }),
        });

        return response;
    }

    /**
     * Submits personality test data
     */
    async submitPersonalityTest(userData: {
        firstName: string;
        lastName: string;
        email: string;
        retailerNames?: string;
        optInUpdate: boolean;
        optInParticipateInRetails: boolean;
        oceanScores?: Record<string, number>;
    }) {
        // Using same endpoint for now - you might want a different one for personality test
        const response = await this.request(this.apiEndpoint, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Origin: window.location.origin,
            },
            body: JSON.stringify({
                ...userData,
                type: "personality-test", // Add type to distinguish from contact form
            }),
        });

        return response;
    }
}
