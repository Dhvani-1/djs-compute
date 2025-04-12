// src/components/DocumentUploader.jsx
import React, { useState } from 'react';
import { useDocumentProcessing } from '../hooks/useDocumentProcessing';

function DocumentUploader({ onClose }) {
  const [files, setFiles] = useState([]);
  const [isDragging, setIsDragging] = useState(false);
  const { uploadDocuments, processing } = useDocumentProcessing();

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    
    const droppedFiles = Array.from(e.dataTransfer.files).filter(
      file => file.type === 'application/pdf' || 
             file.type === 'application/msword' || 
             file.type === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document' ||
             file.type === 'text/plain'
    );
    
    setFiles(prevFiles => [...prevFiles, ...droppedFiles]);
  };

  const handleFileChange = (e) => {
    const selectedFiles = Array.from(e.target.files);
    setFiles(prevFiles => [...prevFiles, ...selectedFiles]);
  };

  const removeFile = (indexToRemove) => {
    setFiles(files.filter((_, index) => index !== indexToRemove));
  };

  const handleSubmit = async () => {
    if (files.length > 0) {
      await uploadDocuments(files);
      onClose();
    }
  };

  return (
    <div className="document-uploader-overlay">
      <div className="document-uploader">
        <div className="uploader-header">
          <h3>Upload Legal Documents</h3>
          <button className="close-button" onClick={onClose}>
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          </button>
        </div>
        
        <div 
          className={`drop-zone ${isDragging ? 'dragging' : ''}`}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
            <polyline points="17 8 12 3 7 8"></polyline>
            <line x1="12" y1="3" x2="12" y2="15"></line>
          </svg>
          <p>Drag and drop files here or</p>
          <label className="file-input-label">
            Browse Files
            <input 
              type="file" 
              accept=".pdf,.doc,.docx,.txt" 
              multiple 
              onChange={handleFileChange} 
              className="file-input"
            />
          </label>
          <p className="file-types">Supported formats: PDF, DOC, DOCX, TXT</p>
        </div>
        
        {files.length > 0 && (
          <div className="file-list">
            <h4>Selected Files:</h4>
            <ul>
              {files.map((file, index) => (
                <li key={index} className="file-item">
                  <span className="file-name">{file.name}</span>
                  <span className="file-size">({(file.size / 1024 / 1024).toFixed(2)} MB)</span>
                  <button 
                    className="remove-file" 
                    onClick={() => removeFile(index)}
                    aria-label="Remove file"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <line x1="18" y1="6" x2="6" y2="18"></line>
                      <line x1="6" y1="6" x2="18" y2="18"></line>
                    </svg>
                  </button>
                </li>
              ))}
            </ul>
          </div>
        )}
        
        <div className="uploader-actions">
          <button className="cancel-button" onClick={onClose}>Cancel</button>
          <button 
            className="upload-submit-button" 
            onClick={handleSubmit} 
            disabled={files.length === 0 || processing}
          >
            {processing ? 'Processing...' : 'Upload & Analyze'}
          </button>
        </div>
      </div>
    </div>
  );
}

export default DocumentUploader;
