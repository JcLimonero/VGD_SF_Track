FROM node:22-bookworm-slim AS build

WORKDIR /app
ENV PUPPETEER_SKIP_DOWNLOAD=true

COPY package.json package-lock.json .npmrc ./
RUN npm ci

COPY . .
RUN npm run build

FROM nginx:1.27-alpine

RUN apk add --no-cache wget

# La imagen de nginx sustituye las ${VARIABLES} de esta plantilla al arrancar
COPY nginx/default.conf.template /etc/nginx/templates/default.conf.template
# Prepara los logs diarios y borra los de más de 15 días
COPY nginx/docker-entrypoint.d/05-logs.sh /docker-entrypoint.d/05-logs.sh
# Revisa API_PROVIDER_TOKEN y API_UPSTREAM antes de sustituir la plantilla
COPY nginx/docker-entrypoint.d/10-validate-env.sh /docker-entrypoint.d/10-validate-env.sh
COPY --from=build /app/dist/vex /usr/share/nginx/html

EXPOSE 80

HEALTHCHECK --interval=30s --timeout=5s --start-period=10s --retries=3 \
  CMD wget -qO- http://127.0.0.1/ >/dev/null || exit 1
