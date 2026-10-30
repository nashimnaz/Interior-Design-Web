'use client';

import React, { useState, useRef } from 'react';
import Image from 'next/image';
import { Upload, X, RefreshCw, Image as ImageIcon, Loader2, Link2, Check } from 'lucide-react';

export type AspectRatioType = '4:5' | '4:3' | '16:9' | '1:1' | 'auto';

interface ImageUploadZoneProps {
  value: string;
  onChange: (url: string) => void;
  aspectRatio?: AspectRatioType;
  label?: string;
  sublabel?: string;
  recommendedText?: string;
  altText?: string;
  onAltTextChange?: (alt: string) => void;
  folder?: string;
}

export const ImageUploadZone: React.FC<ImageUploadZoneProps> = ({
  value,
  onChange,
  aspectRatio = '4:5',
  label = 'Cover Photograph',
  sublabel,
  recommendedText,
  altText,
  onAltTextChange,
  folder = 'general',
}) => {
  const [isDragging, setIsDragging] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [showUrlInput, setShowUrlInput] = useState(false);
  const [tempUrl, setTempUrl] = useState('');
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Map aspect ratio string to Tailwind classes
  const aspectClass = {
    '4:5': 'aspect-[4/5]',
    '4:3': 'aspect-[4/3]',
    '16:9': 'aspect-[16/9]',
    '1:1': 'aspect-square',
    'auto': 'h-48',
  }[aspectRatio];

  const handleUploadFile = async (file: File) => {
    if (!file.type.startsWith('image/')) {
      setErrorMsg('Please upload a valid image file (JPG, PNG, WEBP, or SVG).');
      return;
    }

    try {
      setIsUploading(true);
      setErrorMsg(null);

      const formData = new FormData();
      formData.append('file', file);
      formData.append('folder', folder);

      const res = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      });

      const data = await res.json();
      if (!res.ok || !data.success) {
        throw new Error(data.error || 'Upload failed');
      }

      onChange(data.url);
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Error uploading file';
      setErrorMsg(msg);
    } finally {
      setIsUploading(false);
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);

    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      handleUploadFile(e.dataTransfer.files[0]);
    }
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      handleUploadFile(e.target.files[0]);
    }
  };

  const handleApplyUrl = () => {
    if (tempUrl.trim()) {
      onChange(tempUrl.trim());
      setTempUrl('');
      setShowUrlInput(false);
    }
  };

  return (
    <div className="w-full space-y-2 select-none">
      {/* Label and Aspect Ratio Badge */}
      <div className="flex items-center justify-between text-xs">
        <div>
          <span className="font-medium text-[#292722] dark:text-[#F5F2EB]">{label}</span>
          {sublabel && <span className="ml-1.5 text-[#777067] dark:text-[#B6AEA1] text-[11px]">({sublabel})</span>}
        </div>
        <div className="flex items-center gap-2">
          {recommendedText && (
            <span className="text-[10px] text-[#94745F] font-mono tracking-wide">{recommendedText}</span>
          )}
          <span className="px-1.5 py-0.5 rounded text-[10px] font-mono font-medium bg-[#EAE5DE] dark:bg-[#38403C] text-[#292722] dark:text-[#F5F2EB]">
            {aspectRatio} Ratio
          </span>
        </div>
      </div>

      {/* Hidden File Input */}
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileSelect}
        accept="image/jpeg,image/png,image/webp,image/svg+xml"
        className="hidden"
      />

      {/* Main Image Box / Upload Zone */}
      <div
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        className={`relative w-full ${aspectClass} max-w-[280px] mx-auto rounded-lg overflow-hidden border-2 transition-all duration-200 flex flex-col items-center justify-center ${
          isDragging
            ? 'border-[#94745F] bg-[#94745F]/10 scale-[1.01]'
            : value
            ? 'border-[#DDD5C9] dark:border-[#3E3C33] bg-[#F7F4EE] dark:bg-[#282D2A]'
            : 'border-dashed border-[#DDD5C9] dark:border-[#3E3C33] bg-[#FAF8F5] dark:bg-[#202422] hover:border-[#94745F]/60'
        }`}
      >
        {isUploading ? (
          <div className="flex flex-col items-center justify-center p-4 text-center">
            <Loader2 className="w-8 h-8 text-[#94745F] animate-spin mb-2" />
            <span className="text-xs text-[#292722] dark:text-[#F5F2EB] font-medium">Uploading &amp; Optimizing...</span>
            <span className="text-[10px] text-[#777067] dark:text-[#B6AEA1] mt-0.5">Storing in /public/uploads/</span>
          </div>
        ) : value ? (
          <div className="relative w-full h-full group">
            {/* Image Preview with object-fit: cover matching website */}
            <Image
              src={value}
              alt={altText || label}
              fill
              unoptimized
              sizes="(max-width: 640px) 100vw, 320px"
              className="object-cover object-center"
            />

            {/* Hover Overlay Controls */}
            <div className="absolute inset-0 bg-[#292722]/60 opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex flex-col items-center justify-center gap-2 p-3">
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#FCFAF6] text-[#292722] text-[11px] font-medium shadow-sm hover:bg-white transition-all cursor-pointer active:scale-95"
              >
                <RefreshCw size={12} />
                <span>Replace Image</span>
              </button>
              <button
                type="button"
                onClick={() => onChange('')}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-red-600/90 text-white text-[11px] font-medium shadow-sm hover:bg-red-700 transition-all cursor-pointer active:scale-95"
              >
                <X size={12} />
                <span>Remove</span>
              </button>
              <span className="text-[10px] text-white/80 font-mono truncate max-w-[220px]">
                {value.split('/').pop()}
              </span>
            </div>
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center p-6 text-center cursor-pointer" onClick={() => fileInputRef.current?.click()}>
            <div className="w-10 h-10 rounded-full bg-[#EAE5DE] dark:bg-[#38403C] flex items-center justify-center text-[#94745F] mb-2.5 shadow-2xs">
              <Upload size={18} />
            </div>
            <p className="text-xs font-medium text-[#292722] dark:text-[#F5F2EB]">
              Drag &amp; drop or <span className="text-[#94745F] underline underline-offset-2">browse</span>
            </p>
            <p className="text-[10px] text-[#777067] dark:text-[#B6AEA1] mt-1">
              Supports JPG, PNG, WEBP (Exact {aspectRatio} card fit)
            </p>
          </div>
        )}
      </div>

      {/* Alternative URL Input Toggle */}
      <div className="flex items-center justify-between pt-1">
        <button
          type="button"
          onClick={() => setShowUrlInput(!showUrlInput)}
          className="inline-flex items-center gap-1 text-[11px] text-[#94745F] hover:underline cursor-pointer"
        >
          <Link2 size={12} />
          <span>{showUrlInput ? 'Hide URL input' : 'Or paste direct image URL'}</span>
        </button>
        {value && (
          <span className="text-[10px] text-[#656B66] font-mono truncate max-w-[180px]">
            {value}
          </span>
        )}
      </div>

      {showUrlInput && (
        <div className="flex items-center gap-2 pt-1 animate-in fade-in duration-150">
          <input
            type="text"
            value={tempUrl}
            onChange={(e) => setTempUrl(e.target.value)}
            placeholder="https://... or /images/..."
            className="flex-1 studio-input text-xs"
          />
          <button
            type="button"
            onClick={handleApplyUrl}
            className="px-3 py-1.5 rounded bg-[#94745F] text-white text-xs font-medium hover:bg-[#7E563B] transition-colors cursor-pointer shrink-0"
          >
            Apply
          </button>
        </div>
      )}

      {/* Alt Text Input (for SEO & Accessibility) */}
      {onAltTextChange && (
        <div className="pt-1">
          <label className="block text-[10.5px] text-[#777067] dark:text-[#B6AEA1] mb-1">
            Image Alt Text (SEO &amp; Screen Readers)
          </label>
          <input
            type="text"
            value={altText || ''}
            onChange={(e) => onAltTextChange(e.target.value)}
            placeholder="e.g. Modern living room with warm sandalwood wall paneling"
            className="w-full studio-input text-xs"
          />
        </div>
      )}

      {/* Error Message */}
      {errorMsg && (
        <p className="text-[11px] text-red-600 bg-red-50 dark:bg-red-950/30 p-2 rounded border border-red-200 dark:border-red-900">
          {errorMsg}
        </p>
      )}
    </div>
  );
};
