// src/hooks/useDocumentProcessing.js
import { useState } from 'react';
import { useChat } from './useChat';

export function useDocumentProcessing() {
  const [processing, setProcessing] = useState(false);
  const { sendMessage } = useChat();

  const uploadDocuments = async (files) => {
    setProcessing(true);
    
    try {
      // In a real implementation, you would upload the files to your server here
      // and process them for legal analysis
      
      // Mock processing time
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Create a message about the uploaded files
      const fileNames = files.map(file => file.name).join(', ');
      const message = `I've uploaded the following documents for analysis: ${fileNames}`;
      
      // Send the message to the chat
      await sendMessage(message);
      
      setProcessing(false);
      return true;
    } catch (error) {
      console.error("Error processing documents:", error);
      setProcessing(false);
      return false;
    }
  };

  return { uploadDocuments, processing };
}
