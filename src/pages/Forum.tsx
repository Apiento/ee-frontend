import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { MessageSquare, Heart, Loader2, Search } from 'lucide-react';
import { useForum } from '../hooks/useForum';
import { CreatePostModal } from '../components/CreatePostModal';
import { AuthModal } from '../components/AuthModal';
import { EventsCarousel } from '../components/EventsCarousel';
import type { Category } from '../types/forum';
import { mockPosts } from '../data/forum';

export function Forum() {
  const { 
    loading, 
    error, 
    searchQuery, 
    setSearchQuery,
    selectedCategory,
    setSelectedCategory,
    createPost,
    isAuthenticated
  } = useForum();
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showAuthModal, setShowAuthModal] = useState(false);

  const handleCreatePost = async (title: string, content: string, category: Category) => {
    await createPost(title, content, category);
    setShowCreateModal(false);
  };

  const handlePostAction = () => {
    if (isAuthenticated) {
      setShowCreateModal(true);
    } else {
      setShowAuthModal(true);
    }
  };

  const categories: Category[] = ['general', 'music', 'events', 'tech', 'culture'];

  if (error) {
    return (
      <div className="text-center text-red-600 p-8">
        <p>Error loading forum posts: {error}</p>
      </div>
    );
  }

  return (
    <div className="space-y-8" id="forum-page">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-6xl tracking-tight max-sm:text-4xl p-6 text-gray-900 mb-2">FORUM</h1>
          <p className="text-body text-gray-600 ml-7">Join the conversation with our community</p>
        </div>
        <button
          onClick={handlePostAction}
          className="button-primary flex items-center space-x-2 mr-6"
        >
          <MessageSquare className="w-4 h-4" id="new-post"/>
          <span>New Post</span>
        </button>
      </div>

      <EventsCarousel />

      <div id="forum" className="flex flex-col md:flex-row gap-6 m-6">
        {/* Filters Sidebar */}
        <div className="md:w-64 shrink-0 space-y-6">
          <div className="relative">
            <Search className="absolute top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search posts..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="input w-full pl-6"
            />
          </div>

          <div className="space-y-2">
            <h2 className="text-xl tracking-tight text-gray-900 mb-3">Categories</h2>
            <button
              onClick={() => setSelectedCategory('all')}
              className={`w-full px-4 py-2 rounded-lg text-sm font-medium transition-colors text-left ${
                selectedCategory === 'all'
                  ? 'bg-gray-900 text-white'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              All Posts
            </button>
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`w-full px-4 py-2 rounded-lg text-sm font-medium transition-colors text-left ${
                  selectedCategory === category
                    ? 'bg-gray-900 text-white'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                {category.charAt(0).toUpperCase() + category.slice(1)}
              </button>
            ))}
          </div>
        </div>

        {/* Posts List */}
        <div className="flex-1">
          {loading ? (
            <div className="flex justify-center items-center p-12">
              <Loader2 className="w-8 h-8 animate-spin text-gray-900" />
            </div>
          ) : (
            <div className="space-y-4">
              {mockPosts.map((post) => (
                <Link
                  key={post.id}
                  to={`/forum/${post.id}`}
                  className="card card-hover block"
                >
                  <div className="p-6">
                    <h2 className="text-3xl max-sm:text-xl tracking-tight text-gray-900 mb-4">{post.title}</h2>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4 text-sm text-gray-500">
                        <div className="flex items-center">
                          <Heart className="w-4 h-4 mr-1" strokeWidth={1.3} />
                          <span>{post.votes}</span>
                        </div>
                        <div className="flex items-center">
                          <MessageSquare className="w-4 h-4 mr-1" strokeWidth={1.3} />
                          <span>{post.replies} Replies</span>
                        </div>
                      </div>
                      <span className="px-3 py-1 bg-gray-100 text-sm rounded-full text-gray-600">
                        {post.category}
                      </span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </div>

      {showCreateModal && (
        <CreatePostModal
          onClose={() => setShowCreateModal(false)}
          onSubmit={handleCreatePost}
        />
      )}

      {showAuthModal && (
        <AuthModal
          isOpen={showAuthModal}
          onClose={() => setShowAuthModal(false)}
        />
      )}
    </div>
  );
}