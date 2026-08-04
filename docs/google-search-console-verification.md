# Google Search Console verification

Google Search Console has separate verification methods. The current domain-property method checks DNS only, so code changes cannot satisfy it until the DNS TXT record exists at the domain registrar.

## Domain property

Add this TXT record at the DNS provider for `niki.ai`:

```txt
Name/Host: @
Type: TXT
Value: google-site-verification=SjF9gqoQELFWR3wc2VUf91JHtxp5xJNkpbylNUGP-Hk
```

DNS can take a few hours to propagate. Tiny internet goblin paperwork, unfortunately.

## URL-prefix fallback

If DNS access is not available, use a URL-prefix property for `https://niki.ai/` and choose either:

- HTML tag verification: the homepage includes the matching `google-site-verification` meta tag.
- HTML file verification: deploy the included Google verification HTML file and verify that it is reachable at `/googleSjF9gqoQELFWR3wc2VUf91JHtxp5xJNkpbylNUGP-Hk.html`.
