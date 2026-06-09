/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

/**
 * Transforms a Google Drive URL into a direct image link.
 * If the URL contains drive.google.com, it extracts the file ID and
 * converts it to: https://lh3.googleusercontent.com/u/0/d/{FILE_ID}
 */
export function getDirectDriveUrl(url: string | undefined): string {
  if (!url) return '';
  
  if (url.includes('drive.google.com')) {
    // Handle formats like:
    // https://drive.google.com/file/d/FILE_ID/view
    // https://drive.google.com/open?id=FILE_ID
    const match = url.match(/\/d\/([a-zA-Z0-9_-]+)/) || url.match(/[?&]id=([a-zA-Z0-9_-]+)/);
    if (match && match[1]) {
      return `https://lh3.googleusercontent.com/u/0/d/${match[1]}`;
    }
  }
  
  return url;
}

/**
 * Robustly copies text to clipboard with fallback.
 */
export async function copyToClipboard(text: string): Promise<boolean> {
  if (navigator.clipboard && window.isSecureContext) {
    try {
      await navigator.clipboard.writeText(text);
      return true;
    } catch (err) {
      console.error('Clipboard API failed:', err);
    }
  }

  // Fallback for non-secure contexts or when Clipboard API fails
  try {
    const textArea = document.createElement("textarea");
    textArea.value = text;
    
    // Ensure it's not visible or distracting
    textArea.style.position = "fixed";
    textArea.style.left = "-9999px";
    textArea.style.top = "0";
    document.body.appendChild(textArea);
    
    textArea.focus();
    textArea.select();
    
    const successful = document.execCommand('copy');
    document.body.removeChild(textArea);
    return successful;
  } catch (err) {
    console.error('Fallback copy failed:', err);
    return false;
  }
}
