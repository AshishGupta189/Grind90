const EmptyState = () => {
  return (
    <div className="h-full flex items-center justify-center text-gray-300">
      <div className="text-center">
        <h1 className="text-4xl mb-3">ChatGPT</h1>
        <p className="text-sm opacity-70">
          Start a new chat or select an existing one
        </p>
      </div>
    </div>
  );
};

export default EmptyState;
