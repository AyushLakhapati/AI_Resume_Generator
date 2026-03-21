import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import ResumeHistoryService from "../api/ResumeHistoryService";
import Resume from "../components/Resume";

const ViewResume = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [resumeObj, setResumeObj] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchResume();
  }, [id]);

  const fetchResume = async () => {
    try {
      setLoading(true);
      const data = await ResumeHistoryService.getResumeById(id);
      if (data && data.resumeData) {
        const parsed = JSON.parse(data.resumeData);
        // The backend JSON map usually wraps the actual content in a `data` key.
        setResumeObj(parsed.data || parsed);
      } else {
        toast.error("Invalid resume data");
        navigate("/my-resumes");
      }
    } catch (error) {
      toast.error("Failed to load resume");
      console.error(error);
      navigate("/my-resumes");
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[60vh]">
        <span className="loading loading-spinner text-primary loading-lg"></span>
      </div>
    );
  }

  if (!resumeObj) return null;

  return (
    <div className="container mx-auto px-4 py-10 min-h-[80vh]">
      <h1 className="text-3xl sm:text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary mb-8 text-center drop-shadow-sm">
        View Resume
      </h1>
      <Resume data={resumeObj} isViewMode={true} />
    </div>
  );
};

export default ViewResume;
