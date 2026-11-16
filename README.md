# Raiment Web – pricing page

One-page pricing site for raimentweb.com.ng. Next.js (App Router), TypeScript, Tailwind CSS. No backend.

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # production build
```

## Before you deploy: replace the placeholders

Open `data/pricing.ts` and edit the `contact` block at the top:

```ts
export const contact = {
  whatsappNumber: "234XXXXXXXXXX",        // <- your real number
  email: "hello@raimentweb.com.ng",       // <- an inbox that exists
  instagram: "https://instagram.com/raimentweb",
  facebook: "https://facebook.com/raimentweb",
};
```

- `whatsappNumber`: country code + number, no `+`, no spaces, no leading 0. Example: `2348012345678`.
- Until you change it, every WhatsApp button opens a broken link.
- Leave any of `email`, `instagram`, `facebook` as `""` and that link disappears from the footer.

## Where to put your photo

1. Save your photo as **`public/travis.jpg`** (replace the file that is there).
   A portrait photo works best (about 3:4, at least 1000px wide).
2. Make the sharing image (what WhatsApp and Facebook show when someone shares your link):

   ```bash
   npm run og
   ```

   This writes **`public/og-travis.jpg`** (1200×630) from your photo.
3. If `public/travis.jpg` is missing, the page shows a neutral placeholder instead of breaking the build.

## How to change prices (and any other words)

Everything on the page comes from **`data/pricing.ts`**. Nothing is typed into the components.

- **Prices:** edit the numbers in the `PRICES` block near the top. Every label (`₦180,000`, `From ₦600,000`, `₦50,000/month`), the FAQ answer about renewal, the page description and the Google schema are built from those numbers.
- **Package features, delivery time, WhatsApp message:** edit the `packages` array.
- **Comparison table:** edit `comparisonRows` (`true` = tick, `false` = dash, text = shown as written).
- **Add-ons:** edit `addOns`.
- **Quick picker:** edit `pickerOptions`. Each chip has a `packageId` (`starter`, `business`, `store` or `custom`) which is the card it highlights.
- **FAQ, steps, headings, hero text:** edit `faqs`, `steps` and `site`.

Note: the "I sell on WhatsApp/Instagram" chip points to the Starter Page. Change its `packageId` to `"store"` if you would rather send those people to the Online Store (and update its `reason` line to match).

## Deploy to Vercel

1. Put the project on GitHub (create a new repo, then `git remote add origin <url>` and `git push -u origin main`).
2. Go to [vercel.com/new](https://vercel.com/new), import the repo, and click **Deploy**. The defaults are correct; there are no environment variables.
3. Add your domain: Project → **Settings → Domains** → add `pricing.raimentweb.com.ng`, then set the DNS records Vercel shows you at your domain registrar. (The root `raimentweb.com.ng` is used by the store project, so this page lives on a subdomain.)
4. After changing anything in `data/pricing.ts`, push to GitHub. Vercel rebuilds and publishes by itself.

If `pricing.raimentweb.com.ng` is not the final address, change `site.url` in `data/pricing.ts` so the share image and Google schema point to the right place.

## Social share image

After you deploy, paste your link into WhatsApp or the [Facebook Sharing Debugger](https://developers.facebook.com/tools/debug/) to check the preview. They cache old previews, so use the debugger's "Scrape Again" if you change the image.
