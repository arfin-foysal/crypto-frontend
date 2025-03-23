import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/outline';

export default function Pagination({ page, lastPage, setPage }) {
  return (
    <div className="flex justify-between items-center mt-6">
      <p className="text-gray-700 text-sm">
        Showing <span className="font-medium">{Math.min((page - 1) * 10 + 1, lastPage * 10)}</span> to 
        <span className="font-medium">{Math.min(page * 10, lastPage * 10)}</span> of 
        <span className="font-medium">{lastPage * 10}</span> results
      </p>
      <div className="flex space-x-1">
        <button
          onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
          className="p-2 bg-gray-200 rounded-md hover:bg-gray-300 transition disabled:opacity-50 text-gray-600"
          disabled={page === 1}
        >
          <ChevronLeftIcon className="h-5 w-5" />
        </button>
        {[...Array(lastPage)].map((_, index) => (
          <button
            key={index}
            onClick={() => setPage(index + 1)}
            className={`px-4 py-2 rounded-md text-sm font-medium transition ${
              page === index + 1 ? 'bg-gray-600 text-white' : 'text-gray-700 hover:bg-gray-200'
            }`}
          >
            {index + 1}
          </button>
        ))}
        <button
          onClick={() => setPage((prev) => (prev < lastPage ? prev + 1 : prev))}
          className="p-2 bg-gray-200 rounded-md hover:bg-gray-300 transition disabled:opacity-50 text-gray-600"
          disabled={page === lastPage}
        >
          <ChevronRightIcon className="h-5 w-5" />
        </button>
      </div>
    </div>
  );
}