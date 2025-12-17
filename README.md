# 🎬 Sistema de Locação de Filmes Moderno

Plataforma completa para **locação de filmes**, desenvolvida com foco em **performance, segurança e escalabilidade**. O sistema oferece integração total entre frontend e backend, painel administrativo intuitivo e **controle de acesso seguro** utilizando **Spring Security**.

---

## 🚀 Tecnologias Utilizadas

### Frontend

* **Next.js** – Framework React para aplicações web modernas
* **TypeScript** – Tipagem estática para maior segurança e produtividade

### Backend

* **Java**
* **Spring Boot** – Criação de APIs REST robustas
* **Spring Security** – Autenticação e autorização

### Banco de Dados

* **PostgreSQL** – Banco de dados relacional

---

## 🔐 Funcionalidades Principais

* Autenticação e autorização de usuários
* Controle de acesso por perfil (ex: administrador e usuário)
* Cadastro e gerenciamento de filmes
* Sistema de locação e devolução
* Painel administrativo
* Integração completa entre frontend e backend

---

## 🧠 Arquitetura

* Frontend consumindo API REST
* Backend seguindo boas práticas com Spring
* Segurança baseada em JWT (ou sessão, se aplicável)
* Banco de dados relacional normalizado

---

## 📦 Pré-requisitos

Antes de começar, você precisará ter instalado:

* Node.js
* npm ou yarn
* Java 17+ (ou versão utilizada no projeto)
* Maven ou Gradle
* PostgreSQL

---

## ▶️ Como Executar o Projeto

### Backend (Spring Boot)

```bash
# entrar na pasta do backend
cd backend

# rodar a aplicação
./mvnw spring-boot:run
```

A API estará disponível em:

```
http://localhost:8080
```

---

### Frontend (Next.js)

```bash
# entrar na pasta do frontend
cd frontend

# instalar dependências
npm install

# rodar o projeto
npm run dev
```

A aplicação estará disponível em:

```
http://localhost:3000
```

---

## 🗄️ Configuração do Banco de Dados

Crie um banco no PostgreSQL e configure as credenciais no `application.properties` ou `application.yml`:

```properties
spring.datasource.url=jdbc:postgresql://localhost:5432/locadora
spring.datasource.username=postgres
spring.datasource.password=senha
```

---

## 📄 Licença

Este projeto foi desenvolvido para fins educacionais e profissionais.

---

## 👨‍💻 Autor

**João Vitor Moreira**
Desenvolvedor Full Stack

---

Se quiser, posso adaptar este README para **GitHub**, adicionar **prints**, **diagrama**, ou deixar mais **profissional para portfólio**.
