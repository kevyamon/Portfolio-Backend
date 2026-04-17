//kevyamon/portfolio-backend/models/ProjectModel.js
import mongoose from 'mongoose';

const projectSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'Veuillez ajouter un titre'],
    },
    description: {
      type: String,
      required: [true, 'Veuillez ajouter une description'],
    },
    mediaType: {
      type: String,
      required: true,
      enum: ['image', 'video'],
    },
    mediaUrl: {
      type: String,
      required: true,
    },
    mediaPublicId: {
      type: String,
      required: true,
    },
    link: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

const Project = mongoose.model('Project', projectSchema);

export default Project;