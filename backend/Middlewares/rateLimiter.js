import ratelimiter from "../config/upstash.js";

const rateLimiter = async(req,res,next) => {
    try {
        const {success} = await ratelimiter.limit("my-limit-key");
        if(!success){
            console.log("Too many requests")
            return res.status(429).json({message:"Too Many Requests"});
        }
        next();
    } catch (error) {
        console.log("Error in rateLimiter",error);
        // res.status(500).send("Error in RateLimiter Middleware")
        next(error);
    }
}
export default rateLimiter;