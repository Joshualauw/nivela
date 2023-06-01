"use client";

import useProject from "@/hooks/service/project/useProject";
import { useProjectStore } from "@/hooks/store/useProjectStore";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect } from "react";

function DashboardParams() {
    const searchParams = useSearchParams();
    const projectId = searchParams.get("projectId");
    const router = useRouter();

    const { getOneProject } = useProject();
    const { setProjectDetail } = useProjectStore();

    useEffect(() => {
        async function setProject() {
            if (!projectId) router.replace("/dashboard/notfound");
            else {
                getOneProject(projectId)
                    .then(({ data }) => {
                        console.log(data);
                        setProjectDetail(data);
                    })
                    .catch((err) => {
                        router.replace("/dashboard/notfound");
                    });
            }
        }
        setProject();
    }, [projectId]);

    return <></>;
}

export default DashboardParams;
