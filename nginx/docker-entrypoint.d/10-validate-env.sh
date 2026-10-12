#!/bin/sh
# Se ejecuta antes de que la imagen de nginx sustituya la plantilla. Si un valor
# trae comillas, `;`, `$` o saltos de línea, rompería la configuración o permitiría
# inyectar directivas: mejor no arrancar.
set -eu

fail() { echo "ERROR: $1" >&2; exit 1; }

[ -n "${API_PROVIDER_TOKEN:-}" ] || fail "falta API_PROVIDER_TOKEN"
[ -n "${API_UPSTREAM:-}" ] || fail "falta API_UPSTREAM"

# `case` y no `grep`: grep revisa línea por línea y dejaría pasar `abc<salto>def`.
case "$API_PROVIDER_TOKEN" in
  *[!A-Za-z0-9._~-]*) fail "API_PROVIDER_TOKEN solo puede tener letras, números y . _ ~ -" ;;
esac

case "$API_UPSTREAM" in
  *[!A-Za-z0-9.:/-]*) fail "API_UPSTREAM tiene caracteres no permitidos" ;;
esac
printf '%s' "$API_UPSTREAM" | grep -Eq '^https?://[A-Za-z0-9.-]+(:[0-9]{1,5})?$' ||
  fail "API_UPSTREAM debe ser una URL base sin ruta, p. ej. https://apisvanguardia.com:400"
