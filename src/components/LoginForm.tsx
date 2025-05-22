"use client";

import Link from "next/link";
import React, { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function LoginForm(){

    const [email,setEamil] = useState("");
    const [password,setPassword] = useState("");
    const [error,setError] = useState("");

    const router = useRouter();

    const hanleSubmit = async(e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        try {
            const r = await signIn("credentials" , {
                email,
                password,
                redirect : false
            })

            if (r?.error) {
                setError("Invalid credentials");
                return;
            }

            router.replace('dashboard');
        } catch (error) {
            console.log(error);
            
        }
    }   
    return (
        <div className = "grid place-items-center h-screen">
            <div className="shadow-lg p-6 rounded-lg bg-white">
                <h1 className="text-xl font bold my-4">Login</h1>
                
                <form onSubmit={hanleSubmit} className="flex flex-col gap-4">
                    <input onChange={(e) => setEamil(e.target.value)} type="text" placeholder="Email" />
                    <input onChange={(e) => setPassword(e.target.value)} type="password" placeholder="Password" />
                    <button className="bg-green-600 text-white font-bold cursor-pointer px-6 py-2 ">Login</button>

                    {error && (
                        <div className="bg-red-500 w-fit text-sm py-1 px-3 rounded-md mt-2">
                            {error}
                        </div>
                    )}

                    <Link className="text-sm mt-3 text-right" href={"/register"}>Don't have an account? <span className="underline">Register</span></Link>
                </form>
            </div>
        </div>
    );
}