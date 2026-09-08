# Donaciones LaCardio — GitHub Pages

Proyecto de landing de donaciones para GitHub Pages.

## Archivos

- `index.html`
- `style.css`
- `script.js`
- `assets/logo.png`
- `assets/campana.jpg`

## Google Analytics

La página ya está conectada a Google Analytics 4 con el ID de medición:

`G-30QGR4ZMD5`

Se registran estos eventos:

- `donacion_click`: clic en un botón de donación, incluyendo el valor mostrado y el enlace de checkout.
- `otro_valor_click`: clic en “Otro valor”.
- `solicitud_enlace_pago`: solicitud enviada correctamente desde el formulario “Otro valor”.

No se envían a Google Analytics nombres, celulares ni correos electrónicos.

### Importante: clics vs. donaciones pagadas

Analytics permite medir los clics en los botones. Eso **no significa necesariamente que la persona haya completado el pago** en ePayco. Para confirmar pagos realizados hay que revisar los datos de ePayco o hacer una integración específica.

### Cómo revisar los clics

En Google Analytics puedes consultar el evento `donacion_click`. Para distinguir los botones por monto, el evento incluye el parámetro `valor_donacion`.

Los datos pueden tardar un poco en aparecer en los informes estándar. Para verificar rápidamente que está funcionando, usa el informe **Tiempo real** de Google Analytics y haz una prueba desde la página publicada.

## ePayco

Los botones conservan los enlaces de checkout configurados para:

- $200.000
- $500.000
- $1.000.000
- $2.000.000
- $4.000.000

Si dentro de ePayco aparecen otros valores predeterminados, esos valores se configuran directamente en ePayco y no desde este proyecto.

## Formulario “Otro valor”

El formulario usa FormSubmit y envía las solicitudes a `Ecaudofunda@gmail.com`. La primera vez que se use puede ser necesario confirmar el correo de FormSubmit.
