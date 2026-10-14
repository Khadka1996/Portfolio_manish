---
title: npm Supply-Chain Attacks in 2026: A Practical Security Checklist for JavaScript Teams
description: Compromised npm packages hit even hugely popular libraries this year. Here's a step-by-step checklist to protect your Next.js and Node.js projects — lockfiles, install scripts, release delays, provenance and more.
date: 2026-09-18
tags: [Security, Node.js, JavaScript, DevOps]
category: Security
popular: true
---

2026 has been a rough year for the npm ecosystem. Security researchers reported a compromise of the widely used **Axios** package in March, a campaign in June that published hundreds of malicious versions across dozens of packages, and continued waves of the self-spreading "Shai-Hulud" style worms first seen in late 2025. (See write-ups from [ArmorCode](https://www.armorcode.com/blog/defending-against-npm-supply-chain-attacks-a-practical-guide) and [Bastion](https://bastion.tech/blog/npm-supply-chain-attacks-2026-saas-security-guide) for details.)

The pattern is usually the same: an attacker steals a maintainer's token, publishes a new version with a malicious **install script**, and that script steals credentials from every machine and CI runner that installs it.

Every Next.js or Node.js project has hundreds of transitive dependencies. Here's the checklist I apply to my own and client projects.

## 1. Always commit your lockfile — and install from it

```bash
# In CI and on servers, never `npm install`
npm ci
```

`npm ci` installs exactly what's in `package-lock.json` and fails if it doesn't match `package.json`. That means a new malicious version can't sneak in during a deploy.

## 2. Disable install scripts by default

Most malicious packages run their payload in `preinstall`/`postinstall`. Most of your dependencies don't need install scripts at all.

```ini
# .npmrc
ignore-scripts=true
```

Then explicitly allow the few that need them (native modules like `sharp` or `bcrypt`). **pnpm** does this by default in recent versions — scripts only run for packages you approve.

## 3. Don't install brand-new versions immediately

Most compromised versions are detected within hours or days. A short delay is one of the most effective defences:

```yaml
# pnpm-workspace.yaml
minimumReleaseAge: 10080   # minutes (7 days)
```

If you use Renovate or Dependabot, configure a similar minimum age for update PRs.

## 4. Use a behavioural scanner, not just `npm audit`

`npm audit` only knows about **reported** vulnerabilities. A freshly published malicious version has no CVE yet. Tools like Socket analyse what a package *does* — new network calls, install scripts, obfuscated code — and can block suspicious updates in pull requests.

## 5. Protect your secrets from your dependencies

Assume one day a dependency will be malicious. Limit the blast radius:

- Don't keep long-lived cloud keys in `.env` on developer laptops.
- In CI, give build steps only the secrets they need; don't expose deploy tokens to `npm ci`.
- Use short-lived, OIDC-based credentials for deployments where your platform supports it.
- Rotate tokens immediately if a package you use is reported compromised.

## 6. If you publish packages: lock down your account

- Enable **2FA** (security keys if possible) on npm.
- Use **trusted publishing** from CI (OIDC) instead of long-lived npm tokens.
- Publish with **provenance** so users can verify where a package was built:

```bash
npm publish --provenance
```

## 7. Scope and pin private packages

If your company uses private packages, put them under a scope and route that scope to your private registry, so an attacker can't publish a public package with the same name (dependency confusion):

```ini
@mycompany:registry=https://npm.mycompany.com/
```

## 8. Reduce your dependency count

Every dependency is an attack surface. Before adding a package, ask:

- Can I write this in 20 lines?
- Is it maintained? By more than one person?
- How many transitive dependencies does it pull in?

While rebuilding this portfolio, I found UI libraries in `package.json` that the public site never even imported. Removing unused packages is free security.

## 9. Have a response plan

When the next incident hits the news:

1. Search your lockfiles for the affected package and versions.
2. Check CI logs for installs during the compromise window.
3. Rotate any secrets that were available on affected machines.
4. Pin to a known-good version and redeploy.

## The checklist

- [ ] Lockfile committed; `npm ci` in CI and servers
- [ ] Install scripts disabled by default
- [ ] Minimum release age for new versions
- [ ] Behavioural scanning on dependency PRs
- [ ] Minimal secrets exposed to installs and builds
- [ ] 2FA + trusted publishing + provenance (for publishers)
- [ ] Private scopes routed to a private registry
- [ ] Regular removal of unused dependencies
- [ ] A written incident-response checklist

None of this is glamorous — but it's the difference between reading about the next attack and being part of it.
