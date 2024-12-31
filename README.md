# b2b-client

This module provides limited functionality for interacting with NM B2B services.

Use of this module requires that you obtain a certificate and sign an agreement
with NM.

## Usage

More detailed usage instructions will be added here. For basic usage, please
refer to the example provided.

## Features

This module offers limited functionalities for:

- Interacting with flight services.
- Managing subscriptions.
- Accessing general information.

## Examples

For a basic example of how to use this module, see
[example/basic.ts](example/basic.ts).

## Utilities

The Deno script [scripts/extract-p12.ts](scripts/extract-p12.ts) can be used to
extract certificates and private key from a .p12 file.

See
[Deno Installation](https://docs.deno.com/runtime/getting_started/installation/)
on how to get Deno installed on your machine.

Run this command for usage instructions:

```bash
deno .\scripts\extract-p12.ts --help
```
