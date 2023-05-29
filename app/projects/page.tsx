import Navbar from "@/components/dashboard/navbar";
import EditProject from "@/components/dashboard/projects/edit-project";
import ProjectCard from "@/components/dashboard/projects/project-card";
import { Button } from "@/components/ui/button";

function Projects() {
    return (
        <>
            <Navbar />
            <div className="px-8 py-4 lg:px-20 lg:py-8">
                <div className="my-8 flex justify-between items-center w-full">
                    <h1 className="text-2xl font-bold">My Projects</h1>
                    <EditProject>
                        <Button>+ Create Project</Button>
                    </EditProject>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
                    <ProjectCard />
                    <ProjectCard />
                </div>
            </div>
        </>
    );
}

export default Projects;
