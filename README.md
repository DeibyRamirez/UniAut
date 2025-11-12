# Uniboost - Plataforma Universitaria

Plataforma web para mostrar las carreras de la Corporación Universitaria Autónoma del Cauca.

## Características

- ✅ Catálogo de carreras con imágenes, modalidad y descripción
- ✅ Formulario de registro para la comunidad
- ✅ Enlaces a redes sociales y sitio oficial
- ✅ Diseño responsive y moderno
- ✅ Backend API con Next.js
- ✅ Preparado para MongoDB Atlas

## Estructura del Proyecto

\`\`\`
/app
  /api
    /carreras - API para obtener carreras
    /registro - API para registrar usuarios
  /registro - Página de registro
  page.tsx - Página principal
/components
  carrera-card.tsx - Componente de tarjeta de carrera
  footer.tsx - Footer con redes sociales
/lib
  mongodb.ts - Configuración de MongoDB (preparada)
  data-mock.ts - Datos de ejemplo
/types
  index.ts - Tipos TypeScript
\`\`\`

## Configuración de MongoDB Atlas

### 1. Instalar dependencias

\`\`\`bash
npm install mongodb
\`\`\`

### 2. Crear base de datos en MongoDB Atlas

1. Ve a [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Crea un cluster gratuito
3. Crea una base de datos llamada `uniboost`
4. Crea dos colecciones:
   - `carreras`
   - `usuarios_comunidad`

### 3. Estructura de las colecciones

**Colección: carreras**
\`\`\`json
{
  "_id": ObjectId,
  "titulo": "Ingeniería de Sistemas",
  "modalidad": "Presencial",
  "descripcion": "Descripción de la carrera...",
  "imagen": "URL de la imagen",
  "duracion": "10 semestres",
  "facultad": "Facultad de Ingeniería"
}
\`\`\`

**Colección: usuarios_comunidad**
\`\`\`json
{
  "_id": ObjectId,
  "nombreCompleto": "Juan Pérez",
  "correoElectronico": "juan@ejemplo.com",
  "telefono": "3001234567",
  "fechaRegistro": ISODate
}
\`\`\`

### 4. Agregar variable de entorno

Agrega tu connection string en las variables de entorno de Vercel:

\`\`\`
MONGODB_URI=mongodb+srv://usuario:password@cluster.mongodb.net/uniboost?retryWrites=true&w=majority
\`\`\`

### 5. Activar el código de MongoDB

En los archivos:
- `/lib/mongodb.ts`
- `/app/api/carreras/route.ts`
- `/app/api/registro/route.ts`

Descomenta el código marcado con `TODO` y comenta los datos mock.

## Personalización

### Cambiar colores

Edita `/app/globals.css` para cambiar los colores del tema:

\`\`\`css
--color-primary: #1e40af; /* Azul universitario */
--color-secondary: #f59e0b; /* Naranja/dorado */
\`\`\`

### Agregar más carreras

Edita `/lib/data-mock.ts` o agrega directamente en MongoDB.

### Modificar enlaces de redes sociales

Edita `/components/footer.tsx` para cambiar los enlaces.

## Desarrollo

\`\`\`bash
npm run dev
\`\`\`

Abre [http://localhost:3000](http://localhost:3000) en tu navegador.

## Despliegue

Despliega fácilmente en Vercel:

1. Conecta tu repositorio de GitHub
2. Agrega la variable de entorno `MONGODB_URI`
3. Despliega

## Soporte

Para más información sobre la Corporación Universitaria Autónoma del Cauca, visita:
- [Sitio Web Oficial](https://www.uniautonoma.edu.co)
