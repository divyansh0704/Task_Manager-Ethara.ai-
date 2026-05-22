# Ethara.ai Task Manager — Workspace Portal

An advanced, high-density task management workspace application built as an engineering assignment for **Ethara.ai**. Inspired by clean, minimalist developer-first interfaces, this system provides real-time task tracking, project monitoring, dynamic user provisioning, and state caching optimized for sub-second interface updates.

---

## 🚀 Live Deployments

* **Production Frontend Console:** [Deployed on Vercel](https://task-manager-ethara-ai-lilac.vercel.app/)
* **Infrastructure API Service Backend:** [Deployed on Render](https://task-manager-ethara-ai-yor6.onrender.com)

---

## 🏗️ Architectural Blueprint: Feature-Driven Module Design

This project deliberately rejects standard, cluttered file-type directories in favor of a **Clean, Feature-Based Architecture**. Every domain slice (such as `Auth`, `Project`, or `Task`) is completely isolated and self-contained, divided strictly into **four decoupled layers**: