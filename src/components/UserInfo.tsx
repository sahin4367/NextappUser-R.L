"use client";

import { signOut } from "next-auth/react";
import { useSession } from "next-auth/react";

export default function UserInfo() {
    const { data : session } = useSession();
return (
    <div className="grid place-items-center h-screen">
    <div className="shadow-lg p-6 rounded-lg bg-white">
        <div>
        Name : <span className="font-bold">{session?.user?.name}</span>
        </div>
        <div>
        Email : <span className="font-bold"> {session?.user?.email}</span>
        </div>
        <div className="flex justify-center mt-3"> {/* Bu sətiri əlavə etdik */}
        <button onClick={() => signOut()} className="bg-red-500 text-white font-bold px-6 py-2">Log Out</button>
        </div>
    </div>
    </div>
);
}