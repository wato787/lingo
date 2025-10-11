FROM mcr.microsoft.com/devcontainers/base:ubuntu

# 必要なパッケージをインストール
RUN apt-get update && apt-get install -y \
    curl \
    git \
    zsh \
    && rm -rf /var/lib/apt/lists/*

# miseをインストール
RUN curl https://mise.run | sh

# miseとbunをPATHに追加
RUN echo 'export PATH="$HOME/.local/bin:$PATH"' >> ~/.zshrc
RUN echo 'export PATH="$HOME/.bun/bin:$PATH"' >> ~/.zshrc

# 作業ディレクトリを設定
WORKDIR /app

