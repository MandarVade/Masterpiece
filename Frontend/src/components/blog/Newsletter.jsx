import React from 'react';
import { Mail, Send } from 'lucide-react';

const Newsletter = () => {
  return (
    <section className="relative bg-gradient-to-br from-purple-600 via-pink-600 to-blue-600 rounded-3xl overflow-hidden p-12 lg:p-16">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
        }} />
      </div>

      {/* Glow Effects */}
      <div className="absolute top-0 left-1/4 w-64 h-64 bg-white/10 rounded-full blur-3xl" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-blue-400/10 rounded-full blur-3xl" />

      <div className="relative grid lg:grid-cols-2 gap-12 items-center">
        {/* Left Content */}
        <div className="text-white space-y-6">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-white/20 backdrop-blur-sm rounded-2xl">
            <Mail className="w-8 h-8" />
          </div>

          <div>
            <h2 className="text-3xl lg:text-4xl font-bold mb-4">
              Subscribe to Our Newsletter
            </h2>
            <p className="text-lg text-white/90">
              Get the latest art news, exclusive insights, and special offers delivered straight to your inbox every week.
            </p>
          </div>

          {/* Features */}
          <div className="space-y-3">
            {[
              'Weekly art inspiration and stories',
              'Exclusive interviews with artists',
              'Early access to new collections',
              'Special subscriber-only discounts'
            ].map((feature, index) => (
              <div key={index} className="flex items-center gap-3">
                <div className="w-2 h-2 bg-white rounded-full" />
                <span className="text-white/90">{feature}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Right Form */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-2xl">
          <form className="space-y-4">
            <div>
              <label className="block text-sm font-semibold text-gray-900 dark:text-white mb-2">
                Your Name
              </label>
              <input 
                type="text"
                placeholder="John Doe"
                className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-600 dark:text-white transition-all"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-900 dark:text-white mb-2">
                Email Address
              </label>
              <input 
                type="email"
                placeholder="john@example.com"
                className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-600 dark:text-white transition-all"
              />
            </div>

            <div className="flex items-start gap-3">
              <input 
                type="checkbox"
                id="terms"
                className="mt-1 w-4 h-4 text-purple-600 border-gray-300 rounded focus:ring-purple-500"
              />
              <label htmlFor="terms" className="text-sm text-gray-600 dark:text-gray-400">
                I agree to receive marketing emails and accept the{' '}
                <a href="#" className="text-purple-600 dark:text-purple-400 hover:underline">
                  Privacy Policy
                </a>
              </label>
            </div>

            <button 
              type="submit"
              className="w-full flex items-center justify-center gap-2 py-4 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-xl font-semibold hover:shadow-lg transform hover:scale-105 transition-all duration-300"
            >
              Subscribe Now
              <Send className="w-5 h-5" />
            </button>
          </form>

          <p className="text-xs text-center text-gray-500 dark:text-gray-400 mt-4">
            Join 50,000+ art enthusiasts already subscribed
          </p>
        </div>
      </div>
    </section>
  );
};

export default Newsletter;