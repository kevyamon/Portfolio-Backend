// kevyamon/portfolio-backend/data/timelineData.js

// Ce sont vos 4 items de parcours, traduits pour notre nouvelle API.
// J'ai ajouté le champ 'order' et j'ai corrigé les icônes.
const timelineItems = [
  {
    year: "2023 – 2025",
    title: "BTS I.A.C. – Option Contrôle",
    location: "Lycée Technique",
    description: "Spécialisation en contrôle qualité, analyses physico-chimiques, microbiologie et HACCP.",
    icon: "diploma",
    order: 0
  },
  {
    year: "2024",
    title: "Stage – Contrôle Qualité",
    location: "Industrie Agroalimentaire",
    description: "Immersion professionnelle : Analyse sensorielle, prélèvements, rédaction de rapports.",
    icon: "stage",
    order: 1
  },
  {
    year: "2022 – 2023",
    title: "Bac Pro Laboratoire (LCQ)",
    location: "Lycée [Nom]",
    description: "Apprentissage des bases analytiques : pH-métrie, chromatographie, titrage.",
    icon: "lab",
    order: 2
  },
  {
    year: "En cours",
    title: "Portfolio Académique",
    location: "Projet Personnel",
    description: "Développement de ce site web interactif pour présenter mes compétences.",
    icon: "code",
    order: 3
  }
];

export default timelineItems;