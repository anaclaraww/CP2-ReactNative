# TaskFlow

Aplicativo mobile em React Native + TypeScript com Expo.

---

## Tecnologias

- React Native
- TypeScript
- React Navigation 
- AsyncStorage
- Context API (Auth, Task, Theme)
- Fetch API (DummyJSON)

---

## Instalação e execução

```bash
# 1. Instalar dependências
npm install

# 2. Iniciar o Expo
npx expo start

# 3. Abrir no dispositivo
# - Escaneie o QR Code com o app Expo Go (iOS/Android)
# - Ou pressione 'a' para Android Emulator / 'i' para iOS Simulator
```

---

## Usuários de teste

| Usuário | Senha | Perfil | Redireciona para |
|---------|-------|--------|-----------------|
| admin   | 123   | admin  | Configurações   |
| user    | 123   | user   | Home            |

---

## Estrutura do projeto

```
src/
  components/
    CustomButton.tsx     # Botão reutilizável com variantes
    CustomInput.tsx      # Input com label e erro
    Header.tsx           # Cabeçalho com user info e logout
    TaskCard.tsx         # Card de tarefa na listagem
    EmptyState.tsx       # Estado vazio
    StatusBadge.tsx      # Badge de status e prioridade
    FilterBar.tsx        # Filtros horizontais por status

  screens/
    auth/
      LoginScreen.tsx
    home/
      HomeScreen.tsx      # Boas-vindas + frase + estatísticas
    tasks/
      TaskListScreen.tsx  # Lista com busca e filtros
      TaskFormScreen.tsx  # Criar/Editar tarefa
      TaskDetailScreen.tsx# Detalhes + ações
    settings/
      SettingsScreen.tsx  # Tema, tratamento, perfil

  routes/
    AppRoutes.tsx         # Login vs Main (Auth gate)
    TabRoutes.tsx         # Bottom Tabs
    HomeStackRoutes.tsx
    TaskStackRoutes.tsx
    SettingsStackRoutes.tsx

  services/
    taskStorage.ts        # AsyncStorage CRUD
    api.ts                # DummyJSON (frases + categorias)

  context/
    AuthContext.tsx       # Login, logout, persistência
    TaskContext.tsx       # CRUD de tarefas
    ThemeContext.tsx      # Dark/Light mode

  hooks/
    useTasks.ts           # Lógica de filtro e busca

  types/
    task.ts               # Task, TaskStatus, TaskPriority
    user.ts               # User, UserRole, Tratamento
    navigation.ts         # Tipos de rotas

  utils/
    formatDate.ts
    generateId.ts

  constants/
    categories.ts         # Categorias com ícone e cor

App.tsx                   # Providers + NavigationContainer
```

---

## Funcionalidades

### Autenticação
- Login com usuário/senha hardcoded
- Sessão persistida no AsyncStorage
- Redirecionamento por perfil (admin → Config, user → Home)
- Logout limpa os dados

### Tarefas
- Criar tarefa com título, descrição, status, prioridade e categoria
- Listar com FlatList, busca e filtro por status
- Ver detalhe completo
- Editar qualquer campo
- Excluir com confirmação (Alert)
- Persistência local via AsyncStorage

### Home
- Frase motivacional via API (DummyJSON) com loading e fallback
- Estatísticas de tarefas por status

### Configurações
- Alternar tema dark/light (persistido)
- Preferência de tratamento (Sr./Sra./Srta.)
- Perfil do usuário logado

---
## Arquitetura
Arquitetura baseada em Feature-based + Camadas
```
src/
├── features/
│   ├── auth/
│   │   ├── components/
│   │   ├── screens/
│   │   ├── hooks/
│   │   ├── services/
│   │   ├── types/
│   │   └── index.ts
│   └── orders/
│
├── shared/
│   ├── components/
│   ├── hooks/
│   ├── services/
│   ├── utils/
│   └── types/
│
├── navigation/
├── config/
└── App.tsx
```

## Fluco de dados
```
UI → Hook → Service → API
           ↓
        State
```

---

## Conceitos aplicados

- `useState`, `useEffect`, `useContext`, `useCallback`, `useMemo`
- Context API (3 contextos)
- Custom Hook (`useTasks`)
- FlatList com `renderItem` tipado
- Navegação Stack + Bottom Tabs com tipos
- AsyncStorage
- fetch com loading, erro e fallback
- TypeScript strict sem `any`
- Componentização com props tipadas
- StyleSheet com temas dinâmicos
"# CP2-ReactNative" 
