"use client";

import React from "react";
import { FaSadCry } from "react-icons/fa";
import { Button } from "../ui/button";

function Error() {
    return (
        <div className="fixed w-screen h-screen bg-slate-50 flex justify-center items-center">
            <div className="text-center flex flex-col items-center space-y-8">
                <FaSadCry className="w-36 h-36 text-gray-300" />
                <p className="text-xl text-gray-400">Oops... Something went wrong, please try again</p>
                <Button onClick={() => window.location.reload()} className="w-1/2">
                    Retry
                </Button>
            </div>
        </div>
    );
}

export default Error;
