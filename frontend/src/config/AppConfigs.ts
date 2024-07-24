export const getAppConfigs = () => {
  return {
    API_URL: process.env.REACT_APP_NODEJS_API_URL || "http://localhost:8000",
  };
};
