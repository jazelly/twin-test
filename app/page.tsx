'use client'

import { useState } from 'react'

export default function Home() {
  const [prompt, setPrompt] = useState('')
  const [isGenerating, setIsGenerating] = useState(false)
  const [generatedApp, setGeneratedApp] = useState<{
    title: string
    description: string
    code: string
  } | null>(null)
  const [showToast, setShowToast] = useState(false)

  const handleGenerate = async () => {
    if (!prompt.trim()) return

    setIsGenerating(true)
    setGeneratedApp(null)

    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2500))

    // Mock generated app
    const mockApp = {
      title: prompt.split(' ').slice(0, 4).join(' '),
      description: `A fully functional ${prompt.toLowerCase()} built with Next.js, React, and TypeScript. Features a modern UI with responsive design.`,
      code: `import { useState } from 'react'

export default function GeneratedApp() {
  const [count, setCount] = useState(0)

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900">
      <div className="container mx-auto px-4 py-16">
        <h1 className="text-4xl font-bold text-white mb-8">
          ${prompt}
        </h1>
        
        <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 shadow-2xl">
          <p className="text-white text-xl mb-6">
            Counter: {count}
          </p>
          
          <button
            onClick={() => setCount(count + 1)}
            className="bg-gradient-to-r from-cyan-500 to-blue-500 text-white px-8 py-3 rounded-lg font-semibold hover:shadow-lg transition-all"
          >
            Increment
          </button>
        </div>
      </div>
    </div>
  )
}`
    }

    setGeneratedApp(mockApp)
    setIsGenerating(false)
  }

  const handleDeploy = () => {
    setShowToast(true)
    setTimeout(() => setShowToast(false), 3000)
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-violet-900">
      {/* Toast Notification */}
      {showToast && (
        <div className="fixed top-4 right-4 bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg z-50 animate-bounce">
          ð Deploying to Vercel...
        </div>
      )}

      {/* Header */}
      <div className="container mx-auto px-4 py-8">
        <div className="text-center mb-12">
          <h1 className="text-6xl font-bold text-white mb-4 bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 bg-clip-text text-transparent">
            App Generator
          </h1>
          <p className="text-xl text-gray-300">
            Describe your dream app and watch it come to life
          </p>
        </div>

        {/* Input Section */}
        <div className="max-w-4xl mx-auto mb-12">
          <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 shadow-2xl border border-white/20">
            <label htmlFor="prompt" className="block text-white text-lg font-semibold mb-4">
              What app do you want to build?
            </label>
            <textarea
              id="prompt"
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              placeholder="Example: A todo list app with drag and drop functionality, dark mode, and local storage..."
              className="w-full h-40 bg-gray-900/50 text-white rounded-xl p-4 border border-gray-700 focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/50 outline-none transition-all resize-none"
              disabled={isGenerating}
            />
            <button
              onClick={handleGenerate}
              disabled={!prompt.trim() || isGenerating}
              className="mt-6 w-full bg-gradient-to-r from-cyan-500 via-blue-500 to-purple-500 text-white py-4 rounded-xl font-bold text-lg hover:shadow-2xl hover:shadow-cyan-500/50 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isGenerating ? (
                <span className="flex items-center justify-center">
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Generating Your App...
                </span>
              ) : (
                'â¨ Generate App'
              )}
            </button>
          </div>
        </div>

        {/* Generated App Preview */}
        {generatedApp && (
          <div className="max-w-6xl mx-auto space-y-8 animate-fadeIn">
            {/* App Info */}
            <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 shadow-2xl border border-white/20">
              <h2 className="text-3xl font-bold text-white mb-4">
                {generatedApp.title}
              </h2>
              <p className="text-gray-300 text-lg">
                {generatedApp.description}
              </p>
            </div>

            {/* Mock Preview */}
            <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 shadow-2xl border border-white/20">
              <h3 className="text-2xl font-bold text-white mb-6">Live Preview</h3>
              <div className="bg-gradient-to-br from-purple-600 to-blue-600 rounded-xl p-8 aspect-video flex items-center justify-center">
                <div className="text-center">
                  <div className="text-6xl mb-4">ð¨</div>
                  <p className="text-white text-2xl font-semibold">Your App Preview</p>
                  <p className="text-white/80 mt-2">Fully responsive and production-ready</p>
                </div>
              </div>
            </div>

            {/* Generated Code */}
            <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 shadow-2xl border border-white/20">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-2xl font-bold text-white">Generated Code</h3>
                <button
                  onClick={() => navigator.clipboard.writeText(generatedApp.code)}
                  className="bg-gray-700 hover:bg-gray-600 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors"
                >
                  Copy Code
                </button>
              </div>
              <pre className="bg-gray-950 rounded-xl p-6 overflow-x-auto border border-gray-800">
                <code className="text-green-400 text-sm font-mono">
                  {generatedApp.code}
                </code>
              </pre>
            </div>

            {/* Deploy Button */}
            <div className="text-center">
              <button
                onClick={handleDeploy}
                className="bg-black hover:bg-gray-900 text-white px-12 py-4 rounded-xl font-bold text-lg shadow-xl hover:shadow-2xl transition-all inline-flex items-center gap-3"
              >
                <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 2L2 19.7778H22L12 2Z" />
                </svg>
                Deploy to Vercel
              </button>
            </div>
          </div>
        )}

        {/* Features Section */}
        {!generatedApp && !isGenerating && (
          <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-8 mt-16">
            <div className="bg-white/5 backdrop-blur-lg rounded-xl p-6 border border-white/10">
              <div className="text-4xl mb-4">â¡</div>
              <h3 className="text-xl font-bold text-white mb-2">Lightning Fast</h3>
              <p className="text-gray-400">Generate production-ready apps in seconds</p>
            </div>
            <div className="bg-white/5 backdrop-blur-lg rounded-xl p-6 border border-white/10">
              <div className="text-4xl mb-4">ð¨</div>
              <h3 className="text-xl font-bold text-white mb-2">Beautiful UI</h3>
              <p className="text-gray-400">Modern, responsive designs out of the box</p>
            </div>
            <div className="bg-white/5 backdrop-blur-lg rounded-xl p-6 border border-white/10">
              <div className="text-4xl mb-4">ð</div>
              <h3 className="text-xl font-bold text-white mb-2">Deploy Instantly</h3>
              <p className="text-gray-400">One-click deployment to Vercel</p>
            </div>
          </div>
        )}
      </div>
    </main>
  )
}