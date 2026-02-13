---
name: spring-boot-notes
description: 撰寫或擴充 Spring Boot 相關學習筆記與說明頁時，遵循專案結構與技術要點。Use when adding Spring Boot content, REST API examples, configuration, or dependency patterns.
---

# Spring Boot 筆記主軸

## 何時使用
- 新增/修改 Spring Boot 相關頁面或說明（`SpringBootPage` 或對應內容）
- 撰寫 RESTful API、設定、依賴、測試等範例與教學

## 專案脈絡
- 本專案為前端筆記站（React + Vite），Spring Boot 內容以**說明頁／教學文件**形式呈現，非後端專案。
- 若需程式碼範例，以簡潔、可複製的片段為主，並註明用途（如 controller、application.yml）。

## 撰寫要點
- **結構**：標題清晰、章節分段（概述、快速開始、常用功能、設定、範例程式碼等）。
- **技術**：Spring Boot 3.x、Java 17+；REST 設計、Bean Validation、Spring Data JPA、Spring Security 等可依主題選用。
- **格式**：與專案其他頁面一致—繁體中文、深色主題 UI、程式碼區塊使用專案既有樣式。
- **依賴**：提及 starter 時註明 artifact（如 `spring-boot-starter-web`），版本可跟隨 Spring Boot BOM。

## 與其他主軸配合
- 版面與元件風格遵循 [frontend-ui](../frontend-ui/SKILL.md)；若為獨立 HTML 子頁，可參考 [algorithm-lab](../algorithm-lab/SKILL.md) 的章節與程式碼區塊慣例。
