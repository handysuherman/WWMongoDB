FROM node:16.15.1

WORKDIR /app
# Install Chromium.
RUN \
  wget -q -O - https://dl-ssl.google.com/linux/linux_signing_key.pub | apt-key add - && \
  echo "deb http://dl.google.com/linux/chrome/deb/ stable main" > /etc/apt/sources.list.d/google.list && \
  apt-get update && \
  apt-get install -y google-chrome-stable && \
  rm -rf /var/lib/apt/lists/*s

COPY ./.wwebjs_auth ./

COPY package.json ./

COPY package-lock.json ./

RUN npm install --force

COPY index.js /app/index.js

# Run everything after as non-privileged user.
RUN useradd -ms /bin/bash wppuser
USER wppuser

CMD ["node","index.js"]