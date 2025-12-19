import React, { use, useState } from 'react'
import { LuPlus } from 'react-icons/lu'
import CreateSessionForm from './CreateSessionForm'
import moment from 'moment/moment'
import { Modal } from '../../Components/Modal'
import DeleteAlertContent from '../../Components/layout/loader/DeleteAlertContent'
import { CARD_BG } from '../../utils/data'
import toast from 'react-hot-toast'
import Dashboardlayout from '../../Components/layout/Dashboardlayout'
import { useNavigate } from 'react-router-dom'
import { useEffect } from 'react'
import axiosInstance from '../../utils/axiosInstance'
import { API_PATHS } from '../../utils/apiPaths'
import SummaryCard from '../../Components/Cards/SummaryCard'

const Dashboard = () => {

  const navigate = useNavigate()
  const [openCreateModal, setOpenCreateModal] = useState(false)
  const [sessions, setSessions] = useState([])
  const [isDeleting, setIsDeleting] = useState(false)
  const [openDeleteAlert, setOpenDeleteAlert] = useState({
    open: false,
    data: null
  })

  const fetchAllSessions = async () => {
    try {
      const response = await axiosInstance.get(API_PATHS.SESSION.GET_ALL)
      setSessions(response.data)
    } catch (error) {
      console.log(error);

    }
  }
  const deleteSession = async () => {
    // Get the session data from the state that was set when the delete button was clicked
    const sessionToDelete = openDeleteAlert.data;
    // Basic validation: ensure a session was actually selected
    if (!sessionToDelete || !sessionToDelete._id) {
      toast.error("No session selected for deletion.");
      setOpenDeleteAlert({ open: false, data: null }); // Close the modal
      return;
    }

    setIsDeleting(true); // Set loading state to true for the delete operation

    try {
      // Make the API call to your backend's delete session endpoint
      // API_PATHS.SESSION.DELETE_ONE should be a function that takes the session ID
      // e.g., DELETE /api/sessions/:id
      const response = await axiosInstance.delete(API_PATHS.SESSION.DELETE(sessionToDelete._id));

      // Check the HTTP status code for success (200 OK, 204 No Content are common for DELETE)
      if (response.status === 200 || response.status === 204) {
        toast.success("Session deleted successfully!");
        // After successful deletion, re-fetch the list of sessions
        // to update the UI and remove the deleted card.
        await fetchAllSessions();
        // Close the delete confirmation modal
        setOpenDeleteAlert({ open: false, data: null });
      } else {
        // If the backend returned a non-success status but didn't throw an error
        toast.error("Failed to delete session. Server responded with an unexpected status.");
      }
    } catch (error) {
      console.error("Error deleting session:", error);

      // Check if the error has a specific message from the backend
      if (error.response && error.response.data && error.response.data.message) {
        toast.error(`Error: ${error.response.data.message}`);
      } else {
        // Generic error message for network issues or unhandled server errors
        toast.error("An unexpected error occurred while deleting the session.");
      }
    } finally {
      // Always set loading state back to false, regardless of success or failure
      setIsDeleting(false);
    }
  };

  useEffect(() => {
    fetchAllSessions()
  }, [])

  return (
    <Dashboardlayout>
      <div className='container mx-auto pt-4 pb-4'>
        <div className='brid grid-cols-1 md:grid-cols-3 gap-4 md:gap-7 pt-1 pb-6 px-4 md:px-0'>
          {sessions?.map((data, index) => (
            <SummaryCard
              key={data?._id}
              color={CARD_BG[index % CARD_BG.length]}
              role={data?.role || ""}
              topicsToFocus={data?.topicsToFocus || ''}
              experience={data?.experience || "-"}
              questions={data?.questions?.length || ""}
              description={data?.description || ""}
              lastUpdated={
                data?.updatedAt ? moment(data.updatedAt).format('DD MMM YYYY') : ""
              }
              onSelect={() => navigate(`/interview-prep/${data?._id}`)}
              onDelete={() => setOpenDeleteAlert({ open: true, data })}
            />
          ))}
        </div>
        <button
          className="
  fixed bottom-10 md:bottom-20 right-10 md:right-20
  flex items-center justify-center gap-3
  h-12 md:h-12 px-7 py-2
  bg-gradient-to-r bg-[#E67E1F] 
  text-white text-sm font-semibold
  rounded-full
  cursor-pointer
  transition-colors duration-300 ease-in-out
  hover:bg-black hover:text-white
  hover:shadow-2xl hover:shadow-orange-300
"
          onClick={() => setOpenCreateModal(true)}
        >

          <LuPlus />
          Add New
        </button>
      </div>
      <Modal

        isOpen={openCreateModal}
        onClose={() => {
          setOpenCreateModal(false)
        }}
        hideHeader
      >
        <div>
          <CreateSessionForm />
        </div>
      </Modal>
      <Modal
        isOpen={openDeleteAlert?.open}
        onClose={() => {
          setOpenDeleteAlert({ open: false, data: null })
        }}
      
      >
        <div>
          <DeleteAlertContent

            content="Are you sure you want to delete this session details"
            onDelete={() => deleteSession(openDeleteAlert.data)}
          />
        </div>

      </Modal>
    </Dashboardlayout >
  )
}

export default Dashboard