const mongoose = require('mongoose');
const resolvers = require('../../schemas/resolvers.js');
const Journey = require('../../models/Journey.js');
const User = require('../../models/User.js');

jest.mock('../../models/Journey.js');
jest.mock('../../models/User.js');

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

const mockJourneyData2 = [mockJourneyData];

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

describe('resolvers', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    describe('journey query', () => {
        it('journey: should return a journey by id', async () => {
            Journey.findById.mockReturnValue({
                populate: jest.fn().mockReturnThis(),
                execPopulate: jest.fn().mockResolvedValue(mockJourneyData),
            });
            User.findById.mockReturnValue(Promise.resolve(mockUserData));
            const result = await resolvers.Query.journey(null, { id: mockJourneyData._id }, mockContext);
            expect(result).toEqual(mockJourneyData);
            expect(Journey.findById).toHaveBeenCalledWith(mockJourneyData._id);
        });
        afterEach(() => {
            jest.restoreAllMocks();
        });
    });

    describe('journeys query', () => {
        it('journeys: should return all journeys', async () => {
            Journey.find.mockReturnValue({
                populate: () => ({
                    populate: () => ({
                        exec: jest.fn().mockResolvedValue(mockJourneyData2),
                    }),
                }),
            });
            User.findById.mockReturnValue(Promise.resolve(mockUserData));
            const result = await resolvers.Query.journeys(null, {}, mockContext);
            expect(result).toEqual(mockJourneyData2);
            expect(Journey.find).toHaveBeenCalledWith({ creator: mockContext.user._id });
        });
        afterEach(() => {
            jest.restoreAllMocks();
        });
    });
});

