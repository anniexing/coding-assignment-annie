export const handleResponse= (response) => {
  if(!response.ok) {
    throw new Error(`HTTP error! Status: ${response.status}`);
  }
  return response.json();
}

export const handleErrors = (error) => {
  if(error instanceof Error) {
    console.error('Request error:', error.message);
    throw error;
  }
}

export const getData = async (apiUrl) => {
  try {
    const response = await fetch(apiUrl, {method:'GET'});
    return await handleResponse(response);
  }catch (error) {
   handleErrors(error);
  }
}
