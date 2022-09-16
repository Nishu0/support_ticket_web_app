const mongoose = require("mongoose")

const ticketSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    product: {
      type: String,
      required: [true, "Please select a product"],
      enum: ["product A", "product B", "product C", "product D"],
    },
    description: {
      type: String,
      required: [true, "Please describe the issue"],
    },
    status: {
      type: String,
      required: true,
      enum: ["New", "Open", "Closed"],
      default: "new",
    },
  },
  {
    timestamps: true,
  }
)

module.exports = mongoose.model("Ticket", ticketSchema)
