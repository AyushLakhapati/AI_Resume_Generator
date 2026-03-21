import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import ResumeHistoryService from "../api/ResumeHistoryService";
import AuthService from "../api/AuthService";

const MyResumes = () => {
  const [resumes, setResumes] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const user = AuthService.getCurrentUser();
    if (!user) {
      toast.error("Please login to view your resumes");
      navigate("/login");
      return;
    }

    fetchResumes();
  }, [navigate]);

  const fetchResumes = async () => {
    try {
      setLoading(true);
      const data = await ResumeHistoryService.getResumeHistory();
      setResumes(data);
    } catch (error) {
      toast.error("Failed to load resume history");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this saved resume?")) {
      return;
    }

    try {
      await ResumeHistoryService.deleteResume(id);
      toast.success("Resume deleted");
      setResumes(resumes.filter(resume => resume.id !== id));
    } catch (error) {
      toast.error("Failed to delete resume");
      console.error(error);
    }
  };

  const viewResume = (id) => {
      navigate(`/my-resumes/${id}`);
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[60vh]">
        <span className="loading loading-spinner text-primary loading-lg"></span>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-10 min-h-[80vh]">
      <h1 className="text-3xl sm:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary mb-8 text-center drop-shadow-sm">
        My Resumes
      </h1>

      {resumes.length === 0 ? (
        <div className="text-center p-10 bg-base-200 rounded-3xl mt-10 shadow-inner max-w-2xl mx-auto">
          <div className="text-6xl mb-6 opacity-60">📁</div>
          <h2 className="text-2xl font-bold mb-4">No Resumes Saved Yet</h2>
          <p className="text-base-content/70 mb-8 max-w-md mx-auto">
             You haven't generated any resumes yet. Click the button below to create your first AI-powered resume!
          </p>
          <Link to="/generate" className="btn btn-primary btn-lg shadow-lg hover:scale-105 transition-all w-full sm:w-auto">
            Generate Resume Now
          </Link>
        </div>
      ) : (
        <div className="overflow-x-auto w-full max-w-7xl mx-auto bg-base-100 rounded-xl shadow-xl border border-base-200">
          <table className="table w-full">
            <thead>
              <tr className="bg-base-200 text-base-content/70">
                <th className="text-sm font-semibold uppercase">Title</th>
                <th className="text-sm font-semibold uppercase w-48">Owner</th>
                <th className="text-sm font-semibold uppercase w-48">Last modified</th>
                <th className="text-right text-sm font-semibold uppercase w-48">Actions</th>
              </tr>
            </thead>
            <tbody>
              {resumes.map((resume) => (
                <tr key={resume.id} className="hover:bg-base-200/50 transition-colors group">
                  <td className="font-semibold text-lg flex items-center gap-3">
                    <span className="text-2xl opacity-70">📄</span>
                    {resume.title || (resume.prompt ? resume.prompt.substring(0, 30) + '...' : 'Generated Resume')}
                  </td>
                  <td><span className="badge badge-ghost">You</span></td>
                  <td className="text-base-content/70">{new Date(resume.createdAt).toLocaleDateString()}</td>
                  <td className="text-right space-x-2">
                    <button 
                       onClick={() => viewResume(resume.id)} 
                       className="btn btn-ghost btn-sm text-primary hover:bg-primary/10"
                    >
                       View
                    </button>
                    <button 
                       onClick={() => handleDelete(resume.id)} 
                       className="btn btn-ghost btn-sm text-error hover:bg-error/10"
                    >
                       Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default MyResumes;
