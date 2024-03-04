import { jwtVerify } from 'jose'

export async function verify(token) {
    try {
        const { payload } = await jwtVerify(token, new TextEncoder().encode(process.env.TOKEN_SECRET));
        return payload
    } catch (error) {
        console.log(error.message);
        return null
    }
}