export enum HttpCode {
    OK = 200,
    CREATED = 201,
    NOT_MODIFIED = 304,
    BAD_REQUEST = 400,
    UNAUTHORIZED = 401,
    FORBIDDEN = 403,
    NOT_FOUND = 404,
    INTERNAL_SERVER_ERROR = 500,
}

export enum Message {
    SOMETHING_WENT_WRONG = "Something went wrong!",
    NO_DATA_FOUND = "No data is found!",
    CREATE_FAILED = "Create is failed!",
    USED_NICK_PHONE = "You are inserting already used nick or phone!",
    NO_MEMBER_NICK = "No member with that member nick!",
    BLOCKED_USER = "You have been blocked, contact restaurant!",
    WRONG_PASSWORD = "Wrong password intered, please try again!",
    NOT_AUTHENTOCATED = "You are  not authenticated, Plase login fist!",
    UPDATE_FAILED = "SIZ HATO QILDIZ",
    TOKEN_CREATION_FAILED = "Token creatiion error"
}

class Errors extends Error {
    public code: HttpCode;
    public message: Message;

    static standard = {
        code: HttpCode.INTERNAL_SERVER_ERROR,
        message: Message.SOMETHING_WENT_WRONG,
    }

    constructor(statusCode: HttpCode, statusMessage: Message) {
        super();
        this.code = statusCode;
        this.message = statusMessage;
    }
}

export default Errors;