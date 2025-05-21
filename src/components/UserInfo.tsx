export default function UserInfo() {
return (
    <div className="grid place-items-center h-screen">
    <div className="shadow-lg p-6 rounded-lg bg-white">
        <div>
        Name : <span className="font-bold"> Jonh</span>
        </div>
        <div>
        Email : <span className="font-bold"> jhon@gmail.com</span>
        </div>
        <div className="flex justify-center mt-3"> {/* Bu sətiri əlavə etdik */}
        <button className="bg-red-500 text-white font-bold px-6 py-2">Log Out</button>
        </div>
    </div>
    </div>
);
}