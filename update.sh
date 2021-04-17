#!/usr/bin/env bash
set -e -u -o pipefail

fatal() {
  echo "FATAL: $@"
  exit 1
}

npm_build(){
  pushd ../labs/
  rm -rf build
  npm run build
  popd
}

update() {
  rm -rf $(ls * | grep -Ev 'CNAME|update.sh')
  cp -r ../labs/build/* .
}

main() {
  local commit_msg="$@"

  [[ -z "$commit_msg" ]] && {
    fatal "must provide commit message"
  }

  npm_build
  update

  git status
  git add .
  git commit -m "$commit_msg"
  return $?
}

main "$@"
