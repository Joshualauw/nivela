import React from "react";
import { FaExclamationCircle } from "react-icons/fa";

function ValidationError({ errors }: { errors: string[] }) {
    return errors.length > 0 ? (
        <div
            className="flex p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400"
            role="alert"
        >
            <FaExclamationCircle className="flex-shrink-0 inline w-5 h-5 mr-3" />
            <span className="sr-only">Validation Error</span>
            <div>
                <span className="font-medium">Ensure that these requirements are met:</span>
                <ul className="mt-1.5 list-disc list-inside">
                    {errors.map((e) => (
                        <li key={e}>{e}</li>
                    ))}
                </ul>
            </div>
        </div>
    ) : (
        <></>
    );
}

export default ValidationError;
