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
      required: [true, "Veuillez choisir un type d'icône (diploma, stage, lab, code)"],
      // On limite les choix pour correspondre aux icônes du frontend
      enum: ['diploma', 'stage', 'lab', 'code'], 
    },
  },
  {
    timestamps: true, // Ajoute automatiquement "créé le" et "modifié le"
  }
);

const Timeline = mongoose.model('Timeline', timelineSchema);

export default Timeline;