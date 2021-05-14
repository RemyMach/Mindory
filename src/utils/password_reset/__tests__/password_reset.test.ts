import { generateEmailVerificationToken } from '../password_reset';

describe('tests the token generation function', () => {
    it('should produce a string of length 64', () => {
        expect(generateEmailVerificationToken()).toHaveLength(64);
    });
});
