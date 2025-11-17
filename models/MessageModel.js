import mongoose from 'mongoose';

const messageSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Veuillez ajouter un nom'],
    },
    email: {
      type: String,
      required: [true, 'Veuillez ajouter un email'],
      // Mongoose peut vérifier si l'email est dans un format valide
      match: [
        /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
        'Veuillez entrer un email valide',
      ],
    },
    message: {
      type: String,
      required: [true, 'Veuillez ajouter un message'],
    },
    // On ajoutera une fonction pour marquer un message comme "lu"
    isRead: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

const Message = mongoose.model('Message', messageSchema);

export default Message;