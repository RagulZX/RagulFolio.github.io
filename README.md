# Ragul S - Portfolio Website

A plain HTML, CSS and JavaScript website. No installs, no build step.

```
ragul-portfolio/
  index.html        <- all your text: headline, projects, skills, education, contact
  css/style.css     <- colors, fonts, layout, animations
  js/main.js        <- theme toggle, animations, copy-email button (rarely edited)
  images/ragul.webp <- your photo (transparent background)
  README.md         <- this guide
```

## 1. Preview on your computer

Double-click `index.html` and it opens in your browser. Edit a file, save, refresh the browser.
Tip: in VS Code, install the "Live Server" extension, right-click `index.html` and choose
"Open with Live Server" to refresh automatically.

## 2. What to edit (and where)

| I want to change...            | Open this file    | Look for                                              |
|--------------------------------|-------------------|-------------------------------------------------------|
| Headline, intro, side blocks   | `index.html`      | the comment `<!-- HERO ... -->`                       |
| About text and the 3 stats     | `index.html`      | `<!-- ABOUT ... -->` (stats use `data-count="4"`)     |
| Add or edit a project          | `index.html`      | `<!-- PROJECTS ... -->` (copy a whole `<details class="project">` block) |
| Add a live/GitHub link         | `index.html`      | the `TODO` comment inside a project. Remove the `<!--` and `-->` around the button and put your real link |
| Skills                         | `index.html`      | `<!-- SKILLS ... -->`                                 |
| Education, achievements        | `index.html`      | `<!-- EDUCATION -->` and `<!-- ACHIEVEMENTS -->` (copy a `<li>`) |
| Email, phone, LinkedIn, GitHub | `index.html`      | `<!-- CONTACT ... -->`. Use Find and Replace, because your email appears in 4 places |
| Scrolling tools strip          | `index.html`      | `<!-- TICKER -->` (edit both rows the same way)       |
| Logos floating behind my photo | `index.html`      | `<!-- LOGOS BEHIND ME -->`: each `<span class="lb ...">` is one logo. Delete one to remove it, copy one to add another |
| Where each logo sits           | `css/style.css`   | search `.lb-html`, `.lb-css` ...: change `left`, `right`, `top` (percent of the photo box) |
| Contact cards (icon + text)    | `index.html`      | `<!-- CONTACT CARDS -->`: copy a `<li class="c-card">` to add one, e.g. a Twitter/X or WhatsApp card |
| Colors                         | `css/style.css`   | the first lines: `--accent` is the blue, `--bg` is the page color |
| Photo                          | `images/ragul.webp` | replace the file, keep the same name (see below)    |

### Changing your photo
Use a portrait with a transparent background, about 700 pixels wide, saved as `ragul.webp`
(or `.png`). If you use a different file name or type, also change `images/ragul.webp` in `index.html`.

### Adding a new project
1. Open `index.html`, find a `<details class="project"> ... </details>` block.
2. Copy the whole block and paste it right after the last project.
3. Change the title, one-line description, tools and bullet points.
4. Delete `open` from `<details class="project" open>` if you don't want it expanded by default.

## 3. Before you publish (checklist)

- [ ] Add links for the MCP voice assistant and Zero Waste projects (search for `TODO`)
- [ ] Use a professional email address if you have one
- [ ] Remove your phone number from the Contact section if you don't want it public
- [ ] Keep only skills you can talk about in an interview (see "Also:" in Skills)

## 4. Publish for free with GitHub Pages (recommended)

Your address will be `https://aimlessfellow.github.io`.

1. Sign in at github.com as `aimlessfellow`.
2. Click **New repository**. Name it exactly `aimlessfellow.github.io`, choose **Public**, click **Create repository**.
3. Click **uploading an existing file**. Drag in everything that is INSIDE the `ragul-portfolio` folder:
   `index.html`, `css`, `js`, `images`. `index.html` must be at the top level of the repository.
4. Click **Commit changes**.
5. Go to **Settings > Pages**. Under "Build and deployment" choose **Deploy from a branch**,
   set the branch to `main` and the folder to `/ (root)`, then click **Save**.
6. Wait 1 to 2 minutes and open `https://aimlessfellow.github.io`.

### Alternative: Netlify (fastest, about 1 minute)
1. Go to `app.netlify.com/drop`.
2. Drag the whole `ragul-portfolio` folder onto the page.
3. You get a live link immediately. Create a free account to keep it and rename the site
   (Site configuration > Change site name), for example `ragul-s.netlify.app`.

## 5. Updating your live site later

**Easiest (in the browser):** open your repository on GitHub, click the file (for example `index.html`),
click the pencil icon, make your change, click **Commit changes**. The site updates in about a minute.
To replace the photo: **Add file > Upload files**, upload a file with the same name, and commit.

**With Git (if you use VS Code):**
```
git add .
git commit -m "Update projects"
git push
```

## 6. After it's live

- Put the link on your resume, LinkedIn (Contact info and Featured) and your GitHub profile's Website field.
- Share the link in job applications: `https://aimlessfellow.github.io`.

## Troubleshooting

- **404 page:** `index.html` must be in the top level of the repository, not inside another folder.
- **Changes not showing:** wait a minute, then hard refresh (Ctrl+Shift+R, or Cmd+Shift+R on Mac).
- **Photo missing:** GitHub is case sensitive. `ragul.webp` and `Ragul.webp` are different files.
- **Fonts look different offline:** the Manrope font loads from Google Fonts and needs internet.
