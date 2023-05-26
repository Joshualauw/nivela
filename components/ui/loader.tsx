import { Loader2 } from "lucide-react";

function Loader() {
    return (
        <div className="fixed inset-0 flex items-center justify-center bg-opacity-50 backdrop-filter backdrop-blur-sm">
            <div className="flex flex-col justify-center items-center text-center p-4 rounded-lg bg-white bg-opacity-60">
                <Loader2 className="animate-spin w-16 h-16" />
                <h2 className="font-bold text-2xl mt-4">Please Wait...</h2>
            </div>
        </div>
    );
}

export default Loader;
