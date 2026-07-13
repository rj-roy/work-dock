// components/listing/MediaSection.tsx
'use client';

import { useState, useRef } from 'react';
import { Upload, Trash2, Loader2 } from 'lucide-react';

interface MediaSectionProps {
    imageUrls: string[];
    onImagesChange: (urls: string[]) => void;
}

export default function Media({ imageUrls, onImagesChange }: MediaSectionProps) {
    const [isUploading, setIsUploading] = useState(false);
    const [uploadProgress, setUploadProgress] = useState<number>(0);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const uploadToCloudinary = async (file: File): Promise<string> => {
        const formData = new FormData();
        formData.append('file', file);
        formData.append('upload_preset', process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET || 'workdock');
        formData.append('cloud_name', process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME || '');

        const response = await fetch(
            `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload`,
            {
                method: 'POST',
                body: formData,
            }
        );

        if (!response.ok) {
            throw new Error('Upload failed');
        }

        const data = await response.json();
        return data.secure_url;
    };

    const handleImageSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            const files = Array.from(e.target.files);
            setIsUploading(true);
            setUploadProgress(0);

            try {
                const uploadedUrls: string[] = [];

                for (let i = 0; i < files.length; i++) {
                    const file = files[i];

                    // Validate file type
                    if (!file.type.startsWith('image/')) {
                        alert(`File ${file.name} is not an image`);
                        continue;
                    }

                    // Validate file size (10MB limit)
                    if (file.size > 10 * 1024 * 1024) {
                        alert(`File ${file.name} is too large. Max size is 10MB`);
                        continue;
                    }

                    try {
                        const url = await uploadToCloudinary(file);
                        uploadedUrls.push(url);
                        setUploadProgress(((i + 1) / files.length) * 100);
                    } catch (error) {
                        console.error('Upload error:', error);
                        alert(`Failed to upload ${file.name}`);
                    }
                }

                onImagesChange([...imageUrls, ...uploadedUrls]);
            } finally {
                setIsUploading(false);
                setUploadProgress(0);
            }
        }
    };

    const removeImage = (index: number) => {
        onImagesChange(imageUrls.filter((_, i) => i !== index));
    };

    return (
        <div className="space-y-4">
            <div
                className={`border-2 border-dashed rounded-xl p-6 text-center transition-colors cursor-pointer ${isUploading
                        ? 'border-gray-300 dark:border-gray-700 cursor-not-allowed'
                        : 'border-gray-300 dark:border-gray-700 hover:border-indigo-400 dark:hover:border-indigo-600'
                    }`}
                onClick={() => !isUploading && fileInputRef.current?.click()}
            >
                <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    multiple
                    onChange={handleImageSelect}
                    className="hidden"
                    disabled={isUploading}
                />

                {isUploading ? (
                    <div className="space-y-3">
                        <Loader2 className="w-10 h-10 mx-auto text-indigo-600 animate-spin" />
                        <p className="text-sm font-medium text-gray-700 dark:text-gray-300">
                            Uploading images... {Math.round(uploadProgress)}%
                        </p>
                        <div className="w-full max-w-xs mx-auto h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                            <div
                                className="h-full bg-indigo-600 transition-all duration-300"
                                style={{ width: `${uploadProgress}%` }}
                            />
                        </div>
                    </div>
                ) : (
                    <>
                        <Upload className="w-10 h-10 mx-auto mb-3 text-gray-400" />
                        <p className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                            Click to upload images
                        </p>
                        <p className="text-xs text-gray-500 dark:text-gray-400">
                            PNG, JPG, GIF up to 10MB each
                        </p>
                    </>
                )}
            </div>

            {imageUrls.length > 0 && (
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                    {imageUrls.map((url, index) => (
                        <div key={index} className="relative group rounded-xl overflow-hidden border border-gray-200 dark:border-gray-700 bg-gray-100 dark:bg-gray-800">
                            <img
                                src={url}
                                alt={`Upload ${index + 1}`}
                                className="w-full h-32 object-cover"
                            />
                            <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                                <button
                                    type="button"
                                    onClick={() => removeImage(index)}
                                    className="p-2 bg-red-500 hover:bg-red-600 rounded-full text-white transition-colors"
                                    disabled={isUploading}
                                >
                                    <Trash2 className="w-4 h-4" />
                                </button>
                            </div>
                            <div className="absolute top-2 left-2 px-2 py-1 bg-black/60 backdrop-blur-sm rounded text-xs text-white font-medium">
                                {index + 1}
                            </div>
                        </div>
                    ))}
                </div>
            )}

            {imageUrls.length > 0 && !isUploading && (
                <button
                    type="button"
                    onClick={() => fileInputRef.current?.click()}
                    className="text-sm text-indigo-600 dark:text-indigo-400 hover:text-indigo-700 dark:hover:text-indigo-300 font-medium flex items-center gap-2"
                >
                    <Upload className="w-4 h-4" />
                    Add more images
                </button>
            )}
        </div>
    );
}