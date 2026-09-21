#!/bin/bash
set -e

PROJECT_DIR="/Users/apple/Downloads/dexy-graphics-app"
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"

echo "Applying update to $PROJECT_DIR ..."

# Remove the old About component
rm -f "$PROJECT_DIR/src/components/About.tsx"

# Copy in the updated files
cp "$SCRIPT_DIR/src/app/page.tsx" "$PROJECT_DIR/src/app/page.tsx"
cp "$SCRIPT_DIR/src/app/layout.tsx" "$PROJECT_DIR/src/app/layout.tsx"
cp "$SCRIPT_DIR/src/app/globals.css" "$PROJECT_DIR/src/app/globals.css"
mkdir -p "$PROJECT_DIR/src/app/admin/(dashboard)/settings"
cp "$SCRIPT_DIR/src/app/admin/(dashboard)/settings/page.tsx" "$PROJECT_DIR/src/app/admin/(dashboard)/settings/page.tsx"
cp "$SCRIPT_DIR/src/lib/actions.ts" "$PROJECT_DIR/src/lib/actions.ts"
cp "$SCRIPT_DIR/src/components/SiteNav.tsx" "$PROJECT_DIR/src/components/SiteNav.tsx"
cp "$SCRIPT_DIR/src/components/ThemeToggle.tsx" "$PROJECT_DIR/src/components/ThemeToggle.tsx"

echo "Files updated. Committing locally ..."
cd "$PROJECT_DIR"
git add -A
git commit -m "Remove about section, add light/dark theme toggle"

echo ""
echo "Done. Now open GitHub Desktop and click 'Push origin' to publish it."
