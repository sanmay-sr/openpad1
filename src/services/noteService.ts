
import { supabase } from "@/integrations/supabase/client";

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

export const createNote = async (
  content: string,
  customUrl: string | null = null,
  isReserved: boolean = false
): Promise<{ url: string; error?: string }> => {
  try {
    const { data, error } = await supabase.rpc('create_note', {
      p_content: content,
      p_custom_url: customUrl,
      p_is_reserved: isReserved
    });

    if (error) throw error;
    
    if (data?.error) {
      return { url: '', error: data.error };
    }
    
    return { url: data.url };
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
    return data;
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
  // This is a simple parser - in a real app you might want a more robust solution
  const codeSnippetRegex = /```(\w+)?\n([\s\S]*?)```/g;
  const codeSnippets: CodeSnippet[] = [];
  let match;
  
  // Extract code snippets
  while ((match = codeSnippetRegex.exec(content)) !== null) {
    codeSnippets.push({
      id: Math.random().toString(36).substr(2, 9),
      language: match[1] || 'text',
      content: match[2].trim()
    });
  }
  
  // Remove code snippets from content
  const textContent = content.replace(codeSnippetRegex, '').trim();
  
  // Extract title from first line
  const lines = textContent.split('\n');
  const title = lines[0] || 'Untitled Note';
  const remainingText = lines.slice(1).join('\n').trim();
  
  return {
    title,
    textContent: remainingText,
    codeSnippets
  };
};

export const formatContentWithSnippets = (
  title: string,
  textContent: string,
  codeSnippets: CodeSnippet[]
): string => {
  let formattedContent = title + '\n\n' + textContent;
  
  codeSnippets.forEach((snippet) => {
    formattedContent += `\n\n\`\`\`${snippet.language}\n${snippet.content}\n\`\`\``;
  });
  
  return formattedContent;
};
