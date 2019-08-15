export declare const UserProfileSchema: {
    type: string;
    required: string[];
    properties: {
        account: {
            type: string;
        };
        name: {
            type: string;
        };
    };
};
export declare const CredentialsRequestBody: {
    description: string;
    required: boolean;
    content: {
        'application/json': {
            schema: {
                type: string;
                required: string[];
                properties: {
                    account: {
                        type: string;
                    };
                    password: {
                        type: string;
                        minLength: number;
                    };
                };
            };
        };
    };
};
