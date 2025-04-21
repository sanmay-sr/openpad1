
import { supabase } from "@/integrations/supabase/client";
import { Database } from "@/integrations/supabase/types";

export interface Note {
  id: string;
  content: string;
  url: string;
  created_at: string;
  updated_at: string;
  expires_at: string;
  owner_id: string | null;
  is_reserved: boolean;
  version_number: number;
  previous_versions: any[];
}

export interface NoteWithSnippets extends Note {
  title: string;
  textContent: string;
  codeSnippets: CodeSnippet[];
}

export interface CodeSnippet {
  id: string;
  content: string;
  language: string;
}

interface CreateNoteResponse {
  url: string;
  error?: string;
}

export const createNote = async (
  content: string,
  customUrl: string, // Now required
  isReserved: boolean = false
): Promise<{ url: string; error?: string }> => {
  try {
    if (!customUrl || customUrl.trim() === '') {
      return { url: '', error: 'Custom URL is required' };
    }

    const { data, error } = await supabase.rpc('create_note', {
      p_content: content,
      p_custom_url: customUrl.trim(),
      p_is_reserved: isReserved
    });

    if (error) throw error;
    
    if (data && typeof data === 'object' && 'error' in data) {
      return { url: '', error: data.error as string };
    }
    
    if (data && typeof data === 'object' && 'url' in data) {
      return { url: data.url as string };
    }
    
    return { url: '', error: 'Unexpected response format' };
  } catch (error: any) {
    console.error('Error creating note:', error);
    return { url: '', error: error.message };
  }
};

export const getNote = async (url: string): Promise<Note | null> => {
  try {
    const { data, error } = await supabase
      .from('notes')
      .select('*')
      .eq('url', url)
      .maybeSingle();

    if (error) throw error;
    return data as Note;
  } catch (error) {
    console.error('Error fetching note:', error);
    return null;
  }
};

export const updateNote = async (url: string, content: string): Promise<{ success: boolean; error?: string }> => {
  try {
    const { error } = await supabase
      .from('notes')
      .update({ content })
      .eq('url', url);

    if (error) throw error;
    return { success: true };
  } catch (error: any) {
    console.error('Error updating note:', error);
    return { success: false, error: error.message };
  }
};

export const parseContent = (content: string): { title: string; textContent: string; codeSnippets: CodeSnippet[] } => {
  // Improved parser for code snippets and content
  const codeSnippetRegex = /```(\w+)?\n([\s\S]*?)```/g;
  const codeSnippets: CodeSnippet[] = [];
  let remainingText = content;
  let match;
  
  // Extract code snippets and remove them from content
  while ((match = codeSnippetRegex.exec(content)) !== null) {
    codeSnippets.push({
      id: Math.random().toString(36).substr(2, 9),
      language: match[1] || 'text',
      content: match[2].trim()
    });
    
    // We'll use this to get text without code blocks
    remainingText = remainingText.replace(match[0], '');
  }
  
  // Trim the text content
  remainingText = remainingText.trim();
  
  // Extract title from first line
  const lines = remainingText.split('\n');
  const title = lines[0] || 'Untitled Note';
  const textContent = lines.slice(1).join('\n').trim();
  
  return {
    title,
    textContent,
    codeSnippets
  };
};

export const formatContentWithSnippets = (
  title: string,
  textContent: string,
  codeSnippets: CodeSnippet[]
): string => {
  // Start with the title
  let formattedContent = title;
  
  // Add text content if it exists (with padding)
  if (textContent) {
    formattedContent += '\n\n' + textContent;
  }
  
  // Add each code snippet
  codeSnippets.forEach((snippet) => {
    formattedContent += `\n\n\`\`\`${snippet.language}\n${snippet.content}\n\`\`\``;
  });
  
  return formattedContent;
};
