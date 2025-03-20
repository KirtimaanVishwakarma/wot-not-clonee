// import { deleteCookie } from 'cookies-next';
import Router from "next/router";
import { toast } from "react-toastify";
const FetchApi = async (
  url: string,
  method: string,
  headers: any,
  data?: any
) => {
  const options = {
    method,
    headers: {
      "Content-Type": "application/json",
      ...headers,
    },
    body: data ? JSON.stringify(data) : null,
  };
  const response = await fetch(url, options);

  if (response.status === 401) {
    toast.error("You are unauthorized", {
      toastId: "unauth1",
    });
    // deleteCookie('accessToken');
    Router.replace("/login");
    return undefined;
  }
  if (!response.ok) {
    const result = await response.json();
    throw new Error(result);
  }
  const result = await response.json();
  return result;
};
export default FetchApi;
