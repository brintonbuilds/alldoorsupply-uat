# Frame Builder: how to update it

The Frame Builder is one file: `frame-builder/index.html`. Everything it needs
(styles, scripts, images) is inside that file. It is live at
alldoorsupply.com/frame-builder/ and linked from the Resources page.

## To update it

1. On github.com, open this repository and go into the `frame-builder` folder.
2. Click **Add file > Upload files** and drop in the new `index.html`
   (it must be named exactly `index.html`). Or open `index.html` and use the
   pencil icon to edit it in place.
3. Click **Commit changes**. The site updates in about a minute.
4. Open alldoorsupply.com/frame-builder/ (hard refresh: Ctrl/Cmd + Shift + R),
   fill in "Your details", and use **Send to Alldoor > Send current shop
   drawing** to test. See "Testing" below.

Only change this one file. Everything else in the repository is the website, and
a commit to it goes live right away.

## Always start from the copy in GitHub

Download `index.html` from GitHub, edit that, and upload it back. Do not start
from an older copy kept on a computer. The version here has a small change from
the original: it sends drawings through Formspree instead of a PHP script. In the
file, search for `ALL DOOR SEND SETTINGS`. The line under it, plus the three
nearby lines that build the form data (`_gotcha`, `_replyto`, `_subject`) and the
`Accept: application/json` header on the `fetch` call, make sending work. Keep
them. If a new version of the file loses them, the Send button will show the
"couldn't send" message.

## How sending works

- The Send button creates the PDF in the visitor's browser and posts it to
  Formspree (the same service behind the website's contact and quote forms).
- Formspree emails the drawing to the address set in the Formspree dashboard.
  The email contains a download link to the PDF, not an attachment.
- Submissions count toward the Formspree plan's monthly limit (200 on the
  current plan, shared with all site forms). The plan renews every November 6.
  If it lapses, the Send button stops working but the tool still builds and
  downloads PDFs.
- If the visitor's send fails, the tool shows a download link and the phone
  number instead.

## Testing

After every update:
- Build a frame, then download the PDF.
- Send one drawing to yourself (put your own details in "Your details").
- Confirm the email arrives with a working PDF link.
- Check it on a phone as well as a computer.

## What this tool loads from the internet

- jsPDF and svg2pdf.js from cdnjs.cloudflare.com and cdn.jsdelivr.net (PDF creation)
- Google Fonts

If the PDF button says "The PDF tools didn't load," one of these was blocked.
