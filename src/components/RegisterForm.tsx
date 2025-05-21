"use client";

import Link from "next/link";
import React, { useState } from "react";

export default function RegisterForm(){

    const [name,setName] = useState("");
    const [email,setEamil] = useState("");
    const [password,setPassword] = useState("");
    const [error,setError] = useState("");

    const hanleSubmit = async(e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (!name || !email || !password) {
            setError("Please fill all fields");
            return;
        }

        try {
            const res = await fetch('/api/register' , {
                method : "POST",
                headers : {
                    "Content-Type" : "application/json"
                },
                body : JSON.stringify({
                    name,
                    email,
                    password
                })
            })

            if(res.ok) {
                const form = e.target as HTMLFormElement;
                form.reset();
            } else {
                console.log("User registrations failed!");
            }
        } catch (error) {
            console.log("Error during registrations : ", error);
            
        }
    };

    console.log("Name:", name);
    console.log("Email:", email);
    console.log("Password : " , password);
    

    return (
        <div className = "grid place-items-center h-screen">
            <div className="shadow-lg p-6 rounded-lg bg-white">
                <h1 className="text-xl font bold my-4">Register</h1>
                
                <form onSubmit={hanleSubmit} className="flex flex-col gap-4">
                    <input onChange={e => setName(e.target.value)} type="text" placeholder="Name" />
                    <input onChange={e => setEamil(e.target.value)} type="text" placeholder="Email" />
                    <input onChange={e => setPassword(e.target.value)} type="text" placeholder="Password" />
                    <button className="bg-green-600 text-white font-bold cursor-pointer px-6 py-2 ">Register</button>

                    {error && (
                        <div className="bg-red-500 w-fit text-sm py-1 px-3 rounded-md mt-2">
                        {error}
                        </div>
                        )}

                    <Link className="text-sm mt-3 text-right" href={"/"}>Already have an account! <span className="underline">Login</span></Link>
                </form>
            </div>
        </div>
    );
}
