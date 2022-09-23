import { Link } from "react-router-dom"

const TicketItem = ({ ticket }) => {
  return (
    <div className="ticket">
      <div>{new Date(ticket.createdAt).toLocaleString()}</div>
      <div>{ticket.product}</div>
      <div className={`status status-${ticket.status}`}>{ticket.status}</div>
      <Link to={`/ticket/${ticket._id}`} className="status status-view">
        View
      </Link>
    </div>
  )
}

export default TicketItem
