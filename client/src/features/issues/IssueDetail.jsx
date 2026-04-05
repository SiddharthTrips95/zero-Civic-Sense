import { useEffect, useMemo, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getIssueById } from '@/api/issuesApi';

const stepStyle = (done) => ({
  dot: {
    background: done ? '#41431B' : 'rgba(65,67,27,0.12)',
    borderColor: done ? '#41431B' : 'rgba(65,67,27,0.2)',
  },
  label: {
    background: done ? 'rgba(174,183,132,0.22)' : 'rgba(65,67,27,0.06)',
    borderColor: done ? 'rgba(174,183,132,0.55)' : 'rgba(65,67,27,0.15)',
    color: '#41431B',
  },
});

const prettyDate = (value) => {
  const parsed = new Date(value);
  if (Number.isNaN(parsed.getTime())) return value;
  return parsed.toLocaleString();
};

const buildTimeline = (issue) => {
  return [
    {
      label: 'Reported',
      actor: issue.reporter,
      time: prettyDate(issue.timestamp),
      proof: `Issue ${issue.id}`,
      done: true,
    },
    {
      label: 'Acknowledged',
      actor: 'Ward Officer',
      time: issue.status === 'open' ? 'Pending' : prettyDate(issue.timestamp),
      proof: 'Signed status update',
      done: issue.status !== 'open',
    },
    {
      label: 'Resolved',
      actor:
        issue.status === 'resolved'
          ? 'Field Team'
          : 'Pending assignment',
      time:
        issue.status === 'resolved'
          ? prettyDate(new Date().toISOString())
          : 'Pending',
      proof:
        issue.status === 'resolved'
          ? 'Completion record'
          : 'Awaiting completion proof',
      done: issue.status === 'resolved',
    },
  ];
};

const IssueDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [issue, setIssue] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState(null);

  useEffect(() => {
    if (!id) {
      setErrorMessage('Issue id is missing.');
      setIsLoading(false);
      return;
    }

    let isMounted = true;

    getIssueById(id)
      .then((response) => {
        if (!isMounted) return;

        if (!response) {
          setErrorMessage('Issue not found.');
          return;
        }

        setIssue(response);
      })
      .catch(() => {
        if (!isMounted) return;
        setErrorMessage('Unable to load issue details right now.');
      })
      .finally(() => {
        if (!isMounted) return;
        setIsLoading(false);
      });

    return () => {
      isMounted = false;
    };
  }, [id]);

  const timeline = useMemo(
    () => (issue ? buildTimeline(issue) : []),
    [issue]
  );

  return (
    <div className="p-6">
      {/* Back button */}
      <button
        onClick={() => navigate(-1)}
        className="mb-4 text-sm font-semibold"
      >
        ← Back to Issues
      </button>

      {/* Loading */}
      {isLoading && <p>Loading issue details...</p>}

      {/* Error */}
      {!isLoading && errorMessage && <p>{errorMessage}</p>}

      {/* Issue content */}
      {!isLoading && issue && (
        <>
          <div className="mb-6 border p-4 rounded-lg">
            <p className="text-sm text-gray-500">Issue ID</p>
            <h2 className="font-bold">{issue.id}</h2>
            <p className="mt-2 capitalize">{issue.status}</p>
            <h3 className="mt-2 text-lg font-semibold">
              {issue.title}
            </h3>
            <p>{issue.description}</p>
          </div>

          {/* Timeline */}
          <div className="border p-4 rounded-lg">
            <h3 className="font-semibold mb-3">
              Resolution Timeline
            </h3>

            {timeline.map((step, index) => (
              <div key={index} className="mb-3">
                <p className="font-semibold">{step.label}</p>
                <p className="text-sm text-gray-500">
                  {step.actor}
                </p>
                <p className="text-sm">{step.time}</p>
                <p className="text-xs text-gray-400">
                  {step.proof}
                </p>
              </div>
            ))}
          </div>

          {/* Footer */}
          <p className="mt-4 text-sm text-gray-500">
            Reporter: {issue.reporter} | Last update:{' '}
            {prettyDate(issue.timestamp)}
          </p>
        </>
      )}
    </div>
  );
};

export default IssueDetail;