export const AUTH_TIMER = 24;
export const MORGAN_FORMAT = `:method :url :response-time [:status] \n`;
import mongoose from 'mongoose';
// bu mantigimiz kirib kelyotgan paramimizni taypini tekshiryapmiz agar string bolsa mongaDb object id ga ozgartiramiz
export const shapIntoMongooseObjectId = (target: any) => {
    return typeof target === 'string' ? new mongoose.Types.ObjectId(target) : target;
};