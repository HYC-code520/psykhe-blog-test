// Mock service for testing when CORS is blocking the real API
export class MockSubscriptionService {
    /**
     * Mock store method for testing
     */
    async store(firstName: string, lastName: string, businessType: string, email: string) {
        console.log("🧪 MOCK: Submitting contact form data:", { firstName, lastName, businessType, email });

        // Simulate API delay
        await new Promise((resolve) => setTimeout(resolve, 1000));

        // Simulate success (you can change this to test error handling)
        return { success: true, message: "Mock submission successful" };
    }

    /**
     * Mock personality test submission
     */
    async submitPersonalityTest(userData: Record<string, unknown>) {
        console.log("🧪 MOCK: Submitting personality test data:", userData);

        // Simulate API delay
        await new Promise((resolve) => setTimeout(resolve, 1500));

        return { success: true, message: "Mock personality test submission successful" };
    }
}
