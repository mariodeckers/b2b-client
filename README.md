# b2b-client

This module provides limited functionality for interacting with NM B2B services.

Use of this module requires that you obtain a certificate and sign an agreement
with NM.

The module, while functional, merely serves as an example to get you started
with NM B2B in a TypeScript or JavaScript environment.

## Usage

For debug logging, set environment variable _B2B_CLIENT_DEBUG=on_ or _=true_.

### Deno

```TS
import {
  BaseClient,
  CommonService,
  FlightService,
  GeneralInformationService,
} from "jsr:@mariodeckers/b2b-client";
```

### Node

Install from JSR:

```bash
npx jsr add @mariodeckers/b2b-client
```

```JS
import {
  BaseClient,
  CommonService,
  FlightService,
  GeneralInformationService,
} from "@mariodeckers/b2b-client";
```

## Features

This module offers limited functionalities for:

- Interacting with flight services.
- Managing subscriptions.
- Accessing general information.

## Examples

For a basic example of how to use this module, see
[example/basic.ts](example/basic.ts).

## Utilities

⚠️ Consider using a dedicated secrets manager (HashiCorp Vault, Azure Key
Vault,…) instead of storing your certificate and key on the server. Never commit
your certificates and private keys to Git.

The Deno script [scripts/extract-p12.ts](scripts/extract-p12.ts) can be used to
extract certificates and private key from a .p12 file.

See
[Deno Installation](https://docs.deno.com/runtime/getting_started/installation/)
on how to get Deno installed on your machine.

Run this command for usage instructions:

```bash
deno .\scripts\extract-p12.ts --help
```
