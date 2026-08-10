import rateLimit from "express-rate-limit";

export const chatRateLimiter = rateLimit({
    windowMs: 10 * 60 * 1000, // 10 minutes

    max: 50, // maximum 50 requests per IP

    standardHeaders: "draft-8",
    legacyHeaders: false,

    message: {
        success: false,
        message: "Too many requests. Please try again later.",
    },
});