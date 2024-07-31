import { useRef, useState } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { FiMaximize2, FiMinimize2 } from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';

const CreatePost = () => {
  const [heading, setHeading] = useState('');
  const [author, setAuthor] = useState('');
  const [content, setContent] = useState('');
  const [isFullScreen, setIsFullScreen] = useState(false);
  const navigate = useNavigate();
  const quillRef = useRef(null);

  const handleHeadingChange = (e) => setHeading(e.target.value);
  const handleAuthorChange = (e) => setAuthor(e.target.value);
  const handleContentChange = (value) => setContent(value);
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Post Submitted:', { heading, author, content });
  };
  const handleExpand = () => setIsFullScreen(true);
  const handleShrink = () => setIsFullScreen(false);
  const goToDashboard = () => navigate('/dashboard');

  const modules = {
    toolbar: [
      [{ header: '1' }, { header: '2' }, { font: [] }],
      [{ list: 'ordered' }, { list: 'bullet' }],
      ['bold', 'italic', 'underline', 'strike', 'blockquote'],
      [{ color: [] }, { background: [] }],
      [{ align: [] }],
      ['link', 'image', 'video'],
      ['clean'],
    ],
  };

  const formats = [
    'header',
    'font',
    'list',
    'bullet',
    'bold',
    'italic',
    'underline',
    'strike',
    'blockquote',
    'color',
    'background',
    'align',
    'link',
    'image',
    'video',
  ];

  const editorClass = isFullScreen
    ? 'fixed inset-0 mt-0 bg-white z-50 p-8 rounded-lg text-center shadow-lg h-full w-full'
    : 'relative bg-white w-full max-w-3xl mx-4 p-8 text-center rounded-lg shadow-lg h-[97vh]';

  return (
    <div className={`fixed inset-0 mt-0 flex items-center justify-center ${isFullScreen ? '' : 'bg-black bg-opacity-50'}`}>
      <div className={editorClass}>
        <div className="flex justify-between items-center mb-2">
          <h2 className="xs:text-sm text-2xl xs:leading-3 font-semibold animate-fadeIn">Create a New Post</h2>
          {isFullScreen ? (
            <FiMinimize2 onClick={handleShrink} className="cursor-pointer animate-slideIn" size={24} />
          ) : (
            <FiMaximize2 onClick={handleExpand} className="cursor-pointer animate-slideIn" size={24} />
          )}
        </div>
        <input
          type="text"
          value={heading}
          onChange={handleHeadingChange}
          placeholder="Enter post title"
          className="w-full p-2 mb-4 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400 animate-slideIn"
        />
        <input
          type="text"
          value={author}
          onChange={handleAuthorChange}
          placeholder="Enter author name"
          className="w-full p-2 mb-4 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400 animate-slideIn"
        />
        <ReactQuill
          theme="snow"
          value={content}
          onChange={handleContentChange}
          modules={modules}
          formats={formats}
          placeholder="Write your content here..."
          className="h-[55vh] mb-4 animate-fadeIn"
          style={{ textAlign: 'center' }}
          ref={quillRef}
        />
        <div className="flex justify-between mt-12">
          <button
            onClick={goToDashboard}
            onTouchStart={goToDashboard}
            className="bg-gray-500 xs:text-xs text-sm text-white p-2 rounded hover:bg-gray-700 transition duration-300 animate-slideUp"
          >
            Go to Dashboard
          </button>
          <button
            onClick={handleSubmit}
            className="bg-blue-500 xs:text-xs text-sm text-white p-2 rounded hover:bg-blue-700 transition duration-300 animate-slideUp"
          >
            Submit Post
          </button>
        </div>
      </div>
    </div>
  );
};

export default CreatePost;
