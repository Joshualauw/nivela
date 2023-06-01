import { v2 } from "cloudinary";

v2.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});

const prefix = "nivela";

export async function uploadFile(filePath: string, fileId: string) {
    return await v2.uploader.upload(filePath, {
        public_id: prefix + "/" + fileId,
        allowed_formats: ["png", "jpg", "gif", "svg"],
    });
}

export async function deleteFile(filePath: string) {
    return await v2.uploader.destroy(prefix + "/" + filePath);
}
