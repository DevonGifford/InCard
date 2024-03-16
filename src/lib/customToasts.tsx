type Props = {
  timeRemaining: number;
};

export const TimeTilExpirationToast = (timeRemaining: Props) => {
  const minutesRemaining = Math.floor(
    timeRemaining.timeRemaining / (1000 * 60)
  );
  const secondsRemaining = Math.floor(
    (timeRemaining.timeRemaining % (1000 * 60)) / 1000
  );

  return (
    <div className="max-w-md w-full bg-neutral-700/80 shadow-lg rounded-lg pointer-events-auto flex ring-1 ring-black ring-opacity-5">
      <div className="flex-1 w-0 p-2 pl-4">
        <div className="flex items-start">
          <div className="flex-shrink-0 h-auto text-2xl">⏳</div>
          <div className="ml-3 flex-1">
            <p className="mt-1 text-base text-gray-300">
              You have{" "}
              <b>
                {minutesRemaining} minutes and {secondsRemaining} seconds
              </b>{" "}
              remaining.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export const ExpiredSessionToast = () => {
  return (
    <div className="max-w-md w-full bg-neutral-800 shadow-lg rounded-lg pointer-events-auto flex ring-1 ring-black ring-opacity-5">
      <div className="flex-1 w-0 p-4">
        <div className="flex items-start">
          <div className="flex h-auto items-center justify-center text-3xl">
            ❌
          </div>
          <div className="ml-3 flex-1">
            <p className="text-sm font-medium text-white">
              Your session has expired
            </p>
            <p className="mt-1 text-sm text-gray-300">
              Please sign in again or try refreshing the page.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
