// JoinRequest.jsx
type JoinRequestType = {
  username: string;
  onAccept: () => void;
  onReject: () => void;
};
const JoinRequest = ({ username, onAccept, onReject }: JoinRequestType) => {
  return (
    <div className="max-w-sm mx-auto mt-6 p-4 bg-white shadow-lg rounded-lg border border-gray-200">
      <div className="flex items-center space-x-4">
        <div className="w-12 h-12 bg-gray-200 rounded-full flex items-center justify-center text-gray-500 text-xl">
          {username[0].toUpperCase()}
        </div>
        <div className="flex-1">
          <p className="text-gray-700 font-medium">{username} wants to join the document</p>
        </div>
      </div>
      <div className="mt-4 flex justify-end space-x-2">
        <button
          onClick={onReject}
          className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition"
        >
          Reject
        </button>
        <button
          onClick={onAccept}
          className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 transition"
        >
          Accept
        </button>
      </div>
    </div>
  );
};

export default JoinRequest;
