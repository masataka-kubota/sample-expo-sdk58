# main branch protection rules
prohibit_protected_branch_commits() {
  current_branch="$(git symbolic-ref --quiet --short HEAD 2>/dev/null || echo "")"

  # Skip protection while detached HEAD has no branch context.
  [ -z "$current_branch" ] && return 0

  if [ "$current_branch" = "main" ]; then
    echo "⚠️ Warning: Direct commits on the 'main' branch are prohibited."
    echo "➡️ Please switch to a feature/fix branch and open a PR."
    exit 1
  fi
}

# Get base branch for comparing diff.
# Detached HEADs do not have a branch context, so fall back to the PoC default.
get_base_branch() {
  current_branch="$(git symbolic-ref --quiet --short HEAD 2>/dev/null || echo "")"

  if [ -z "$current_branch" ]; then
    echo "origin/main"
    return 0
  fi

  # PoC policy: feat/fix/etc -> main
  echo "origin/main"
}
