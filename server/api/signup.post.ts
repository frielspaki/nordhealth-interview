import {EventHandlerRequest, H3Event} from "h3";

export default defineEventHandler(async (event: H3Event<EventHandlerRequest>) => {
    const body = await readBody(event);

    console.log('New Signup request!');
    console.log(body);

    setResponseStatus(event, 201);

    return 'OK';
});