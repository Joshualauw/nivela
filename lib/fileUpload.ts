import fs from "fs";
import path from "path";

function getFileExtension(blob: Blob) {
    const mimeType = blob.type;
    const mimeTypeParts = mimeType.split("/");
    if (mimeTypeParts.length === 2) {
        return mimeTypeParts[1];
    }
    return null;
}

export async function uploadFile(image: Blob, folderName: string, id?: string) {
    const fileName = (id ?? Date.now().toString()) + "." + getFileExtension(image);
    const folderPath = path.join(process.cwd() + "/public/img/" + folderName);

    const fullPath = [folderPath, fileName].join("/");
    if (!fs.existsSync(folderPath)) {
        fs.mkdirSync(folderPath, { recursive: true });
    }

    const buffer = Buffer.from(await image.arrayBuffer());
    fs.writeFile(fullPath, buffer, (err) => {
        if (err) return;
        console.log("file saved successfully to " + fullPath);
    });

    return { url: ["/img", folderName, fileName].join("/") };
}

export function deleteFolder(folderPath: string) {
    const fullPath = path.join(process.cwd() + "/public/img/" + folderPath);
    if (!fs.existsSync(fullPath)) return;

    fs.rmSync(fullPath, { recursive: true, force: true });
}

export function deleteFile(filePath: string) {
    const fullPath = path.join(process.cwd() + "/public" + filePath);
    if (!fs.existsSync(fullPath)) return;

    fs.unlink(fullPath, (err) => {
        if (err) return;
        console.log(fullPath + " removed successfully");
    });
}
