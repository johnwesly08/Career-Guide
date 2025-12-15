'use client';
import { Upload, FileText, X } from 'lucide-react';

interface ResumeUploaderProps {
  onFileSelect: (file: File | null) => void;
  selectedFile: File | null;
}

export default function ResumeUploader({ onFileSelect, selectedFile }: ResumeUploaderProps) {
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && file.type === 'application/pdf') {
      onFileSelect(file);
    }
  };

  const handleRemove = () => {
    onFileSelect(null);
  };

  return (
    <div className="space-y-3">
      <label className="text-sm font-semibold flex items-center gap-2 text-slate-900 dark:text-slate-100">
        <FileText className="w-4 h-4" />
        Resume Upload
      </label>
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-6">
        {!selectedFile ? (
          <div className="border-2 border-dashed border-slate-300 dark:border-slate-700 rounded-xl p-8 text-center hover:border-indigo-600 dark:hover:border-indigo-500 transition-all cursor-pointer">
            <input
              type="file"
              accept=".pdf"
              onChange={handleFileChange}
              className="hidden"
              id="resume-upload"
            />
            <label htmlFor="resume-upload" className="cursor-pointer block">
              <Upload className="w-12 h-12 mx-auto mb-3 text-slate-400" />
              <p className="font-medium text-slate-900 dark:text-slate-100">Drop your PDF here</p>
              <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">or click to browse</p>
            </label>
          </div>
        ) : (
          <div className="flex items-center justify-between p-4 bg-indigo-50 dark:bg-indigo-950/20 border border-indigo-200 dark:border-indigo-900 rounded-lg">
            <div className="flex items-center gap-3">
              <FileText className="w-5 h-5 text-indigo-600" />
              <div>
                <p className="font-medium text-slate-900 dark:text-slate-100">{selectedFile.name}</p>
                <p className="text-sm text-slate-600 dark:text-slate-400">
                  {(selectedFile.size / 1024).toFixed(2)} KB
                </p>
              </div>
            </div>
            <button
              onClick={handleRemove}
              className="p-2 hover:bg-red-100 dark:hover:bg-red-950 rounded-lg transition-all"
            >
              <X className="w-4 h-4 text-red-600" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
}