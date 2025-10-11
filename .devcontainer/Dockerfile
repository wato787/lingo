FROM mcr.microsoft.com/devcontainers/base:ubuntu

# 必要なパッケージをインストール
RUN apt-get update && apt-get install -y \
    curl \
    git \
    zsh \
    && rm -rf /var/lib/apt/lists/*

# miseをインストール
ARG MISE_VERSION=2025.10.7
RUN curl -fsSL https://mise.jdx.dev/install.sh | MISE_VERSION=v${MISE_VERSION} sh  

// .devcontainer/Dockerfile
# ── remove these two lines (they should no longer live in the Dockerfile build step)
# RUN echo 'export PATH="$HOME/.local/bin:$PATH"' >> ~/.zshrc
# RUN echo 'export PATH="$HOME/.bun/bin:$PATH"' >> ~/.zshrc


// .devcontainer/devcontainer.json
{
  // … other settings …
  "postCreateCommand": "echo 'export PATH=\"$HOME/.local/bin:$HOME/.bun/bin:$PATH\"' >> ~/.zshrc && sed -i 's/ZSH_THEME=\"devcontainers\"/ZSH_THEME=\"robbyrussell\"/' ~/.zshrc",
  // … other settings …
}
# ── remove these two lines (they should no longer live in the Dockerfile build step)
# RUN echo 'export PATH="$HOME/.local/bin:$PATH"' >> ~/.zshrc
# RUN echo 'export PATH="$HOME/.bun/bin:$PATH"' >> ~/.zshrc


// .devcontainer/devcontainer.json
{
  // … other settings …
  "postCreateCommand": "echo 'export PATH=\"$HOME/.local/bin:$HOME/.bun/bin:$PATH\"' >> ~/.zshrc && sed -i 's/ZSH_THEME=\"devcontainers\"/ZSH_THEME=\"robbyrussell\"/' ~/.zshrc",
  // … other settings …
}

# 作業ディレクトリを設定
WORKDIR /app

