import cloudinary from "@/lib/cloudianary";
import { UploadApiErrorResponse, UploadApiResponse } from "cloudinary";

export async function POST(req: Request): Promise<Response> {
    try {
        const formData = await req.formData();
        const file = formData.get('image') ?? formData.get('file');

        if (!(file instanceof File)) {
            return Response.json({
                success: false,
                message: "An image file is required"
            }, { status: 400 });
        }

        const bytes = await file.arrayBuffer();
        const buffer = Buffer.from(bytes);

        const result = await new Promise<UploadApiResponse>((resolve, reject) => {
            cloudinary.uploader.upload_stream(
                {
                    folder: 'work-dock/space/images',
                    resource_type: 'auto',
                    use_filename: true,
                    unique_filename: false,
                },
                (error: UploadApiErrorResponse | undefined, result: UploadApiResponse | undefined) => {
                    if (error) {
                        reject(error);
                    } else if (result) {
                        resolve(result);
                    } else {
                        reject(new Error("Upload failed. Please try again."));
                    }
                }
            ).end(buffer);
        });

        return Response.json({
            success: true,
            url: result.secure_url,
            secure_url: result.secure_url,
        });
    } catch (error) {
        return Response.json({
            success: false,
            message: error instanceof Error ? error.message : "Internal server error.",
        }, { status: 500 });
    }
};