import React, { useState } from 'react';
import { ChevronDown, ChevronRight, Star } from 'lucide-react';

const TopBar = ({ activePage }) => (
  <div className="bg-white shadow-md p-4 flex justify-between items-center">
    <div className="flex items-center">
      <h1 className="text-xl font-bold mr-4">Opn Docs</h1>
      <span className="text-gray-600">{activePage}</span>
    </div>
    <div className="flex items-center">
      <input type="text" placeholder="Search..." className="mr-4 p-2 border rounded" />
      <button className="p-2 border rounded">Login</button>
    </div>
  </div>
);

const SidebarItem = ({ item, children, depth = 0 }) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className={`ml-${depth * 4}`}>
      <div
        className="flex items-center cursor-pointer p-2 hover:bg-gray-100"
        onClick={() => setIsOpen(!isOpen)}
      >
        {children && (isOpen ? <ChevronDown size={16} /> : <ChevronRight size={16} />)}
        <span className="ml-2">{item}</span>
      </div>
      {isOpen && children && <div>{children}</div>}
    </div>
  );
};

const Sidebar = ({ activePage }) => {
  const sidebarData = {
    Documents: {
      Guides: {
        'Getting Started': ['Introduction', 'Setup', 'First Steps'],
        'Authentication': ['OAuth', 'API Keys', 'JWT'],
        'Webhooks': ['Configuration', 'Events', 'Security']
      },
      'Payment Methods': {
        'Credit Card': ['Visa', 'Mastercard', 'Amex'],
        'Bank Transfer': ['ACH', 'SEPA', 'Wire'],
        'E-Wallets': ['PayPal', 'Apple Pay', 'Google Pay']
      },
      'API References': {
        'Payments API': ['Create', 'Retrieve', 'Update'],
        'Customers API': ['Create', 'Retrieve', 'Update'],
        'Disputes API': ['Create', 'Retrieve', 'Resolve']
      },
      'Plugins': {
        'WooCommerce': ['Installation', 'Configuration', 'Troubleshooting'],
        'Magento': ['Installation', 'Configuration', 'Troubleshooting'],
        'Shopify': ['Installation', 'Configuration', 'Troubleshooting']
      }
    },
    Articles: {
      Billing: ['Invoicing', 'Pricing', 'Subscriptions'],
      Payments: ['Processing', 'Refunds', 'Chargebacks'],
      Security: ['Data Protection', 'Fraud Prevention', 'Compliance']
    },
    FAQs: {
      Billing: ['Billing Cycle', 'Payment Terms', 'Taxes'],
      Payments: ['Settlement', 'Currencies', 'Fees'],
      Security: ['Account Security', 'PCI Compliance', 'Encryption']
    },
    Changelog: {
      2024: {
        December: ['Feature A', 'Bug Fix B'],
        November: ['Update C', 'Enhancement D']
      },
      2023: {
        December: ['New API v2', 'Performance Improvements'],
        November: ['Security Patch', 'UI Refresh']
      }
    }
  };

  const renderSidebarItems = (items, depth = 0) => {
    return Object.entries(items).map(([key, value]) => (
      <SidebarItem key={key} item={key} depth={depth}>
        {typeof value === 'object' ? renderSidebarItems(value, depth + 1) : null}
      </SidebarItem>
    ));
  };

  return (
    <div className="w-64 bg-gray-50 p-4 h-full overflow-y-auto">
      {renderSidebarItems(sidebarData[activePage] || {})}
    </div>
  );
};

const MainContent = ({ activePage }) => {
  const [rating, setRating] = useState(0);
  const [overallRating, setOverallRating] = useState(4.5); // Mock overall rating
  const [comments, setComments] = useState([
    { id: 1, text: "Great documentation!", date: new Date('2024-03-01'), isOpen: true },
    { id: 2, text: "Could use more examples.", date: new Date('2024-03-02'), isOpen: true }
  ]);
  const [newComment, setNewComment] = useState('');
  const [sortOrder, setSortOrder] = useState('desc');

  const handleRating = (value) => setRating(value);

  const handleCommentSubmit = (e) => {
    e.preventDefault();
    if (newComment.trim()) {
      setComments([...comments, { id: comments.length + 1, text: newComment, date: new Date(), isOpen: true }]);
      setNewComment('');
    }
  };

  const toggleComment = (id) => {
    setComments(comments.map(comment => 
      comment.id === id ? { ...comment, isOpen: !comment.isOpen } : comment
    ));
  };

  const sortedComments = [...comments].sort((a, b) => 
    sortOrder === 'desc' ? b.date - a.date : a.date - b.date
  );

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">{activePage}</h2>
      {activePage === 'Documents' && (
        <select className="mr-2 p-2 border rounded">
          <option>API v1</option>
          <option>API v2</option>
        </select>
      )}
      {activePage !== 'API Playground' && (
        <select className="p-2 border rounded">
          <option>English</option>
          <option>日本語</option>
          <option>ไทย</option>
        </select>
      )}
      <p className="my-4">Content for {activePage} goes here...</p>
      <div className="mb-4">
        <p>Rate this content:</p>
        {[1, 2, 3, 4, 5].map((star) => (
          <button key={star} onClick={() => handleRating(star)}>
            <Star className={`inline ${rating >= star ? 'text-yellow-400' : 'text-gray-300'}`} />
          </button>
        ))}
      </div>
      <div className="mb-4">
        <p>Overall Rating: {overallRating.toFixed(1)}</p>
      </div>
      <div>
        <h3 className="text-xl font-bold mb-2">Comments</h3>
        <form onSubmit={handleCommentSubmit} className="mb-4">
          <textarea
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            className="w-full p-2 border rounded mb-2"
            placeholder="Enter your comment..."
          />
          <div className="flex items-center">
            <input type="text" placeholder="Enter CAPTCHA" className="p-2 border rounded mr-2" />
            <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">Post Comment</button>
          </div>
        </form>
        <div>
          <button onClick={() => setSortOrder(sortOrder === 'desc' ? 'asc' : 'desc')} className="mb-2">
            Sort {sortOrder === 'desc' ? 'Oldest First' : 'Newest First'}
          </button>
          {sortedComments.map((comment) => (
            <div key={comment.id} className="border-b py-2">
              <div className="flex justify-between items-center cursor-pointer" onClick={() => toggleComment(comment.id)}>
                <p>{comment.isOpen ? '▼' : '▶'} {comment.date.toLocaleString()}</p>
              </div>
              {comment.isOpen && <p className="mt-2">{comment.text}</p>}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

const OpnDocsUI = () => {
  const [activePage, setActivePage] = useState('Documents');

  const mainMenuItems = ['Documents', 'Articles', 'FAQs', 'API Playground', 'Changelog'];

  return (
    <div className="flex flex-col h-screen">
      <TopBar activePage={activePage} />
      <div className="flex-1 flex">
        <div className="bg-gray-200 w-48 p-4">
          {mainMenuItems.map((item) => (
            <button
              key={item}
              onClick={() => setActivePage(item)}
              className={`block w-full text-left p-2 mb-2 ${
                activePage === item ? 'bg-blue-500 text-white' : 'hover:bg-gray-300'
              }`}
            >
              {item}
            </button>
          ))}
        </div>
        <div className="flex-1 flex overflow-hidden">
          {activePage !== 'API Playground' && <Sidebar activePage={activePage} />}
          <div className="flex-1 overflow-y-auto">
            <MainContent activePage={activePage} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default OpnDocsUI;