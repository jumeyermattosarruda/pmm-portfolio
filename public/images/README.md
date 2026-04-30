# Portfolio Images

Drop images into the subfolders below and push to `main`. The **Apply Uploaded Images** GitHub Action will automatically wire each file to the right place in `src/content.json` so the site rebuilds with real photos.

---

## `profile/` — Profile photo carousel

Upload any number of images here. They will be displayed in the hero carousel in alphabetical order.

**Supported formats:** `.jpg` `.jpeg` `.png` `.webp` `.avif` `.gif`

**Suggested naming:**
```
profile-1.jpg
profile-2.jpg
profile-3.jpg
profile-4.jpg
profile-5.jpg
```

Any filenames work — they are sorted alphabetically before being applied, so the order is predictable.

---

## `work/` — Work grid project cards

Each image must be **named after the project's `id`** in `src/content.json`. The action matches files by their name (without extension) to the `id` field of each project.

**Project IDs and what they map to:**

| Filename (any extension) | Project |
|--------------------------|---------|
| `vtex-vision.jpg` | VTEX Vision — 17-Product Launch |
| `devportal.jpg` | VTEX Developer Portal |
| `mobile-feed.jpg` | Mobile Feed GTM |
| `allocator-pro.jpg` | Allocator Pro Loyalty |
| `wau-growth.jpg` | Platform Weekly Active User Growth |
| `reengagement.jpg` | Re-engagement Experiment |
| `faststore.jpg` | VTEX FastStore GTM |
| `tech-writing-br.jpg` | Tech Writing BR Community |
| `events.jpg` | Events & Conferences |
| `manuscript-podcast.jpg` | The Manu\<script\> Podcast |
| `frameroom.jpg` | FrameRoom — Side Project |

You don't have to upload all of them at once — any missing image keeps its existing placeholder.
