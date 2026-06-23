const asyncHandler = require('../utils/asyncHandler');
const apiResponse = require('../utils/apiResponse');
const dashboardService = require('../services/dashboardService');

const getSummary = asyncHandler(async (req, res) => {
    const summary = await dashboardService.getDashboardSummary(req.user.id);
    apiResponse.success(res, 200, 'Dashboard summary fetched successfully', summary);
});

module.exports = { getSummary };