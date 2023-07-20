const resolvers = require('../../schemas/resolvers.js');
const User = require('../../models/User.js');
const { signToken } = require('../../utils/auth.js');

jest.mock('../../utils/auth.js', () => ({
    signToken: jest.fn().mockReturnValue('mockToken')
}));

describe('login mutation', () => {
    it('should log in a user and create a token', async () => {
        const args = { email: 'test@test', password: 'testpass' };
        
        const testUser = { _id: 'user-id', firstName: 'test', lastName: 'test', email: 'test@test', password: 'testpass', isCorrectPassword: jest.fn().mockReturnValue(Promise.resolve(true)) };
        jest.spyOn(User, 'findOne')
            .mockReturnValue(Promise.resolve(testUser));

        const result = await resolvers.Mutation.login(null, args);
        expect(result.user).toEqual(testUser);
        expect(User.findOne).toHaveBeenCalledWith({ email: args.email });
        expect(testUser.isCorrectPassword).toHaveBeenCalledWith(args.password);
        expect(signToken).toHaveBeenCalledWith(testUser);
        expect(result.token).toEqual(expect.any(String));
    });
    afterEach(() => {
        jest.restoreAllMocks();
    });
});
