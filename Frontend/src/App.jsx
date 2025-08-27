import { useState, useEffect } from 'react';

import "prismjs/themes/prism-tomorrow.css";
import Editor from "react-simple-code-editor";
import prism from 'prismjs';
import Markdown from 'react-markdown';
import rehypeHighlight from 'rehype-highlight';
import 'highlight.js/styles/github-dark.css';
import axios from 'axios';
import './App.css';

function App() {
  const [code, setCode] = useState(`function sum(){ return 5 + 10;}`);
  const [review, setReview] = useState(``);

  useEffect(() => {
    prism.highlightAll();
  }, [code]);

  async function reviewCode() {
    try {
      // use env var in production, fallback to localhost in dev
      const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3000";

      const response = await axios.post(`${API_URL}/ai/get-review`, { code });
      setReview(response.data.review);
    } catch (error) {
      console.error("Error fetching review:", error);
      setReview("⚠️ Unable to fetch review. Please check your backend connection.");
    }
  }

  return (
    <>
      <main>
        <div className="left">
          <div className="code">
            <Editor
              value={code}
              onValueChange={code => setCode(code)}
              highlight={code => prism.highlight(code, prism.languages.js, 'js')}
              padding={10}
              style={{
                fontFamily: '"Fira code", "Fira Mono", monospace',
                fontSize: 16,
                backgroundColor: 'transparent',
                border: '1px solid #ddd',
                borderRadius: '5px',
                height: '100%',
                width: '100%',
              }}
            />
          </div>
          <div onClick={reviewCode} className="review">Review</div>
        </div>
        <div className="right">
          <Markdown rehypePlugins={[rehypeHighlight]}>
            {review}
          </Markdown>
        </div>
      </main>
    </>
  );
}

export default App;
