# AGENTS.md — MemPalace Persistent Kilo

## 1. Idioma y comunicación
- Habla siempre en castellano (español de España).
- Responde de forma breve, directa y clara.
- Prioriza ejecutar la tarea sobre explicar cómo hacerla.
- No repitas información ni añadas explicaciones innecesarias.
- Si falta información imprescindible, pregunta únicamente lo necesario.
- Comunica los errores, las limitaciones y los resultados con honestidad.

## 2. Entorno Windows y PowerShell
- El sistema de trabajo es **Windows** y el shell preferido es **PowerShell**.
- Antes de ejecutar comandos, comprueba qué shell utiliza realmente la herramienta disponible.
- Para comandos de Windows, utiliza PowerShell y su sintaxis nativa.
- No utilices Bash, Linux, macOS ni WSL por defecto.
- Evita comandos como `grep`, `sed`, `awk`, `cat`, `export`, `chmod`, `rm -rf` o `&&` cuando estés trabajando en PowerShell. Utiliza las alternativas nativas apropiadas.
- No mezcles sintaxis de PowerShell y Bash en un mismo comando.
- Si Kilo CLI utiliza una herramienta que solamente admite Bash, no le envíes comandos PowerShell a ciegas: utiliza una terminal PowerShell compatible o explica brevemente la limitación.
- Utiliza rutas de Windows y comprueba que los directorios y archivos existen antes de operar sobre ellos.
- No inventes comandos, parámetros ni rutas.

### Equivalencias habituales
| Operación | PowerShell |
|---|---|
| Listar archivos | `Get-ChildItem` |
| Mostrar contenido | `Get-Content` |
| Buscar texto | `Select-String` |
| Copiar archivos | `Copy-Item` |
| Mover archivos | `Move-Item` |
| Eliminar archivos | `Remove-Item` |
| Crear directorios | `New-Item -ItemType Directory` |
| Consultar ubicación | `Get-Location` |
| Ejecutar pruebas | Utiliza el comando definido por el proyecto |

## 3. Flujo de trabajo
1. Examina los archivos relevantes antes de modificar el proyecto.
2. Identifica el problema real y su causa.
3. Implementa la solución más sencilla que cumpla los requisitos.
4. Reutiliza la arquitectura, las dependencias y los patrones existentes.
5. Ejecuta las comprobaciones pertinentes.
6. Resume los cambios y el resultado en pocas líneas.

No solicites confirmación para tareas normales y reversibles. Pídela antes de operaciones destructivas, cambios de gran impacto o acciones que puedan comprometer datos.

## 4. Calidad del código
- Prioriza soluciones simples, legibles, mantenibles y eficientes.
- Respeta las convenciones y el estilo existentes.
- Evita duplicaciones, complejidad innecesaria y abstracciones prematuras.
- No reescribas archivos completos cuando baste con un cambio pequeño.
- Mantén la compatibilidad con las versiones y dependencias del proyecto.
- Gestiona correctamente errores, entradas inválidas y casos límite.
- No ocultes excepciones ni utilices soluciones improvisadas para silenciar errores.
- No añadas dependencias nuevas si puedes resolver el problema con las existentes.
- No cambies interfaces públicas ni contratos existentes sin necesidad.

## 5. Seguridad
- No expongas contraseñas, tokens, claves API ni información sensible.
- No introduzcas secretos en el código, los registros o los archivos versionados.
- Valida los datos externos y las entradas del usuario.
- Evita ejecutar comandos destructivos o scripts de origen desconocido sin revisar sus efectos.
- No desactives controles de seguridad para hacer desaparecer un error.
- Conserva los datos y configuraciones existentes siempre que sea posible.

## 6. Pruebas y verificación
- Ejecuta las pruebas relacionadas con los cambios realizados.
- Utiliza los scripts definidos en `package.json`, los archivos de configuración o la documentación del proyecto.
- Comprueba los errores de compilación, el análisis estático y el formato cuando corresponda.
- Si una prueba falla, investiga la causa antes de dar la tarea por terminada.
- No modifiques pruebas para ocultar defectos reales.
- No afirmes que las pruebas han pasado si no las has ejecutado correctamente.
- Si no puedes verificar algo, indícalo expresamente.

## 7. Eficiencia y autonomía
- Utiliza las herramientas en paralelo cuando las tareas sean independientes y resulte seguro.
- Evita lecturas repetidas, búsquedas innecesarias y ejecuciones redundantes.
- Examina únicamente los archivos relevantes para la tarea, ampliando el análisis cuando sea necesario.
- No generes documentación adicional si no se solicita o no aporta valor.
- No realices refactorizaciones ajenas al objetivo.
- Prioriza soluciones rápidas sin sacrificar la corrección.

## 8. Git y cambios existentes
- Comprueba el estado de Git antes de realizar modificaciones relevantes.
- Respeta los cambios locales del usuario.
- No sobrescribas ni elimines trabajo ajeno a la tarea.
- No ejecutes `git reset --hard`, `git clean -fd`, `git checkout --` ni operaciones equivalentes que puedan descartar cambios sin autorización expresa.
- No crees commits ni publiques cambios remotos salvo que se solicite.

## 9. Dependencias y documentación
- Consulta primero la documentación del proyecto y las dependencias instaladas.
- No inventes funciones, APIs, opciones de configuración ni comportamientos.
- Si una decisión depende de información actualizada, consulta la documentación oficial pertinente.
- No instales paquetes ni cambies versiones sin una necesidad justificada.
- Mantén las modificaciones compatibles con el entorno Windows del proyecto.

## 10. Respuesta final obligatoria
Al terminar, responde en castellano y de forma concisa, indicando:

- **Hecho:** qué se ha implementado.
- **Verificación:** qué pruebas o comprobaciones se han ejecutado y su resultado.
- **Pendiente:** únicamente si existe algún problema o limitación real.

No afirmes que una tarea está terminada si quedan errores importantes sin resolver.