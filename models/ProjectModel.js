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
    // Le type de média (vidéo ou photo)
    mediaType: {
      type: String,
      required: true,
      enum: ['image', 'video'],
    },
    // L'URL sécurisée que Cloudinary nous renverra
    mediaUrl: {
      type: String,
      required: true,
    },
    // L'ID public (nécessaire pour pouvoir supprimer le média de Cloudinary)
    mediaPublicId: {
      type: String,
      required: true,
    },
    // Un lien optionnel (ex: vers GitHub, YouTube, etc.)
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