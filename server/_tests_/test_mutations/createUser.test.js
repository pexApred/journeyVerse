const mongoose = require('mongoose');
const resolvers = require('../../schemas/resolvers.js');
const User = require('../../models/User.js');
const { signToken } = require('../../utils/auth.js');

jest.mock('../../utils/auth.js', () => ({
    signToken: jest.fn().mockReturnValue('mockToken')
}));

jest.mock('../../models/User.js');

const mockUserData = {
    _id: new mongoose.Types.ObjectId('507f1f77bcf86cd799439011'),
    firstName: 'Test',
    lastName: 'User',
    email: 'testuser@test.com',
    savedJourneys: [new mongoose.Types.ObjectId('347f1f77bcf86cd799439011')],
};

const mockContext = {
    user: mockUserData,
};

describe('createUser mutation', () => {
    it('createUser: should create a new user and return the created user', async () => {
        const mockUserInputData = {
            firstName: 'Test',
            lastName: 'User',
            email: 'testuser@test.com',
            password: 'testpassword',
        };

        User.create.mockResolvedValue(mockUserData);

        const result = await resolvers.Mutation.createUser(null, { input: mockUserInputData }, mockContext);
        expect(result).toEqual({ user: mockUserData, token: 'mockToken' }) ;
        expect(User.create).toHaveBeenCalledWith({ input: mockUserInputData } );
        expect(signToken).toHaveBeenCalledWith(mockUserData);
    });
    afterEach(() => {
        jest.restoreAllMocks();
    });
});