import {useState} from "react";
import {useNavigate} from "react-router-dom";

export const useAuth = (apiUrl) => {
    const [isLoading, setIsLoading] = useState(false);
    const [errorMsg, setErrorMsg] = useState("");

    const navigate = useNavigate();

    const handleSubmit = async (event, formData) => {
        event.preventDefault();
        setIsLoading(false);
        setErrorMsg("");

        if (formData.password && formData.confirmPassword && (formData.password !== formData.confirmPassword)) {
            setErrorMsg("Passwords do not match");
            return;
        }

        try {
            setIsLoading(true);
            const response = await fetch(apiUrl, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(formData),
            });

            if (response.ok) {
                const jsonResponse = await response.json();
                if (jsonResponse.token) {
                    document.cookie = `token=${jsonResponse.token}`;
                    document.cookie = `fullName=${jsonResponse.fullName}`;
                    navigate("/");
                }
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

    return {handleSubmit, isLoading, errorMsg};
};
