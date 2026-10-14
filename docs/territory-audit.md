# Auditoría de delimitaciones territoriales — Huellas Originarias

Revisión de las **semillas (centros) que generan las manchas (Voronoi) por período** frente a la documentación histórica. La fuente estructural es `src/app/data/territories.ts`; la única fuente de verdad de contenidos es `src/app/data/communities.ts`.

## Veredictos resumidos

### NOA y Cuyo
| Grupo | Centro actual | Veredicto | Centro recomendado |
|---|---|---|---|
| Cazadores NOA | [-67.5,-24.5] | Ajustar | [-67.4,-26.1] |
| Cazadores Cuyo | [-69.5,-33.5] | Ajustar | [-69.4,-31.6] |
| Cóndor Huasi | [-65.5,-28.0] | Ajustar | [-67.0,-27.6] |
| Aguada | [-65.0,-29.0] | OK | — |
| Ciénaga | [-64.5,-30.0] | Ajustar | [-65.6,-26.8] |
| Santa María | [-64.5,-31.0] | Ajustar | [-66.0,-26.7] |
| Belén | [-65.0,-32.0] | Ajustar | [-67.0,-27.6] |
| Kolla | [-65.5,-24.0] | Ajustar | [-65.4,-23.2] |
| Atacameño | [-68.0,-24.5] | Ajustar | [-66.4,-23.4] |
| Diaguita | [-65.5,-29.0] | Ajustar | [-66.0,-25.5] |
| Comechingón | [-65.0,-32.5] | OK | — |
| Huarpe | [-69.5,-34.0] | Ajustar (prioridad alta) | [-67.4,-32.3] |
| Cazadores centro | [-65.0,-32.5] | Cuestionable (solapa) | [-60.5,-37.0] |

### NEA y Chaco
| Grupo | Centro actual | Veredicto | Centro recomendado |
|---|---|---|---|
| Cazadores NEA | [-57.0,-28.0] | Ajustar | [-59.0,-29.0] |
| Guaraní (1400) | [-57.0,-28.5] | Ajustar leve | [-57.5,-28.0] |
| Guaraní (1536/presente) | [-55.5,-27.0] | OK | — |
| Qom | [-61.0,-25.5] | Ajustar | [-59.0,-26.5] |
| Wichi | [-63.0,-24.5] | Ajustar leve | [-62.5,-23.8] |
| Mocoví | [-61.0,-28.0] | Ajustar | [-60.5,-29.0] |
| Pilagá | [-57.5,-25.0] | Ajustar (prioridad alta) | [-60.5,-24.7] |
| Cazadores Pampa | [-61.5,-37.5] | OK | — |

### Patagonia y Tierra del Fuego
| Grupo | Centro actual | Veredicto | Centro recomendado |
|---|---|---|---|
| Cazadores Pampa | [-61.5,-37.5] | OK | — |
| Cazadores Patagonia | [-69.0,-45.0] | OK | — |
| Cazadores Fuego | [-67.5,-54.0] | OK | — |
| Ranquel (1400) | [-65.5,-36.5] | Anacrónico (eliminar del período) | eliminar entrada |
| Ranquel (1536) | [-63.0,-34.0] | Anacrónico (eliminar) | eliminar entrada |
| Ranquel (1850/presente) | [-64.5,-35.5] | OK | — |
| Mapuche (1400-presente) | varios | OK | — |
| Tehuelche (todos) | varios | OK | — |
| Selknam (todos) | [-67.5,-53.5] | OK | — |
| Yamana (todos) | [-68.0,-55.0] | OK | — |

## Cambios aplicados
Se aplicaron en `src/app/data/territories.ts` todas las correcciones recomendadas (incluida la eliminación de Ranquel de los períodos 1400 y 1536, por ser anacrónico).">{{