import expressRateLimit from 'express-rate-limit';

const getReportTypesRateLimit = expressRateLimit({
    windowMs: 10 * 60 * 1000, // 10 minutes
    max: 50
});

const createReportRateLimit = expressRateLimit({
    windowMs: 10 * 60 * 1000, // 10 minutes
    max: 50
});

export {
    getReportTypesRateLimit,
    createReportRateLimit,
};
