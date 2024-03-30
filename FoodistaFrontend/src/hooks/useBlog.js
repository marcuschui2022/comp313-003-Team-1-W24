import {useState} from "react";
import {useNavigate} from "react-router-dom";

const apiBaseUrl = import.meta.env.VITE_API_BASE_URL || "";

export const useBlog = (apiUrl) => {
  const token = document.cookie.split('; ').find(row => row.startsWith('token')).split('=')[1];
  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  // blog ddata
  const [myBlogData, setMyBlogData] = useState([]);
  const [blogCategory, setBlogCategory] = useState([])

  const navigate = useNavigate();

  const handleSubmitNewBlog = async (event, formData) => {
    event.preventDefault();
    setIsLoading(false);
    setErrorMsg("");

    try {
      setIsLoading(true);
      const response = await fetch(apiBaseUrl + apiUrl + "blog/", {
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
        setMyBlogData(jsonResponse);
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


  const handleFetchBlogDataByCurrentUserId = async () => {
    const userId = document.cookie.split('; ').find(row => row.startsWith('userId')).split('=')[1];
    setIsLoading(false);
    setErrorMsg("");

    try {
      setIsLoading(true);
      const response = await fetch(apiBaseUrl + apiUrl + "blog/" + "user/" + userId, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer  ${token}`
        },
      });

      if (response.ok) {
        const jsonResponse = await response.json();
        // console.log(jsonResponse)
        setMyBlogData(jsonResponse)
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

  const handleFetchCategory = async () => {

    setIsLoading(false);
    setErrorMsg("");

    try {
      setIsLoading(true);
      const response = await fetch(apiBaseUrl + apiUrl + "category/", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer  ${token}`
        },
      });

      if (response.ok) {
        const jsonResponse = await response.json();
        // console.log(jsonResponse)
        setBlogCategory(jsonResponse)
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
    handleSubmitNewBlog,
    handleFetchBlogDataByCurrentUserId,
    isLoading,
    errorMsg,
    myBlogData,
    handleFetchCategory, blogCategory
  };
};
