import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Heart, MessageCircle, User, Clock } from 'lucide-react';
import { format } from 'date-fns';
import { RichTextEditor } from '../components/RichTextEditor';
import { useForum } from '../hooks/useForum';

// Mock thread data
const mockThread = {
  id: '1',
  title: 'The Evolution of Electronic Music Production',
  content: `
    <p>From hardware synthesizers to DAWs, the journey of electronic music production has been fascinating. What are your thoughts on the current state of music production technology?</p>
    
    <p>Key developments we've seen:</p>
    <ul>
      <li>The rise of software synthesizers and virtual instruments</li>
      <li>Democratization of music production through affordable DAWs</li>
      <li>The return of hardware and modular synthesis</li>
      <li>Integration of AI and machine learning in music production</li>
    </ul>
    
    <p>I'm particularly interested in hearing about your experiences with both hardware and software approaches. What's your preferred setup? How do you think technology has influenced creativity in electronic music?</p>
  `,
  category: 'music',
  votes: 42,
  created_at: '2024-02-14T10:00:00Z',
  profiles: {
    username: 'Sarah Chen',
    avatar_url: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&q=80'
  },
  comments: [
    {
      id: '1',
      content: 'Great points about the democratization of music production. The accessibility of tools has definitely lowered the barrier to entry.',
      created_at: '2024-02-14T10:30:00Z',
      profiles: {
        username: 'Michael Kim',
        avatar_url: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&q=80'
      },
      votes: 15
    },
    {
      id: '2',
      content: 'While I appreciate the convenience of modern DAWs, there\'s something special about hardware that software can\'t quite replicate.',
      created_at: '2024-02-14T11:00:00Z',
      profiles: {
        username: 'Emma Thompson',
        avatar_url: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&q=80'
      },
      votes: 12
    }
  ]
};

export function ThreadPage() {
  const { id } = useParams();
  const [replyContent, setReplyContent] = useState('');
  const { isAuthenticated, createComment } = useForum();

  const handleSubmitReply = async (e: React.FormEvent) => {
    e.preventDefault();
    if (replyContent.trim()) {
      await createComment(mockThread.id, replyContent);
      setReplyContent('');
    }
  };

  return (
    <div className="space-y-8">
      <Link
        to="/forum"
        className="inline-flex items-center text-gray-600 hover:text-gray-900"
      >
        <ArrowLeft className="w-4 h-4 mr-2" />
        Back to Forum
      </Link>

      <article className="card">
        <div className="p-6 space-y-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <img
                src={mockThread.profiles.avatar_url}
                alt={mockThread.profiles.username}
                className="w-10 h-10 rounded-full object-cover"
              />
              <div>
                <span className="text-gray-900 font-medium">{mockThread.profiles.username}</span>
                <div className="flex items-center text-sm text-gray-500">
                  <Clock className="w-4 h-4 mr-1" />
                  <time dateTime={mockThread.created_at}>
                    {format(new Date(mockThread.created_at), 'PPp')}
                  </time>
                </div>
              </div>
            </div>
            <span className="px-3 py-1 bg-gray-100 text-sm rounded-full text-gray-600">
              {mockThread.category}
            </span>
          </div>

          <div>
            <h1 className="text-2xl font-display font-semibold text-gray-900 mb-4">{mockThread.title}</h1>
            <div 
              className="prose prose-gray max-w-none"
              dangerouslySetInnerHTML={{ __html: mockThread.content }}
            />
          </div>

          <div className="flex items-center justify-between pt-6 border-t border-gray-200">
            <div className="flex items-center space-x-4">
              <button className="flex items-center text-gray-500 hover:text-gray-900">
                <Heart className="w-5 h-5 mr-1" />
                <span>{mockThread.votes}</span>
              </button>
              <button className="flex items-center text-gray-500 hover:text-gray-900">
                <MessageCircle className="w-5 h-5 mr-1" />
                <span>{mockThread.comments.length} Replies</span>
              </button>
            </div>
          </div>
        </div>
      </article>

      <div className="space-y-4">
        <h2 className="text-xl font-display font-semibold text-gray-900">Replies</h2>
        {mockThread.comments.map(comment => (
          <article key={comment.id} className="card">
            <div className="p-6 space-y-4">
              <div className="flex items-center space-x-4">
                <img
                  src={comment.profiles.avatar_url}
                  alt={comment.profiles.username}
                  className="w-8 h-8 rounded-full object-cover"
                />
                <div>
                  <span className="text-gray-900 font-medium">{comment.profiles.username}</span>
                  <div className="flex items-center text-sm text-gray-500">
                    <Clock className="w-4 h-4 mr-1" />
                    <time dateTime={comment.created_at}>
                      {format(new Date(comment.created_at), 'PPp')}
                    </time>
                  </div>
                </div>
              </div>
              <p className="text-gray-600">{comment.content}</p>
              <div className="flex items-center space-x-4">
                <button className="flex items-center text-gray-500 hover:text-gray-900">
                  <Heart className="w-4 h-4 mr-1" />
                  <span>{comment.votes}</span>
                </button>
              </div>
            </div>
          </article>
        ))}
      </div>

      {isAuthenticated ? (
        <form onSubmit={handleSubmitReply} className="space-y-4">
          <h2 className="text-xl font-display font-semibold text-gray-900">Post a Reply</h2>
          <RichTextEditor content={replyContent} onChange={setReplyContent} />
          <div className="flex justify-end">
            <button type="submit" className="button-primary">
              Post Reply
            </button>
          </div>
        </form>
      ) : (
        <div className="card p-6 text-center">
          <p className="text-gray-600 mb-4">You need to be logged in to reply to this thread.</p>
          <Link to="/login" className="button-primary inline-flex">
            Sign In to Reply
          </Link>
        </div>
      )}
    </div>
  );
}