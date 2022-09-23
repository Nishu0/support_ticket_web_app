import { useSelector, useDispatch } from "react-redux"
import { useParams, useNavigate } from "react-router-dom"
import { useEffect, useState } from "react"
import { getTicket, closeTicket } from "../features/tickets/ticketSlice"
import { getNotes, createNote, reset as notesReset } from "../features/notes/noteSlice"
import BackButton from "../components/BackButton"
import Loader from "../components/Loader"
import { toast } from "react-toastify"
import NoteItem from "../components/NoteItem"
import Modal from "react-modal"
import { FaPlus } from "react-icons/fa"

const customStyles = {
  content: {
    width: "600px",
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    position: "relative",
  },
}

Modal.setAppElement("#root")

const Ticket = () => {
  const [modalIsOpen, setIsOpen] = useState(false)
  const [noteText, setNoteText] = useState("")
  const { ticket, isLoading, isSuccess, isError, message } = useSelector((state) => state.tickets)
  const { notes, isLoading: notesIsLoading } = useSelector((state) => state.notes)
  const dispatch = useDispatch()
  const { ticketId } = useParams()
  const navigate = useNavigate()

  useEffect(() => {
    if (isError) {
      toast.error(message)
    }

    dispatch(getTicket(ticketId))
    dispatch(getNotes(ticketId))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isError, message, ticketId])

  const onClose = () => {
    dispatch(closeTicket(ticketId))
    toast.success("Ticket Closed")
    navigate("/tickets")
  }

  //Create note and submit
  const onNoteSubmit = (e) => {
    e.preventDefault()
    dispatch(createNote({ noteText, ticketId }))
    closeModal()
  }

  //Open/Close modal
  const openModal = () => {
    setIsOpen(true)
  }
  const closeModal = () => {
    setIsOpen(false)
  }

  if (isLoading || notesIsLoading) {
    return <Loader />
  }

  if (isError) {
    return <h3>Something Went Wrong</h3>
  }

  return (
    <div className="ticket-page">
      <header className="ticket-header">
        <BackButton url="/tickets" />
        <h2>
          Ticket ID: {ticket._id}
          <span className={`status status-${ticket.status}`}>{ticket.status}</span>
        </h2>
        <h3>Data Submitted: {new Date(ticket.createdAt).toLocaleString()}</h3>
        <h3>Product: {ticket.product}</h3>
        <hr />
        <div className="ticket-desc">
          <h3>Description of the issue</h3>
          <p>{ticket.description}</p>
        </div>
        <h2>Notes</h2>
      </header>

      {ticket.status !== "Closed" && (
        <button onClick={openModal} className="btn">
          <FaPlus />
          Add Note
        </button>
      )}

      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="Add Note"
      >
        <h2>Add Note</h2>
        <button className="btn-close" onClick={closeModal}>
          X
        </button>
        <form onSubmit={onNoteSubmit}>
          <div className="form-group">
            <textarea
              name="noteText"
              id="noteText"
              className="form-control"
              placeholder="Your note"
              value={noteText}
              onChange={(e) => {
                setNoteText(e.target.value)
              }}
            ></textarea>
          </div>
          <div className="form-group">
            <button className="btn" type="submit">
              Submit
            </button>
          </div>
        </form>
      </Modal>

      {notes.map((note) => (
        <NoteItem key={note._id} note={note} />
      ))}

      {ticket.status !== "Closed" && (
        <button onClick={onClose} className="btn btn-block btn-danger">
          Close
        </button>
      )}
    </div>
  )
}

export default Ticket
