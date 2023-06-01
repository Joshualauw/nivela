"use client";

import Error from "@/components/state/error";
import { redirect } from "next/navigation";
import React from "react";

function NotFound() {
    return <Error message="Projects Not Found" buttonText="Go To Projects" callback={() => redirect("/projects")} />;
}

export default NotFound;
