export const setErrorMessage = (errorMessage: string): string => {
  if (errorMessage.includes("400")) {
    return "City not found. Please check the city name and try again.";
  } else if (errorMessage.includes("401")) {
    return "Access denied";
  } else if (errorMessage.includes("403")) {
    return "Access denied";
  } else if (errorMessage.includes("404")) {
    return "City not found. Please check the city name and try again.";
  } else {
    return "An unexpected error occurred. Please try again later.";
  }
};
