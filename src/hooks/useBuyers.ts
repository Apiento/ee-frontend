import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';

interface Buyer {
  id: string;
  username: string;
  avatar_url: string;
  purchase_date: string;
  is_following: boolean;
}

export function useBuyers(releaseId: string) {
  const [buyers, setBuyers] = useState<Buyer[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchBuyers = async () => {
      try {
        const { data, error } = await supabase
          .rpc('get_release_buyers', { release_id: releaseId });

        if (error) throw error;

        setBuyers(data.map(buyer => ({
          id: buyer.user_id,
          username: buyer.username,
          avatar_url: buyer.avatar_url,
          purchase_date: buyer.purchase_date,
          is_following: buyer.is_following
        })));
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred');
      } finally {
        setLoading(false);
      }
    };

    fetchBuyers();

    // Subscribe to new purchases
    const subscription = supabase
      .channel('purchase_items')
      .on('postgres_changes', {
        event: 'INSERT',
        schema: 'public',
        table: 'purchase_items',
        filter: `release_id=eq.${releaseId}`
      }, () => {
        // Refresh the buyers list when a new purchase is made
        fetchBuyers();
      })
      .subscribe();

    return () => {
      subscription.unsubscribe();
    };
  }, [releaseId]);

  const toggleFollow = async (userId: string) => {
    try {
      const { data: artistData } = await supabase
        .from('releases')
        .select('artist_id')
        .eq('id', releaseId)
        .single();

      if (!artistData) throw new Error('Release not found');

      const { error } = await supabase
        .from('artist_follows')
        .upsert(
          { user_id: userId, artist_id: artistData.artist_id },
          { onConflict: 'user_id,artist_id' }
        );

      if (error) throw error;

      setBuyers(current =>
        current.map(buyer =>
          buyer.id === userId
            ? { ...buyer, is_following: !buyer.is_following }
            : buyer
        )
      );
    } catch (err) {
      console.error('Error toggling follow:', err);
    }
  };

  return { buyers, loading, error, toggleFollow };
}