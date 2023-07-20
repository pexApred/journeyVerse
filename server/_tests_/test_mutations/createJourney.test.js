const mongoose = require('mongoose');
const resolvers = require('../../schemas/resolvers.js');
const Journey = require('../../models/Journey.js');
const User = require('../../models/User.js');
const { signToken } = require('../../utils/auth.js');

jest.mock('../../utils/auth.js', () => ({
    signToken: jest.fn().mockReturnValue('mockToken')
}));

const mockJourneyData = {
    _id: new mongoose.Types.ObjectId('347f1f77bcf86cd799439011'),
    destinationCity: 'Test City',
    destinationState: 'Test State',
    destinationCountry: 'Test Country',
    departingDate: new Date('2020-01-01'),
    returningDate: new Date('2020-01-02'),
    transportationOutbound: 'Test Outbound',
    transportationReturn: 'Test Return',
    transportationDetails: 'Test Details',
    accommodations: 'Test Accommodations',
    creator: new mongoose.Types.ObjectId('8540b4728dac2355ef1d26e8'),
    invitedTravelers: [new mongoose.Types.ObjectId('507f1f77bcf86cd799439011')],
};
const mockUserData = {
    _id: new mongoose.Types.ObjectId('507f1f77bcf86cd799439011'),
    firstName: 'Test',
    lastName: 'User',
    email: 'testuser@test.com',
    savedJourneys: [new mongoose.Types.ObjectId('347f1f77bcf86cd799439011')],
};

const mockJourneyModel = {
    ...mockJourneyData,
    populate: jest.fn().mockReturnThis(),
    execPopulate: jest.fn().mockResolvedValue(mockJourneyData),
};

const mockUserModel = {
    ...mockUserData,
    populate: jest.fn().mockReturnThis(),
    execPopulate: jest.fn().mockResolvedValue(mockUserData),
};

Journey.create = jest.fn().mockReturnValue(mockJourneyModel);
Journey.findById = jest.fn().mockReturnValue(mockJourneyModel);
User.findByIdAndUpdate = jest.fn().mockReturnValue(mockUserModel);
User.findOne = jest.fn().mockReturnValue(mockUserModel); // Mocking User.findOne()

const mockContext = {
    user: {
        _id: new mongoose.Types.ObjectId('507f1f77bcf86cd799439011')
    },
};

describe('createJourney mutation', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    it('createJourney: should create a new journey and return the created journey', async () => {
        try {
            const mockJourneyInputData = {
                destinationCity: 'Test City',
                destinationState: 'Test State',
                destinationCountry: 'Test Country',
                departingDate: new Date('2020-01-01'),
                returningDate: new Date('2020-01-02'),
                transportationOutbound: 'Test Outbound',
                transportationReturn: 'Test Return',
                transportationDetails: 'Test Details',
                accommodations: 'Test Accommodations',
                invitedTravelers: [new mongoose.Types.ObjectId('507f1f77bcf86cd799439011')],
            };

            Journey.create.mockResolvedValue(mockJourneyModel);
            User.findByIdAndUpdate.mockResolvedValue(mockUserModel);
            const result = await resolvers.Mutation.createJourney(null, { input: mockJourneyInputData }, mockContext);

            mockJourneyInputData.creator = mockContext.user._id;
            expect(result).toMatchObject(mockJourneyModel);
            expect(Journey.create).toHaveBeenCalledWith(expect.objectContaining(mockJourneyInputData));
            expect(User.findByIdAndUpdate).toHaveBeenCalledWith(mockContext.user._id, { $push: { savedJourneys: mockJourneyModel._id } }, { new: true });
            expect(Journey.findById).toHaveBeenCalledWith(mockJourneyModel._id);
            // expect(signToken).toHaveBeenCalledWith(mockUserData);
            // expect(result.token).toEqual(expect.any(String));
        } catch (e) {
            console.error(e);
            throw e;
        }
    }, 10000);

    afterEach(() => {
        jest.restoreAllMocks();
    });
});
