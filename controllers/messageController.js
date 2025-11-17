// kevyamon/portfolio-backend/controllers/messageController.js
import Message from '../models/MessageModel.js';

// @desc    Créer un nouveau message
// @route   POST /api/messages
// @access  Public
const createMessage = async (req, res) => {
  try {
    const { name, email, message } = req.body;

    if (!name || !email || !message) {
      return res.status(400).json({ message: 'Veuillez remplir tous les champs' });
    }

    const newMessage = new Message({
      name,
      email,
      message,
    });

    const savedMessage = await newMessage.save();
    res.status(201).json(savedMessage);
  } catch (error) {
    res.status(500).json({ message: 'Erreur serveur', error: error.message });
  }
};

// @desc    Récupérer tous les messages
// @route   GET /api/messages
// @access  Privé (Admin)
const getMessages = async (req, res) => {
  try {
    const messages = await Message.find({}).sort({ createdAt: -1 });
    res.status(200).json(messages);
  } catch (error) {
    res.status(500).json({ message: 'Erreur serveur', error: error.message });
  }
};

// @desc    Marquer un message comme "lu"
// @route   PUT /api/messages/:id/read
// @access  Privé (Admin)
const markMessageAsRead = async (req, res) => {
  try {
    const message = await Message.findById(req.params.id);

    if (message) {
      message.isRead = true; // Met à 'true'
      const updatedMessage = await message.save();
      res.status(200).json(updatedMessage);
    } else {
      res.status(404).json({ message: 'Message non trouvé' });
    }
  } catch (error) {
    res.status(400).json({ message: 'Erreur lors de la mise à jour', error: error.message });
  }
};

// --- NOUVELLE FONCTION ---
// @desc    Marquer un message comme "NON lu"
// @route   PUT /api/messages/:id/unread
// @access  Privé (Admin)
const markMessageAsUnread = async (req, res) => {
  try {
    const message = await Message.findById(req.params.id);

    if (message) {
      message.isRead = false; // Remet à 'false'
      const updatedMessage = await message.save();
      res.status(200).json(updatedMessage);
    } else {
      res.status(404).json({ message: 'Message non trouvé' });
    }
  } catch (error) {
    res.status(400).json({ message: 'Erreur lors de la mise à jour', error: error.message });
  }
};
// -------------------------

// @desc    Supprimer un message
// @route   DELETE /api/messages/:id
// @access  Privé (Admin)
const deleteMessage = async (req, res) => {
  try {
    const message = await Message.findById(req.params.id);

    if (message) {
      await message.deleteOne();
      res.status(200).json({ message: 'Message supprimé avec succès' });
    } else {
      res.status(404).json({ message: 'Message non trouvé' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Erreur serveur', error: error.message });
  }
};

// Exporter toutes les fonctions
export {
  createMessage,
  getMessages,
  markMessageAsRead,
  markMessageAsUnread, // NOUVEL EXPORT
  deleteMessage,
};