<p align="center">
  <img
    src="./assets/banner.png"
    alt="Vai Dar Onda - Aplicação de previsão para surfistas"
    width="100%"
  >
</p>

# Apresentação do projeto + Guia do Usuário

## 📌 Apresentação do projeto

O **VAI DAR ONDA** é uma aplicação web desenvolvida com o objetivo de facilitar a consulta e a interpretação das condições do mar para a prática do surf.

A aplicação busca transformar informações técnicas de previsão, como condições das ondas, vento e temperatura, em informações mais simples e acessíveis para o usuário.

O projeto foi desenvolvido no contexto da disciplina **Prática Profissional de ADS**, do curso de **Análise e Desenvolvimento de Sistemas da Universidade Presbiteriana Mackenzie**.

### 🎯 Objetivo

O principal objetivo do VAI DAR ONDA é permitir que o usuário consulte as condições de uma determinada praia de forma rápida e intuitiva, facilitando a compreensão das informações necessárias para avaliar as condições do mar.

A aplicação deverá permitir que o usuário:

* busque uma praia pelo nome;
* selecione uma praia para consulta;
* visualize as condições das ondas;
* visualize informações sobre o vento;
* consulte a temperatura;
* visualize o índice de surfabilidade;
* consulte informações de previsão;
* salve uma praia como favorita;
* consulte posteriormente suas praias favoritas.

A consulta de uma praia **não depende de ela estar salva como favorita**. O usuário poderá pesquisar e consultar qualquer praia disponível no sistema, enquanto o recurso de favoritos serve para facilitar o acesso posterior às praias de interesse.

### 👥 Público-alvo

O sistema é destinado principalmente a:

* surfistas iniciantes;
* surfistas intermediários;
* surfistas experientes;
* escolas de surf;
* pessoas interessadas em consultar as condições do mar.

### 📍 Contexto

Informações sobre previsão do mar podem envolver diversos dados técnicos, como altura, período e direção das ondas, além de velocidade e direção do vento e temperatura.

O VAI DAR ONDA busca organizar essas informações em uma interface mais simples, permitindo que o usuário compreenda as condições da praia sem precisar interpretar individualmente cada informação técnica.

---

# 📖 Guia do Usuário

---

## 1. Acessando a aplicação

### Como acessar
Acesse através do endereço oficial da plataforma: `https://mayyarrud.github.io/trabalho-prat-prof/`.

### Requisitos
Navegador web moderno com conexão à internet. A plataforma foi desenhada no modelo *mobile-first*, recomendando-se o uso em dispositivos móveis para a melhor experiência.

### Status
**MVP Disponível.**

---

## 2. Cadastro de usuário

### Objetivo
Permitir que um novo usuário crie uma conta para utilizar as funcionalidades que exigem autenticação.

### Como acessar
Na tela inicial, selecione a opção "Fazer cadastro" ou clique em "Criar sua conta".

### Passo a passo
1. Acesse o formulário de cadastro.
2. Insira o seu Nome e E-mail.
3. Defina uma Senha (mínimo de 6 caracteres).
4. Selecione o seu "Nível de Surf" (ex: Intermediário).
5. Confirme o cadastro.

### Resultado esperado
Conta criada com sucesso e usuário redirecionado para a plataforma autenticada.

### Status
**Funcionalidade MVP / Em validação.**

---

## 3. Login

### Objetivo
Permitir que usuários cadastrados acessem sua conta.

### Como acessar
Através da tela "Acesse sua conta".

### Passo a passo
1. Insira o E-mail e a Senha registrados.
2. Clique no botão "Fazer login".
3. Alternativamente, utilize a opção "Continuar com Google" para acesso rápido.

### Resultado esperado
Autenticação efetuada com sucesso, liberando os recursos de personalização do perfil.

### Status
**Funcionalidade MVP / Em validação.**

---

## 4. Recuperação de senha

### Objetivo
Permitir que o usuário recupere o acesso à sua conta caso esqueça sua senha.

### Como acessar
Na tela de login, clicando no link "Esqueceu sua senha?".

### Passo a passo
1. Clique no link de recuperação.
2. Informe o e-mail cadastrado.
3. Siga as instruções enviadas para a sua caixa de entrada.
4. Cadastre uma nova senha de acesso.

### Resultado esperado
Acesso à conta restaurado com a nova credencial de segurança.

### Status
**Em desenvolvimento.**

---

## 5. Buscar uma praia

### Objetivo
Permitir que o usuário encontre uma praia disponível no sistema.

### Como acessar
Na tela inicial "Encontre sua praia".

### Passo a passo
1. Clique no campo "Buscar praia...".
2. Digite o nome da praia desejada ou utilize os filtros de seleção por País, Estado e Cidade.
3. *(Nota: O MVP apresenta dados de 10 praias selecionadas do litoral de São Paulo, como Barra do Una e Maresias)*.

### Resultado esperado
A praia correspondente é exibida na lista de resultados ou destacada na tela.

### Status
**MVP Disponível.**

---

## 6. Selecionar uma praia

### Objetivo
Permitir que o usuário selecione a praia que deseja consultar.

### Como acessar
A partir da lista de pesquisa ou do card de destaque.

### Passo a passo
1. Encontre a praia desejada nos resultados.
2. Clique sobre o nome ou card da praia.
3. Clique no botão inferior "Ver previsão ->" ou "Ver previsão completa ->".

### Resultado esperado
O sistema redireciona o usuário para a tela detalhada de condições marítimas da praia escolhida.

### Status
**MVP Disponível.**

---

## 7. Consultar as condições da praia

### Objetivo
Apresentar ao usuário as informações disponíveis sobre as condições da praia selecionada.

### Informações previstas
* Condições das ondas;
* Altura das ondas;
* Período das ondas;
* Direção das ondas;
* Velocidade do vento;
* Direção do vento;
* Temperatura;
* Índice de surfabilidade.

### Como acessar
Na tela específica da praia, carregada após a seleção.

### Passo a passo
1. Visualize o quadro "Condições principais" logo abaixo do nome da praia.
2. Consulte as seções detalhadas de "Ondas", com informações de altura, período e direção.
3. Consulte as seções de "Vento" e "Clima" (Temperatura e Condição).

### Resultado esperado
O usuário visualiza os dados técnicos formatados de maneira clara e acessível.

### Status
**MVP Disponível.**

---

## 8. Visualizar o índice de surfabilidade

### Objetivo
Permitir que o usuário visualize uma indicação das condições de surf da praia consultada.

### Como acessar
Exibido em destaque nos cards da praia e no resumo de condições principais.

### Interpretação do índice
O índice resume os dados técnicos em uma classificação textual simples (ex: "Alta"), indicando visualmente se a praia oferece boas condições de ondas e ventos sem que o usuário precise analisar os números brutos.

### Resultado esperado
Compreensão imediata do cenário ideal para o surf, facilitando a tomada de decisão.

### Status
**MVP Disponível.**

---

## 9. Consultar a previsão

### Objetivo
Permitir que o usuário consulte informações relacionadas à previsão das condições do mar.

### Como acessar
Através do menu de abas localizado na tela de detalhes da praia.

### Informações apresentadas
Projeção das condições de onda, vento e clima em diferentes períodos.

### Passo a passo
1. Na tela da praia selecionada, localize as opções de navegação temporal.
2. Clique na aba "Hoje" para verificar as métricas atuais.
3. Selecione a aba "5 dias" para visualizar as estimativas para os dias seguintes.

### Resultado esperado
A interface atualiza automaticamente os blocos de dados climáticos conforme o período escolhido.

### Status
**Funcionalidade MVP.**

---

## 10. Salvar uma praia como favorita

### Objetivo
Permitir que o usuário salve uma praia para facilitar consultas futuras.

### Como acessar
Pelo ícone de "coração" disponível na listagem ou na tela específica da praia.

### Passo a passo
1. Acesse o sistema com sua conta de usuário.
2. Busque e selecione a praia de seu interesse.
3. Clique no ícone de "coração" (♡) para ativá-lo.

### Resultado esperado
A praia é adicionada à lista de praias favoritas do usuário e o ícone passa a ficar preenchido.

### Status
**Funcionalidade MVP / Em validação.**

---

## 11. Consultar praias favoritas

### Objetivo
Permitir que o usuário visualize as praias que salvou como favoritas.

### Como acessar
Através da tela "Meu Perfil".

### Passo a passo
1. Faça login e acesse a aba do seu perfil.
2. Verifique o campo de "Praia favorita".
3. Clique sobre a praia listada para carregar imediatamente a sua previsão.

### Resultado esperado
Acesso rápido e direto às previsões dos locais preferidos do usuário.

### Status
**Funcionalidade MVP / Em validação.**

---

## 12. Meu Perfil

### Objetivo
Permitir que o usuário visualize e gerencie suas informações pessoais cadastradas na aplicação.

### Como acessar
Pela navegação principal, acessando o menu da conta.

### Informações disponíveis
Nível de Surf atual e Praias Favoritas selecionadas.

### Funcionalidades disponíveis
* Visualizar e alterar o Nível de Surf.
* Visualizar a Praia favorita vinculada.
* Salvar alterações de cadastro e Alterar senha de acesso.

### Status
**Funcionalidade MVP / Em validação.**

---

## 13. Sair da aplicação

### Objetivo
Permitir que o usuário encerre sua sessão.

### Como acessar
Através do menu do usuário autenticado.

### Passo a passo
1. Acesse as opções da sua conta.
2. Clique na opção "Sair" ou "Logout".

### Resultado esperado
A conta é desconectada com segurança e o usuário retorna à tela inicial de busca.

### Status
**Em desenvolvimento.**

---

# 🔄 Fluxo básico de utilização

O fluxo principal previsto para utilização da aplicação é:

```text
Acessar a aplicação
        ↓
Buscar uma praia
        ↓
Selecionar a praia
        ↓
Visualizar as condições
        ↓
Consultar a previsão
        ↓
Visualizar o índice de surfabilidade
        ↓
Salvar como favorita (opcional)

O usuário também poderá acessar posteriormente suas praias favoritas:

Login
  ↓
Praias favoritas
  ↓
Selecionar uma praia
  ↓
Visualizar condições
```
---

## 🛠️ Como executar o projeto localmente

O projeto é um monorepo com dois pacotes: `packages/frontend` (React, Vite e Supabase Auth) e `packages/backend` (Fastify, Drizzle ORM e PostgreSQL). O frontend se comunica com a API HTTP; o backend acessa o banco diretamente. **Para executar tudo localmente, ainda é necessário um projeto Supabase e um widget Cloudflare Turnstile configurados.**

### 1. Pré-requisitos e instalação

- [Git](https://git-scm.com/).
- [Node.js 24](https://nodejs.org/)
- [pnpm 12.6.0](https://pnpm.io/installation)
- Acesso a um projeto [Supabase](https://supabase.com/) com PostgreSQL e Auth e a um widget [Cloudflare Turnstile](https://developers.cloudflare.com/turnstile/).

No terminal:

```bash
git clone https://github.com/Mayyarrud/trabalho-prat-prof.git
cd trabalho-prat-prof
pnpm install --frozen-lockfile
```

Execute os próximos comandos **a partir da raiz do repositório**, salvo indicação em contrário. Não use `npm install`: as dependências são gerenciadas pelo workspace do pnpm.

### 2. Configurar as variáveis de ambiente

Crie os dois arquivos locais a partir dos modelos versionados:

```bash
cp .env.example .env
cp packages/frontend/.env.example packages/frontend/.env.local
```

No arquivo `.env` da **raiz** (backend), preencha:

| Variável | Finalidade |
| --- | --- |
| `DATABASE_URL` | String de conexão com o PostgreSQL do Supabase. |
| `SUPABASE_URL` | URL do mesmo projeto Supabase usado no frontend. |
| `SUPABASE_PUBLISHABLE_KEY` | Chave pública/publishable do projeto Supabase, usada para validar autenticação. |
| `CORS_ORIGIN` | Origem permitida para o frontend local (`http://localhost:5173`). |

No arquivo `packages/frontend/.env.local` (Vite), preencha:

| Variável | Finalidade |
| --- | --- |
| `VITE_API_URL` | URL da API local (`http://localhost:3000`). |
| `VITE_SUPABASE_URL` | URL do projeto Supabase. |
| `VITE_SUPABASE_PUBLISHABLE_KEY` | Chave pública/publishable desse projeto. |
| `VITE_TURNSTILE_SITE_KEY` | Chave pública do widget Turnstile usado no cadastro, login e recuperação de senha. |

As variáveis `VITE_*` são incorporadas ao código do navegador: **não coloque nelas senhas do banco, chaves secretas ou a `service_role` do Supabase**. Os arquivos `.env` e `.env.local` são ignorados pelo Git.

No painel do Supabase, habilite os métodos de autenticação desejados e inclua `http://localhost:5173/**` nas URLs de redirecionamento permitidas em **Authentication → URL Configuration** para o fluxo de confirmação de e-mail e recuperação de senha. Para testes, prefira um **widget Turnstile de desenvolvimento**, com `localhost` autorizado e sua chave secreta correspondente configurada no CAPTCHA do Supabase; não adicione `localhost` ao widget de produção. O mesmo projeto Supabase deve ser usado pelo frontend e backend.

### 3. Preparar o banco de dados (primeira execução)

Com o `.env` da raiz preenchido, aplique as migrações SQL já existentes no repositório:

```bash
pnpm --filter @vai-dar-onda/backend exec drizzle-kit migrate
```

O esquema `public.user` referencia `auth.users` do Supabase. **Apenas em projetos novos, sem esse gatilho configurado**, execute no **SQL Editor** do Supabase o SQL abaixo para criar o perfil automaticamente após o cadastro. Esse gatilho não está incluído nas migrações do repositório; se ele já existe, mantenha a configuração atual.

```sql
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = ''
AS $$
BEGIN
  INSERT INTO public."user" (id, role, name, surf_level)
  VALUES (
    NEW.id,
    'user',
    COALESCE(
      NULLIF(TRIM(NEW.raw_user_meta_data ->> 'name'), ''),
      NULLIF(SPLIT_PART(NEW.email, '@', 1), ''),
      'Usuário'
    ),
    NULLIF(TRIM(NEW.raw_user_meta_data ->> 'surf_level'), '')
  )
  ON CONFLICT (id) DO NOTHING;

  RETURN NEW;
END;
$$;

CREATE TRIGGER on_auth_user_created
AFTER INSERT ON auth.users
FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();
```

Depois, importe as 10 praias do MVP (CETESB/IBGE) e suas previsões iniciais (Open-Meteo):

```bash
pnpm --filter @vai-dar-onda/backend populate-beaches-db
pnpm --filter @vai-dar-onda/backend populate-forecast-db
```

Esses comandos exigem acesso à internet e ao banco. Se as praias já estiverem cadastradas, o primeiro script não as insere novamente.

### 4. Iniciar a aplicação

Em um terminal, execute o **backend**:

```bash
pnpm --filter @vai-dar-onda/backend dev
```

Em outro terminal, execute o **frontend**:

```bash
pnpm --filter @vai-dar-onda/frontend dev
```

- Aplicação: [http://localhost:5173](http://localhost:5173)
- API: [http://localhost:3000](http://localhost:3000)

O backend carrega o cache do banco ao iniciar e verifica se as previsões precisam ser atualizadas. Também agenda uma sincronização automática a cada 4 horas. Para encerrar os dois processos, pressione `Ctrl+C` em cada terminal.

# 📝 Atualizações do Guia
Esta documentação será atualizada conforme as funcionalidades forem implementadas, testadas e disponibilizadas na aplicação.

Funcionalidades ainda não implementadas permanecerão identificadas como “Em desenvolvimento” até que possam ser documentadas com o passo a passo definitivo.
