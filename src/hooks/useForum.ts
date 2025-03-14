import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import { useAuth } from './useAuth';
import type { ForumPost, ForumComment, Category } from '../types/forum';

export function useForum() {
  const [posts, setPosts] = useState<ForumPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<Category | 'all'>('all');
  const { user } = useAuth();

  useEffect(() => {
    fetchPosts();
    
    const subscription = supabase
      .channel('forum_changes')
      .on('postgres_changes', { 
        event: '*', 
        schema: 'public', 
        table: 'forum_posts' 
      }, payload => {
        if (payload.eventType === 'INSERT') {
          setPosts(current => [payload.new as ForumPost, ...current]);
        } else if (payload.eventType === 'UPDATE') {
          setPosts(current => 
            current.map(post => 
              post.id === (payload.new as ForumPost).id ? payload.new as ForumPost : post
            )
          );
        }
      })
      .subscribe();

    return () => {
      subscription.unsubscribe();
    };
  }, [searchQuery, selectedCategory]);

  async function fetchPosts() {
    try {
      let query = supabase
        .from('forum_posts')
        .select(`
          *,
          profiles (
            username,
            avatar_url
          )
        `)
        .order('created_at', { ascending: false });

      if (searchQuery) {
        query = query.or(`title.ilike.%${searchQuery}%,content.ilike.%${searchQuery}%`);
      }

      if (selectedCategory !== 'all') {
        query = query.eq('category', selectedCategory);
      }

      const { data, error } = await query;

      if (error) throw error;
      setPosts(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  }

  async function createPost(title: string, content: string, category: Category) {
    if (!user) throw new Error('Must be logged in to create a post');

    try {
      const { data, error } = await supabase
        .from('forum_posts')
        .insert([{ 
          title, 
          content, 
          category,
          user_id: user.id,
          votes: 0 
        }])
        .select()
        .single();

      if (error) throw error;
      return data;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
      return null;
    }
  }

  async function createComment(postId: string, content: string) {
    if (!user) throw new Error('Must be logged in to comment');

    try {
      const { data, error } = await supabase
        .from('forum_comments')
        .insert([{ 
          post_id: postId, 
          content,
          user_id: user.id,
          votes: 0 
        }])
        .select()
        .single();

      if (error) throw error;
      return data;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
      return null;
    }
  }

  async function votePost(postId: string, increment: boolean) {
    if (!user) throw new Error('Must be logged in to vote');

    try {
      const { error } = await supabase.rpc('vote_post', {
        post_id: postId,
        increment: increment
      });

      if (error) throw error;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    }
  }

  async function voteComment(commentId: string, increment: boolean) {
    if (!user) throw new Error('Must be logged in to vote');

    try {
      const { error } = await supabase.rpc('vote_comment', {
        comment_id: commentId,
        increment: increment
      });

      if (error) throw error;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    }
  }

  return {
    posts,
    loading,
    error,
    searchQuery,
    setSearchQuery,
    selectedCategory,
    setSelectedCategory,
    createPost,
    createComment,
    votePost,
    voteComment,
    isAuthenticated: !!user
  };
}