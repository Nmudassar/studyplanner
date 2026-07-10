const subjectsData = {
  biology: {
    name: "Biology",
    icon: "🧬",

    levels: {
      gcse: {
        name: "GCSE",

        topics: [
          {
            id: "cell-biology",
            title: "Cell Biology",

            subtopics: [
              {
                id: "cell-structure",
                title: "Cell Structure"
              },
              {
                id: "animal-and-plant-cells",
                title: "Animal and Plant Cells"
              },
              {
                id: "microscopy",
                title: "Microscopy"
              },
              {
                id: "cell-differentiation",
                title: "Cell Differentiation"
              },
              {
                id: "cell-division",
                title: "Cell Division"
              },
              {
                id: "transport-in-cells",
                title: "Transport in Cells"
              }
            ]
          },

          {
            id: "organisation",
            title: "Organisation",

            subtopics: [
              {
                id: "principles-of-organisation",
                title: "Principles of Organisation"
              },
              {
                id: "digestive-system",
                title: "The Digestive System"
              },
              {
                id: "heart-and-blood-vessels",
                title: "The Heart and Blood Vessels"
              },
              {
                id: "blood",
                title: "Blood"
              },
              {
                id: "plant-tissues",
                title: "Plant Tissues"
              }
            ]
          },

          {
            id: "infection-and-response",
            title: "Infection and Response",

            subtopics: [
              {
                id: "communicable-diseases",
                title: "Communicable Diseases"
              },
              {
                id: "viral-diseases",
                title: "Viral Diseases"
              },
              {
                id: "bacterial-diseases",
                title: "Bacterial Diseases"
              },
              {
                id: "human-defence-systems",
                title: "Human Defence Systems"
              },
              {
                id: "vaccination",
                title: "Vaccination"
              }
            ]
          },

          {
            id: "bioenergetics",
            title: "Bioenergetics",

            subtopics: [
              {
                id: "photosynthesis",
                title: "Photosynthesis"
              },
              {
                id: "limiting-factors",
                title: "Limiting Factors"
              },
              {
                id: "aerobic-respiration",
                title: "Aerobic Respiration"
              },
              {
                id: "anaerobic-respiration",
                title: "Anaerobic Respiration"
              },
              {
                id: "exercise-and-metabolism",
                title: "Exercise and Metabolism"
              }
            ]
          }
        ]
      },

      alevel: {
        name: "A-Level",

        topics: [
          {
            id: "biological-molecules",
            title: "Biological Molecules",

            subtopics: [
              {
                id: "carbohydrates",
                title: "Carbohydrates"
              },
              {
                id: "lipids",
                title: "Lipids"
              },
              {
                id: "proteins",
                title: "Proteins"
              },
              {
                id: "enzymes",
                title: "Enzymes"
              },
              {
                id: "atp",
                title: "ATP"
              },
              {
                id: "water",
                title: "Water"
              }
            ]
          },

          {
            id: "cells",
            title: "Cells",

            subtopics: [
              {
                id: "eukaryotic-cells",
                title: "Eukaryotic Cells"
              },
              {
                id: "prokaryotic-cells",
                title: "Prokaryotic Cells"
              },
              {
                id: "viruses",
                title: "Viruses"
              },
              {
                id: "microscopy-alevel",
                title: "Microscopy"
              },
              {
                id: "cell-fractionation",
                title: "Cell Fractionation"
              }
            ]
          },

          {
            id: "genetic-information",
            title: "Genetic Information",

            subtopics: [
              {
                id: "dna-structure",
                title: "DNA Structure"
              },
              {
                id: "dna-replication",
                title: "DNA Replication"
              },
              {
                id: "protein-synthesis",
                title: "Protein Synthesis"
              },
              {
                id: "genetic-diversity",
                title: "Genetic Diversity"
              },
              {
                id: "classification",
                title: "Classification"
              }
            ]
          }
        ]
      }
    }
  },

  chemistry: {
    name: "Chemistry",
    icon: "⚗️",

    levels: {
      gcse: {
        name: "GCSE",

        topics: [
          {
            id: "atomic-structure",
            title: "Atomic Structure and the Periodic Table",

            subtopics: [
              {
                id: "atoms-elements-compounds",
                title: "Atoms, Elements and Compounds"
              },
              {
                id: "mixtures",
                title: "Mixtures"
              },
              {
                id: "atomic-model",
                title: "Development of the Atomic Model"
              },
              {
                id: "relative-electrical-charges",
                title: "Relative Electrical Charges"
              },
              {
                id: "electronic-structure",
                title: "Electronic Structure"
              },
              {
                id: "periodic-table",
                title: "The Periodic Table"
              }
            ]
          },

          {
            id: "bonding-and-structure",
            title: "Bonding, Structure and Properties",

            subtopics: [
              {
                id: "ionic-bonding",
                title: "Ionic Bonding"
              },
              {
                id: "covalent-bonding",
                title: "Covalent Bonding"
              },
              {
                id: "metallic-bonding",
                title: "Metallic Bonding"
              },
              {
                id: "states-of-matter",
                title: "States of Matter"
              },
              {
                id: "properties-of-materials",
                title: "Properties of Materials"
              }
            ]
          },

          {
            id: "quantitative-chemistry",
            title: "Quantitative Chemistry",

            subtopics: [
              {
                id: "relative-formula-mass",
                title: "Relative Formula Mass"
              },
              {
                id: "conservation-of-mass",
                title: "Conservation of Mass"
              },
              {
                id: "moles",
                title: "Moles"
              },
              {
                id: "concentration",
                title: "Concentration"
              },
              {
                id: "percentage-yield",
                title: "Percentage Yield"
              }
            ]
          },

          {
            id: "chemical-changes",
            title: "Chemical Changes",

            subtopics: [
              {
                id: "reactivity-series",
                title: "The Reactivity Series"
              },
              {
                id: "extraction-of-metals",
                title: "Extraction of Metals"
              },
              {
                id: "acids-and-alkalis",
                title: "Acids and Alkalis"
              },
              {
                id: "making-salts",
                title: "Making Salts"
              },
              {
                id: "electrolysis",
                title: "Electrolysis"
              }
            ]
          }
        ]
      },

      alevel: {
        name: "A-Level",

        topics: [
          {
            id: "physical-chemistry",
            title: "Physical Chemistry",

            subtopics: [
              {
                id: "atomic-structure-alevel",
                title: "Atomic Structure"
              },
              {
                id: "amount-of-substance",
                title: "Amount of Substance"
              },
              {
                id: "bonding-alevel",
                title: "Bonding"
              },
              {
                id: "energetics",
                title: "Energetics"
              },
              {
                id: "kinetics",
                title: "Kinetics"
              },
              {
                id: "equilibria",
                title: "Equilibria"
              }
            ]
          },

          {
            id: "inorganic-chemistry",
            title: "Inorganic Chemistry",

            subtopics: [
              {
                id: "periodicity",
                title: "Periodicity"
              },
              {
                id: "group-two",
                title: "Group 2"
              },
              {
                id: "group-seven",
                title: "Group 7"
              },
              {
                id: "transition-metals",
                title: "Transition Metals"
              },
              {
                id: "reactions-of-ions",
                title: "Reactions of Ions"
              }
            ]
          },

          {
            id: "organic-chemistry",
            title: "Organic Chemistry",

            subtopics: [
              {
                id: "alkanes",
                title: "Alkanes"
              },
              {
                id: "alkenes",
                title: "Alkenes"
              },
              {
                id: "alcohols",
                title: "Alcohols"
              },
              {
                id: "halogenoalkanes",
                title: "Halogenoalkanes"
              },
              {
                id: "organic-analysis",
                title: "Organic Analysis"
              },
              {
                id: "polymers",
                title: "Polymers"
              }
            ]
          }
        ]
      }
    }
  },

  mathematics: {
    name: "Mathematics",
    icon: "📘",

    levels: {
      gcse: {
        name: "GCSE",

        topics: [
          {
            id: "number",
            title: "Number",

            subtopics: [
              {
                id: "integers",
                title: "Integers"
              },
              {
                id: "fractions",
                title: "Fractions"
              },
              {
                id: "decimals",
                title: "Decimals"
              },
              {
                id: "percentages",
                title: "Percentages"
              },
              {
                id: "ratio",
                title: "Ratio and Proportion"
              },
              {
                id: "standard-form",
                title: "Standard Form"
              }
            ]
          },

          {
            id: "algebra",
            title: "Algebra",

            subtopics: [
              {
                id: "algebraic-expressions",
                title: "Algebraic Expressions"
              },
              {
                id: "solving-equations",
                title: "Solving Equations"
              },
              {
                id: "inequalities",
                title: "Inequalities"
              },
              {
                id: "sequences",
                title: "Sequences"
              },
              {
                id: "graphs",
                title: "Graphs"
              },
              {
                id: "simultaneous-equations",
                title: "Simultaneous Equations"
              }
            ]
          },

          {
            id: "geometry-and-measures",
            title: "Geometry and Measures",

            subtopics: [
              {
                id: "angles",
                title: "Angles"
              },
              {
                id: "polygons",
                title: "Polygons"
              },
              {
                id: "area-and-perimeter",
                title: "Area and Perimeter"
              },
              {
                id: "volume",
                title: "Volume"
              },
              {
                id: "transformations",
                title: "Transformations"
              },
              {
                id: "trigonometry",
                title: "Trigonometry"
              }
            ]
          },

          {
            id: "statistics-and-probability",
            title: "Statistics and Probability",

            subtopics: [
              {
                id: "averages",
                title: "Averages"
              },
              {
                id: "data-representation",
                title: "Data Representation"
              },
              {
                id: "scatter-graphs",
                title: "Scatter Graphs"
              },
              {
                id: "basic-probability",
                title: "Basic Probability"
              },
              {
                id: "tree-diagrams",
                title: "Tree Diagrams"
              }
            ]
          }
        ]
      },

      alevel: {
        name: "A-Level",

        topics: [
          {
            id: "pure-mathematics",
            title: "Pure Mathematics",

            subtopics: [
              {
                id: "proof",
                title: "Proof"
              },
              {
                id: "algebra-and-functions",
                title: "Algebra and Functions"
              },
              {
                id: "coordinate-geometry",
                title: "Coordinate Geometry"
              },
              {
                id: "sequences-and-series",
                title: "Sequences and Series"
              },
              {
                id: "trigonometry-alevel",
                title: "Trigonometry"
              },
              {
                id: "exponentials-and-logarithms",
                title: "Exponentials and Logarithms"
              }
            ]
          },

          {
            id: "calculus",
            title: "Calculus",

            subtopics: [
              {
                id: "differentiation",
                title: "Differentiation"
              },
              {
                id: "stationary-points",
                title: "Stationary Points"
              },
              {
                id: "integration",
                title: "Integration"
              },
              {
                id: "area-under-curves",
                title: "Area Under Curves"
              },
              {
                id: "differential-equations",
                title: "Differential Equations"
              }
            ]
          },

          {
            id: "statistics-alevel",
            title: "Statistics",

            subtopics: [
              {
                id: "statistical-sampling",
                title: "Statistical Sampling"
              },
              {
                id: "data-presentation",
                title: "Data Presentation"
              },
              {
                id: "probability-alevel",
                title: "Probability"
              },
              {
                id: "statistical-distributions",
                title: "Statistical Distributions"
              },
              {
                id: "hypothesis-testing",
                title: "Hypothesis Testing"
              }
            ]
          },

          {
            id: "mechanics",
            title: "Mechanics",

            subtopics: [
              {
                id: "quantities-and-units",
                title: "Quantities and Units"
              },
              {
                id: "kinematics",
                title: "Kinematics"
              },
              {
                id: "forces-and-newtons-laws",
                title: "Forces and Newton's Laws"
              },
              {
                id: "moments",
                title: "Moments"
              },
              {
                id: "projectiles",
                title: "Projectiles"
              }
            ]
          }
        ]
      }
    }
  },

  physics: {
    name: "Physics",
    icon: "⚡",

    levels: {
      gcse: {
        name: "GCSE",

        topics: [
          {
            id: "energy",
            title: "Energy",

            subtopics: [
              {
                id: "energy-stores",
                title: "Energy Stores"
              },
              {
                id: "energy-transfers",
                title: "Energy Transfers"
              },
              {
                id: "power",
                title: "Power"
              },
              {
                id: "efficiency",
                title: "Efficiency"
              },
              {
                id: "energy-resources",
                title: "Energy Resources"
              }
            ]
          },

          {
            id: "electricity",
            title: "Electricity",

            subtopics: [
              {
                id: "current",
                title: "Current"
              },
              {
                id: "potential-difference",
                title: "Potential Difference"
              },
              {
                id: "resistance",
                title: "Resistance"
              },
              {
                id: "series-and-parallel-circuits",
                title: "Series and Parallel Circuits"
              },
              {
                id: "domestic-electricity",
                title: "Domestic Electricity"
              }
            ]
          },

          {
            id: "particle-model",
            title: "Particle Model of Matter",

            subtopics: [
              {
                id: "density",
                title: "Density"
              },
              {
                id: "states-of-matter",
                title: "States of Matter"
              },
              {
                id: "internal-energy",
                title: "Internal Energy"
              },
              {
                id: "specific-heat-capacity",
                title: "Specific Heat Capacity"
              },
              {
                id: "specific-latent-heat",
                title: "Specific Latent Heat"
              }
            ]
          },

          {
            id: "forces",
            title: "Forces",

            subtopics: [
              {
                id: "contact-and-non-contact-forces",
                title: "Contact and Non-contact Forces"
              },
              {
                id: "resultant-forces",
                title: "Resultant Forces"
              },
              {
                id: "work-done",
                title: "Work Done"
              },
              {
                id: "motion",
                title: "Motion"
              },
              {
                id: "momentum",
                title: "Momentum"
              }
            ]
          }
        ]
      },

      alevel: {
        name: "A-Level",

        topics: [
          {
            id: "measurements-and-errors",
            title: "Measurements and Errors",

            subtopics: [
              {
                id: "si-units",
                title: "SI Units"
              },
              {
                id: "uncertainty",
                title: "Uncertainty"
              },
              {
                id: "precision-and-accuracy",
                title: "Precision and Accuracy"
              },
              {
                id: "significant-figures",
                title: "Significant Figures"
              },
              {
                id: "experimental-methods",
                title: "Experimental Methods"
              }
            ]
          },

          {
            id: "particles-and-radiation",
            title: "Particles and Radiation",

            subtopics: [
              {
                id: "particles",
                title: "Particles"
              },
              {
                id: "antiparticles",
                title: "Antiparticles"
              },
              {
                id: "photons",
                title: "Photons"
              },
              {
                id: "wave-particle-duality",
                title: "Wave-particle Duality"
              },
              {
                id: "nuclear-radiation",
                title: "Nuclear Radiation"
              }
            ]
          },

          {
            id: "mechanics-and-materials",
            title: "Mechanics and Materials",

            subtopics: [
              {
                id: "scalars-and-vectors",
                title: "Scalars and Vectors"
              },
              {
                id: "motion-alevel",
                title: "Motion"
              },
              {
                id: "newtons-laws",
                title: "Newton's Laws"
              },
              {
                id: "momentum-alevel",
                title: "Momentum"
              },
              {
                id: "materials",
                title: "Materials"
              }
            ]
          },

          {
            id: "waves",
            title: "Waves",

            subtopics: [
              {
                id: "wave-properties",
                title: "Wave Properties"
              },
              {
                id: "stationary-waves",
                title: "Stationary Waves"
              },
              {
                id: "refraction",
                title: "Refraction"
              },
              {
                id: "diffraction",
                title: "Diffraction"
              },
              {
                id: "interference",
                title: "Interference"
              }
            ]
          }
        ]
      }
    }
  }
};