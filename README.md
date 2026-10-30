# API de Reservas de Canchas Deportivas - Evaluación P1

- **Estudiante:** SISALEMA JIMENEZ, YOSTIN ARIEL
- **Correo Institucional:** yasisalema@espe.edu.ec
- **ID ESPE:** L00438431 (Dígito de variante: 1)
- **Canchas de variante:** Básquet 1 · Tenis 1
- **Fecha de variante:** 2026-11-11
- **Puerto configurado:** 3031

---

## Comandos para levantar el proyecto

### 1. Variables de entorno
Copiar el archivo de ejemplo y configurar las variables:
```bash
cp .env-example .env
```
Contenido de `.env`:
```env
PORT=3031
NODE_ENV=development
JWT_SECRET=super_secreto_jwt_examen
DATABASE_URL="postgresql://espe_user:espe_password@localhost:5432/espe_db?schema=public"
```

### 2. Instalar dependencias
```bash
npm install
```

### 3. Levantar la base de datos PostgreSQL con Docker
```bash
docker compose up -d
```

### 4. Ejecutar migraciones y generar el cliente Prisma
```bash
npx prisma migrate dev --name init
npx prisma generate
```

### 5. Ejecutar el Seed
```bash
npx prisma db seed
```

### 6. Iniciar el servidor
```bash
npm run dev
# o para producción:
npm start
```

---

## Tabla de Endpoints

| Método | Endpoint | Rol Requerido | Body | Respuestas | Descripción |
|---|---|---|---|---|---|
| `POST` | `/api/auth/register` | Público | `{ name, email, password }` | `201`, `400` | Registra usuario con rol USER y contraseña cifrada con bcrypt. |
| `POST` | `/api/auth/login` | Público | `{ email, password }` | `200`, `400` | Genera JWT `{ id, role }` con expiración de 4 horas. |
| `GET` | `/api/auth/protected-route` | Token | — | `200`, `401`, `403` | Ruta de prueba con `authenticateToken`. |
| `POST` | `/api/admin/schedules` | ADMIN | `{ court, startTime, endTime }` | `201`, `401`, `403` | Crea un nuevo horario de cancha. |
| `GET` | `/api/admin/bookings` | ADMIN | — | `200`, `401`, `403` | Lista todas las reservas con usuario y horario (`include`). |
| `POST` | `/api/bookings` | Token | `{ date, scheduleId }` | `201`, `400` | Crea una reserva (400 si el horario ya está ocupado). |
| `GET` | `/api/bookings/:id` | Dueño o ADMIN | — | `200`, `403`, `404` | Obtiene una reserva por ID con `authorizeBooking`. |
| `PUT` | `/api/bookings/:id` | Dueño o ADMIN | `{ date, scheduleId }` | `200`, `400`, `403`, `404` | Actualiza la reserva validando solapamiento de horario. |
| `DELETE` | `/api/bookings/:id` | Dueño o ADMIN | — | `204`, `403`, `404` | Elimina la reserva especificada. |
| `GET` | `/api/users/:id/bookings` | Dueño o ADMIN | — | `200`, `403` | Lista reservas del usuario con su horario (`authorizeUser`). |

---

## Pruebas con Postman
Importar en Postman:
1. Colección: `postman/EVAL_P1_Sisalema.postman_collection.json`
2. Entorno: `postman/EVAL_P1_local.postman_environment.json`

