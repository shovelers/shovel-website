# Shovel Company — Website

This repo is the whole Shovel website. It is **one file**: `index.html`.
There is nothing to install and nothing to build. When you change `index.html`,
the live website updates by itself in about a minute.

---

## How to edit the text (the easy way — no downloads)

You do everything on github.com, in your browser. You never download files.

1. Go to this repo on github.com and click **`index.html`**.
2. Click the **pencil icon** (top-right of the file) — this is "Edit".
3. Press **Cmd + F** (Mac) or **Ctrl + F** (Windows) to open Find.
4. Type **`EDIT`** and press Enter to jump between the 8 signposts in the file.
   Each signpost tells you exactly what text you're allowed to change in that part.
5. Change the words, then scroll to the bottom and click the green
   **"Commit changes"** button (you can leave the little message box as-is).
6. Wait about 1 minute, then refresh the live website. Your change is there.

That's the whole loop. Edit → Commit → refresh. No folders, no local preview.

---

## The one rule that keeps the site from breaking

Only change words that sit **between** a `>` and a `<` symbol.

Example — to change the headline, edit only the capital letters here:

    <span class="acc">TOOLS.</span>
                      ^^^^^^  ← change this part only

Do **not** change anything inside the `< angle brackets >` (those are the
instructions that tell the browser how to draw the page). The 8 EDIT signposts
in the file repeat this rule wherever it matters.

If you ever change the contact email words, also update the
`href="mailto:..."` part right next to it, so the email link still works.

---

## The 8 editable sections (what each signpost covers)

1. **Top bar** — brand name, the "Issue 01..." line, the menu words
2. **Hero** — the giant "WE MAKE TOOLS." headline + the sentence under it
3. **Philosophy** — "A tool is leverage." + the Tool Index list
4. **Stevens** — "Meet Stevens." + the three pillars + the quote
5. **Creole** — "The substrate." + the three building blocks
6. **Consulting** — "Knowledge is a tool, too." + the services list
7. **The people** — the two founder cards
8. **Contact** — the email, the closing line, and the links

---

## If something looks wrong after an edit

GitHub keeps every past version. Nothing is ever truly lost. If an edit breaks
the look of the page, you can undo it: open `index.html`, click the **History**
button (clock icon), open the version from before your change, and copy the text
back. Or just ask Claude to revert it — that's faster.

---

## Want a safer "draft first" setup later?

Right now, editing publishes straight to the live site. If you'd prefer to
preview changes on a separate hidden link before they go public, that can be
added later — just ask. For a small site, editing live and refreshing is
usually fine.
