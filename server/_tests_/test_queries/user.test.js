const resolvers = require('../../schemas/resolvers.js');
const User = require('../../models/User.js');

describe('user query', () => {
    it('should return a user by id', async () => {
        const testUser = { _id: 'user-id', firstName: 'test', lastName: 'test', email: 'test@test.com' };
        const args = { _id: 'user-id' };

        jest.spyOn(User, 'findById')
            .mockReturnValue(Promise.resolve(testUser));
        const result = await resolvers.Query.user(null, args);
        expect(result).toEqual(testUser);
        expect(User.findById).toHaveBeenCalledWith(args.id);
    });
    afterEach(() => {
        jest.restoreAllMocks();
    });
});
