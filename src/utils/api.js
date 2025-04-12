// src/utils/api.js
const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:3001/api';

export async function fetchChat(message, conversationId, documents = []) {
  try {
    const response = await fetch(`${API_URL}/chat`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        message,
        conversationId,
        documents,
      }),
    });

    if (!response.ok) {
      throw new Error(`API error: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error('Error in chat API:', error);
    throw error;
  }
}

export async function uploadDocument(file) {
  const formData = new FormData();
  formData.append('document', file);

  try {
    const response = await fetch(`${API_URL}/documents/upload`, {
      method: 'POST',
      body: formData,
    });

    if (!response.ok) {
      throw new Error(`API error: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error('Error uploading document:', error);
    throw error;
  }
}
