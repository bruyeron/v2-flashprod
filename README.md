# Flash Production ⚡ v2.0

Tableau de bord de suivi de production multi-activités — React 19 + Tailwind CSS v4.

## Stack
- **React 19** + Vite 6
- **Tailwind CSS v4** via `@tailwindcss/vite`

## Installation
```bash
npm install
npm run dev
```

## Format CSV attendu
Colonnes : `date_appel`, `semaine`, `groupe_suivi`, `source`, `attribut`, `valeur`

### Sources reconnues
| Source | Description |
|--------|-------------|
| `incoming` | Métriques appels entrants |
| `files` | Répartition par file |
| `prev` | Prévisions / planning global |
| `prev_yas_7-21h` | Prévisions tranche 7h-21h |
| `prev_yas_21-6h` | Prévisions tranche 21h-6h |
| `Yas_7-21h` | Appels tranche 7h-21h |
| `Yas_21-6h` | Appels tranche 21h-6h |
| `isol` | SL isolé (TRP 110%) |
| `rd` | Répartition des durées (RD) |

## Sections et formules

### Volumétrie
| Indicateur | Formule |
|------------|---------|
| % TRP vs Prévisions | recu / prevision |
| % TRP vs Reforecast | recu / reforecast |
| % QS | traite / recu |
| % SL | traite_sl / traite |
| % Transfert | transfert / recu |
| % Raccrochage | raccrochage / recu |

### Durée de traitement
| Indicateur | Formule |
|------------|---------|
| DMC | duree_com / traite |
| ACW | duree_acw / traite |
| MEA | rd::En attente / traite |
| DMT | (duree_com + duree_acw) / traite |
| Productivité | (duree_com + duree_acw) / heures_loguées |

### Appels courts
| Indicateur | Formule |
|------------|---------|
| % < 10 sec | appel_moins_10s / recu |
| % < 15 sec | appel_moins_15s / recu |
| % < 50 sec | appel_moins_50s / recu |

### Réitération
| Indicateur | Formule |
|------------|---------|
| % Reit Xh (typo) | reit_typo_Xh / recu |
| % Reit Xh (all) | reit_Xh / recu |
| %FCR | 1 - reit_1h / recu |

### Couverture de charge
| Indicateur | Formule |
|------------|---------|
| Heures loguées | Σ rd / 3600 |
| Taux de couverture | planning2 / besoin2 |
| Taux d'efficacité | heures_loguées / planning2 |
| Taux d'absence | (heures_loguées - planning2) / planning2 |

### Productivité & Occupation
| Indicateur | Formule |
|------------|---------|
| Taux d'occupation | h_productives / h_in-chair |
| Taux prod brut | h_in-chair / h_loguées |
| Taux prod net | h_productives / h_loguées |

### Finances
| Indicateur | Formule |
|------------|---------|
| CA | recu × 0.3 |
| CA/HP | CA / planning2 |
| CA/HL | CA / heures_loguées |
