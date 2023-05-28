// "use client";

// import { Button } from "@/components/ui/button";
// import { Card, CardHeader } from "@/components/ui/card";
// import { Field } from "@prisma/client";
// import { Dialog, DialogContent, DialogPortal, DialogTrigger } from "@radix-ui/react-dialog";
// import { Pencil, Trash } from "lucide-react";
// import React from "react";
// import TemplateField from "./template-field";

// function TemplateItem({ title, single, source, unit }: Field) {
//     return (
//         <Card>
//             <CardHeader className="relative">
//                 <div className="absolute top-2 right-2 space-x-2">
//                     <Dialog>
//                         <DialogTrigger>
//                             <Button variant="secondary" size="sm" type="button">
//                                 <Pencil className="w-4 h-4" />
//                             </Button>
//                         </DialogTrigger>
//                         <DialogContent>
//                             <TemplateField />
//                         </DialogContent>
//                     </Dialog>
//                     <Button variant="destructive" size="sm" type="button">
//                         <Trash className="w-4 h-4" />
//                     </Button>
//                 </div>
//                 <div className="text-gray-600 text-sm">
//                     <p>Title: {title}</p>
//                     <p>Type: {single ? "Single" : "Multiple"}</p>
//                     <p>Source: {source ? "Datasource" : "None"}</p>
//                     <p>Unit: {unit}</p>
//                 </div>
//             </CardHeader>
//         </Card>
//     );
// }

// export default TemplateItem;
