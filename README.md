# MemPalace Persistent Kilo

Plugin de persistencia MemPalace para Kilo Code. Inyecta recuerdos y memoria en el contexto de la conversación, exporta transcripciones a archivos planos y mina sesiones en un palacio de memoria persistente.

## Características

- **Inyección automática de identidad y recuerdos** al inicio de cada sesión.
- **Exportación de transcripciones** a archivos `.txt` planos.
- **Minado de sesiones** al cerrar, en idle o al iniciar.
- **Lectura MCP de solo lectura** para acceder al palacio.
- **Escritura mediante `mp-write.py`** para persistedad segura.
- **Pie de página TUI** con estado del plugin.

## Instalación

```bash
npm install
```

## Desarrollo

```bash
npm run build    # Compilar TypeScript
npm run dev      # Modo watch
npm run typecheck # Verificar tipos
npm run lint      # Ejecutar ESLint
npm run test      # Ejecutar pruebas
```

## Configuración

El plugin se configura mediante `mempalace-config.json` en el directorio del proyecto:

```json
{
  "palacePath": "C:\\ProyectosIA\\mempalace-memory",
  "mcpEndpoint": "mempalace",
  "mpWriteScript": "C:\\Users\\delac\\.mempalace\\mp-write.py",
  "autoInject": true,
  "exportTranscripts": true,
  "mineOnIdle": true,
  "mineOnExit": true,
  "mineOnStartup": true,
  "statusFooter": true
}
```

## Estructura

```
src/
  index.ts          # Punto de entrada del plugin
  hooks/
    config.ts       # Configuración del plugin
    event.ts        # Manejador de eventos del ciclo de vida
    chat.ts         # Inyección de contexto en chat
    tool.ts         # Hooks de herramientas
    shell.ts        # Variables de entorno del shell
  mempalace/
    client.ts       # Cliente MCP de lectura
    writer.ts       # Escritor mediante mp-write.py
    miner.ts        # Minado de sesiones
    export.ts       # Exportación de transcripciones
  tui/
    footer.ts       # Pie de página TUI
  utils/
    config.ts       # Utilidades de configuración
    logger.ts       # Sistema de logging
```