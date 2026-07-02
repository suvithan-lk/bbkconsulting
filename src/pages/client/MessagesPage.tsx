import { useEffect, useState, useRef } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ArrowLeft,
  Send,
  User,
  Loader2,
  Paperclip,
  Image,
  MoreVertical,
  CheckCircle2,
  Search,
} from 'lucide-react';
import { supabase } from '../../lib/supabase';
import { useAuth } from '../../context/AuthContext';
import type { Message, MessageWithSender, AppointmentWithDetails } from '../../types/database.types';

interface Conversation {
  appointment: AppointmentWithDetails;
  lastMessage?: MessageWithSender;
  unreadCount: number;
}

export function MessagesPage() {
  const [searchParams] = useSearchParams();
  const { user } = useAuth();
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [selectedConversation, setSelectedConversation] = useState<Conversation | null>(null);
  const [messages, setMessages] = useState<MessageWithSender[]>([]);
  const [newMessage, setNewMessage] = useState('');
  const [loading, setLoading] = useState(true);
  const [sending, setSending] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (user) {
      fetchConversations();
    }
  }, [user]);

  useEffect(() => {
    if (selectedConversation) {
      fetchMessages(selectedConversation.appointment.id);
      subscribeToMessages(selectedConversation.appointment.id);
    }
  }, [selectedConversation]);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const fetchConversations = async () => {
    if (!user) return;

    const { data: appointments } = await supabase
      .from('appointments')
      .select(`
        *,
        client:users!client_id(*),
        consultant:consultants(*, user:users(*)),
        service:services(*)
      `)
      .or(`client_id.eq.${user.id}`)
      .order('created_at', { ascending: false });

    if (appointments) {
      const convos: Conversation[] = await Promise.all(
        appointments.map(async (appointment) => {
          const { data: lastMsg } = await supabase
            .from('messages')
            .select('*, sender:users!sender_id(*)')
            .eq('appointment_id', appointment.id)
            .order('created_at', { ascending: false })
            .limit(1)
            .maybeSingle();

          const { count } = await supabase
            .from('messages')
            .select('*', { count: 'exact', head: true })
            .eq('appointment_id', appointment.id)
            .eq('receiver_id', user.id)
            .eq('read', false);

          return {
            appointment: appointment as AppointmentWithDetails,
            lastMessage: lastMsg as MessageWithSender,
            unreadCount: count || 0,
          };
        })
      );

      setConversations(convos);
    }

    setLoading(false);
  };

  const fetchMessages = async (appointmentId: string) => {
    const { data } = await supabase
      .from('messages')
      .select('*, sender:users!sender_id(*)')
      .eq('appointment_id', appointmentId)
      .order('created_at', { ascending: true });

    if (data) {
      setMessages(data as MessageWithSender[]);

      // Mark messages as read
      await supabase
        .from('messages')
        .update({ read: true })
        .eq('appointment_id', appointmentId)
        .eq('receiver_id', user?.id)
        .eq('read', false);
    }
  };

  const subscribeToMessages = (appointmentId: string) => {
    const channel = supabase
      .channel(`messages:${appointmentId}`)
      .on(
        'postgres_changes',
        {
          event: 'INSERT',
          schema: 'public',
          table: 'messages',
          filter: `appointment_id=eq.${appointmentId}`,
        },
        (payload) => {
          const newMsg = payload.new as Message;
          // Fetch the sender info
          supabase
            .from('users')
            .select('*')
            .eq('id', newMsg.sender_id)
            .single()
            .then(({ data: sender }) => {
              if (sender) {
                setMessages((prev) => [...prev, { ...newMsg, sender }]);
              }
            });
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  };

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMessage.trim() || !selectedConversation || !user) return;

    setSending(true);

    const receiverId =
      selectedConversation.appointment.client_id === user.id
        ? selectedConversation.appointment.consultant.user_id
        : selectedConversation.appointment.client_id;

    const { error } = await supabase.from('messages').insert({
      appointment_id: selectedConversation.appointment.id,
      sender_id: user.id,
      receiver_id: receiverId,
      content: newMessage,
    });

    if (!error) {
      setNewMessage('');
    }

    setSending(false);
  };

  const getOtherParticipant = (convo: Conversation) => {
    if (!user) return null;
    return convo.appointment.client_id === user.id
      ? convo.appointment.consultant.user
      : convo.appointment.client;
  };

  const filteredConversations = conversations.filter((convo) => {
    const other = getOtherParticipant(convo);
    return other?.name?.toLowerCase().includes(searchQuery.toLowerCase());
  });

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 pt-24 pb-12">
      <div className="container-custom">
        {/* Back link on mobile */}
        <Link
          to="/client/dashboard"
          className="lg:hidden inline-flex items-center gap-2 text-slate-500 hover:text-slate-700 dark:text-slate-400 mb-4"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Dashboard
        </Link>

        <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-soft border border-slate-100 dark:border-slate-800 overflow-hidden h-[calc(100vh-200px)]">
          <div className="flex h-full">
            {/* Conversations List */}
            <div
              className={`w-full lg:w-80 border-r border-slate-100 dark:border-slate-800 flex flex-col ${
                selectedConversation ? 'hidden lg:flex' : 'flex'
              }`}
            >
              <div className="p-4 border-b border-slate-100 dark:border-slate-800">
                <h2 className="text-lg font-bold mb-4">Messages</h2>
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                  <input
                    type="text"
                    placeholder="Search conversations..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="input pl-10 text-sm"
                  />
                </div>
              </div>

              <div className="flex-1 overflow-y-auto">
                {loading ? (
                  <div className="p-4 space-y-4">
                    {[1, 2, 3].map((i) => (
                      <div key={i} className="animate-pulse flex gap-3">
                        <div className="w-12 h-12 bg-slate-200 dark:bg-slate-700 rounded-full" />
                        <div className="flex-1">
                          <div className="h-4 bg-slate-200 dark:bg-slate-700 rounded w-1/2 mb-2" />
                          <div className="h-3 bg-slate-200 dark:bg-slate-700 rounded w-full" />
                        </div>
                      </div>
                    ))}
                  </div>
                ) : filteredConversations.length > 0 ? (
                  filteredConversations.map((convo) => {
                    const other = getOtherParticipant(convo);
                    return (
                      <button
                        key={convo.appointment.id}
                        onClick={() => setSelectedConversation(convo)}
                        className={`w-full p-4 flex items-center gap-3 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors ${
                          selectedConversation?.appointment.id === convo.appointment.id
                            ? 'bg-primary-50 dark:bg-primary-900/20'
                            : ''
                        }`}
                      >
                        <div className="relative">
                          <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary-400 to-primary-600 flex items-center justify-center text-white font-medium">
                            {other?.avatar_url ? (
                              <img
                                src={other.avatar_url}
                                alt={other.name}
                                className="w-full h-full rounded-full object-cover"
                              />
                            ) : (
                              other?.name?.charAt(0)
                            )}
                          </div>
                          {convo.unreadCount > 0 && (
                            <span className="absolute -top-1 -right-1 w-5 h-5 bg-primary-600 text-white text-xs rounded-full flex items-center justify-center">
                              {convo.unreadCount}
                            </span>
                          )}
                        </div>
                        <div className="flex-1 text-left min-w-0">
                          <div className="flex items-center justify-between mb-1">
                            <p className="font-medium truncate">{other?.name}</p>
                            {convo.lastMessage && (
                              <span className="text-xs text-slate-400">
                                {new Date(convo.lastMessage.created_at).toLocaleDateString()}
                              </span>
                            )}
                          </div>
                          <p className="text-sm text-slate-500 truncate">
                            {convo.lastMessage?.content || 'No messages yet'}
                          </p>
                        </div>
                      </button>
                    );
                  })
                ) : (
                  <div className="p-8 text-center">
                    <User className="w-12 h-12 text-slate-300 mx-auto mb-4" />
                    <p className="text-slate-500">No conversations yet</p>
                  </div>
                )}
              </div>
            </div>

            {/* Chat Area */}
            <div className={`flex-1 flex flex-col ${!selectedConversation ? 'hidden lg:flex' : 'flex'}`}>
              {selectedConversation ? (
                <>
                  {/* Chat Header */}
                  <div className="p-4 border-b border-slate-100 dark:border-slate-800 flex items-center gap-4">
                    <button
                      onClick={() => setSelectedConversation(null)}
                      className="lg:hidden p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg"
                    >
                      <ArrowLeft className="w-5 h-5" />
                    </button>
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary-400 to-primary-600 flex items-center justify-center text-white">
                      {getOtherParticipant(selectedConversation)?.avatar_url ? (
                        <img
                          src={getOtherParticipant(selectedConversation)?.avatar_url}
                          alt=""
                          className="w-full h-full rounded-full object-cover"
                        />
                      ) : (
                        getOtherParticipant(selectedConversation)?.name?.charAt(0)
                      )}
                    </div>
                    <div className="flex-1">
                      <p className="font-semibold">
                        {getOtherParticipant(selectedConversation)?.name}
                      </p>
                      <p className="text-xs text-slate-500">
                        {selectedConversation.appointment.service.title}
                      </p>
                    </div>
                    <button className="p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg">
                      <MoreVertical className="w-5 h-5 text-slate-400" />
                    </button>
                  </div>

                  {/* Messages */}
                  <div className="flex-1 overflow-y-auto p-4 space-y-4">
                    <AnimatePresence>
                      {messages.map((message) => (
                        <motion.div
                          key={message.id}
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          className={`flex ${
                            message.sender_id === user?.id
                              ? 'justify-end'
                              : 'justify-start'
                          }`}
                        >
                          <div
                            className={`max-w-[70%] rounded-2xl px-4 py-3 ${
                              message.sender_id === user?.id
                                ? 'bg-primary-600 text-white'
                                : 'bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-white'
                            }`}
                          >
                            <p className="text-sm">{message.content}</p>
                            <div className="flex items-center justify-end gap-1 mt-1">
                              <span className={`text-xs ${
                                message.sender_id === user?.id
                                  ? 'text-primary-200'
                                  : 'text-slate-400'
                              }`}>
                                {new Date(message.created_at).toLocaleTimeString([], {
                                  hour: '2-digit',
                                  minute: '2-digit',
                                })}
                              </span>
                              {message.sender_id === user?.id && (
                                <CheckCircle2 className="w-3 h-3 text-primary-200" />
                              )}
                            </div>
                          </div>
                        </motion.div>
                      ))}
                    </AnimatePresence>
                    <div ref={messagesEndRef} />
                  </div>

                  {/* Message Input */}
                  <form
                    onSubmit={handleSendMessage}
                    className="p-4 border-t border-slate-100 dark:border-slate-800"
                  >
                    <div className="flex items-center gap-3">
                      <button
                        type="button"
                        className="p-2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-300"
                      >
                        <Paperclip className="w-5 h-5" />
                      </button>
                      <button
                        type="button"
                        className="p-2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-300"
                      >
                        <Image className="w-5 h-5" />
                      </button>
                      <input
                        type="text"
                        value={newMessage}
                        onChange={(e) => setNewMessage(e.target.value)}
                        placeholder="Type a message..."
                        className="input flex-1"
                        disabled={sending}
                      />
                      <button
                        type="submit"
                        disabled={!newMessage.trim() || sending}
                        className="btn-primary"
                      >
                        {sending ? (
                          <Loader2 className="w-5 h-5 animate-spin" />
                        ) : (
                          <Send className="w-5 h-5" />
                        )}
                      </button>
                    </div>
                  </form>
                </>
              ) : (
                <div className="flex-1 flex items-center justify-center">
                  <div className="text-center">
                    <User className="w-16 h-16 text-slate-300 mx-auto mb-4" />
                    <p className="text-slate-500">Select a conversation to start messaging</p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
