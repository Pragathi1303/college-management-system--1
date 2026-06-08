import { useState, useCallback } from "react";

/**
 * Custom hook for making API calls with loading and error state management.
 * @param {Function} apiFunc - The API function to call
 * @param {Object} options - Options
 * @param {boolean} options.immediate - Whether to call immediately
 * @param {*} options.initialData - Initial data value
 * @returns {{ data, loading, error, execute, setData, reset }}
 */
export function useApi(apiFunc, options = {}) {
  const { initialData = null } = options;
  const [data, setData] = useState(initialData);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const execute = useCallback(
    async (...args) => {
      setLoading(true);
      setError(null);
      try {
        const result = await apiFunc(...args);
        setData(result);
        return result;
      } catch (err) {
        const message = err.message || "An error occurred";
        setError(message);
        throw err;
      } finally {
        setLoading(false);
      }
    },
    [apiFunc]
  );

  const reset = useCallback(() => {
    setData(initialData);
    setLoading(false);
    setError(null);
  }, [initialData]);

  return { data, loading, error, execute, setData, reset };
}

export default useApi;