# Ethara.ai Task Manager — Workspace Portal

An advanced, developer-first task and project management workspace system built as an engineering assignment for **Ethara.ai**. This system delivers secure user authentication, project isolation, and real-time task orchestration over a modular full-stack environment.

## 🚀 Live Production Links

* **Production Frontend Console:** [Deployed on Vercel](https://task-manager-ethara-ai-lilac.vercel.app/)
* **Infrastructure API Service Backend:** Deployed on Render

---

## 🏗️ Architectural Blueprint: Feature-Driven Module Design

This project avoids generic, cluttered directory structures (like placing all components or custom hooks into massive global folders). Instead, it implements a highly maintainable **Clean, Feature-Based Architecture** within the frontend application. 

Every domain slice (such as Authentication, Projects, or Tasks) is isolated into a self-contained module, strictly decoupled into **four distinct layers**:

### The 4-Layer Execution Breakdown

| Layer | Responsibility & Implementation |
| :--- | :--- |
| **1. State** | **Global Access:** Manages application caching variables and active data collections. Provides snappy reactivity across screens without prop-drilling. |
| **2. Services** | **Backend Integration:** Dedicated network-layer service functions configured to communicate directly with the Render API servers. |
| **3. Hooks** | **The Logic Bridge:** Unifies state modification and async API services. Exposes predictable, executable handlers down to the UI pages. |
| **4. UI** | **Presentational Blocks:** Completely abstracted from business rules. Focuses cleanly on styling layouts with CSS and presenting data layers directly from hooks. |

---

## ⚙️ Technology Stack

### Frontend Architecture (`/client`)
* **Core Framework:** React.js
* **Styling Solution:** Pure CSS styling files (optimized high-density workspace UI layouts)
* **Hosting Platform:** Vercel

### Backend & Database Architecture (`/server`)
* **Runtime Environment:** Node.js
* **Web Framework:** Express.js
* **Database Layer:** MongoDB with Object-Data Modeling (ODM) via Mongoose
* **Cryptographic Security:** `bcrypt` (Secure blowfish-cipher password hashing)
* **Session Integrity:** `jsonwebtoken` (JWT stateless bearer tokens for session protection)
* **Cross-Origin Security:** `cors` middleware integration
* **Hosting Infrastructure:** Render

---

## 🔒 Security & Middleware Protocols

The backend architecture implements two foundational security walls to handle data isolation and user access control:
1.  **Authentication Middleware (`authMiddleware`):** Intercepts client incoming requests, decrypts the injected JWT bearer token, and binds verified session identities to the request lifecycle.
2.  **Role-Based Authorization Middleware (`authorize`):** Evaluates user profiles against resource access definitions (e.g., locking dangerous data modification actions exclusively behind an `"admin"` role flag).

---

## 📡 API Reference & Operational Endpoints

### 1. Authentication & Identity Management
| HTTP Method | Resource Route | Security Guard | System Action |
| :--- | :--- | :--- | :--- |
| **POST** | `/api/auth/register` | Open Access | Registers a new user account into MongoDB |
| **POST** | `/api/auth/login` | Open Access | Validates credentials; yields a secure JWT bearer token |
| **GET** | `/api/auth/me` | `authMiddleware` | Resolves the profile data of the currently logged-in identity |
| **GET** | `/api/auth/logout` | `authMiddleware` | Terminates the current session lifecycle |
| **GET** | `/api/auth/alluser` | `authMiddleware` | Enumerates a clean registry index of system users |

### 2. Project Orchestration
| HTTP Method | Resource Route | Security Guard | System Action |
| :--- | :--- | :--- | :--- |
| **POST** | `/api/projects/create` | `authMiddleware` + `Admin Only` | Instantiates a new project workspace container |
| **GET** | `/api/projects/` | `authMiddleware` | Returns all project records accessible to the actor |
| **GET** | `/api/projects/:id` | `authMiddleware` | Details a singular project entity |
| **PUT** | `/api/projects/:id` | `authMiddleware` + `Admin Only` | Updates metadata on an existing project scope |
| **DELETE** | `/api/projects/:id` | `authMiddleware` + `Admin Only` | Hard-deletes target project container from DB |
| **POST** | `/api/projects/:id/members` | `authMiddleware` + `Admin Only` | Provisions access links for team members into a project |

### 3. Task Management Matrix
| HTTP Method | Resource Route | Security Guard | System Action |
| :--- | :--- | :--- | :--- |
| **POST** | `/api/tasks/` | `authMiddleware` + `Admin Only` | Appends a fresh task into a targeted project track |
| **GET** | `/api/tasks/` | `authMiddleware` | Populates task backlogs linked across workspace streams |
| **GET** | `/api/tasks/:id` | `authMiddleware` | Looks up detailed metrics and logs of a single task |
| **PUT** | `/api/tasks/:id` | `authMiddleware` | Alters properties, statuses, or tracking details of a task |
| **DELETE** | `/api/tasks/:id` | `authMiddleware` + `Admin Only` | Erases an unneeded task tracking object from the system |

---

## 🛠️ Currently Functional Features (Verified Lifecycle)

The following operational milestones have been verified across the codebase and deployment environments:
* **Encrypted Authentication Flow:** Users can register and establish verified secure login sessions using JSON Web Tokens.
* **Role-Based Security Matrix:** Data integrity operations (creating or deleting entire tasks/projects) are safely restricted to accounts containing `"admin"` access flags.
* **Workspace Navigation Portal:** A high-density interface providing live telemetry monitoring, a system state tracking banner (`v2.0.6-Beta`), and real-time computation of cross-workspace metrics (**Total**, **Completed**, **Pending**, and **Overdue** items).
* **Clean Separation of Concerns:** Business logics, raw styling sheets, and HTTP data hooks never bleed into presentation components, keeping development fast and codebase scaling clean.