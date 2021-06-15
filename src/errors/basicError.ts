import BaseCustomError from './base-custom-error';
import {
    SerializedErrorOutput,
} from './types/serialized-error-output';


export default class BasicError extends BaseCustomError {

    private statusCode = 400;

    private readonly defaultErrorMessage: string;

    constructor(defaultErrorMessage: string) {
        super(defaultErrorMessage);
        this.defaultErrorMessage = defaultErrorMessage;

        Object.setPrototypeOf(this, BasicError.prototype);
    }

    getStatusCode(): number {
        return this.statusCode;
    }

    serializeErrorOutput(): SerializedErrorOutput {
        return {
            errors: [
                {
                    message: this.defaultErrorMessage,
                },
            ],
        };
    }
}
