// kevyamon/portfolio-backend/models/TimelineModel.js
import mongoose from 'mongoose';

const timelineSchema = new mongoose.Schema(
  {
    year: {
      type: String,
      required: [true, 'Veuillez ajouter une année ou une période'],
    },
    title: {
      type: String,
      required: [true, 'Veuillez ajouter un titre'],
    },
    location: {
      type: String,
      required: [true, 'Veuillez ajouter un lieu'],
    },
    description: {
      type: String,
      required: [true, 'Veuillez ajouter une description'],
    },
    icon: {
      type: String,
      required: [true, "Veuillez choisir une icône"],
      // ON A SUPPRIMÉ LA LIGNE 'enum: [...]' pour autoriser toutes les nouvelles icônes
    },
    order: {
      type: Number,
      required: true,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

const Timeline = mongoose.model('Timeline', timelineSchema);

export default Timeline;