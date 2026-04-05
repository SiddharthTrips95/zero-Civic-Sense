import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { createIssue } from '@/api/issuesApi';
import { useAuth } from '@/features/auth/AuthContext';

const categories = [
  { id: 'litter', label: 'Litter' },
  { id: 'pothole', label: 'Pothole' },
  { id: 'water', label: 'Water Log' },
  { id: 'light', label: 'Streetlight' },
  { id: 'drain', label: 'Drainage' },
];

const severities = ['low', 'medium', 'high', 'critical'];

const ReportPage = () => {
  const navigate = useNavigate();
  const { user } = useAuth();

  const [selectedCat, setSelectedCat] = useState('pothole');
  const [severity, setSeverity] = useState('medium');
  const [reportTitle, setReportTitle] = useState('');
  const [description, setDescription] = useState('');
  const [location, setLocation] = useState('');
  const [observedAt, setObservedAt] = useState(new Date());
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState(null);

  const handleSubmit = async () => {
    if (!reportTitle || !description || !location) {
      setSubmitError('Please fill all required fields');
      return;
    }

    const payload = {
      id: Date.now().toString(),
      title: reportTitle,
      description,
      reporter: user?.email || 'guest',
      timestamp: observedAt.toISOString(),
      status: 'open',
      severity,
      category: selectedCat,
      location,
    };

    setIsSubmitting(true);

    try {
      await createIssue(payload);
      navigate('/');
    } catch (err) {
      setSubmitError('Failed to submit issue');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Report Issue</h1>

      {/* Title */}
      <input
        type="text"
        placeholder="Issue title"
        value={reportTitle}
        onChange={(e) => setReportTitle(e.target.value)}
        className="w-full mb-3 p-2 border rounded"
      />

      {/* Description */}
      <textarea
        placeholder="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        className="w-full mb-3 p-2 border rounded"
      />

      {/* Location */}
      <input
        type="text"
        placeholder="Location"
        value={location}
        onChange={(e) => setLocation(e.target.value)}
        className="w-full mb-3 p-2 border rounded"
      />

      {/* Date */}
      <DatePicker
        selected={observedAt}
        onChange={(date) => setObservedAt(date)}
        className="w-full mb-3 p-2 border rounded"
      />

      {/* Category */}
      <div className="mb-3">
        <p className="mb-1">Category</p>
        {categories.map((cat) => (
          <button
            key={cat.id}
            onClick={() => setSelectedCat(cat.id)}
            className={`mr-2 px-3 py-1 rounded ${
              selectedCat === cat.id
                ? 'bg-blue-500 text-white'
                : 'bg-gray-200'
            }`}
          >
            {cat.label}
          </button>
        ))}
      </div>

      {/* Severity */}
      <div className="mb-3">
        <p className="mb-1">Severity</p>
        {severities.map((level) => (
          <button
            key={level}
            onClick={() => setSeverity(level)}
            className={`mr-2 px-3 py-1 rounded ${
              severity === level
                ? 'bg-red-500 text-white'
                : 'bg-gray-200'
            }`}
          >
            {level}
          </button>
        ))}
      </div>

      {/* Error */}
      {submitError && (
        <p className="text-red-500 mb-3">{submitError}</p>
      )}

      {/* Submit */}
      <button
        onClick={handleSubmit}
        disabled={isSubmitting}
        className="px-4 py-2 bg-green-600 text-white rounded"
      >
        {isSubmitting ? 'Submitting...' : 'Submit Issue'}
      </button>
    </div>
  );
};

export default ReportPage;