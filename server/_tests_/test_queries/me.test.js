const axios = require('axios');
const resolvers = require('../../schemas/resolvers.js');
const User = require('../../models/User.js');

describe('me query', () => {
    it('should return the logged in user', async () => {
        const context = { user: { _id: 'user-id' } };

        jest.spyOn(User, 'findById')
            .mockReturnValue(Promise.resolve({ _id: 'user-id', firstName: 'test', lastName: 'test', email: 'test@email.com' }))
        const result = await resolvers.Query.me(null, null, context);
        expect(result).toEqual({ _id: 'user-id', firstName: 'test', lastName: 'test', email: 'test@email.com' });
        expect(User.findById).toHaveBeenCalledWith('user-id');
    });
    afterEach(() => {
        jest.restoreAllMocks();
    });
});