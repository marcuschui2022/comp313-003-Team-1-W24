import {useState} from "react";
import {useNavigate} from "react-router-dom";

const apiBaseUrl = import.meta.env.VITE_API_BASE_URL || "";

export const usePost = (apiUrl) => {
  const token = document.cookie.split('; ').find(row => row.startsWith('token'))?.split('=')[1];

  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const [postType, setPostType] = useState([])
  const [userPostData, setUserPostData] = useState([])
  const [postData, setPostData] = useState([])
  const [singlePostData, setSinglePostData] = useState(null)
  const [comments, setComments] = useState([])

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
        // const jsonResponse = await response.json();
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

  const handleAllPost = async () => {
    setIsLoading(false);
    setErrorMsg("");

    try {
      setIsLoading(true);
      const response = await fetch(apiBaseUrl + apiUrl + "post/", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.ok) {
        const jsonResponse = await response.json();
        // console.log(jsonResponse)
        setPostData(jsonResponse)
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

  const handleFetchPostById = async (postId) => {
    setIsLoading(false);
    setErrorMsg("");

    try {
      setIsLoading(true);
      const response = await fetch(apiBaseUrl + apiUrl + "post/" + postId, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.ok) {
        const jsonResponse = await response.json();
        console.log(jsonResponse)
        setSinglePostData(jsonResponse)
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

  const handleDeletePost = async (postId) => {
    setIsLoading(false);
    setErrorMsg("");

    try {
      setIsLoading(true);
      const response = await fetch(apiBaseUrl + apiUrl + "post/" + postId, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer  ${token}`
        },
      });

      if (response.ok) {
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

  const handleFetchCommentsByPostId = async (postId) => {
    setIsLoading(false);
    setErrorMsg("");

    try {
      setIsLoading(true);
      const response = await fetch(apiBaseUrl + apiUrl + "comment/post/" + postId, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer  ${token}`
        },
      });

      if (response.ok) {
        const jsonResponse = await response.json();
        console.log(jsonResponse)
        setComments(jsonResponse)
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

  const handleSubmitNewComment = async (event, formData, postId) => {
    event.preventDefault();
    setIsLoading(false);
    setErrorMsg("");

    try {
      setIsLoading(true);
      const response = await fetch(apiBaseUrl + apiUrl + "comment/post/" + postId, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer  ${token}`
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        const jsonResponse = await response.json();
        setComments(jsonResponse)
        // navigate("/post?postId=" + postId);
        // window.location.href = "/post?postId=" + postId;
        // navigate("/");
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

  const handleDeleteCommentsByCommentId = async (commentId) => {
    setIsLoading(false);
    setErrorMsg("");

    try {
      setIsLoading(true);
      const response = await fetch(apiBaseUrl + apiUrl + "comment/" + commentId, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer  ${token}`
        },
      });

      if (response.ok) {
        const jsonResponse = await response.json();
        setComments(jsonResponse)
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
    handleFetchPostType,
    postType,
    handleSubmitNewPost,
    handleFetchPostByUserId,
    userPostData,
    handleAllPost,
    postData,
    handleFetchPostById,
    singlePostData,
    handleDeletePost,
    handleFetchCommentsByPostId,
    comments,
    handleSubmitNewComment, handleDeleteCommentsByCommentId
  };
};
