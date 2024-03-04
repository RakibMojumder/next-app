'use server'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation';

export const logout = () => {
    cookies().delete("user");
    cookies().delete("token");
    redirect('/sign-in')
}