# Rol del Template Maestro (Design System OEFA)

Este repositorio (`oefx-starter-template`) es la **fuente de la verdad (Master)** para:
1. Componentes compartidos (`src/app/shared/components/`).
2. Barrel de exportación (`src/app/shared/index.ts`).
3. Estilos globales (`src/styles.scss`).
4. Tokens y especificaciones (`design-system/`).

## Protocolo de Recepción y Adopción de Componentes

Cuando un proyecto hijo (`seguimiento_OSOC`, `proyecto-demo-oefx`, etc.) promueva o solicite integrar un nuevo componente:

1. **Revisión del código:**
   - Asegurar que no contenga lógica de negocio ni dependencias acopladas al proyecto de origen.
   - Debe usar variables CSS y tokens oficiales (evitar estilos 'hardcodeados').
   - Asegurar que tenga directivas y soporte de accesibilidad básico.

2. **Registro en el Catálogo:**
   - Exportar la clase y tipos en `src/app/shared/index.ts`.
   - Documentar sus inputs, outputs y variantes en `design-system/design-system-oefa.md`.
   - Agregar su demostración en `src/app/views/design-system/` para showcase visual.

3. **Notificación:**
   - Indicar que el componente está listo en el master para que los proyectos hijos ejecuten su script `./sync-from-template.sh`.
