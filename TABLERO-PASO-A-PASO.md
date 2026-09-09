# Tablero de clics

La página envía `donacion_click` con `valor_donacion` para cada botón.

En GA4: Administrar → Visualización de datos → Definiciones personalizadas → crear dimensión personalizada:
- Nombre: Valor de donación
- Alcance: Evento
- Parámetro del evento: `valor_donacion`

En Looker/Data Studio:
- Dimensión: Valor de donación
- Métrica: Número de eventos
- Filtro: Nombre del evento = `donacion_click`

Los eventos antiguos que aparecen como `(not set)` no se pueden reconstruir por monto. Los clics nuevos sí.
