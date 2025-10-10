import React from 'react';
import { useThemeStore } from '../stores/ThemeStore';

const LandingPage: React.FC = () => {
  const { theme } = useThemeStore();

  return (
    <div
      className={
        theme ? 'bg-gray-900 min-h-screen text-gray-200' : 'bg-gray-50 min-h-screen text-gray-800'
      }
    >
      {/* Hero Section */}
      <section className={theme ? 'bg-gray-800 text-white py-20' : 'bg-blue-600 text-white py-20'}>
        <div className="container mx-auto px-6 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Real-Time Collaborative Editing</h1>
          <p
            className={
              theme ? 'text-gray-200 text-lg md:text-xl mb-8' : 'text-white text-lg md:text-xl mb-8'
            }
          >
            Edit documents together in real-time, export PDFs, and collaborate seamlessly using Yjs
            and Quill.
          </p>
          <div className="flex justify-center space-x-4">
            <button
              className={
                theme
                  ? 'px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg shadow hover:bg-blue-700 transition'
                  : 'px-6 py-3 bg-white text-blue-600 font-semibold rounded-lg shadow hover:bg-gray-100 transition'
              }
            >
              Get Started
            </button>
            <button
              className={
                theme
                  ? 'px-6 py-3 border border-gray-400 text-gray-200 font-semibold rounded-lg hover:bg-gray-700 hover:text-white transition'
                  : 'px-6 py-3 border border-white text-white font-semibold rounded-lg hover:bg-white hover:text-blue-600 transition'
              }
            >
              Learn More
            </button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section
        className={
          theme
            ? 'py-20 container mx-auto px-6 bg-gray-900'
            : 'py-20 container mx-auto px-6 bg-gray-50'
        }
      >
        <h2
          className={
            theme
              ? 'text-3xl font-bold text-center mb-12 text-white'
              : 'text-3xl font-bold text-center mb-12 text-gray-800'
          }
        >
          Platform Features
        </h2>
        <div className="grid md:grid-cols-3 gap-10">
          {/* Feature Cards */}
          <div
            className={
              theme
                ? 'bg-gray-800 p-6 rounded-lg shadow hover:shadow-lg transition'
                : 'bg-white p-6 rounded-lg shadow hover:shadow-lg transition'
            }
          >
            <h3
              className={
                theme
                  ? 'text-xl font-semibold mb-2 text-white'
                  : 'text-xl font-semibold mb-2 text-gray-800'
              }
            >
              Real-Time Collaboration
            </h3>
            <p className={theme ? 'text-gray-200' : 'text-gray-700'}>
              Multiple users can edit the same document simultaneously. Changes appear instantly
              using <span className="font-semibold">Yjs</span> and{' '}
              <span className="font-semibold">Quill</span>.
            </p>
          </div>

          <div
            className={
              theme
                ? 'bg-gray-800 p-6 rounded-lg shadow hover:shadow-lg transition'
                : 'bg-white p-6 rounded-lg shadow hover:shadow-lg transition'
            }
          >
            <h3
              className={
                theme
                  ? 'text-xl font-semibold mb-2 text-white'
                  : 'text-xl font-semibold mb-2 text-gray-800'
              }
            >
              Export as PDF
            </h3>
            <p className={theme ? 'text-gray-200' : 'text-gray-700'}>
              Easily export your collaborative documents to PDF format, keeping all formatting
              intact. Perfect for sharing or printing.
            </p>
          </div>

          <div
            className={
              theme
                ? 'bg-gray-800 p-6 rounded-lg shadow hover:shadow-lg transition'
                : 'bg-white p-6 rounded-lg shadow hover:shadow-lg transition'
            }
          >
            <h3
              className={
                theme
                  ? 'text-xl font-semibold mb-2 text-white'
                  : 'text-xl font-semibold mb-2 text-gray-800'
              }
            >
              Real-Time Updates & Versioning
            </h3>
            <p className={theme ? 'text-gray-200' : 'text-gray-700'}>
              Keep track of edits, undo changes, and maintain document history seamlessly.
              Collaborate without fear of losing data.
            </p>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className={theme ? 'bg-gray-900 py-20' : 'bg-gray-100 py-20'}>
        <div className="container mx-auto px-6">
          <h2
            className={
              theme
                ? 'text-3xl font-bold text-center mb-12 text-white'
                : 'text-3xl font-bold text-center mb-12 text-gray-800'
            }
          >
            How It Works
          </h2>
          <div className="grid md:grid-cols-2 gap-10 items-center">
            <div>
              <img
                src="https://images.unsplash.com/photo-1581091215364-9b13e591fd1e?auto=format&fit=crop&w=800&q=80"
                alt="Collaborative Editing"
                className="rounded-lg shadow-lg"
              />
            </div>
            <div className="space-y-6">
              <p className={theme ? 'text-gray-200' : 'text-gray-700'}>
                Our platform leverages <span className="font-semibold">Yjs</span> to synchronize
                changes across all users in real-time. No more conflicts or lost edits.
              </p>
              <p className={theme ? 'text-gray-200' : 'text-gray-700'}>
                With <span className="font-semibold">Quill</span>, you get a rich text editor
                experience. Format text, insert images, and see changes as they happen.
              </p>
              <p className={theme ? 'text-gray-200' : 'text-gray-700'}>
                Export your documents as PDFs with a single click. Collaborate efficiently and
                deliver professional documents instantly.
              </p>
              <button
                className={
                  theme
                    ? 'px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition'
                    : 'px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition'
                }
              >
                Try It Now
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-20 text-center">
        <h2
          className={
            theme ? 'text-3xl font-bold mb-4 text-white' : 'text-3xl font-bold mb-4 text-gray-800'
          }
        >
          Ready to Collaborate?
        </h2>
        <p className={theme ? 'text-gray-200 mb-8' : 'text-gray-700 mb-8'}>
          Join your team, start editing documents together, and experience seamless real-time
          collaboration.
        </p>
        <button className="px-8 py-4 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition">
          Get Started for Free
        </button>
      </section>

      {/* Footer */}
      <footer
        className={
          theme
            ? 'bg-gray-800 text-white py-6 text-center'
            : 'bg-gray-800 text-white py-6 text-center'
        }
      >
        <p>© 2025 Collaborative Platform. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default LandingPage;
