const asyncHandler = require("express-async-handler")

const User = require("../models/userModel")
const Ticket = require("../models/ticketModel")

// @desc    Get user ticket
// @route   GET /api/tickets
// @access  Private
const getTickets = asyncHandler(async (req, res) => {
  //Get user by id and jwt
  const user = await User.findById(req.user.id)
  if (!user) {
    res.status(401)
    throw new Error("User not found")
  }

  const tickets = await Ticket.find({ user: req.user.id })
  res.status(200).json(tickets)
})

// @desc    Single ticket page
// @route   GET /api/tickets/:id
// @access  Private
const getTicket = asyncHandler(async (req, res) => {
  //Get user by id and jwt
  const user = await User.findById(req.user.id)
  if (!user) {
    res.status(401)
    throw new Error("User not found")
  }

  const ticket = await Ticket.findById(req.params.id)

  if (!ticket) {
    res.status(404)
    throw new Error("Ticket not found")
  }

  if (ticket.user.toString() !== req.user.id) {
    res.status(401)
    throw new Error("Unauthorized")
  }

  res.status(200).json(ticket)
})

// @desc    Create new ticket
// @route   POST /api/tickets
// @access  Private
const createTicket = asyncHandler(async (req, res) => {
  const { product, description } = req.body
  if (!product || !description) {
    res.status(400)
    throw new Error("No products found")
  }

  //Get user by id and jwt
  const user = await User.findById(req.user.id)
  if (!user) {
    res.status(401)
    throw new Error("User not found")
  }

  const ticket = await Ticket.create({
    product,
    description,
    user: req.user.id,
    status: "New",
  })

  res.status(200).json(ticket)
})

//Delete ticket
// @desc    Single ticket page
// @route   DELETE /api/tickets/:id
// @access  Private
const deleteTicket = asyncHandler(async (req, res) => {
  //Get user by id and jwt
  const user = await User.findById(req.user.id)
  if (!user) {
    res.status(401)
    throw new Error("User not found")
  }

  const ticket = await Ticket.findById(req.params.id)

  if (!ticket) {
    res.status(404)
    throw new Error("Ticket not found")
  }

  if (ticket.user.toString() !== req.user.id) {
    res.status(401)
    throw new Error("Unauthorized")
  }

  await Ticket.deleteOne({ id: req.params.id })

  res.status(200).json({ success: true })
})

// @desc    Update ticket
// @route   PUT /api/tickets/:id
// @access  Private
const updateTicket = asyncHandler(async (req, res) => {
  //Get user by id and jwt
  const user = await User.findById(req.user.id)
  if (!user) {
    res.status(401)
    throw new Error("User not found")
  }

  const ticket = await Ticket.findById(req.params.id)

  if (!ticket) {
    res.status(404)
    throw new Error("Ticket not found")
  }

  if (ticket.user.toString() !== req.user.id) {
    res.status(401)
    throw new Error("Unauthorized")
  }

  const updatedTicket = await Ticket.findByIdAndUpdate(req.params.id, req.body, { new: true })

  res.status(200).json(updatedTicket)
})

module.exports = {
  getTickets,
  createTicket,
  getTicket,
  deleteTicket,
  updateTicket,
}
