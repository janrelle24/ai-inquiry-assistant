export const chat = (req, res) => {
    const { message } = req.body;

    if (!message) {
        return res.status(400).json({
            success: false,
            error: "Message is required.",
        });
    }
    
    res.status(200).json({
        success: true,
        reply: `You asked: ${message}`,
    });
};