const resolvers = require('../../schemas/resolvers.js');
const User = require('../../models/User.js');

describe('users query', () => {
    it('should return all users', async () => {
        const testUsers = [
            { _id: 'user-id1', firstName: 'test1', lastName: 'test1', email: 'test1@test1.com' },
            { _id: 'user-id2', firstName: 'test2', lastName: 'test2', email: 'test2@test2.com' }
        ];

        jest.spyOn(User, 'find')
            .mockReturnValue(Promise.resolve(testUsers));
        const result = await resolvers.Query.users();
        expect(result).toEqual(testUsers);
        expect(User.find).toHaveBeenCalled();
    });
    afterEach(() => {
        jest.restoreAllMocks();
    });
});