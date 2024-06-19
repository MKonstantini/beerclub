"use client";
import SignInForm from "@/components/forms/SignInForm";
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";

const SignInPage = () => {
    const { data: session } = useSession()

    if (session) {
        redirect("/")
    }
    return (
        <div className="flex flex-col justify-center items-center h-full pb-32 ">
            <div className="bg-slate-300 p-20 rounded-full py-24 flex flex-col items-center">
                <h1 className="text-2xl font-bold mb-6">LET&apos;S LOGIN</h1>
                <div>
                    <SignInForm />
                </div>
            </div>
        </div>
    )
}

export default SignInPage