import { useState, useRef, useEffect } from 'react'
import { io } from 'socket.io-client'

const socket = io('http://localhost:3000')

const App = () => {
  const [messages, setMessages] = useState([
    { sender: 'ai', text: 'Hello! How can I help you today?' }
  ])
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)
  const chatEndRef = useRef(null)

  // Scroll to bottom on new message
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages, loading])

  // Socket event for receiving AI response
  useEffect(() => {
    socket.on('ai-response', (data) => {
      setMessages(prev => [
        ...prev,
        { sender: 'ai', text: data.response }
      ])
      setLoading(false)
    })

    // Clean up on unmount
    return () => {
      socket.off('ai-response')
    }
  }, [])

  const handleSend = (e) => {
    e.preventDefault()
    if (!input.trim() || loading) return

    // Add user message
    setMessages(prev => [
      ...prev,
      { sender: 'user', text: input }
    ])
    setLoading(true)
    socket.emit('message', input)
    setInput('')
  }

  return (
    <div className="w-screen h-screen bg-gradient-to-br from-indigo-200 via-blue-100 to-pink-100 flex justify-center items-center">
      <div className="w-full max-w-xl h-[90%] bg-white rounded-3xl shadow-2xl flex flex-col border border-blue-100">
        {/* Header */}
        <div className="w-full h-16 bg-gradient-to-r from-indigo-500 via-blue-400 to-pink-400 rounded-t-3xl flex items-center justify-center text-2xl font-bold text-white tracking-wide shadow">
          AI Chatbot
        </div>

        {/* Chat Area */}
        <div className="flex-1 overflow-y-auto p-6 space-y-4 transition-all">
          {messages.map((msg, idx) => (
            <div
              key={idx}
              className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'} animate-fade-in`}
            >
              <div
                className={`px-5 py-3 rounded-xl shadow-sm max-w-[70%] text-base transition-all
                  ${msg.sender === 'user'
                    ? 'bg-gradient-to-r from-blue-400 to-indigo-400 text-white'
                    : 'bg-gradient-to-r from-pink-200 to-blue-100 text-gray-800'
                  }`}
              >
                {msg.text}
              </div>
            </div>
          ))}
          {loading && (
            <div className="flex justify-start animate-fade-in">
              <div className="px-5 py-3 rounded-xl max-w-[70%] bg-gradient-to-r from-pink-200 to-blue-100 text-gray-800 flex items-center gap-2">
                <span className="loader"></span>
                <span>AI is typing...</span>
              </div>
            </div>
          )}
          <div ref={chatEndRef} />
        </div>

        {/* Footer/Input */}
        <form
          className="flex w-full h-18 bg-zinc-100 rounded-b-3xl items-center px-4 gap-2"
          onSubmit={handleSend}
        >
          <input
            type="text"
            className="flex-1 h-12 bg-zinc-200 rounded-xl px-4 outline-none text-gray-700 text-lg transition-all focus:ring-2 focus:ring-blue-300"
            placeholder="Type your query..."
            value={input}
            onChange={e => setInput(e.target.value)}
            autoFocus
            disabled={loading}
          />
          <button
            type="submit"
            className={`bg-gradient-to-r from-indigo-500 to-blue-500 text-white px-6 py-2 rounded-xl font-semibold shadow hover:scale-105 active:scale-95 transition-all duration-150 ${loading ? 'opacity-60 cursor-not-allowed' : ''}`}
            disabled={loading}
          >
            {loading ? 'Waiting...' : 'Send'}
          </button>
        </form>
      </div>

      {/* Animations & Loader */}
      <style>{`
        .animate-fade-in {
          animation: fadeIn 0.5s ease;
        }
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px);}
          to { opacity: 1; transform: translateY(0);}
        }
        .loader {
          width: 18px;
          height: 18px;
          border: 3px solid #a5b4fc;
          border-top: 3px solid #6366f1;
          border-radius: 50%;
          animation: spin 0.8s linear infinite;
          display: inline-block;
        }
        @keyframes spin {
          to { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  )
}

export default App
