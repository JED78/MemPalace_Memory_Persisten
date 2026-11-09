# Reglas de código para MemPalace Persistent Kilo

## Estilo general
- TypeScript estricto, módulos ESNext.
- Nombres descriptivos en inglés técnico.
- Funciones pequeñas y con una única responsabilidad.
- Comentarios solo cuando el código no es autoexplicativo.

## Configuración
- El plugin se configura mediante un archivo `mempalace-config.json` en la raíz del proyecto.
- Las rutas de Windows deben usar barras invertidas escapadas o strings brutos.
- La ruta del palacio por defecto es `C:\ProyectosIA\mempalace-memory`.

## Hooks del plugin
- `config`: registra las opciones del plugin.
- `event`: maneja eventos de ciclo de vida (session.idle, session.exit, session.start).
- `chat.message`: inyecta contexto de memoria antes de cada mensaje.
- `tool.execute.before/after`: permite interceptar herramientas MCP.
- `shell.env`: inyecta variables de entorno como `MP_PALACE_PATH`.

## Seguridad
- Nunca expongas tokens, claves API o ruta de identidad.
- La escritura en el palacio se realiza siempre mediante `mp-write.py`.
- No desactives validaciones de entrada.

## Errores
- Usa `try/catch` con tipos unknown.
- Registra errores con `logger.error` sin exponer datos sensibles.
- No silencies excepciones sin registrarlas.

## Pruebas
- Usa `vitest` para unit tests.
- Mockea dependencias externas (MCP, filesystem).
- Cubre casos de éxito y error.