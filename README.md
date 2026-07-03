# rupees-ts

Convert number to Indian Rupees format, but faster & fully typed.

## Installation

```bash
npm install rupees-ts
# or
pnpm add rupees-ts
# or
yarn add rupees-ts
```

## Quick Start

```typescript
import { convert } from 'rupees-ts';

console.log(convert(1234.56));
// "One Thousand Two Hundred and Thirty Four Rupees and Fifty Six Paise"

console.log(convert("50.25"));
// "Fifty Rupees and Twenty Five Paise"

console.log(convert(-450));
// "Minus Four Hundred and Fifty Rupees Only"
```

## Documentation

Full documentation is available at [website-url-here] (or by building the `www` directory).

## Features

- **Zero Dependencies:** Extremely lightweight and fast.
- **TypeScript Native:** Provides complete type definitions out of the box.
- **String & Number Support:** Safely handles both data types, including decimals.
- **Edge Case Handling:** Properly processes negative numbers, zero, and sub-rupee (paise only) amounts.

## API Reference

### `convert(input: number | string): string | false`

Converts a numeric value into an Indian Rupees word representation.

- **`input`**: The amount to be converted. Can be a number or a string parsable as a number.
- **Returns**: The formatted string (e.g., `"One Hundred Rupees Only"`), or `false` if the input is an invalid string that cannot be parsed.

## License

[MIT](./LICENSE) License © 2025 [ゼハン Zehan Khan](https://github.com/zehan12)
