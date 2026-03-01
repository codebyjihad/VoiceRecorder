# Project Name

A professional web application built with **Next.js** for frontend and **Node.js + Express + MongoDB** for backend.  
Includes content protection features to prevent users from copying text.

---

## Demo

- Live Demo: [nothing]

--- file structure
VoiceNest/
├─ .next/
│  └─ dev/
│     ├─ build/
│     │  └─ chunks/
│     ├─ cache/
│     │  ├─ images/
│     │  │  ├─ AjxTsenkFkrJ1QbTzFNiaJGjkcGMV6FBE9q970_CL_0/
│     │  │  ├─ btsw_0zt2ol1cZyIKZMqgkCmHb9vkm3gcujf-ZaL4Yc/
│     │  │  └─ gFMm1IE_skSIYvDzYPA6FhPAASAj3KL_oaw8apTHoC0/
│     │  └─ turbopack/
│     │     └─ 0c06f068/
│     ├─ logs/
│     ├─ server/
│     │  ├─ app/
│     │  │  ├─ _not-found/
│     │  │  │  └─ page/
│     │  │  └─ (dashboard)/
│     │  │     ├─ calls/
│     │  │     │  └─ page/
│     │  │     ├─ page/
│     │  │     ├─ profile/
│     │  │     │  └─ page/
│     │  │     └─ recordings/
│     │  │        └─ page/
│     │  └─ chunks/
│     │     └─ ssr/
│     ├─ static/
│     │  ├─ chunks/
│     │  ├─ development/
│     │  └─ media/
│     └─ types/
├─ app/
│  ├─ (dashboard)/
│  │  ├─ calls/
│  │  ├─ profile/
│  │  ├─ recordings/
│  │  └─ users/
│  └─ auth/
│     ├─ login/
│     └─ register/
├─ components/
│  ├─ call/
│  ├─ layout/
│  ├─ recording/
│  └─ ui/
├─ context/
├─ hooks/
├─ lib/
├─ public/
└─ types/


## Features

### Frontend (Next.js)
- Fully responsive UI using Next.js 13 (App Router)
- Optimized fonts using next/font
- Client-side and server-side rendering support
- Copy protection system:
  - Disable right-click
  - Disable text selection
  - Disable Ctrl+C / Ctrl+X / Ctrl+A
- Integration with backend APIs
- Interactive components and pages

### Backend (Node.js + Express + MongoDB)
- RESTful API design
- MongoDB database with Mongoose ORM
- Authentication & Authorization (JWT or Session-based)
- CRUD operations for resources (Users, Products, etc.)
- API protection for sensitive content
- Proper error handling and validation
- Middleware for security (CORS, Helmet, rate limiting)

### Extra Features (Optional)
- Real-time notifications or chat using Socket.io
- File uploads with Multer / Cloud Storage
- API testing with Postman / Jest
- Deployment ready with Vercel (frontend) and Render / Railway / Heroku (backend)

---

## Tech Stack

| Layer       | Technology |
|------------|------------|
| Frontend   | Next.js 13, React, Tailwind CSS / Chakra UI |
| Backend    | Node.js, Express.js |
| Database   | MongoDB, Mongoose |
| Deployment | Vercel (frontend), Render / Railway / Heroku (backend) |
| Tools      | Git, VSCode, Postman, ESLint, Prettier |

