'use client';

import React, { useRef, useState } from 'react';
import Image from 'next/image';
import { Plus, X, ArrowLeft, ArrowRight, Star, Loader2 } from 'lucide-react';

interface ImageGalleryManagerProps {
  images: string[];
  onChange: (images: string[]) => void;
  coverImage?: string;
  onSetCover?: (url: string) => void;
  aspectRatio?: '4:5' | '4:3' | '16:9';
}

export const ImageGalleryManager: React.FC<ImageGalleryManagerProps> = ({
  images,
  onChange,
  coverImage,
  onSetCover,
  aspectRatio = '4:5',
}) => {
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleUploadAdditional = async (file: File) => {
    try {
      setIsUploading(true);
      const formData = new FormData();
      formData.append('file', file);
      formData.append('folder', 'gallery');

      const res = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      });

      const data = await res.json();
      if (res.ok && data.success && data.url) {
        onChange([...images, data.url]);
      }
    } catch (e) {
      console.error('Gallery image upload failed:', e);
    } finally {
      setIsUploading(false);
    }
  };

  const handleMove = (index: number, direction: 'left' | 'right') => {
    const targetIndex = direction === 'left' ? index - 1 : index + 1;
    if (targetIndex < 0 || targetIndex >= images.length) return;

    const updated = [...images];
    const temp = updated[index];
    updated[index] = updated[targetIndex];
    updated[targetIndex] = temp;
    onChange(updated);
  };

  const handleRemove = (index: number) => {
    const updated = images.filter((_, i) => i !== index);
    onChange(updated);
  };

  return (
    <div className="space-y-2 select-none">
      <div className="flex items-center justify-between text-xs">
        <span className="font-medium text-[#292722] dark:text-[#F5F2EB]">
          Project Gallery Images ({images.length})
        </span>
        <button
          type="button"
          onClick={() => fileInputRef.current?.click()}
          className="inline-flex items-center gap-1 text-[11px] font-medium text-[#94745F] hover:underline cursor-pointer"
        >
          <Plus size={13} />
          <span>Add Gallery Photo</span>
        </button>
      </div>

      <input
        type="file"
        ref={fileInputRef}
        onChange={(e) => {
          if (e.target.files && e.target.files[0]) {
            handleUploadAdditional(e.target.files[0]);
          }
        }}
        accept="image/*"
        className="hidden"
      />

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
        {images.map((img, idx) => {
          const isCover = coverImage === img;
          return (
            <div
              key={`${img}-${idx}`}
              className="relative aspect-[4/5] rounded-md overflow-hidden border border-[#DDD5C9] dark:border-[#3E3C33] bg-[#F7F4EE] group"
            >
              <Image
                src={img}
                alt={`Gallery image ${idx + 1}`}
                fill
                unoptimized
                sizes="(max-width: 640px) 50vw, 25vw"
                className="object-cover object-center"
              />

              {/* Is Cover Indicator */}
              {isCover && (
                <div className="absolute top-1.5 left-1.5 z-10 bg-[#526653] text-white text-[9px] font-semibold px-1.5 py-0.5 rounded shadow-xs flex items-center gap-1">
                  <Star size={9} className="fill-white" />
                  <span>Cover</span>
                </div>
              )}

              {/* Controls Overlay */}
              <div className="absolute inset-0 bg-[#292722]/65 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-between p-1.5 z-20">
                <div className="flex items-center justify-between">
                  {onSetCover && !isCover && (
                    <button
                      type="button"
                      onClick={() => onSetCover(img)}
                      title="Set as cover photo"
                      className="p-1 rounded bg-white/80 hover:bg-white text-[#292722] text-[10px] cursor-pointer"
                    >
                      <Star size={11} />
                    </button>
                  )}
                  <button
                    type="button"
                    onClick={() => handleRemove(idx)}
                    title="Remove from gallery"
                    className="p-1 rounded bg-red-600/90 hover:bg-red-700 text-white cursor-pointer ml-auto"
                  >
                    <X size={11} />
                  </button>
                </div>

                {/* Move Left / Right buttons */}
                <div className="flex items-center justify-center gap-1">
                  {idx > 0 && (
                    <button
                      type="button"
                      onClick={() => handleMove(idx, 'left')}
                      className="p-1 rounded bg-white/80 hover:bg-white text-[#292722] cursor-pointer"
                      title="Move backward"
                    >
                      <ArrowLeft size={11} />
                    </button>
                  )}
                  {idx < images.length - 1 && (
                    <button
                      type="button"
                      onClick={() => handleMove(idx, 'right')}
                      className="p-1 rounded bg-white/80 hover:bg-white text-[#292722] cursor-pointer"
                      title="Move forward"
                    >
                      <ArrowRight size={11} />
                    </button>
                  )}
                </div>
              </div>
            </div>
          );
        })}

        {/* Add photo card */}
        <button
          type="button"
          onClick={() => fileInputRef.current?.click()}
          disabled={isUploading}
          className="aspect-[4/5] rounded-md border-2 border-dashed border-[#DDD5C9] dark:border-[#3E3C33] bg-[#FAF8F5] dark:bg-[#202422] hover:border-[#94745F] flex flex-col items-center justify-center p-3 text-center cursor-pointer transition-colors"
        >
          {isUploading ? (
            <Loader2 size={18} className="text-[#94745F] animate-spin mb-1" />
          ) : (
            <Plus size={20} className="text-[#94745F] mb-1" />
          )}
          <span className="text-[11px] font-medium text-[#292722] dark:text-[#F5F2EB]">
            {isUploading ? 'Uploading...' : 'Add Image'}
          </span>
          <span className="text-[9px] text-[#777067] dark:text-[#B6AEA1] font-mono mt-0.5">
            4:5 Portrait
          </span>
        </button>
      </div>
    </div>
  );
};
