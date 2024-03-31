import {useState} from "react";
import {useNavigate} from "react-router-dom";

const apiBaseUrl = import.meta.env.VITE_API_BASE_URL || "";

export const usePost = (apiUrl) => {
  const token = document.cookie.split('; ').find(row => row.startsWith('token')).split('=')[1];
  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const [postType, setPostType] = useState([])
  const [userPostData, setUserPostData] = useState([])

  const navigate = useNavigate();


  const handleSubmitNewPost = async (event, formData) => {
    event.preventDefault();
    setIsLoading(false);
    setErrorMsg("");

    try {
      setIsLoading(true);
      const response = await fetch(apiBaseUrl + apiUrl + "post/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer  ${token}`
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        const jsonResponse = await response.json();
        // console.log(jsonResponse)
        navigate("/myblog");
      } else {
        const jsonResponse = await response.json();
        if (jsonResponse.message) {
          setErrorMsg(jsonResponse.message);
        } else {
          if (jsonResponse) {
            setErrorMsg(jsonResponse);
          } else {
            setErrorMsg("Error: unexpected error...");
          }
        }
      }
    } catch (error) {
      setErrorMsg("Unexpected error: " + error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleFetchPostType = async () => {

    setIsLoading(false);
    setErrorMsg("");

    try {
      setIsLoading(true);
      const response = await fetch(apiBaseUrl + apiUrl + "post-type/", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer  ${token}`
        },
      });

      if (response.ok) {
        const jsonResponse = await response.json();
        // console.log(jsonResponse)
        setPostType(jsonResponse)
      } else {
        const jsonResponse = await response.json();
        if (jsonResponse.message) {
          setErrorMsg(jsonResponse.message);
        } else {
          if (jsonResponse) {
            setErrorMsg(jsonResponse);
          } else {
            setErrorMsg("Error: unexpected error...");
          }
        }
      }
    } catch (error) {
      setErrorMsg("Unexpected error: " + error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleFetchPostByUserId = async () => {
    // const userId = document.cookie.split('; ').find(row => row.startsWith('userId')).split('=')[1];

    setIsLoading(false);
    setErrorMsg("");

    try {
      setIsLoading(true);
      // const response = await fetch("http://localhost:8080/api/v1/post/user/1", {
      const response = await fetch(apiBaseUrl + apiUrl + "post/user/", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer  ${token}`
        },
      });

      if (response.ok) {
        const jsonResponse = await response.json();
        console.log(jsonResponse)
        setUserPostData(jsonResponse)
      } else {
        const jsonResponse = await response.json();
        if (jsonResponse.message) {
          setErrorMsg(jsonResponse.message);
        } else {
          if (jsonResponse) {
            setErrorMsg(jsonResponse);
          } else {
            setErrorMsg("Error: unexpected error...");
          }
        }
      }
    } catch (error) {
      setErrorMsg("Unexpected error: " + error.message);
    } finally {
      setIsLoading(false);
    }
  };


  return {
    isLoading,
    errorMsg,
    handleFetchPostType, postType, handleSubmitNewPost, handleFetchPostByUserId, userPostData
  };
};
